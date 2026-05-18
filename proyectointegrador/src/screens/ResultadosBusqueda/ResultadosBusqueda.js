import React, { useState, useEffect } from "react";
import Card from '../../components/Card/Card';
import Loader from '../../components/Loader/Loader';

function ResultadosBusqueda (props){
   const [resultados, setResultados] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    let textoBuscado = this.props.match.params.busqueda;
        let tipo = this.props.match.params.tipo;

        fetch(`https://api.themoviedb.org/3/search/${tipo}?api_key=41abfd625c63035603389ca24c10eed0&query=${textoBuscado}`)
            .then(response => response.json())
            .then(data => {
    if (data.results) {
         setResultados(data.results);
          setCargando(false);
        } else {
          setResultados([]);
          setCargando(false);
        }
    })
           .catch(error => {
        console.log("El error fue: " + error);
        setResultados([]);
        setCargando(false);
      });
  }, []);


        return(
            <section>
                <h2>Resultados de {props.match.params.tipo} para: {props.match.params.busqueda}</h2>
                <section className="cards">
                {cargando ? (
                    <h3><Loader/></h3>
                ) : resultados.length === 0 ? (
                    <h3>No se encontraron resultados</h3>
                ) : (
                resultados.map((elemento, idx) => (
                        <Card key={elemento.id} data={elemento}/>
                    ))
                )}
                </section>
            </section>
        );
    }


export default ResultadosBusqueda;