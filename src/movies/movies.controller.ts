import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { Movie } from './entities/movie.entity';
import { CreateMovieDTO } from './dto/create-movie.dto';
import { UpdateMovieDTO } from './dto/update-movie.dto';
// controller = url logic

@Controller('movies') // create entry to url
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  getMovies(): Movie[] {
    return this.moviesService.getMovies();
  }

  @Post()
  createMovie(@Body() movieData: CreateMovieDTO): boolean {
    // const id = new Date().getTime();
    // movies.push({
    //   ...movieData,
    //   id,
    // });
    // return movies.find((movie) => movie.id === id);
    return this.moviesService.createMovie(movieData);
  }

  @Get(':id')
  getMovie(@Param('id') movieId: number): Movie | null {
    // console.log(typeof movieId);
    // const foundMovie = movies.find((movie) => movie.id === +movieId);
    // return foundMovie || null;
    return this.moviesService.getMovie(movieId);
  }

  @Delete(':id')
  deleteMovie(@Param('id') movieId: number) {
    // movies = movies.filter((movie) => movie.id !== +movieId);
    // return movies;
    return this.moviesService.deleteMovie(movieId);
  }

  @Patch(':id')
  patchMovie(@Param('id') movieId: number, @Body() updateData: UpdateMovieDTO) {
    // const index = movies.findIndex((movie) => movie.id === +movieId);
    // movies[index] = { ...movies[index], ...updateData };
    // return movies[index];
    return this.moviesService.patchMovie(movieId, updateData);
  }
}
