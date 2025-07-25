import filmFactory from "../factories/film-factory";
import { Film } from "../models/film-models";
import { FilmRepository } from "../repositories/film-repository";

interface FilmData {
    id: string;
    title: string;
    description: string;
    releaseDate: Date;
    filmGenres: string;
    urlImg: string;
}

export class FilmService {
    private filmRepository: FilmRepository

    constructor(filmRepository: FilmRepository) {
        this.filmRepository = filmRepository
    }

    async createFilm(data: FilmData): Promise<Film> {
        const newFilm = filmFactory.create(data);
        const savedFilm = await this.filmRepository.save(newFilm);
        return savedFilm;
    }

    async getAllFilm(): Promise<Film[]> {
        return await this.filmRepository.getAll();
    }

    async getByIdFilme(id: string): Promise<Film | null> {
        return await this.filmRepository.findById(id);
    }

    async updateFilm(id: string, data: Partial<FilmData>): Promise<Film | null> {
        const filmUpdate = await this.filmRepository.findById(id);

        if (!filmUpdate) {
            return null;
        }

        if (data.title !== undefined) filmUpdate.title = data.title;
        if (data.description !== undefined) filmUpdate.description = data.description;
        if (data.releaseDate !== undefined) filmUpdate.releaseDate = data.releaseDate;
        if (data.filmGenres !== undefined) filmUpdate.filmGenres = data.filmGenres;
        if (data.urlImg !== undefined) filmUpdate.urlImg = data.urlImg;

        const updatedFilm = await this.filmRepository.update(filmUpdate);
        return updatedFilm
    }

    async deleteFilmById(id: string): Promise<void> {
        await this.filmRepository.delete(id)
    }
}