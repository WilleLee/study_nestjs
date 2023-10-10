import { Injectable, NotFoundException } from '@nestjs/common';
import { Movie } from './entities/movie.entity';
import { CreateMovieDTO } from './dto/create-movie.dto';
import { UpdateMovieDTO } from './dto/update-movie.dto';
// service = business logic
@Injectable()
export class MoviesService {
  private movies: Movie[] = [];

  getMovies(): Movie[] {
    return this.movies;
  }

  createMovie(movieData: CreateMovieDTO): boolean {
    const id = this.movies.length + 1;
    this.movies.push({
      ...movieData,
      id,
      genres: movieData.genres || [],
    });
    return true;
  }

  getMovie(id: number): Movie {
    // console.log(typeof id);
    const movie = this.movies.find((movie) => movie.id === id);
    if (!movie) throw new NotFoundException(`Movie with ID ${id} not found.`);
    return movie;
  }

  deleteMovie(id: number): boolean {
    this.getMovie(id);
    this.movies = this.movies.filter((movie) => movie.id !== id);
    return true;
  }

  patchMovie(id: number, updateData: UpdateMovieDTO): boolean {
    const index = this.movies.findIndex((movie) => movie.id === id);
    this.movies[index] = {
      ...this.movies[index],
      ...updateData,
    };
    return true;
  }
}
