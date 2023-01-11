import { Injectable } from '@nestjs/common';
import { Logger, QueryRunner } from 'typeorm';
import { createLogger, Logger as WinstonLogger, transports, format } from 'winston';

@Injectable()
/* CustomLoggerService is created to make custom query and error logs */ 
export class CustomLoggerService implements Logger {
    private readonly queryLogger: WinstonLogger;
    private readonly errorLogger: WinstonLogger;
    private readonly customFormat: any;

    constructor() {
        /* customFormat - defines the format in which message is printed */
        this.customFormat = format.printf(
            ({ level, message, label, timestamp }) =>
                `${timestamp} [${label}] ${level}: ${message}`
        );
        const options = (filename: string) => ({
            transports: new transports.File({
                filename,
                level: 'debug',
            }),
            format: this.customFormat,
        });
        /* created  queryLogger for queries & errorLogger for error */
        this.queryLogger = createLogger(options(`db_logs/${this.formatDate(new Date())}-access.log`));
        this.errorLogger = createLogger(options(`db_logs/${this.formatDate(new Date())}-error.log`));

    }

    /* formatDate - function is used to get date in dd-mm-yyyy format */
    formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        return [day, month, year].join('-');
    }

    /* logQuery function is used to log the queries */
    logQuery(query: string, parameters?: any[], queryRunner?: QueryRunner) {
        this.queryLogger.log({
            level: 'info',
            message: `{"query": "${query}", "parameters": "${JSON.stringify(parameters)}"}`,
            timestamp: Date.now(),
            label: 'query',
        });
    }

    /* logQueryError function is used to log the errors */
    logQueryError(
        error: string,
        query: string,
        parameters?: any[],
        queryRunner?: QueryRunner
    ) {
        this.errorLogger.error({
            level: 'error',
            message: `{"query": "${query}", "parameters": "${JSON.stringify(parameters)}", "error": "${error}"}`,
            timestamp: Date.now(),
            label: 'error',
        });
    }

    /* logQuerySlow function is used to check if query is taking longer than the specified time */
    logQuerySlow(
        time: number,
        query: string,
        parameters?: any[],
        queryRunner?: QueryRunner
    ) {
        this.errorLogger.error({
            level: 'warn',
            message: `{"query": "${query}", "parameters": "${JSON.stringify(parameters)}", "time": "${time}"}`,
            timestamp: Date.now(),
            label: 'warning',
        });
    }

    /* logSchemaBuild - function is used to log the schemas */
    logSchemaBuild(message: string, queryRunner?: QueryRunner) {
        throw new Error('Method not implemented.');
    }

    /* logMigration - function is used to log the migrations */
    logMigration(message: string, queryRunner?: QueryRunner) {
        throw new Error('Method not implemented.');
    }

    /* log - function is used general logging */
    log(level: 'log' | 'info' | 'warn', message: any, queryRunner?: QueryRunner) {
        throw new Error('Method not implemented.');
    }

}
