import { ConfigModule } from '@nestjs/config';
import { TypedConfigService } from '../services/typed-config.service';
import { ResolveJoiSchema } from '../types/resolve-joi-schema';
import { TypedConfigModuleOptions } from '../types/typed-config-module-options';

export const initializeTypedConfigModule = (
  option: TypedConfigModuleOptions,
) => {
  const configModule = ConfigModule.forRoot({});
  const schema = option.validationSchema;
  configModule.providers?.push(TypedConfigService);
  return {
    typedConfigModule: configModule,
    typedConfigService: TypedConfigService<ResolveJoiSchema<typeof schema>>,
  };
};
