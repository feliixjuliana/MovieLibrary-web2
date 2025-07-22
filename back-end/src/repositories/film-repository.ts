import { Film } from "../models/film-models"
import mysqlConnection from '../database/mySQLConnection';
import { RowDataPacket } from 'mysql2';

export interface FilmRepository {
    save(film: Film): Promise<Film>;
    findByTitle(title: string): Promise<Film | null>;
    findById(id: string): Promise<Film | null>;
    getAll(): Promise<Film[]>;
    update(film: Film): Promise<Film | null>;
    delete(id: string): Promise<void>;
}

export class MySQLFilmRepository implements FilmRepository {
    async save(film: Film): Promise<Film> {
        await mysqlConnection.execute(
            'INSERT INTO films (id, title, description, releaseDate, filmGenres, urlImg) VALUES (?, ?, ?, ?, ?, ?)',
            [film.id, film.title, film.description, film.releaseDate, film.filmGenres, film.urlImg]
        );
        return film;
    }

    async findByTitle(title: string): Promise<Film | null> {
        const [rows] = await mysqlConnection.execute<RowDataPacket[]>(
            'SELECT * FROM films WHERE title = ?',
            [title]
        );
        const films = rows as Film[];
        return films.length ? films[0] : null;
    }

    async findById(id: string): Promise<Film | null> {
        const [rows] = await mysqlConnection.execute<RowDataPacket[]>(
            'SELECT * FROM films WHERE id = ?',
            [id]
        );
        const films = rows as Film[];
        return films.length ? films[0] : null;
    }

    async getAll(): Promise<Film[]> {
        const [rows] = await mysqlConnection.execute<RowDataPacket[]>(
            'SELECT * FROM films'
        );
        return rows as Film[];
    }

    async update(film: Film): Promise<Film | null> {
        const [result] = await mysqlConnection.execute(
            'UPDATE films SET title = ?, description = ?, releaseDate = ?, filmGenres = ?, urlImg = ? WHERE id = ?',
            [film.title, film.description, film.releaseDate, film.filmGenres, film.urlImg, film.id]
        ) as [any, any];

        if (result.affectedRows === 0) {
            return null;
        }
        return film;
    }

    async delete(id: string): Promise<void> {
        await mysqlConnection.execute(
            'DELETE FROM films WHERE id = ?',
            [id]
        );
    }
}