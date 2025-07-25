import { Link } from "react-router-dom";

function Footer() {
    return (
        <div className="w-full bg-sky-900 p-7 text-white font-bold grid gap-4  ">
            <h1 className="flex justify-center align-center">Conheça-me</h1>

            <nav >
                <div className="flex justify-center font-mono gap-6">
                   
                    <p className="font-normal"><Link target="_blank" to="https://www.instagram.com/jubistech/">✴︎ Instagram</Link></p>
                    <p className="font-normal"><Link target="_blank" to="https://www.linkedin.com/in/feliixjuliana/"> ✴︎ LinkedIn</Link></p>
                    <p className="font-normal"><Link target="_blank" to="https://github.com/feliixjuliana">✴︎ Github ✴︎</Link></p>
                </div>

            </nav>
        </div>
    )
}

export default Footer;