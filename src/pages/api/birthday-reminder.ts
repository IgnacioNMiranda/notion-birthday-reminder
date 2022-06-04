import type { NextApiRequest, NextApiResponse } from 'next'
import { environment } from 'config/environment'
import { notionClient, twilioClient } from 'services'

enum HttpStatus {
  INTERNAL_SERVER_ERROR = 500,
  OK = 200,
  UNAUTHORIZED = 401,
}

type BirthdayPerson = {
  name: string
  newAge: number
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (
    req.method !== 'GET' ||
    !req.headers['x-birthday-secret'] ||
    req.headers['x-birthday-secret'] !== environment.birthdaySecret
  ) {
    const status = HttpStatus.UNAUTHORIZED
    return res.status(status).json({ status, message: 'You are not authorized to perform this action' })
  }

  const todayDate = new Date()
  const todayDateString = `${todayDate.getUTCDate()}/${todayDate.getUTCMonth() + 1}`

  const birthdayPeople: BirthdayPerson[] = []

  try {
    const query = await notionClient.databases.query({ database_id: environment.notion.databaseId })

    query.results.forEach((result) => {
      if ('properties' in result) {
        const {
          properties: {
            [environment.notion.agePropertyKey]: notionAge,
            [environment.notion.namePropertyKey]: notionName,
            [environment.notion.dayOfBirthPropertyKey]: notionDayOfBirth,
          },
        } = result

        let newAge = 0
        let name = ''
        let dayOfBirthDate = new Date()

        if (notionAge.type === 'formula' && notionAge.formula.type === 'number') newAge = notionAge.formula.number ?? 0
        if (notionName.type === 'title') name = notionName.title[0].plain_text
        if (notionDayOfBirth.type === 'date') dayOfBirthDate = new Date(notionDayOfBirth.date?.start ?? '')

        const notionDayOfBirthString = `${dayOfBirthDate.getUTCDate()}/${dayOfBirthDate.getUTCMonth() + 1}`
        if (notionDayOfBirthString === todayDateString) {
          birthdayPeople.push({ name, newAge })
        }
      }
    })

    if (birthdayPeople.length) {
      const body = 'Birthdays\n' + birthdayPeople.map(({ name, newAge }) => `${name}: ${newAge} years`).join('\n')
      await twilioClient.messages.create({
        body,
        from: environment.twilio.fromNumber,
        to: environment.twilio.toNumber,
      })
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error)

    const status = HttpStatus.INTERNAL_SERVER_ERROR
    return res.status(status).json({ status, message: 'An unexpected error occured.' })
  }

  const status = HttpStatus.OK
  return res.status(status).json({
    status,
    message: birthdayPeople.length ? 'We have birthdays today' : 'We do not have to celebrate birthdays today',
    people: birthdayPeople,
  })
}

export default handler
