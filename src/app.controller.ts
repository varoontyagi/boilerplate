import { Controller, Get, Inject, LoggerService } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

@ApiTags('Welcome')
@Controller()
export class AppController {
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
    private readonly appService: AppService,
  ) {}

  @Get()
  getHello() {
    return this.appService.getHello();
  }

  /* dummy function for winston testing */
  // @Get()
  // getHello() {
  //   try {
  //     this.logger.log('info', 'Successful with http code: 200');
  //     return this.appService.getHello();
  //   } catch (error) {
  //     this.logger.error('error', 'Error');
  //   }
  // }
}
