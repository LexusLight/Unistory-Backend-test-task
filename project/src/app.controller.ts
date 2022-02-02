import { Controller, Get, Redirect } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Documentation')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOperation({ summary: 'Api-документация' })
  @Get()
  @Redirect('/api', 301) //При переходе в корень ресурса, нас перенаправляют на документацию
  api() {
    return true;
  }
}
