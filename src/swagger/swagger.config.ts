import { ISwagger } from './swagger.interface';

export const SWAGGER_CONFIG: ISwagger = {
  title: process.env.SWAGGER_TITLE,
  description: process.env.SWAGGER_DESCRIPTION,
  version: process.env.SWAGGER_VERSION,
  tags: ['Welcome'],
};
