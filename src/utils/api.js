import  axios from 'axios'

const BASE_URL = import.meta.env.VITE_BASE_URL;
const TMDB_TOKEN = import.meta.env.VITE_TMBD_TOKEN;

const headers = {

    Authorization :"Bearer "+TMDB_TOKEN
};

export const fetchDataFromAPI = async(url , params)=>{

    try {
           const {data} = await axios.get(BASE_URL + url, {
            headers,
            params
           })

           return data ; 


        
    } catch (error) {
        console.log(error);
        return error;
    }
}