import React, { useState, useEffect } from "react";
import Loader from "../../components/Loader/Loader";

function Detalle() {
 const [data, setData] = useState({})

 useEffect(() => {
const tipo = this.props.match.params.tipo;
    const id = this.props.match.params.id;

    fetch(`https://api.themoviedb.org/3/${tipo}/${id}?api_key=41abfd625c63035603389ca24c10eed0`)
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.log(error));

 }, [])
  }

    return (
      <section className="container">

        {data.id === undefined ? (<Loader />) 
        : (<div>
            <h2>{data.title ? data.title : data.name}</h2>
            <img className="detalle-img" src={"https://image.tmdb.org/t/p/w500" + data.poster_path} alt={data.title ? data.title : data.name}/>

            <p>Rating:{data.vote_average}</p>

            <p>Fecha de estreno: {" "} {data.release_date ? data.release_date : data.first_air_date}</p>

            <p>Sinopsis: {data.overview}</p>

          </div>
        )}

      </section>
    );

export default Detalle;