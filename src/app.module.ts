import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { WinstonModule } from 'nest-winston';
import { transports, format } from 'winston';
import configuration from './config/configuration';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomLoggerService } from './custom-logger/custom-logger.service';
import { DDMMYYDateFormat } from './utils';
import { logsConfig } from './config/logs.config'
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    /* Configuration for typeorm module */
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: parseInt(<string>process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      autoLoadEntities: true,
      synchronize: true,
      logging: logsConfig.ENABLE_DB_LOGS,
      logger: new CustomLoggerService,
      /* maxQueryExecutionTime is the time set for throwing a warning if any query is taking longer than the mentioned time in 'ms' */
      maxQueryExecutionTime: 1
    }),
    /* Configuration for winston module */
    WinstonModule.forRoot({
      transports: [
        new transports.File({
          silent: !logsConfig.ENABLE_APPS_LOGS,
          filename: `app_logs/${DDMMYYDateFormat(new Date())}-access.log`,
          level: 'info',
          format: format.combine(
            format.timestamp({
              format: 'YYYY-MM-DD hh:mm:ss.SSS A',
            }),
            format.json(),
            format.label({ label: 'INFO', message: true }),
          ),
        }),
        new transports.File({
          silent: !logsConfig.ENABLE_APPS_LOGS,
          filename: `app_logs/${DDMMYYDateFormat(new Date())}-error.log`,
          level: 'error',
          format: format.combine(
            format.timestamp({
              format: 'YYYY-MM-DD hh:mm:ss.SSS A',
            }),
            format.json(),
            format.label({ label: 'ERROR', message: true }),
          ),
        }),
      ],
    }),
  ],
  controllers: [AppController],
  providers: [AppService, CustomLoggerService],
})
export class AppModule { }
