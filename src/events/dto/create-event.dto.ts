import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateEventDto {
  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  title: string;

  @IsNumber()
  @IsNotEmpty()
  category_id: number;

  @IsNumber()
  @IsNotEmpty()
  creator_id: number;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsOptional()
  image_path: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsNotEmpty()
  zip_code: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsDate()
  @IsNotEmpty()
  date_time: Date;

  @IsBoolean()
  @IsNotEmpty()
  is_free: boolean;

  @IsNumber()
  @IsOptional()
  price: number;
}
