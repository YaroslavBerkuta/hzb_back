import { Injectable } from '@nestjs/common'
import { InjectSendGrid, SendGridService } from '@ntegral/nestjs-sendgrid'
import { IMailerService, ISendPayload } from '../typing'

@Injectable()
export class SendgridMailerService implements IMailerService {
	constructor(@InjectSendGrid() private readonly sendGridSdk: SendGridService) {}

	public async send(payload: ISendPayload): Promise<void> {
		try {
			const [response] = await this.sendGridSdk.send({
				to: payload.to,
				from: payload.from,
				subject: payload.subject,
				html: payload.html,
				text: payload.text,
			})
		} catch (e) {
			console.log(e.response.body)
		}
	}
}
