import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Put,
  Delete,
  Query,
} from '@nestjs/common';
import { MovieService } from './movie.service';
import { Movie } from './schemas/movie.schema';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Query as FilterQuery } from 'express-serve-static-core';
@Controller('movies')
export class MovieController {
  constructor(private movieService: MovieService) {}

  @Get()
  async getAllMovies(@Query() query: FilterQuery): Promise<Movie[]> {
    return this.movieService.findAll(query);
  }

  @Post()
  async createMovie(
    @Body()
    movie: CreateMovieDto,
  ): Promise<Movie> {
    return this.movieService.create(movie);
  }

  @Get(':id')
  async getMovieById(
    @Param('id')
    id: string,
  ): Promise<Movie> {
    return this.movieService.findById(id);
  }

  @Put(':id')
  async updateMovie(
    @Param('id')
    id: string,
    @Body()
    movie: UpdateMovieDto,
  ): Promise<Movie> {
    return this.movieService.updateById(id, movie);
  }

  @Delete(':id')
  async deleteMovie(
    @Param('id')
    id: string,
  ): Promise<Movie> {
    return this.movieService.deleteById(id);
  }
}
