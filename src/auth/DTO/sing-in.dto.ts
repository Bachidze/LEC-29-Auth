import { IsNotEmpty, IsString, Length } from 'class-validator';

export class SingInDto {
  @IsNotEmpty()
  @IsString()
  email: string;
  @IsNotEmpty()
  @IsString()
  @Length(6, 20)
  password: string;
}
