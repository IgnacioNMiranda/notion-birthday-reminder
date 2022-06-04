# Notion Birthday Reminder

[![Netlify Status](https://api.netlify.com/api/v1/badges/a2b1ede5-1da9-4507-b9be-c297c236b3cc/deploy-status)](https://app.netlify.com/sites/notion-birthday-reminder/deploys)

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

It uses Twilio and Notion APIs in order to retrieve birthday data from a Notion database and, considering the current day, send a text message saying whose birthday is.

## Getting Started

1. Install dependencies with `yarn`

2. Run the development server using `yarn dev`

Open [http://localhost:3000](http://localhost:3000) to see placeholder page.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project has a `/api/birthday-reminder` GET endpoint, it retrieves data and send text messages.

You also need to configure a secret in order to bypass the security header `x-birthday-secret`.

## Additional Information

This app is deployed on [Netlify](https://notion-birthday-reminder.netlify.app/) and has a Google Scheduler cronjob attached to it. This cronjob is executed everyday in order to update the birthday reminder of your loved people (:

### License

[MIT](LICENSE)

### About me

[Linkedin](https://www.linkedin.com/in/ignacio-miranda-figueroa/)
