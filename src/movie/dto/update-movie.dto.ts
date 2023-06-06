import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { Genre } from '../schemas/movie.schema';

export class UpdateMovieDto {
  @IsOptional()
  @IsString()
  readonly title: string;

  @IsOptional()
  @IsString()
  readonly plot: string;

  @IsOptional()
  @IsString()
  readonly director: string;

  @IsOptional()
  @IsNumber()
  readonly rating: number;

  @IsOptional()
  @IsEnum(Genre, { message: 'Please enter correct genre.' })
  readonly genre: Genre;
}
