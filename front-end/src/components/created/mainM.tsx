import { useEffect, useState } from "react";
import { getFilms, deleteFilm } from "../../services/films";
import type { Film } from "../../types/film";
import Spinner from "../ui/spinner";
import { useNavigate } from 'react-router-dom';
import ErrorVisi from './Error';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function MainM() {
  const [films, setFilms] = useState<Film[]>([]);
  const [spinner, setSpinner] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchFilms();
  }, []);

  const fetchFilms = async () => {
    try {
      setSpinner(true);
      setError(null);
      const filmsData = await getFilms();
      setFilms(filmsData);
    } catch (err) {
      console.error("Erro ao buscar filmes:", err);
      setError("Erro ao buscar filmes");
    } finally {
      setSpinner(false);
    }
  };

  const handleEditClick = (id: string) => {
    navigate(`/filmform/${id}`);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Tem certeza que deseja deletar este filme?")) {
      try {
        await deleteFilm(id);
        fetchFilms();
        alert("Filme deletado com sucesso!");
      } catch (error) {
        console.error("Erro ao deletar filme:", error);
        alert("Erro ao deletar filme. Tente novamente.");
      }
    }
  };

  return (
    <div className="m-5 md:m-10 bg-sky-900 rounded-xl">
      <h1 className="text-white font-extrabold text-3xl pt-6 md:text-6xl flex justify-center">
        Filmes
      </h1>

      {spinner ? (
        <Spinner />
      ) : error ? (
        <div className="flex justify-center p-8">
          <ErrorVisi />
        </div>
      ) : films.length === 0 ? (
        <h2 className="w-50 font-bold text-white flex justify-center items-center p-8">
          ↪︎ Parece que contém nenhum filme cadastrado, <strong>cadastre um!</strong> ↩︎
        </h2>
      )
        : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 p-8 bg-sky-900 text-white" id="divFilms">
            {films.map((film) => (
              <div
                key={film.id}
                className="p-3 rounded-xl flex flex-col md:flex-row justify-center gap-3 items-center border-2"
              >
                <a href="#">
                  <img
                    className="rounded-xl w-40"
                    src={film.urlImg}
                    alt={film.title}
                  />
                </a>
                <div className="flex flex-col flex-grow h-full">
                  <a href="#">
                    <h5 className="mb-2 text-lg mt-2 font-bold tracking-tight lg:text-2xl">
                      {film.title}
                    </h5>
                  </a>
                  <p className="mb-3 font-normal text-sm font-mono">
                    <strong>Data de Lançamento:</strong>{" "}
                    {new Date(film.releaseDate).toLocaleDateString("pt-BR")} <br />
                    <strong>Gênero:</strong> {film.filmGenres}
                  </p>
                  <div >
                    <div className="mt-auto flex gap-2 mb-2">
                      <button
                        onClick={() => handleEditClick(film.id)}
                        className="bg-white hover:bg-sky-900 hover:text-white text-lime-950 font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDelete(film.id)}
                        className="bg-white hover:bg-sky-900 hover:text-white text-sky-950 font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
                      >
                        Deletar
                      </button>
                    </div>
                    <Dialog >
                      <DialogTrigger className="bg-white hover:bg-sky-900 hover:text-white text-sky-950 font-bold p-2 rounded transition duration-300 ease-in-out flex">Detalhes</DialogTrigger>
                      <DialogContent className="w-full max-w-sm sm:max-w-md bg-sky-900 rounded-2xl">
                        <DialogHeader>
                          <div className="flex gap-2 justify-center items-center">
                            <div className="lg:w-1/2">
                              <img className="rounded-t-lg w-40 lg:w-72"
                                src={film.urlImg} />
                            </div>
                            <div className="flex-1 text-white">
                              <DialogTitle className="mb-3">{film.title}</DialogTitle>
                              <p>
                                {film.description}
                              </p>
                              
                              
                            </div>

                          </div>
                        </DialogHeader>

                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
    </div>
  );
}
