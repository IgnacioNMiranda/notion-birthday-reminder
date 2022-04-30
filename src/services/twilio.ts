import twilio from 'twilio'
import { environment } from '../config/environment'

export const twilioClient = twilio(environment.twilio.accountSId, environment.twilio.token)
