import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from '../../auth/schemas/user.schema';
import mongoose from 'mongoose';

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

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;
}

export const MovieSchema = SchemaFactory.createForClass(Movie);
