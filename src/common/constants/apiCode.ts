import { HttpStatus } from '@nestjs/common';

export interface Code {
  code: string;
  description: string;
}

export const ApiCode = {
  [HttpStatus.OK]: {
    DEFAULT: {
      code: '000',
      description: 'API has no specific code for this case',
    },
  },

  [HttpStatus.BAD_REQUEST]: {
    VALIDATION_ERROR: {
      code: '000',
      description:
        'Client sent an invalid request, such as lacking required request body or parameter',
    },
    MISSING_FIELD_HEADER: {
      code: '001',
      description: 'The something field on headers can not be found',
    },
  },

  [HttpStatus.UNAUTHORIZED]: {
    UNAUTHORIZED: {
      code: '000',
      description: 'Unauthorized',
    },
  },

  [HttpStatus.FORBIDDEN]: {
    ACCESS_DENIED: {
      code: '000',
      description: 'Access denied',
    },
  },

  [HttpStatus.NOT_FOUND]: {
    NOT_FOUND: {
      code: '000',
      description: 'not found',
    },
  },

  [HttpStatus.FAILED_DEPENDENCY]: {
    EXTERNAL_API_ERROR: {
      code: '000',
      description: 'Got errors when calling external API',
    },
  },

  [HttpStatus.INTERNAL_SERVER_ERROR]: {
    UNKNOWN_ERROR: {
      code: '000',
      description: 'Internal servel error',
    },
    UNHANDLED_ERROR: {
      code: '001',
      description: 'This error has not been handled',
    },
  },
};

Object.entries(ApiCode).forEach(([k, v]) => {
  const listCode = Object.keys(v);
  listCode.forEach((c) => {
    const oldCode = ApiCode[k][c]['code'];
    // join, example: 200001, 400001, ...
    ApiCode[k][c]['code'] = `${k}${oldCode}`;
  });
});

export enum EntityEnum {
  user = 'User',
  role = 'Role',
  permission = 'Permission',
  route = 'Route',
}
