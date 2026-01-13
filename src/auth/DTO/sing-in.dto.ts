import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class SingInDto {
  @ApiProperty({
   example:"giorgi@gmail.com"
  })
  @IsNotEmpty()
  @IsString()
  email: string;

  @ApiProperty({
    example:"password123"
  })
  @IsNotEmpty()
  @IsString()
  @Length(6, 20)
  password: string;
}
