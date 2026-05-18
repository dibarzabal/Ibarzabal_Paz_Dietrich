import React, { useState, useEffect } from "react";
import Card from "../../components/Card/Card";
import Loader from "../../components/Loader/Loader";

function Series() {
  
const [series, setSeries] = useState([]);
  const [page, setPage] = useState(1);
  const [texto, setTexto] = useState("");

  useEffect(() => {

 cargarSeries();
  }, []);


  function controlarCambios(event) {
    setTexto(event.target.value);
  }
  }

  function filtrarSeries() {
   return series.filter((unaSerie) =>
      unaSerie.name.toLowerCase().includes(texto.toLowerCase())
    );
}

  function cargarSeries() {
    fetch(`https://api.themoviedb.org/3/tv/popular?api_key=41abfd625c63035603389ca24c10eed0&page=${page}`)
      .then(response => response.json())
      .then(data => {
        let nuevas = [];

        for (let i = 0; i < series.length; i++) {
          nuevas.push(series[i]);
        }

        for (let i = 0; i < data.results.length; i++) {
          nuevas.push(data.results[i]);
        }

        setSeries(nuevas);
      })
      .catch(error => console.log("El error fue " + error));
  }

  function cargarMas() {
     let paginaNueva = page + 1;

    setPage(paginaNueva);

    fetch(`https://api.themoviedb.org/3/tv/popular?api_key=41abfd625c63035603389ca24c10eed0&page=${paginaNueva}`)
      .then(response => response.json())
      .then(data => {
        let nuevas = [];

        for (let i = 0; i < series.length; i++) {
          nuevas.push(series[i]);
        }

        for (let i = 0; i < data.results.length; i++) {
          nuevas.push(data.results[i]);
        }

        setSeries(nuevas);
      })
      .catch(error => console.log("El error fue " + error));
  }

  let seriesFiltradas = filtrarSeries();
   
    return (
      <section className="container">
        <form className="search-form">
        <input type="text" placeholder="Buscar..." value={texto} onChange={(event) => controlarCambios(event)}/>
      </form>
        <h2 className="alert alert-warning">Todas las series</h2>

        <section className="row cards">
          {series.length === 0 ? (<Loader />) : (
            seriesFiltradas.map((elemento, idx) => (<Card key={idx + elemento} data={elemento} />
            ))
          )}
        </section>
        <button onClick={() => this.cargarMas()} className="btn btn-primary"> Cargar más </button>
      </section>
    );


export default Series;
