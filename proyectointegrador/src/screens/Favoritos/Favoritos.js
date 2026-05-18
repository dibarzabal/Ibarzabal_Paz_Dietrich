import React, { useState, useEffect } from "react";
import Card from "../../components/Card/Card";
import Cookies from "universal-cookie";

const cookies = new Cookies();

function Favoritos(props) {
  constructor(props) {
    super(props);
    this.state = {
      peliculasFavoritas: [],
      seriesFavoritas: [],
    };
  }

  componentDidMount() {
    let user = cookies.get("session");
    
    if (user == null) {
        this.props.history.push("/login");
    }

    let storageMovies = localStorage.getItem("favoritosMovies");
    let storageSeries = localStorage.getItem("favoritosSeries");

    let moviesParseado = storageMovies ? JSON.parse(storageMovies) : [];
    let seriesParseado = storageSeries ? JSON.parse(storageSeries) : [];
    
    for (let i = 0; i < moviesParseado.length; i++) {
      fetch(`https://api.themoviedb.org/3/movie/${moviesParseado[i]}?api_key=41abfd625c63035603389ca24c10eed0`)
        .then(response => response.json())
        .then(data => {
            let lista = this.state.peliculasFavoritas;
            lista.push(data);

            this.setState({
                peliculasFavoritas: lista
            });
        })
        .catch(error => console.log(error));
    }

    for (let i = 0; i < seriesParseado.length; i++) {
      fetch(`https://api.themoviedb.org/3/tv/${seriesParseado[i]}?api_key=41abfd625c63035603389ca24c10eed0`)
        .then(response => response.json())
        .then(data => {
          let lista = this.state.seriesFavoritas;
          lista.push(data);

          this.setState({
            seriesFavoritas: lista
          });

        })
        .catch(error => console.log(error));
    }
  }

  eliminarFavorito(id, tipo) {
    if (tipo === "movie") {
      let storage = JSON.parse(localStorage.getItem("favoritosMovies"))
      if (storage == null){
        storage = []
      }

      let nuevo = [];
      for (let i = 0; i < storage.length; i++) {
        if (storage[i] !== id) {
          nuevo.push(storage[i]);
        }
      }

      localStorage.setItem("favoritosMovies", JSON.stringify(nuevo));
      let nuevasPeliculas = [];
      for (let i = 0; i < this.state.peliculasFavoritas.length; i++) {
        if (this.state.peliculasFavoritas[i].id !== id) {
          nuevasPeliculas.push(this.state.peliculasFavoritas[i]);
        }}

      this.setState({
        peliculasFavoritas: nuevasPeliculas
      });
    } else {
      let data = JSON.parse(localStorage.getItem("favoritosSeries"));
      let storage = data ? data : [];
      let nuevo = [];
      for (let i = 0; i < storage.length; i++) {
        if (storage[i] !== id) {
          nuevo.push(storage[i]);
        }
      }

      localStorage.setItem("favoritosSeries", JSON.stringify(nuevo));

      let nuevasSeries = [];
      for (let i = 0; i < this.state.seriesFavoritas.length; i++) {
        if (this.state.seriesFavoritas[i].id !== id) {
          nuevasSeries.push(this.state.seriesFavoritas[i]);
        }
      }

      this.setState({
        seriesFavoritas: nuevasSeries
      });
    }
  }

  render() {
    return (
      <section className="cardContainer">

        <h2>Películas favoritas</h2>
        <section className="cards">
        {this.state.peliculasFavoritas.length === 0 ? ( <h3>No hay películas favoritas</h3>) 
        : (this.state.peliculasFavoritas.map(elemento => (
              <Card key={elemento.id} data={elemento} eliminarFavorito={() => this.eliminarFavorito(elemento.id, "movie")}/>
          ))
        )}
        </section>

        <h2>Series favoritas</h2>
        <section className="cards">
        {this.state.seriesFavoritas.length === 0 ? (<h3>No hay series favoritas</h3>) 
        : (this.state.seriesFavoritas.map(elemento => (
              <Card key={elemento.id} data={elemento} eliminarFavorito={() => this.eliminarFavorito(elemento.id, "tv")}/>
          ))
        )}
        </section>

      </section>
    );
  }
}

export default Favoritos;