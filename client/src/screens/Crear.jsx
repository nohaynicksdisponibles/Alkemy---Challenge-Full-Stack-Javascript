import { useEffect, useState } from "react"
import swal from 'sweetalert';
import Nav from "../Nav"

function CrearOp(){

    const [arrDropdown,setArrDropdown] = useState([])
    const [categoria,setCategoria] = useState("sin categoria")
    const [operation,setOperation] = useState("ingreso")

    window.onclick = function(event) {
        if (!event.target.matches('.dropbtn')) {
            var dropdowns = document.getElementsByClassName("dropdown-content");
            var i;
            for (i = 0; i < dropdowns.length; i++) {
                var openDropdown = dropdowns[i];
                if (openDropdown.classList.contains('show')) {
                    openDropdown.classList.remove('show');
                }
            }
        }
    }    

    useEffect(()=>{
        cargarCategorias()
    },[])
    
    function cargarCategorias(){
        fetch(`${process.env.REACT_APP_BASE_URL}/operation/categories`,{
            headers:{
                "access-token":window.localStorage.getItem("AlkemyToken")
            }
        })
            .then(res=>res.json())
            .then(res=>{
                let arr = res.categories.map(element=>{
                    return(
                        <div key={element.id} onClick={e=>seleccionarCategoria(element.name)} className="cursor-pointer hover:bg-gray-100 py-2 text-center text-blue-500">{element.name}</div>
                    )
                })
                setArrDropdown(arr)
            })
            .catch(err=>{
                return swal("Oops!", "Something went wrong! couldn't get categories", "error");
            })
    }
    
    function seleccionarCategoria(name){
        setCategoria(name)
    }

    function myDropdown(name){
        document.getElementById(name).classList.toggle("show");
    }

    function enviar(){
        let amount = document.getElementById("create-amount").value
        let name = categoria
        let concept = document.getElementById("textarea-crear-op").value

        if(amount.trim().length===0 || concept.trim().length===0) return swal("Oops!", "Fields can't be empty!", "error");

        if(isNaN(amount)) return swal("Oops!", "Amount can't be alphanumeric!", "error");

        fetch(`${process.env.REACT_APP_BASE_URL}/operation/create`,{
            method:"POST",
            body: JSON.stringify({
                amount,
                name,
                operation,
                concept
            }),
            headers:{
                "access-token":window.localStorage.getItem("AlkemyToken"),              
                "Content-Type": "application/json"
            }
        })
            .then(res=>res.json())
            .then(res=>{
                if(res.hasOwnProperty("err")) return swal("Oops!", res.err, "error");

                swal("Success", "operacion creada exitosamente!", "success")

                document.getElementById("create-amount").value=""
                document.getElementById("textarea-crear-op").value=""
            })
            .catch(err=>{
                return swal("Oops!", "Something went wrong!", "error");
            })
    }

    function chooseOperation(name){
        setOperation(name)
    }

    return(
        <>
            <Nav/>
            <div className="flex justify-center h-screen">
                <div className="flex flex-col justify-around items-center w-3/4 sm:w-1/2 my-4 rounded-lg shadow-lg z-10">
                <div className="flex justify-evenly mt-4 w-full px-8">
                        <div className="w-1/2">
                            <div className="flex flex-col justify-center items-center">
                                <p id="categoria-seleccionada" className="text-center text-blue-400">{operation}</p>
                            </div>
                        </div>
                        <div className="w-1/2">
                            <div className="dropdown mr-16">
                                <button onClick={()=>myDropdown("myDropdown2")} className="dropbtn rounded-lg">Operation</button>
                                <div id="myDropdown2" className="dropdown-content bg-gray-50">
                                    <div key="ingreso" onClick={()=>chooseOperation("ingreso")} className="cursor-pointer hover:bg-gray-100 py-2 text-center text-blue-500">ingreso</div>
                                    <div key="egreso" onClick={()=>chooseOperation("egreso")} className="cursor-pointer hover:bg-gray-100 py-2 text-center text-blue-500">egreso</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-evenly mt-4 w-full px-8">
                        <div className="w-1/2">
                            <div className="flex flex-col justify-center items-center">
                                <p id="categoria-seleccionada" className="text-center text-blue-400">{categoria}</p>
                            </div>
                        </div>
                        <div className="w-1/2">
                            <div className="dropdown mr-16">
                                <button onClick={()=>myDropdown("myDropdown3")} className="dropbtn rounded-lg">Categories</button>
                                <div id="myDropdown3" className="dropdown-content bg-gray-50">
                                    {arrDropdown}
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="flex flex-col">
                        <label className="text-blue-400">Amount</label>
                        <input type="text" id="create-amount"  placeholder="monto" className="mt-4 border-2 border-purple-400 rounded-lg"></input>
                    </div>                    

                    <div className="flex flex-col">
                        <label className="text-blue-400">Concept</label>
                        <textarea id="textarea-crear-op" className="mt-4 border-2 border-purple-400 rounded-lg"></textarea>
                    </div>

                    <div className="flex justify-center">
                        <button className="px-4 py-2 border-2 border-purple-500 rounded-lg text-purple-500" onClick={enviar}>Aceptar</button>
                    </div> 
                </div>
            </div>
        </>
    )
}

export default CrearOp