import React, { useState } from "react";
import Cookies from "universal-cookie";
import { Link } from "react-router-dom";


const cookies = new Cookies()

function CrearCuenta(props) {
 
    const[email, setEmail] = useState("")
    const[password, setPassword] = useState("")
    const [error, setError] = useState("")

    function evitarSubmit(event){
      
        event.preventDefault()
        let usuarios 
        if (JSON.parse(localStorage.getItem('usuarios')) != null){
            usuarios = JSON.parse(localStorage.getItem('usuarios'))
        } else{
            usuarios = []
        }

        let emailEnUso = false;

        for (let i = 0; i < usuarios.length; i++) {
          if (usuarios[i].email === email) {
             emailEnUso = true;
           }
        }

        if (emailEnUso) {
            setError("El mail ya esta en uso");
        } else if (password.length < 6) {
            setError("La contraseña debe tener al menos 6 caracteres");
        } else {
            let nuevoUsuario = {
            email: email,
            password: password
            }
            usuarios.push(nuevoUsuario)

            localStorage.setItem('usuarios', JSON.stringify(usuarios))
            cookies.set(nuevoUsuario)

            this.props.history.push("/login")

        } 
        }

  function controlarCambios(event){
        if (event.target.name === "email") {
           setEmail(event.target.value)
        } else if (event.target.name === "password") {
            setPassword(event.target.value)
        }
    }
      
    } 

    return (
      <>
      <div className="row justify-content-center">
            <div className="col-md-6">
                <form onSubmit={(event) => evitarSubmit(event)}>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input name="email" onChange= {(event) => controlarCambios(event)} value={email} type="email" className="form-control" id="email" placeholder="Ingresá tu email"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Contraseña</label>
                        <input name="password" onChange= {(event) => controlarCambios(event)} value={password} type="password" className="form-control" id="password" placeholder="Ingresá tu contraseña"/>
                        <p>{error}</p>
                    </div>
                    <button type="submit" className="btn btn-primary btn-block">Registrarse</button>
                </form>
                <p className="mt-3 text-center">¿Ya tenés cuenta? <Link to="/login">Iniciar sesión</Link></p>
            </div>
        </div>
      </>
    )

export default CrearCuenta