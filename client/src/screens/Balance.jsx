import { useEffect, useState } from "react";
import Nav from "../Nav"
import swal from 'sweetalert';

function Balance(){
    const [balance,setBalance] = useState(0)
    const [arrDropdown,setArrDropdown] = useState([])
    const [arrOperaciones, setArrOperaciones] = useState([])

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
        cargarCategoriasYOperaciones()
    },[])

    function myDropdown(){
        document.getElementById("myDropdown").classList.toggle("show");
    }

    function getCategory(name){
        let url
        if(name){
            url=`${process.env.REACT_APP_BASE_URL}/operation/?search=${name}`
        }else{
            url=`${process.env.REACT_APP_BASE_URL}/operation/`
        }
        fetch(url,{
            headers:{
                "access-token":window.localStorage.getItem("AlkemyToken")
            }
        })
            .then(res=>res.json())
            .then(res=>{
                setArrOperaciones(res.operations)
            })
            .catch(err=>{
                return swal("Oops!", "Something went wrong!", "error");
            })
    }

    function cargarCategoriasYOperaciones(){
        fetch(`${process.env.REACT_APP_BASE_URL}/operation/categories`,{
            headers:{
                "access-token":window.localStorage.getItem("AlkemyToken")
            }
        })
            .then(res=>res.json())
            .then(res=>{    
                let arr = res.categories.map(element=>{
                    return(
                        <div key={element.id} onClick={e=>getCategory(element.name)} className="cursor-pointer hover:bg-gray-100 py-2 text-center text-blue-500">{element.name}</div>
                    )
                })
                arr.push(
                    <div key="IngresosYEgresos" onClick={e=>getCategory()} className="cursor-pointer hover:bg-gray-100 py-2 text-center text-blue-500">Ingresos y Egresos</div>
                )
                setArrDropdown(arr)
                cargarOps(res.categories)
            })
            .catch(err=>{
                return swal("Oops!", "Something went wrong! couldn't get categories", "error");
            })

        
    }

    function cargarOps(categories){
        fetch(`${process.env.REACT_APP_BASE_URL}/operation/`,{
            headers:{
                "access-token":window.localStorage.getItem("AlkemyToken")
            }
        })
            .then(res=>res.json())
            .then(res=>{
                // setear balance aqui
                let arr = res.operations.map(element=>{
                    let name

                    for(let i=0;i<categories.length;i++){
                        if(categories[i].id===element.id){
                            name=categories[i].name
                            break;
                        }
                    }

                    let fecha = new Date(Date.parse(element.date))

                    return(
                        <div>
                            <div className={`accordion ${element.operation==="egreso"? "bg-red-400 hover:bg-red-500": "bg-green-300 hover:bg-green-400 active:bg-green-400"} text-white flex flex-row`}>
                                <span className="flex flex-col">
                                    <span>{element.operation}</span>
                                    <span>{name}</span>
                                </span>
                                <span className="flex-1"></span>
                                <span className="flex flex-col">
                                    <span>{"$"+element.amount}</span>
                                    <span>{fecha.getDate()+"/"+(parseInt(fecha.getMonth())+1)+"/"+fecha.getFullYear()}</span>
                                </span>
                            </div>
                            <div className="panel flex justify-center bg-gray-50">
                                <button className="px-4 py-2 my-2 mx-2 bg-purple-500 rounded-lg text-white">Editar</button>
                                <button className="px-4 py-2 my-2 mx-2 bg-red-500 rounded-lg text-white">Borrar</button>
                            </div>
                        </div>
                    )
                })
                setArrOperaciones(arr)

                var acc = document.getElementsByClassName("accordion");
                var i;

                for (i = 0; i < acc.length; i++) {
                    acc[i].addEventListener("click", function() {
                        if(this.classList.contains("bg-red-400")){
                            this.classList.toggle("panelActiveRed");
                        }else{
                            this.classList.toggle("panelActiveGreen");
                        }
                        
                        var panel = this.nextElementSibling;
                        if (panel.style.maxHeight) {
                        panel.style.maxHeight = null;
                        } else {// panel.scrollHeight + "px";
                        panel.style.maxHeight = "100px"
                        } 
                    });
                }
            })
            .catch(err=>{
                return swal("Oops!", "Something went wrong! couldn't get operations", "error");
            })
    }

    return(
        <>
            <Nav/>

            <div className="flex flex-col items-center justify-center">
                 <div className="mt-8">
                    <div className="text-blue-400 text-3xl">Su balance es:</div>
                    <p className="text-blue-400 text-3xl" style={{textAlign:"center"}}>{balance}</p>
                </div>

                <div className="flex flex-row-reverse mt-4 w-full px-8">
                    <div className="dropdown">
                        <button onClick={myDropdown} className="dropbtn rounded-lg">Categorias</button>
                        <div id="myDropdown" className="dropdown-content bg-gray-50">
                            {arrDropdown}
                        </div>
                    </div>
                </div>

                <div className="mt-6 w-10/12">
                    {arrOperaciones}
                </div>
            </div>
        </>
    )
}

export default Balance;