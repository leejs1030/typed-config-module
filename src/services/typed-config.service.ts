import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NoInferType, Path, PathValue } from '@nestjs/config/dist/types';

@Injectable()
export class TypedConfigService<T> extends ConfigService<T, true> {
  private readonly inferOption = { infer: true } as const;

  get<P extends Path<T> = any, R = PathValue<T, P>>(
    propertyPath: P,
    defaultValue?: NoInferType<R>,
  ): R {
    if (defaultValue)
      return super.get(propertyPath, defaultValue, this.inferOption);
    return super.get(propertyPath, this.inferOption);
  }
}
