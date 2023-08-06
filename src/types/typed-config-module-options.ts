import { ConfigModuleOptions } from '@nestjs/config/dist/interfaces';
import Joi from 'joi';

export type TypedConfigModuleOptions = ConfigModuleOptions & {
  validationSchema: Joi.AnySchema;
};
