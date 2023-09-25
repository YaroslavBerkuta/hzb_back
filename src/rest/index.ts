import { PublickNewsModule } from './_publick/news/news.module'
import { PublicFormModule } from './_publick/form/form.module'

export const REST_MODULES = () => [PublickNewsModule.forRoot(), PublicFormModule.forRoot()]
