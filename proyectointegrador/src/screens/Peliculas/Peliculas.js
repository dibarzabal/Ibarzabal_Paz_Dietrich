import React, { useState, useEffect } from "react";
import Card from "../../components/Card/Card";
import Loader from "../../components/Loader/Loader";

function Peliculas() {
   const [peliculas, setPeliculas] = useState([]);
  const [page, setPage] = useState(1);
  const [texto, setTexto] = useState("");

  useEffect(()=> {
cargarPeliculas();
  }, []);

function controlarCambios(event) {
    ssetTexto(event.target.value);
}

function filtrarPeliculas() {
    return peliculas.filter(
      (unaPeli) =>
        unaPeli.title.toLowerCase().includes(texto.toLowerCase())
    );
  }

  function cargarPeliculas() {
    fetch(`https://api.themoviedb.org/3/movie/popular?api_key=41abfd625c63035603389ca24c10eed0&page=${page}`)
      .then(response => response.json())
      .then(data => {
        let nuevas = [];

        for (let i = 0; i < peliculas.length; i++) {
          nuevas.push(peliculas[i]);
        }

        for (let i = 0; i < data.results.length; i++) {
          nuevas.push(data.results[i]);
        }

        setPeliculas(nuevas);
      })
      .catch(error => console.log("El error fue " + error));
  }

  function cargarMas() {
    let paginaNueva = page + 1;

    setPage(paginaNueva);

    fetch(`https://api.themoviedb.org/3/movie/popular?api_key=41abfd625c63035603389ca24c10eed0&page=${paginaNueva}`)
      .then(response => response.json())
      .then(data => {
        let nuevas = [];

        for (let i = 0; i < peliculas.length; i++) {
          nuevas.push(peliculas[i]);
        }

        for (let i = 0; i < data.results.length; i++) {
          nuevas.push(data.results[i]);
        }

        setPeliculas(nuevas);
      })
      .catch(error => console.log("El error fue " + error));
  }

  let peliculasFiltradas = filtrarPeliculas();


    return (
      <section className="container">
        <form className="search-form">
        <input type="text" placeholder="Buscar..." value={texto} onChange={(event) => controlarCambios(event)}/>
      </form>
        <h2 className="alert alert-primary">Todas las películas</h2>

        <section className="row cards">
           {peliculas.length === 0 ? (<Loader />) : 
           (peliculasFiltradas.map((elemento, idx) => (<Card key={elemento +idx} data={elemento}/>)))}
        </section>
        <button onClick={() => this.cargarMas()} className="btn btn-primary"> Cargar más </button>
      </section>
    );
  }


export default Peliculas;
