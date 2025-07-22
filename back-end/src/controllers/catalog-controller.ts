import { Request, Response } from 'express';
import { FilmService } from '../services/film-service';
import { MySQLFilmRepository } from '../repositories/film-repository';

const filmService = new FilmService(new MySQLFilmRepository());

export const createPost = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id, title, description, releaseDate, filmGenres, urlImg } = req.body;
        const newFilm = await filmService.createFilm({ id, title, description, releaseDate, filmGenres, urlImg });
        res.status(201).json({ message: `New film, ${newFilm.title}, created!`, id: newFilm.id });
    } catch (error) {
        console.error("Error creating film:", error);
        res.status(500).json({ message: "Error creating film" });
    }
};

export const listPosts = async (req: Request, res: Response): Promise<void> => {
    try {
        const films = await filmService.getAllFilm();
        res.json(films);
    } catch (error) {
        console.error("Error listing films:", error);
        res.status(500).json({ message: "Error listing films" });
    }
};

export const listPostsId = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const film = await filmService.getByIdFilme(id);
        if (!film) {
            res.status(404).json({ message: `Film with ID ${id} not found` });
            return;
        }
        res.json(film);
    } catch (error) {
        console.error("Error fetching film by ID:", error);
        res.status(500).json({ message: "Error fetching film" });
    }
};

export const updatePost = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const updatedFilm = await filmService.updateFilm(id, req.body);

        if (!updatedFilm) {
            res.status(404).json({ message: `Film with ID ${id} not found` });
            return;
        }

        res.status(200).json({ message: `Film with ID ${id} updated successfully!` });
    } catch (error) {
        console.error("Error updating film:", error);
        res.status(500).json({ message: "Error updating film" });
    }
};

export const deletePost = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const filmToDelete = await filmService.getByIdFilme(id);
        if (!filmToDelete) {
            res.status(404).json({ message: `Film with ID ${id} not found` });
            return;
        }
        await filmService.deleteFilmById(id);
        res.status(204).send();
    } catch (error) {
        console.error("Error deleting film:", error);
        res.status(500).json({ message: "Error deleting film" });
    }
};