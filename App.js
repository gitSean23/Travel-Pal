import { useState } from "react";
import React from "react";
import "./index.css";
import Slider from "./components/slider";

const axios = require("axios");

function App() {
  const [city, setCity] = useState("new york");
  const [myHotel, setHotels] = useState([]);
  const [review, setReviews] = useState([]);
  const [img, setImgs] = useState([]);
  const [dest, setDest] = useState(1);

  let hotels = [];

  let resetState = () => {
    setHotels([]);
  };

  let getHotels = async () => {

    let options = {
      method: "GET",
      url: "https://hotels4.p.rapidapi.com/locations/v2/search",
      params: { query: `${city}`, locale: "en_US", currency: "USD" },
      headers: {
        "X-RapidAPI-Key": "a9c1796c42msh426cecf64ef5408p17e1acjsna4264236dd3f",
        "X-RapidAPI-Host": "hotels4.p.rapidapi.com",
      },
    };

    console.log("city: " + city);
    axios
      .request(options)
      .then(async function (response) {
        console.log(response.data);
        for (let i = 0; i < response.data.suggestions[1].entities.length; i++) {
          let id = response.data.suggestions[1].entities[i].destinationId;
          let img = await getHotelImgs(id);
          let hotel = {
            name: response.data.suggestions[1].entities[i].name,
            id,
            img
          };
          hotels.push(hotel);
          setHotels((hotelx) => [...hotelx, hotels[i]]);
          console.log(`Hotel #${i}:`, hotels[i]);
        }
      })
      .catch(function (error) {
        console.error(error);
        return <span>Could not find your specified location..</span>;
      });
  };

  let getHotelImgs = async (destId) => {
    console.log(destId);
    let options = {
      method: "GET",
      url: "https://hotels4.p.rapidapi.com/properties/get-hotel-photos",
      params: {
        id: destId,
      },
      headers: {
        "X-RapidAPI-Key": "c8ac990382mshf9432d0cadc88c9p168502jsneb9c5d95745e",
        "X-RapidAPI-Host": "hotels4.p.rapidapi.com",
      },
    };
    let res = await axios.request(options)
    let url = res.data.hotelImages[0].baseUrl;
    return url.replace('_{size}', '');
  };

  console.log("Your city:" + { city });

  return (
    <div className="relative text-center mt-1 rounded-md shadow-sm outline-none">
      <form
        className="inline-block bg-white shadow-md rounded pt-1 pb-3 mb-4 outline-none"
        onSubmit={(e) => {
          e.preventDefault();
          resetState();
          getHotels();
          getHotelImgs(1506246, 1);
        }}
      >
        <input
          type="text"
          className="w-60 h-3 py-3 px-10 text-gray-700 focus:outline-none focus:shadow-outline"
          placeholder="Type in a city.."
          onChange={(e) => {
            setCity(e.target.value);
          }}
        ></input>
      </form>
      <Slider hotels={myHotel} />
      {/* <div className="carousel slide carousel-fade relative" data-bs-ride="carousel">
                  <div className="carousel-indicators"></div> 
                  <ul className=" text-blue-50 font-bold text-center">{myHotel.map((hotel, index) => <li key={index}><p>{hotel}</p></li>)}</ul>
                  </div> */}
    </div>
  );
}

export default App;
