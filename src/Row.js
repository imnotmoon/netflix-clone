import React, { useState, useEffect } from 'react'
import YouTube from 'react-youtube'
import axios from './axios'
import './Row.css'
import movieTrailer from 'movie-trailer'

const base_url = "https://image.tmdb.org/t/p/original/"

function Row({ title, fetchUrl, isLargeRow }) {

    const [movies, setMovies] = useState([])
    const [trailerUrl, setTrailerUrl] = useState("")

    // A snippet of code with runs based on a specific condition/variable
    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(fetchUrl);
            setMovies(request.data.results);
            return request;
        }
        fetchData();
        // if [], run once when the row loads, and dont run again
    }, [fetchUrl])      // data dependent on this url


    const opts = {
        height: "390",
        width: "100%",
        playerVars: {
            autoplay: 1,
        }
    }

    const handleClick = (movie) => {
        console.log(movie)
        if (trailerUrl) {
            setTrailerUrl('');
        } else {
            movieTrailer(movie?.name || movie?.original_name || movie?.title || "")
            .then(url => {
                console.log(url)
                // convert full url to piece of last one
                const urlParams = new URLSearchParams(new URL(url).search);
                console.log(urlParams)
                // get 메소드의 파라미터 생성
                setTrailerUrl(urlParams.get("v"))
                // urlParams:obj => get value with key 'v'
            }).catch(error => console.log(error));
        }
    }

    return (
        <div className="row">
            {/* title */}
            <h2>{title}</h2>
            <div className="row__posters">
                {/* sevral row__poster(s) */}
                {movies.map(movie => (
                    <img 
                        key={movie.id}
                        className={`row__poster ${isLargeRow && "row__posterLarge"}`}
                        src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`} 
                        alt={movie.name}
                        onClick={() => handleClick(movie)}
                    />
                ))}

            </div>
            {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} /> }
        </div>
    )
}

export default Row

