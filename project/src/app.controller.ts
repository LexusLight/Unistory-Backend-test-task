import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import {articles} from './article/articles';

@Controller()
export class AppController {
  getHello(): any {
      throw new Error('Method not implemented.');
  }
  constructor(private readonly appService: AppService) {}

  @Get()
  index1() {
    return {articles};
  }

  @Get("/f")
  index2() {
    return "FUCK YOU!";
  }
}
