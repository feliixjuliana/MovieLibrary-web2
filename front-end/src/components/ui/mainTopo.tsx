
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"


function MainTopo() {
  return (
    <>
      <div className="flex justify-center items-center gap-20 p-7 bg-amber-900">
        <div id="texts">
          <h2 className="text-5xl font-extrabold text-white mb-8">Movie Library</h2>
          <p className=" font-extrabold text-white">
            Bem-vindo a sua biblioteca de filmes, aqui <br/> você poderá cadastrar livros, editar e até <br/> mesmo apagar.
          </p>
        </div>

        <div className="flex justify-center items-center ">
          <Carousel className="w-40 lg:w-6">
            <CarouselContent>
              <CarouselItem><img src="casteloAnimado.jpg" alt="" className="rounded-lg"/></CarouselItem>
              <CarouselItem><img src="MeanGirls.jpg" alt="" className="rounded-lg"/></CarouselItem>
              <CarouselItem><img src="thePrincessDiaries.jpg" alt="" className="rounded-lg"/></CarouselItem>

            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>

      </div>
    </>
  );
}

export default MainTopo