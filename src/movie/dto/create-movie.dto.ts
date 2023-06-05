import { Genre } from '../schemas/movie.schema';

export class CreateMovieDto {
  readonly title: string;

  readonly plot: string;

  readonly director: string;

  readonly rating: number;

  readonly genre: Genre;
}
