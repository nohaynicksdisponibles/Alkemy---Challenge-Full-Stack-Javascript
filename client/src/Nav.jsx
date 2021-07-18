import logo from './public/logo.ico'
import { Link } from 'react-router-dom'

function Nav(){
    function desloguear(){
        window.localStorage.removeItem("AlkemyToken")
        window.location.replace(`/`)
    }

    function crear(){
        
    }

    return(
        <nav className="flex">
                <Link to="/">
                    <img src={logo} alt="Alkemy Wallet" style={{width:"50px",margin:"5px 5px"}}/>
                </Link>
                <span className="flex-1"/>
                <span className="px-4 py-2 text-blue-400 cursor-pointer hover:bg-gray-100 pt-4" onClick={crear}>Crear</span>
                <span className="px-4 py-2 text-blue-400 cursor-pointer hover:bg-gray-100 pt-4" onClick={desloguear}>Logout</span>
        </nav>
    )
}

export default Nav