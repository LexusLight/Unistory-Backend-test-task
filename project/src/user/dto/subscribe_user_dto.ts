import { ApiProperty } from '@nestjs/swagger';

//По данному классу наш api читает swagger, а ещё по нему проще разбирать аргументы запроса

export class SubscribeUserDto {
  @ApiProperty()
  username: string;

  @ApiProperty()
  subscribe: boolean;
}