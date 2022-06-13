import {
  applyDecorators,
  createParamDecorator,
  ExecutionContext,
  Type,
} from '@nestjs/common';
import {
  ApiBody,
  ApiExtraModels,
  ApiQuery,
  getSchemaPath,
} from '@nestjs/swagger';

export const ApiUpsert = (CreateDto: Type, UpdateDto: Type) => {
  const createSchemaPath = getSchemaPath(CreateDto);
  const updateSchemaPath = getSchemaPath(UpdateDto);

  return applyDecorators(
    ApiQuery({
      name: 'id',
      type: 'number',
      required: false,
    }),
    ApiBody({
      schema: {
        oneOf: [{ $ref: createSchemaPath }, { $ref: updateSchemaPath }],
      },
      examples: {
        'Create Dto': {
          $ref: createSchemaPath,
        },
        'Update Dto': {
          $ref: updateSchemaPath,
        },
      },
    }),
    ApiExtraModels(CreateDto, UpdateDto),
  );
};

export const Authorization = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.headers.authorization;
  },
);
