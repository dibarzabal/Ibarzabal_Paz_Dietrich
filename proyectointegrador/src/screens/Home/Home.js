import React, { useState, useEffect } from "react";
import Card from "../../components/Card/Card";
import Loader from "../../components/Loader/Loader";
import Formulario from "../../components/Formulario/Formulario";

function Home() {
  const [peliculas, setPeliculas] = useState([]);
  const [series, setSeries] = useState([])

useEffect(() =>  {

fetch("https://api.themoviedb.org/3/movie/popular?api_key=41abfd625c63035603389ca24c10eed0")
      .then(response => response.json())
            .then(data => setPeliculas(data.results))
            .catch(error => console.log("El error fue" + error))

 fetch("https://api.themoviedb.org/3/tv/popular?api_key=41abfd625c63035603389ca24c10eed0")
      .then(response => response.json())
            .then(data => setSeries(data.results))
            .catch(error => console.log("El error fue" + error))
}, [])
  }

    return (
    
      <>
      
        <Formulario/>
        <section className="container">
            <h2 className="alert alert-primary">Movies now playing</h2>
            <section className="row cards" id="now-playing">
                {peliculas.length === 0 ? <Loader/> :
                peliculas.slice(0, 6).map((elemento, idx) => <Card key={elemento +idx} data={elemento}/> )}        
            </section>
            <a href="/peliculas">Ver todas</a>
            <h2 className="alert alert-warning">Popular TV shows this week</h2>
            <section className="row cards tv-show">
                {series.length === 0 ? <Loader/> :
                series.slice(0, 6).map((elemento, idx) => <Card key={elemento +idx} data={elemento}/> )}
            </section>
            <a href="/series">Ver todas</a>
        </section>
        </>
    );

export default Home;