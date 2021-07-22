import Balance from './Balance'
import Login from './Login'

function Home(){
    if(window.localStorage.getItem("AlkemyToken"))
        return(
            <Balance/>
        )
    return(
        <Login/>
    )
}

export default Home;