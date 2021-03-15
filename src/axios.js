import requests from './requests'
import axios from 'axios'

// base url to make requests to the movie database
const instance = axios.create({
    baesURL: "https://api.themoviedb.org/3",
})

// instance.get('/allmovies') 이런식으로 리퀘스트를 보내는게 가능해짐.

export default instance;