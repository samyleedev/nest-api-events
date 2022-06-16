import {
  IsEmpty,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  IsDate,
  MinLength,
  Min,
  Max,
  IsEmail,
} from 'class-validator';

export class CreateUserDto {
  @Min(3)
  @Max(20)
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Min(8)
  @IsNotEmpty()
  password: string;
}
