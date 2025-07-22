import { useEffect, useState } from "react";
import { getFilms, deleteFilm } from "../../services/films";
import type { Film } from "../../types/film";
import Spinner from "./spinner";

function MainM() {
  const [films, setFilms] = useState<Film[]>([]);
  const [spinner, setSpinner] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await getFilms();
        setFilms(data);
      } catch (error) {
        console.error("Erro ao buscar filmes:", error);
      } finally {
        setSpinner(false);
      }
    }

    loadData();
  }, []);

  const questDelFilm = async (filmId: string) => {
    if (!window.confirm("Tem certeza que deseja deletar este filme?")) {
      return;
    }

    try {
      await deleteFilm(filmId);
      alert("Filme deletado com sucesso")
    } catch (error) {
      console.error("Erro ao deletar filme:", error);
      alert("Erro ao deletar filme. Por favor, tente novamente.");
    }

  }

  return (
    <div className="bg-amber-900 m-10 rounded-s-3xl">
      <h1 className=" text-white font-extrabold text-4xl flex justify-center pt-4">Filmes</h1>
      {spinner ? (
        <Spinner />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7 p-4" id="produtos">
          {films.length > 0 ? (
            films.map((film) => (
              <div key={film.id} className=" bg-white p-3 rounded-xl flex justify-center gap-3 items-center">
                <a href="#">
                  <img
                    className="rounded-xl w-40"
                    src={film.urlImg}
                  />
                </a>
                <div className="flex flex-col flex-grow h-full">
                  <a href="#">
                    <h5 className="mb-2 text-lg mt-2 font-bold tracking-tight lg:text-2xl">
                      {film.title}
                    </h5>
                  </a>
                  <p className="mb-3 font-norma text-sm font-mono flex flex-col justify-center ">
                    <strong>Descrição:</strong> {film.description} <br />
                    <strong>Data de Lançamento:</strong> {new Date(film.releaseDate).toLocaleDateString('pt-BR')} <br />
                    <strong>Gênero:</strong> {film.filmGenres}
                  </p>
                </div>
                <button
                  onClick={() => questDelFilm(film.id)}
                  className="mt-auto bg-amber-900 hover:bg-white hover:text-amber-900 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
                >
                  Deletar
                </button>
              </div>
            ))
          ) : (
            <p className="text-white col-span-full text-center text-xl mt-10">Nenhum filme encontrado.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default MainM;