import {
    NavigationMenu,
    //NavigationMenuContent,
    //NavigationMenuIndicator,
    NavigationMenuItem,
    //NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,

    //NavigationMenuViewport,
} from "@/components/ui/navigation-menu"


function Header() {
    return (
        <>
            <div className="flex justify-center items-center gap-40 p-3 bg-amber-900">
                <NavigationMenu >
                    <NavigationMenuList >
                        <NavigationMenuItem >
                            <NavigationMenuTrigger className="bg-amber-900 font-bold text-white">Filmes</NavigationMenuTrigger>
                            <NavigationMenuTrigger className="bg-amber-900 font-bold text-white">Cadastrar Filmes</NavigationMenuTrigger>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>
            </div>

            <div>

            </div>
        </>
    );
}

export default Header