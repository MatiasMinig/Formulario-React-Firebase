import React, {useState, useEffect} from 'react';
import {store} from './firebaseconf';


function App() {
  const [modoedicion, setModoEdicion] = useState(null) 
  const [idusuario, setIdUsuario] = useState('')
  const[nombre, setNombre] = useState('')
  const[phone, setPhone] = useState('')
  const[error, setError] = useState('')
  const[usuario, setUsuario] = useState([])
  const[usuariosAgenda, setUsuariosAgenda] = useState([])
  

  useEffect( ()=>{
      const getUsuarios = async()=>{
        const { docs } = await store.collection('agenda').get()
        const nuevoArray = docs.map( item => ({id:item.id, ...item.data()}))
        setUsuariosAgenda(nuevoArray)
      }
      getUsuarios()
  },[])

  const setUsuarios = async (e) => {
      e.preventDefault()
      if(!nombre.trim()){
        setError('El campo nombre esta vacio')
      }else if(!phone.trim()){
        setError('El campo phone esta vacio')
      }
      const usuario = {
        nombre:nombre,
        telefono:phone
      }
      try {
        const data = await store.collection('agenda').add(usuario)
        const { docs } = await store.collection('agenda').get()
        const nuevoArray = docs.map( item => ({id:item.id, ...item.data()}))
        setUsuariosAgenda(nuevoArray)
        alert('Usuario Agregado a la Agenda Correctamente')
      } catch (e) {
        console.log(e)
      }
      setNombre('')
      setPhone('')
     
  }

  const borrarUsuario = async (id)=>{
      try{
        await store.collection('agenda').doc(id).delete()
        const { docs } = await store.collection('agenda').get()
        const nuevoArray = docs.map( item => ({id:item.id, ...item.data()}))
        setUsuariosAgenda(nuevoArray)
      }catch(e){
          console.log(e)
      }
  }

  const pulsarActualizar = async (id)=>{
    try{
      const data = await store.collection('agenda').doc(id).get()
      const {nombre,telefono} = data.data()
      setNombre(nombre)
      setPhone(telefono)
      setIdUsuario(id)
      setModoEdicion(true)
      console.log(id)
    }catch(e){
      console.log(e)
    }
  }
  const setUpdate = async (e)=>{
    e.preventDefault()
      if(!nombre.trim()){
        setError('El campo nombre esta vacio')
      }else if(!phone.trim()){
        setError('El campo phone esta vacio')
      }
      const userUpdate = {
        nombre:nombre,
        telefono:phone
      }
      try{
        await store.collection('agenda').doc(idusuario).set(userUpdate)
        const { docs } = await store.collection('agenda').get()
        const nuevoArray = docs.map( item => ({id:item.id, ...item.data()}))
        setUsuariosAgenda(nuevoArray)

      }catch(e){
        console.log(e)
      }
      setNombre('')
      setPhone('')
      setIdUsuario('')
      setModoEdicion(false)
  }



  return (
    <div className="container">
        <div className="row">
          <div className="col">
            <h2 className="mt-5">Formulario de Usuarios</h2>
            <form onSubmit={modoedicion ? setUpdate : setUsuarios} className="form-group">
              <input value={nombre} onChange={(e) =>{setNombre(e.target.value) }} className="form-control" placeholder="Introduce el Nombre" type="text"/>
              <input value={phone} onChange={(e) =>{setPhone(e.target.value) }}  className="form-control mt-3" placeholder="Introduce el Numero" type="text"/>
              {
                modoedicion ?
                (
                  <input className="btn btn-dark btn-block mt-3" type="submit" value="EDITAR"/>
                )
                :
                (
                  <input className="btn btn-dark btn-block mt-3" type="submit" value="REGISTRAR"/>
                )
              }
              
            </form>

            {
              error ? 
              (
                <div>
                  <p>{error}</p>
                </div>
              )
              :
              (
                <span></span>
              )
            }
          </div>
          <div className="col">
              <h2 className="mt-5">Lista de tu Agenda</h2>
              <ul className="list-group">
              {
                usuariosAgenda.length !== 0 ?
                (
                  usuariosAgenda.map(item =>(
                    <li className="list-group-item" key={item.id}>{item.nombre} : {item.telefono}
                    <button onClick={(id)=>{borrarUsuario(item.id)}} className="btn btn-danger float-right">X</button>
                    <button onClick={(id)=>{pulsarActualizar(item.id)}} className="btn btn-info mr-3 float-right">Actualizar</button>
                    </li>
                    
                  ))
                )
                :
                (
                  <span>Lo siento no hay tareas que mostrar</span>
                )
              }
              </ul>
          </div>
        </div>
    </div>
  );
}

export default App;
