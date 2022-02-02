import { ApiProperty } from '@nestjs/swagger';

//По данному классу наш api читает swagger, а ещё по нему проще разбирать аргументы запроса

export class CreateUserDto {
  @ApiProperty()
  username: string;

  @ApiProperty()
  age: number;

  @ApiProperty()
  sex: string;
}