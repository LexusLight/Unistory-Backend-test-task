import { ApiProperty } from '@nestjs/swagger';

//По данному классу наш api читает swagger, а ещё по нему проще разбирать аргументы запроса

export class EditUserDto {
  @ApiProperty()
  old_username: string;

  @ApiProperty()
  new_username: string;

  @ApiProperty()
  new_age: number;

  @ApiProperty()
  new_sex: string;
}