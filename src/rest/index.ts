import { PublicFormModule, PublicNewsModule } from './_public'

export const REST_MODULES = () => [PublicNewsModule.forRoot(), PublicFormModule.forRoot()]
