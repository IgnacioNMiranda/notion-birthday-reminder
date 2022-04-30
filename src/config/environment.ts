export const environment = {
  notion: {
    databaseId: process.env.NOTION_DATABASE_ID ?? '',
    key: process.env.NOTION_KEY ?? '',

    namePropertyKey: process.env.NOTION_NAME_PROPERTY_KEY ?? 'Name',
    agePropertyKey: process.env.NOTION_AGE_PROPERTY_KEY ?? 'Age',
    dayOfBirthPropertyKey: process.env.NOTION_DAY_OF_BIRTHDAY_PROPERTY_KEY ?? 'Day of birth',
  },
  twilio: {
    accountSId: process.env.TWILIO_ACCOUNT_SID,
    token: process.env.TWILIO_AUTH_TOKEN,
    fromNumber: process.env.TWILIO_FROM_NUMBER ?? '',
    toNumber: process.env.TWILIO_TO_NUMBER ?? '',
  },
  birthdaySecret: process.env.BIRTHDAY_SECRET ?? '',
}
