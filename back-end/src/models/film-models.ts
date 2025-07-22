export class Film {
    id: string;
    title: string;
    description: string;
    releaseDate: Date;
    filmGenres: string;
    urlImg: string;

    constructor({ id, title, description, releaseDate, filmGenres, urlImg }: {
        id: string;
        title: string;
        description: string;
        releaseDate: Date;
        filmGenres: string;
        urlImg: string;
    }) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.releaseDate = releaseDate;
        this.filmGenres = filmGenres;
        this.urlImg = urlImg;
    }

}