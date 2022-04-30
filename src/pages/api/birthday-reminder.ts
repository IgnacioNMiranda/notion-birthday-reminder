import type { NextApiRequest, NextApiResponse } from 'next'
import { Client } from '@notionhq/client'
import { environment } from 'config/environment'

enum HttpStatus {
  INTERNAL_SERVER_ERROR = 500,
  OK = 200,
  FORBIDDEN = 401,
}

type BirthdayPerson = {
  name: string
  newAge: number
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const notionClient = new Client({ auth: environment.notion.key })
  const todayDate = new Date()
  const todayDateString = `${todayDate.getUTCDate()}/${todayDate.getUTCMonth() + 1}`

  let message = 'We do not have to celebrate birthdays today'
  const birthdayPeopleMessages: BirthdayPerson[] = []

  try {
    const query = await notionClient.databases.query({ database_id: environment.notion.databaseId })

    query.results.forEach((result) => {
      if ('properties' in result) {
        const {
          properties: { Age: notionAge, Name: notionName, 'Day of birth': notionDayOfBirth },
        } = result

        let newAge = 0
        let name = ''
        let dayOfBirthDate = new Date()

        if (notionAge.type === 'formula' && notionAge.formula.type === 'number') newAge = notionAge.formula.number ?? 0
        if (notionName.type === 'title') name = notionName.title[0].plain_text
        if (notionDayOfBirth.type === 'date') dayOfBirthDate = new Date(notionDayOfBirth.date?.start ?? '')

        const notionDayOfBirthString = `${dayOfBirthDate.getUTCDate()}/${dayOfBirthDate.getUTCMonth() + 1}`
        if (notionDayOfBirthString === todayDateString) {
          birthdayPeopleMessages.push({ name, newAge })
        }
      }
    })

    if (birthdayPeopleMessages.length) message = 'We have the following birthdays today:'
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error)

    const status = HttpStatus.INTERNAL_SERVER_ERROR
    res.status(status).json({ status, message: 'An unexpected error occured.' })
  }

  const status = HttpStatus.OK
  return res.status(status).json({ status, message, people: birthdayPeopleMessages })
}

export default handler
