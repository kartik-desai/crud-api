import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export enum Genre {
  THRILLER = 'Thriller',
  COMEDY = 'Comedy',
  CRIME = 'Crime',
  FICTION = 'Fiction',
}

@Schema({
  timestamps: true,
})
export class Movie {
  @Prop()
  title: string;

  @Prop()
  plot: string;

  @Prop()
  director: string;

  @Prop()
  rating: number;

  @Prop()
  genre: Genre;
}

export const MovieSchema = SchemaFactory.createForClass(Movie);
