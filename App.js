import { useState } from 'react';
import React from 'react';
import './index.css';

const axios = require("axios");

function App() {
    const [city, setCity] = useState('new york');
    const [myHotel, setHotels] = useState([]);
    const [review, setReviews] = useState([]);
    const [img, setImgs] = useState([]);
    const [dest, setDest] = useState(1);

    let hotels = [];

    let resetState = () => {
        setHotels([]);
    }

    let getHotels = () => {
        let options = {
            method: 'GET',
            url: 'https://hotels4.p.rapidapi.com/locations/v2/search',
            params: {query: `${city}`, locale: 'en_US', currency: 'USD'},
            headers: {
              'X-RapidAPI-Key': 'eeb120823fmshb7f8a975f411331p1cdfe3jsn1b1a37046f92',
              'X-RapidAPI-Host': 'hotels4.p.rapidapi.com'
            }
        }

        console.log("city: " + city);
        axios.request(options).then(function (response) {
            console.log(response.data);
            for (let i = 0; i < response.data.suggestions[1].entities.length; i++)
            {   
                hotels.push(response.data.suggestions[1].entities[i].name.toString());
                setHotels((hotelx) => [...hotelx, hotels[i]]);
                console.log(`Hotel #${i}:`, hotels[i]);
            }
            
        })
        .catch(function (error) {
            console.error(error);
            return <span>Could not find your specified location..</span>
        });

    };

    let getHotelImgs = (destId, ac) => {
        console.log(destId);
      let options = {
        method: 'GET',
        url: "https://hotels4.p.rapidapi.com/properties/list",
        params: {
            destinationId: `${destId}`,
            pageNumber: '1',
            pageSize: '25',
            checkIn: '2022-10-08',
            checkOut: '2022-10-11',
            adults: `${ac}`,
            sortOrder: 'PRICE',
            locale: 'en_US',
            currency: 'USD'
        },
        headers: {
            'X-RapidAPI-Key': '1622177290mshd1a3aea86078fefp18acb1jsnc6caa08d41fa',
            'X-RapidAPI-Host': 'hotels4.p.rapidapi.com'
          }
      }
            axios.request(options).then((response) => {
                setDest(response.data.suggestions[0].entities[0].destinationId);
                console.log(response.data.suggestions[0].entities[0].destinationId);
            })
            .catch((error) => {
                console.error(error);
            })
    }
   
        console.log("Your city:" + {city});

        return (
            <div className="relative text-center mt-1 rounded-md shadow-sm outline-none">
                <form className="inline-block bg-white shadow-md rounded pt-1 pb-3 mb-4 outline-none" onSubmit={(e) => {e.preventDefault(); resetState(); getHotels(); getHotelImgs(1506246, 1);}}>
                    <input type="text" className="w-60 h-3 py-3 px-10 text-gray-700 focus:outline-none focus:shadow-outline" placeholder="Type in a city.." onChange={(e) => {setCity(e.target.value);}}></input>
                </form>
                <div className="carousel slide carousel-fade relative" data-bs-ride="carousel">
                  <div className="carousel-indicators"></div> 
                  <ul className=" text-blue-50 font-bold text-center">{myHotel.map((hotel, index) => <li key={index}><p>{hotel}</p></li>)}</ul>
                  </div>
            </div>
        )
}

export default App;
