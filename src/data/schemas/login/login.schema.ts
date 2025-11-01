import { obligatoryFieldsSchema, obligatoryRequredFields } from '../core.schema';

export const loginSchema = {
  type: 'object',
  properties: {
    User: {
      type: 'object',
      properties: {
        _id: {
          type: 'string',
        },
        username: {
          type: 'string',
          format: 'email',
        },
        firstName: {
          type: 'string',
        },
        lastName: {
          type: 'string',
        },
        roles: {
          type: 'array',
          items: {
            type: 'string',
          },
          minItems: 1,
        },
        createdOn: {
          type: 'string',
          pattern: '^\\d{4}/\\d{2}/\\d{2} \\d{2}:\\d{2}:\\d{2}$',
          description: 'Format: YYYY/MM/DD HH:mm:ss',
        },
      },
      required: ['_id', 'username', 'firstName', 'lastName', 'roles', 'createdOn'],
    },
    ...obligatoryFieldsSchema,
  },
  required: [...obligatoryRequredFields, 'User'],
};
