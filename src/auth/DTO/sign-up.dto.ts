import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class SingUpDto {

  @ApiProperty({
    example:"giorgi giorgadze"
  })
  @IsNotEmpty()
  @IsString()
  fullName: string;

  @ApiProperty({
    example:"giorgi@gmail.com"
  })
  @IsNotEmpty()
  @IsString()
  email: string;

  @ApiProperty({
    example:"password123",
    minimum:6,
    maximum:20
  })
  @IsNotEmpty()
  @IsString()
  @Length(6, 20)
  password: string;

}
