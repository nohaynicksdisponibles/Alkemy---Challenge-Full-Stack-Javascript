import { useEffect, useRef, useState } from "react";
import Nav from "../Nav"
import swal from 'sweetalert';
import Modal from 'react-modal';

Modal.setAppElement('#root');

function Balance(){
    const [balance,setBalance] = useState(0)
    const [arrDropdown,setArrDropdown] = useState([])
    const [arrOperaciones, setArrOperaciones] = useState([])
    const [modalIsOpen, setModalIsOpen] = useState(false)

    const idOp = useRef(-1)
    const categoriesRef = useRef([])
    const arrOperacionesRef = useRef([])
    const totalRef = useRef(0)
    const amountRef = useRef(0)
    const operationRef = useRef("")
    const arrUptadatedRef = useRef([])

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
        arrUptadatedRef.current=[]
    },[])

    function myDropdown(){
        document.getElementById("myDropdown").classList.toggle("show");
    }

    function getCategory(name){
        let url
        
        if(name){
            window.localStorage.setItem("categoryAlkemy",name)
            url=`${process.env.REACT_APP_BASE_URL}/operation/?search=${name}`
        }else{
            window.localStorage.removeItem("categoryAlkemy")
            url=`${process.env.REACT_APP_BASE_URL}/operation/`
        }
        fetch(url,{
            headers:{
                "access-token":window.localStorage.getItem("AlkemyToken")
            }
        })
            .then(res=>res.json())
            .then(res=>{

                setArrOperaciones([])
                let arr=res.operations.map(element=>crearOp(element,categoriesRef.current))
                arrOperacionesRef.current=arr
                setArrOperaciones(arr)
                
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
                categoriesRef.current=res.categories
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
        let url
        let name = window.localStorage.getItem("categoryAlkemy")

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
                // seteo el balance
                setearBalance()
                // creo la lista de operaciones
                let arr = res.operations.map(element=>{
                    let name

                    for(let i=0;i<categories.length;i++){
                        if(categories[i].id===element.categoryId){
                            name=categories[i].name
                            break;
                        }
                    }

                    let fecha = new Date(Date.parse(element.date))

                    return(
                        <div key={`${element.id}-op`}>
                            <div onClick={function(e){
                                //cierro los demas accordions
                                idOp.current=element.id

                                let arr = document.getElementsByClassName("accordion")

                                for(let i=0;i<arr.length;i++){
                        
                                    if(!arr[i].classList.contains(idOp.current)){
                                        
                                        if(arr[i].classList.contains("panelActiveRed") || arr[i].classList.contains("panelActiveGreen")){
                                            arr[i].click()
                                        } 
                                    }          
                                }

                                let a = e.currentTarget
                                if(a.classList.contains("bg-red-400")){
                                    a.classList.toggle("panelActiveRed");
                                }else{
                                    a.classList.toggle("panelActiveGreen");
                                }
                        
                                var panel = a.nextElementSibling;
                                if (panel.style.maxHeight) {
                                panel.style.maxHeight = null;
                                } else {// panel.scrollHeight + "px";
                                panel.style.maxHeight = "100px"
                                }

                                if(!arrUptadatedRef.current.includes(element.id)){
                                    operationRef.current=element.operation
                                    amountRef.current=element.amount
                                }
                                
                    }} className={`accordion ${element.operation==="egreso"? "bg-red-400 hover:bg-red-500": "bg-green-300 hover:bg-green-400 active:bg-green-400"} text-white flex flex-row ${element.id}`}>
                                <span className="flex flex-col">
                                    <span>{element.operation}</span>
                                    <span>{name}</span>
                                </span>
                                <span id={`${element.id}-concept`} className={`flex-1 text-center`}>
                                    {element.concept}
                                </span>
                                <span className="flex flex-col">
                                    <span id={`${element.id}-amount`}>{"$"+element.amount}</span>
                                    <span>{fecha.getDate()+"/"+(parseInt(fecha.getMonth())+1)+"/"+fecha.getFullYear()}</span>
                                </span>
                            </div>
                            <div className="panel flex justify-center bg-gray-50">
                                <button className="px-4 py-2 my-2 mx-2 border-2 border-purple-500 rounded-lg text-purple-500" onClick={()=>setModalIsOpen(true)}>Editar</button>
                                <button className="px-4 py-2 my-2 mx-2 bg-red-500 rounded-lg text-white" onClick={()=>borrarElemento(element.id)}>Borrar</button>
                            </div>
                        </div>
                    )
                })
                setArrOperaciones(arr)
                arrOperacionesRef.current=arr
            })
            .catch(err=>{
                return swal("Oops!", "Something went wrong! couldn't get operations", "error");
            })
    }

    function setearBalance(){

        fetch(`${process.env.REACT_APP_BASE_URL}/operation/total`,{
            headers:{
                "access-token":window.localStorage.getItem("AlkemyToken")
            }
        })
            .then(res=>res.json())
            .then(res=>{
                if(res.hasOwnProperty("err")) return swal("Oops!", res.err, "error");

                let acc=0

                for(let i=0;i<res.operations.length;i++){
                    if(res.operations[i].operation==="egreso"){
                        acc-=parseFloat(res.operations[i].amount)
                    }else{
                        acc+=parseFloat(res.operations[i].amount)
                    }
                }
        
                setBalance(acc)
                totalRef.current=acc
            })
            .catch(err=>{
                return swal("Oops!", "Something went wrong! couldn't get operations", "error");
            })
        
    }

    function crearOp(element,categories){
        let name

        for(let i=0;i<categories.length;i++){
            if(categories[i].id===element.categoryId){
                name=categories[i].name
                break;
            }
        }

        let fecha = new Date(Date.parse(element.date))

        return(//{`${element.id}-op`}
            <div key={`${element.id}-op`} onClick={()=>idOp.current=element.id}>
                <div onClick={function(e){
                                 idOp.current=element.id

                                 let arr = document.getElementsByClassName("accordion")
 
                                 for(let i=0;i<arr.length;i++){
                         
                                     if(!arr[i].classList.contains(idOp.current)){
                                         
                                         if(arr[i].classList.contains("panelActiveRed") || arr[i].classList.contains("panelActiveGreen")){
                                             arr[i].click()
                                         } 
                                     }          
                                 }
 
                                 let a = e.currentTarget
                                 if(a.classList.contains("bg-red-400")){
                                     a.classList.toggle("panelActiveRed");
                                 }else{
                                     a.classList.toggle("panelActiveGreen");
                                 }
                         
                                 var panel = a.nextElementSibling;
                                 if (panel.style.maxHeight) {
                                 panel.style.maxHeight = null;
                                 } else {// panel.scrollHeight + "px";
                                 panel.style.maxHeight = "100px"
                                 }
 
                                 if(!arrUptadatedRef.current.includes(element.id)){
                                     operationRef.current=element.operation
                                     amountRef.current=element.amount
                                 }
                    }}  className={`accordion ${element.operation==="egreso"? "bg-red-400 hover:bg-red-500": "bg-green-300 hover:bg-green-400 active:bg-green-400"} text-white flex flex-row ${element.id}`}>
                    <span className="flex flex-col">
                        <span>{element.operation}</span>
                        <span>{name}</span>
                    </span>
                    <span id={`${element.id}-concept`} className={`flex-1 text-center`}>
                        {element.concept}
                    </span>
                    <span className="flex flex-col">
                        <span id={`${element.id}-amount`}>{"$"+element.amount}</span>
                        <span>{fecha.getDate()+"/"+(parseInt(fecha.getMonth())+1)+"/"+fecha.getFullYear()}</span>
                    </span>
                </div>
                <div className="panel flex justify-center bg-gray-50">
                    <button className="px-4 py-2 my-2 mx-2 border-2 border-purple-500 rounded-lg text-purple-500" onClick={()=>setModalIsOpen(true)}>Editar</button>
                    <button className="px-4 py-2 my-2 mx-2 bg-red-500 rounded-lg text-white" onClick={()=>borrarElemento(element.id)}>Borrar</button>
                </div>
            </div>
        )
    }

    function borrarElemento(id){
        fetch(`${process.env.REACT_APP_BASE_URL}/operation/delete`,{
            method: "DELETE",
            body:JSON.stringify({idOp:id}),
            headers:{
                'access-token':window.localStorage.getItem("AlkemyToken"),
                'Content-Type': 'application/json'
            }
        })
            .then(res=>res.json())
            .then(res=>{
                if(res.hasOwnProperty("err")) return swal("Oops!", "Something went wrong! couldn't delete operation", "error");

                let arr = arrOperacionesRef.current.filter(element=>element.key!==`${id}-op`)

                if(operationRef.current==="egreso"){
                    setBalance(totalRef.current+amountRef.current)
                    totalRef.current=totalRef.current+amountRef.current
                }else{
                    setBalance(totalRef.current-amountRef.current)
                    totalRef.current=totalRef.current-amountRef.current
                }

                arrOperacionesRef.current=arr
                setArrOperaciones(arr)
            })
            .catch(err=>{
                return swal("Oops!", "Something went wrong! couldn't delete operation", "error")
            })
    }

    function enviarModal(){
        let inpModal = document.getElementById("inputModal").value
        let textAreaModal = document.getElementById("textAreaModal").value

        if(inpModal.trim().length===0 || textAreaModal.trim().length===0) return swal("Oops!", "Something went wrong! fields are empty", "error")

        if(isNaN(inpModal)) return swal("Oops!", "Something went wrong! Amount can't be alphanumeric", "error")

        if(inpModal<0) return swal("Oops!", "Something went wrong! Input can't be negative", "error")

        if(idOp.current===-1) return swal("Oops!", "Something went wrong! Operation couldn't be updated", "error")
        
        fetch(`${process.env.REACT_APP_BASE_URL}/operation/update`,{
            method:"PUT",
            body:JSON.stringify({
                id: idOp.current,
                amount:inpModal,
                concept:textAreaModal
            }),
            headers:{
                'access-token':window.localStorage.getItem("AlkemyToken"),
                'Content-Type': 'application/json'
            }
        })
            .then(res=>res.json())
            .then(res=>{
                
                if(res.hasOwnProperty("err")) return swal("Oops!", res.err, "error")

                let amount = document.getElementById(`${idOp.current}-amount`)
                let concept = document.getElementById(`${idOp.current}-concept`)
                arrUptadatedRef.current.push(res.operation.id)
/*
                if(res.operation.operation==="egreso"){
                    if(totalRef.current>0){
                        if(parseFloat(res.operation.amount)-parseFloat(amountRef.current)<0){
                            totalRef.current+=(Math.abs(parseFloat(res.operation.amount)-parseFloat(amountRef.current)))
                            setBalance(totalRef.current)
                            console.log("Entre al egreso total>0 dif -")
                        }else{
                            totalRef.current-=(parseFloat(res.operation.amount)-parseFloat(amountRef.current))
                            setBalance(totalRef.current)
                            console.log("Entre al egreso total>0 dif +")
                        }
                    }else{
                        if(parseFloat(res.operation.amount)-parseFloat(amountRef.current)<0){
                            totalRef.current+=(Math.abs(parseFloat(res.operation.amount)-parseFloat(amountRef.current)))
                            setBalance(totalRef.current)
                            console.log("Entre al egreso total<0 dif -")
                        }else{
                            totalRef.current-=(Math.abs(parseFloat(res.operation.amount)-parseFloat(amountRef.current)))
                            setBalance(totalRef.current)
                            console.log("Entre al ingreso total<0 dif +")
                        }
                    }
                }else{
                    if(parseFloat(res.operation.amount)-parseFloat(amountRef.current)<0){
                        totalRef.current-=(Math.abs(parseFloat(res.operation.amount)-parseFloat(amountRef.current)))
                        setBalance(totalRef.current)
                        console.log("Entre al ingreso dif -")
                    }else{
                        totalRef.current+=(Math.abs(parseFloat(res.operation.amount)-parseFloat(amountRef.current)))
                        setBalance(totalRef.current)
                        console.log("Entre al egreso dif +")
                    }             
                }*/

                amountRef.current=res.operation.amount

                amount.innerHTML="$"+res.operation.amount
                concept.innerHTML=res.operation.concept

                setModalIsOpen(false)
                window.location.href="/"
            })
            .catch(err=>{// "Something went wrong! Operation couldn't be updated"
                return swal("Oops!", "Something went wrong! Operation couldn't be updated", "error")
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

                <div className="my-6 w-10/12">
                    {arrOperaciones}
                </div>

                <Modal
                    isOpen={modalIsOpen}
                    style={{ overlay: {backgroundColor:"rgba(156,156,156,0.3)"}, content: {width:"300px",marginLeft:"auto", marginRight:"auto"} }}
                    contentLabel="Example Modal"
                    onRequestClose={()=>setModalIsOpen(false)}
                >
                    <div className="flex flex-row-reverse">
                        <button className="bg-red-500 text-white" style={{borderRadius:"50%", padding:"3px 10px"}} onClick={()=>setModalIsOpen(false)}>X</button>
                    </div>
  
                    <div>
                        <div className="flex flex-col items-center justify-center">
                            <label className="text-blue-400 mb-2">Monto</label>
                            <input id="inputModal" className="border-2 border-purple-400 rounded-lg w-48" type="text"/>
                        </div>
                        <div className="flex flex-col items-center justify-center">
                            <label className="text-blue-400 my-2">Concepto</label>
                            <textarea id="textAreaModal" className="border-2 border-purple-400 rounded-lg w-48 h-36" type="text"/>
                            <button className="border-2 border-purple-500 rounded-lg text-blue-400 mt-6 py-2 px-4" onClick={enviarModal}>Aceptar</button>
                        </div>
                    </div>
                </Modal>
            </div>
        </>
    )
}

export default Balance;