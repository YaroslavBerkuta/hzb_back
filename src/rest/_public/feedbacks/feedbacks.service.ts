import { Inject, Injectable } from '@nestjs/common';
import { 
  FEEDBACKS_REPOSITORIES, 
  FEEDBACKS_SERVICE, 
  IFeedbacksService, 
  TFeedbacksRepository 
} from 'src/domain/feedbacks/typing';
import { IPagination, paginateAndGetMany } from 'src/shared';

@Injectable()
export class PublicFeedbacksService {
  @Inject(FEEDBACKS_REPOSITORIES) private readonly feedbacksRepository: TFeedbacksRepository;
  @Inject(FEEDBACKS_SERVICE) private readonly feedbacksService: IFeedbacksService

  async getList(pagination: IPagination) {
    try {
      const query = this.feedbacksRepository
        .createQueryBuilder('it')
        .orderBy('it.createdAt', 'DESC');

      const { items, count } = await paginateAndGetMany(query, pagination, 'it');

      return {
        items,
        count,
      };
    } catch (error) {
      console.log('Error in getList:', error);
    }
  }

  async create(dto: any) {
		return await this.feedbacksService.create(dto)
	}
}
