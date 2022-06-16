import {
  IsEmpty,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  IsDate,
} from 'class-validator';

export class CreateCategoryDto {
  @IsNotEmpty()
  @Length(3, 30)
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  image_path: string;
}
