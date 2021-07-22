import swal from 'sweetalert';
import logo from '../public/logo.png'

function Login(){
    if(window.localStorage.getItem("AlkemyToken")) return window.location.replace(`${process.env.REACT_APP_BASE_URL}/`)

    function send(){
        let mail = document.getElementById("mail-login").value
        let password = document.getElementById("password-login").value

        if(mail.trim().length===0 || password.trim().length===0){
            return swal("Oops!", "Fields can't be empty!", "error");
        }

        fetch(`${process.env.REACT_APP_BASE_URL}/login`,{
            method:"POST",
            body:JSON.stringify({
                mail,
                password
            }),
            headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
            }
        }).then(res=>res.json())
          .then(res=>{
            if(res.hasOwnProperty("err")) return swal("Oops!", res.err, "error");

            window.localStorage.setItem("AlkemyToken",res.token)
            window.location.replace(`/`)
          })
          .catch(err=>{
              return swal("Oops!", "Something went wrong!", "error");
          })
    }

    return(
        <div className="flex justify-center h-screen relative bg-gradient-to-r from-purple-400 to-purple-700">
            <svg className="absolute bottom-0 left-0 z-0 m-0 p-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                <path fill="#ffffff" fill-opacity="1" d="M0,49L40,106.2C80,163,160,278,240,277.7C320,278,400,163,480,130.7C560,98,640,147,720,179.7C800,212,880,229,960,196C1040,163,1120,82,1200,40.8C1280,0,1360,0,1440,65.3C1520,131,1600,261,1680,269.5C1760,278,1840,163,1920,122.5C2000,82,2080,114,2160,106.2C2240,98,2320,49,2400,81.7C2480,114,2560,229,2640,236.8C2720,245,2800,147,2880,147C2960,147,3040,245,3120,236.8C3200,229,3280,114,3360,130.7C3440,147,3520,294,3600,310.3C3680,327,3760,212,3840,147C3920,82,4000,65,4080,65.3C4160,65,4240,82,4320,89.8C4400,98,4480,98,4560,114.3C4640,131,4720,163,4800,187.8C4880,212,4960,229,5040,253.2C5120,278,5200,310,5280,318.5C5360,327,5440,310,5520,318.5C5600,327,5680,359,5720,375.7L5760,392L5760,490L5720,490C5680,490,5600,490,5520,490C5440,490,5360,490,5280,490C5200,490,5120,490,5040,490C4960,490,4880,490,4800,490C4720,490,4640,490,4560,490C4480,490,4400,490,4320,490C4240,490,4160,490,4080,490C4000,490,3920,490,3840,490C3760,490,3680,490,3600,490C3520,490,3440,490,3360,490C3280,490,3200,490,3120,490C3040,490,2960,490,2880,490C2800,490,2720,490,2640,490C2560,490,2480,490,2400,490C2320,490,2240,490,2160,490C2080,490,2000,490,1920,490C1840,490,1760,490,1680,490C1600,490,1520,490,1440,490C1360,490,1280,490,1200,490C1120,490,1040,490,960,490C880,490,800,490,720,490C640,490,560,490,480,490C400,490,320,490,240,490C160,490,80,490,40,490L0,490Z"></path>
            </svg>
            <div className="flex flex-col items-center w-3/4 sm:w-1/2 my-4 rounded-lg shadow-lg bg-white z-10">
                <img style={{width:"350px"}} src={logo} alt="Alkemy Wallet"/>

                <div>
                    <div>
                        <div className="">
                            <label className="text-blue-400">Mail</label>
                        </div>
                        <input placeholder="example@hotmail.com" className="mt-4 border-2 border-purple-400 rounded-lg" type="text" id="mail-login"></input>
                    </div>
                    
                    <div>
                        <div className="mt-4">
                            <label className="text-blue-400">Password</label>
                        </div>
                        <input placeholder="password" className="mt-4 border-2 border-purple-400 rounded-lg" type="password" id="password-login"></input>
                    </div>
                    
                    <div className="flex justify-center mt-2">
                        <input className="text-white bg-purple-400 rounded-lg px-4 py-2 mt-4 cursor-pointer" type="submit" value="Login" onClick={send}></input>
                    </div>
                    <div>
                        <div className="mt-2">
                            <a href="/signup" className="text-blue-400">signup</a>
                        </div>
                    </div>                
                </div>
            </div>
        </div>
    )
}

export default Login;