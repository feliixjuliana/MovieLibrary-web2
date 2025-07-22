import { Film } from "../models/film-models";

interface FilmData {
    id: string;
    title: string;
    description: string;
    releaseDate: Date;
    filmGenres: string;
    urlImg: string;
}

export default {
    create: (data: FilmData): Film => {
        return new Film({
            id: data.id,
            title: data.title,
            description: data.description,
            releaseDate: data.releaseDate,
            filmGenres: data.filmGenres,
            urlImg: data.urlImg

        })
    }
}