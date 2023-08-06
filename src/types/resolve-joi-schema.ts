/* eslint-disable @typescript-eslint/ban-types */
import Joi from 'joi';

type ResolveScalarJoiType<T> = T extends Joi.StringSchema
  ? string
  : T extends Joi.NumberSchema
  ? number
  : T extends Joi.BooleanSchema
  ? boolean
  : T extends Joi.DateSchema
  ? Date
  : T extends Joi.BinarySchema
  ? Buffer
  : T extends Joi.FunctionSchema
  ? Function
  : T extends Joi.AnySchema<infer U>
  ? U
  : T;

type UnArray<T> = T extends Array<infer U> ? U : T;

type ResolveJoiType<T> = T extends Joi.ObjectSchema<infer U>
  ? { [key in keyof U]: ResolveJoiSchema<U[key]> }
  : T extends Joi.ArraySchema<infer U>
  ? ResolveJoiSchema<UnArray<U>>[]
  : ResolveScalarJoiType<T>;

type ResolvePrimitiveType<T> = T extends object
  ? { [key in keyof T]: ResolveJoiSchema<T[key]> }
  : T extends Array<infer U>
  ? ResolveJoiSchema<U>[]
  : T;

export type ResolveJoiSchema<T> = T extends Joi.AnySchema
  ? ResolveJoiType<T>
  : ResolvePrimitiveType<T>;
