import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Movie } from './schemas/movie.schema';
import { Query } from 'express-serve-static-core';
import { User } from '../auth/schemas/user.schema';

@Injectable()
export class MovieService {
  constructor(
    @InjectModel(Movie.name)
    private movieModel: mongoose.Model<Movie>,
  ) {}

  async findAll(query: Query): Promise<Movie[]> {
    const responsesPerPage = 2;
    const currentPage = Number(query.page) || 1;
    const skipPages = responsesPerPage * (currentPage - 1);

    const keyword = query.keyword
      ? {
          title: {
            $regex: query.keyword,
            $options: 'i',
          },
        }
      : {};
    const genre = query.genre
      ? {
          genre: {
            $regex: query.genre,
            $options: 'i', //Case insensitive
          },
        }
      : {};
    const rating = query.rating
      ? {
          rating: {
            $gte: query.rating,
          },
        }
      : {};
    const filter = { ...keyword, ...genre, ...rating };
    const movies = await this.movieModel
      .find(filter)
      .limit(responsesPerPage)
      .skip(skipPages);
    return movies;
  }

  async create(movie: Movie, user: User): Promise<Movie> {
    const data = Object.assign(movie, { user: user._id });

    const res = await this.movieModel.create(data);
    return res;
  }

  async findById(id: string): Promise<Movie> {
    const isValidId = mongoose.isValidObjectId(id);

    if (!isValidId) {
      throw new BadRequestException('Please enter correct id.');
    }

    const movie = await this.movieModel.findById(id);

    if (!movie) {
      throw new NotFoundException('Movie not found.');
    }

    return movie;
  }

  async updateById(id: string, movie: Movie): Promise<Movie> {
    return await this.movieModel.findByIdAndUpdate(id, movie, {
      new: true,
      runValidators: true,
    });
  }

  async deleteById(id: string): Promise<Movie> {
    return await this.movieModel.findByIdAndDelete(id);
  }
}
