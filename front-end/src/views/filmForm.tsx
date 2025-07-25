import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { createFilm, updateFilm, getFilmById } from '../services/films';
import type { Film } from '../types/film';
import Spinner from '../components/ui/spinner';

function FilmForm() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditing = !!id;

  const [filmData, setFilmData] = useState<Film | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isFormReady, setIsFormReady] = useState(false);

  useEffect(() => {
    const fetchFilmForEdit = async () => {
      if (isEditing && id) {
        setLoading(true);
        setError(null);
        try {
          const film = await getFilmById(id);
          if (film) {
            const formattedDate = new Date(film.releaseDate).toISOString().split('T')[0];
            setFilmData({ ...film, releaseDate: formattedDate });
          } else {
            setError("Filme não encontrado para edição.");
            setFilmData(null);
          }
        } catch (err: unknown) {
          console.error("Erro ao buscar filme para edição:", err);
          let errorMessage = "Erro ao carregar o filme para edição.";
          if (err instanceof Error) {
            errorMessage = `Erro ao carregar o filme: ${err.message}`;
          }
          setError(errorMessage);
          setFilmData(null);
        } finally {
          setLoading(false);
          setIsFormReady(true);
        }
      } else {
        setFilmData({
          id: '',
          title: '',
          description: '',
          releaseDate: '', 
          filmGenres: '',
          urlImg: ''
        });
        setIsFormReady(true);
      }
    };

    fetchFilmForEdit();
  }, [id, isEditing]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFilmData(prevData => ({
      ...(prevData as Film),
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!filmData) {
      setError("Dados do filme não carregados para submissão.");
      setLoading(false);
      return;
    }

    try {
      const releaseDateForBackend = filmData.releaseDate
        ? new Date(filmData.releaseDate).toISOString()
        : '';

      if (isEditing && filmData.id) {
        const payload: Film = { ...filmData, releaseDate: releaseDateForBackend };
        await updateFilm(filmData.id, payload);
        alert("Filme atualizado com sucesso!");
      } else {
        const payloadWithoutId: Omit<Film, 'id'> = {
          title: filmData.title,
          description: filmData.description,
          releaseDate: releaseDateForBackend,
          filmGenres: filmData.filmGenres,
          urlImg: filmData.urlImg
        };
        await createFilm(payloadWithoutId);
        alert("Filme cadastrado com sucesso!");
      }
      navigate('/');
    } catch (err: unknown) {
      console.error("Erro ao salvar filme:", err);
      let errorMessage = "Erro ao salvar o filme. Tente novamente.";
      if (err instanceof Error) {
        errorMessage = `Erro ao salvar o filme: ${err.message}`;
      }
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (loading && !isFormReady) return <Spinner />;
  if (error) return <p className="text-red-500 text-center">{error}</p>;
  if (isEditing && !filmData && isFormReady) return <p className="text-white text-center">Filme não encontrado para edição.</p>;
  if (!isFormReady) return null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-[url('bg-cadast.png')] bg-no-repeat bg-cover">
      <form onSubmit={handleSubmit} className="p-6 rounded-lg shadow-md max-w-lg w-full ">

        <div className="mb-4">
          <label htmlFor="title" className="block text-white text-sm font-bold mb-2 lg:text-lg">
            Título:
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={filmData?.title || ''}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block text-white text-sm font-bold mb-2 lg:text-lg">
            Descrição:
          </label>
          <textarea
            id="description"
            name="description"
            value={filmData?.description || ''}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-24"
            required
          ></textarea>
        </div>

        <div className="mb-4">
          <label htmlFor="releaseDate" className="block text-white text-sm font-bold mb-2 lg:text-lg">
            Data de Lançamento:
          </label>
          <input
            type="date"
            id="releaseDate"
            name="releaseDate"
            value={filmData?.releaseDate || ''}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="filmGenres" className="block text-white text-sm font-bold mb-2 lg:text-lg">
            Gênero:
          </label>
          <input
            type="text"
            id="filmGenres"
            name="filmGenres"
            value={filmData?.filmGenres || ''}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>

        <div className="mb-6 lg:text-lg">
          <label htmlFor="urlImg" className="block text-white text-sm font-bold mb-2">
            URL da Imagem:
          </label>
          <input
            type="url"
            id="urlImg"
            name="urlImg"
            value={filmData?.urlImg || ''}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>

        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out"
            disabled={loading}
          >
            {loading ? "Salvando..." : (isEditing ? "Salvar Alterações" : "Cadastrar Filme")}
          </button>
          <button
            type="button"
            onClick={() => navigate('/')}
            className="ml-4 bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}

export default FilmForm;