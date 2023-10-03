export const environment = {
  notion: {
    databaseId: process.env.NOTION_DATABASE_ID ?? '',
    key: process.env.NOTION_KEY ?? '',

    namePropertyKey: process.env.NOTION_NAME_PROPERTY_KEY ?? 'Name',
    agePropertyKey: process.env.NOTION_AGE_PROPERTY_KEY ?? 'Age',
    dayOfBirthPropertyKey: process.env.NOTION_DAY_OF_BIRTH_PROPERTY_KEY ?? 'Day of birth',
  },
  email: {
    authUser: process.env.EMAIL_AUTH_USER,
    authPassword: process.env.EMAIL_AUTH_PASSWORD,
  },
  birthdaySecret: process.env.BIRTHDAY_SECRET ?? '',
}
