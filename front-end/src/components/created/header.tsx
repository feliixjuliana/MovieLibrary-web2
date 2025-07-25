import { useNavigate } from 'react-router-dom';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"


function Header() {
  const navigate = useNavigate();

  const handleCreateNewFilm = () => {
    navigate('/filmform/new');
  };

  return (
    <>
      <header className="bg-[url('bg-avatar.png')] bg-no-repeat bg-cover p-7">
        <div className="flex justify-center items-center md:gap-5 lg:gap-20 p-6 bg-sky-900 m-3 md:m-6 rounded-2xl opacity-90">
          <div id="texts">
            <h2 className="text-3xl font-extrabold text-white mb-8  md:text-5xl lg:text-7xl">Movie Library</h2>
            <p className=" font-extrabold text-white lg:text-lg">
              ❝ Bem-vindo a sua biblioteca de filmes, aqui <br /> você poderá cadastrar filmes, assim como <br /> uma descrição do que achou.
            </p>
            <div className="flex justify-center p-4">
              <button
                onClick={handleCreateNewFilm}
                className="bg-white hover:bg-sky-900 hover:text-white text-lime-950 font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
              >
                Cadastrar Filme
              </button>
              
            </div>
          </div>

          <div className="justify-center items-center hidden md:flex">
            <Carousel className="w-40 lg:w-60">
              <CarouselContent>
                <CarouselItem><img src="casteloAnimado.jpg" alt="" className="rounded-lg" /></CarouselItem>
                <CarouselItem><img src="MeanGirls.jpg" alt="" className="rounded-lg" /></CarouselItem>
                <CarouselItem><img src="thePrincessDiaries.jpg" alt="" className="rounded-lg" /></CarouselItem>

              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>

        </div>
      </header>
    </>
  );
}

export default Header