import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example:"test test"
  })
  @IsNotEmpty()
  @IsString()
 
   @ApiProperty({
    example:"test test"
  })
  @IsNotEmpty()
  @IsString()
  email: string;

   @ApiProperty({
    example:"test test"
  })
  @IsNotEmpty()
  @IsString()
  @Length(6, 20)
  password: string;
}
