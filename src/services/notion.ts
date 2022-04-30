import { Client } from '@notionhq/client'
import { environment } from '../config/environment'

export const notionClient = new Client({ auth: environment.notion.key })
