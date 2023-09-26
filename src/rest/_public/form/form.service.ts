import { Inject, Injectable } from '@nestjs/common'
import { IMailerService } from 'src/libs/mailer/typing'
import { MAILER_SERVICE } from 'src/libs/mailer/typing/consts'
import { MainFormDto } from './dto'

@Injectable()
export class PublicFormService {
	@Inject(MAILER_SERVICE) private readonly mailerService: IMailerService

	public async sendMain(dto: MainFormDto) {
		try {
			await this.mailerService.send({
				from: `${dto.name} ${dto.surname}`,
				to: dto.phone + ' ' + dto.email,
				subject: 'Основна контактна форма',
				text: dto.comment,
			})
		} catch (error) {
			console.log('send mail main error:', error)
			throw new Error(error)
		}
	}
}
