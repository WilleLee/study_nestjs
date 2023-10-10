import { Injectable, NotFoundException } from '@nestjs/common';
import { Movie } from './entities/movie.entity';
// service = business logic
@Injectable()
export class MoviesService {
  private movies: Movie[] = [];

  getMovies(): Movie[] {
    return this.movies;
  }

  createMovie(movieData: Movie): boolean {
    const id = new Date().getTime();
    this.movies.push({
      ...movieData,
      id,
      genres: movieData.genres || [],
    });
    return true;
  }

  getMovie(id: string): Movie {
    const movie = this.movies.find((movie) => movie.id === +id);
    if (!movie) throw new NotFoundException(`Movie with ID ${id} not found.`);
    return movie;
  }

  deleteMovie(id: string): boolean {
    this.getMovie(id);
    this.movies = this.movies.filter((movie) => movie.id !== +id);
    return true;
  }

  patchMovie(id: string, updateData: Movie): boolean {
    const index = this.movies.findIndex((movie) => movie.id === +id);
    this.movies[index] = {
      ...this.movies[index],
      ...updateData,
    };
    return true;
  }
}
