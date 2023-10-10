import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';
import { NotFoundException } from '@nestjs/common';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getMovies', () => {
    it('should return an array', () => {
      const result = service.getMovies();
      expect(result).toBeInstanceOf(Array);
    });
  });

  describe('getMovie', () => {
    it('should return a movie', () => {
      service.createMovie({
        title: 'test movie',
        director: 'test director',
        genres: ['test'],
        year: 2021,
      });
      const movie = service.getMovie(1);
      expect(movie).toBeDefined();
      expect(movie.director).toEqual('test director');
      expect(movie.genres).toEqual(['test']);
      expect(movie.title).toEqual('test movie');
    });
    it('should throw 404 error', () => {
      try {
        service.getMovie(999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toEqual('Movie with ID 999 not found.');
      }
    });
  });

  describe('deleteMovie', () => {
    it('should delete a movie', () => {
      service.createMovie({
        title: 'test movie',
        director: 'test director',
        genres: ['test'],
        year: 2021,
      });
      const beforeDeleteLength = service.getMovies().length;
      service.deleteMovie(1);
      const afterDeleteLength = service.getMovies().length;

      expect(afterDeleteLength).toEqual(beforeDeleteLength - 1);
    });
    it('should throw 404 error', () => {
      try {
        service.deleteMovie(999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toEqual('Movie with ID 999 not found.');
      }
    });
  });
});
