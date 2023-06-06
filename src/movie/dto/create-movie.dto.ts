import { User } from '../../auth/schemas/user.schema';
import { Genre } from '../schemas/movie.schema';
import {
  IsEmpty,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class CreateMovieDto {
  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @IsNotEmpty()
  @IsString()
  readonly plot: string;

  @IsNotEmpty()
  @IsString()
  readonly director: string;

  @IsNotEmpty()
  @IsNumber()
  readonly rating: number;

  @IsNotEmpty()
  @IsEnum(Genre, { message: 'Please enter correct genre.' })
  readonly genre: Genre;

  @IsEmpty({ message: 'You cannot pass user id' })
  readonly user: User;
}
