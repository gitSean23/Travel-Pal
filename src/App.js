import React, {useState} from "react";
import "./index.css";
import Modal from './Components/Modal'

function App() {
  const[arrivalLocation, setArrivalLocation] = useState("");
  const[departLocation, setDepartLocation] = useState("");
  const[departDate, setDepartDate] = useState("");
  const[returnDate, setReturnDate] = useState("");
  const[flightData, setFlightData] = useState([]);
  const[modalOpen, setModalOpen] = useState(false);
  const [myHotel, setHotels] = useState([]);
  const [city, setCity] = useState("new york");
  const [review, setReviews] = useState([]);
  const [img, setImgs] = useState([]);
  const [dest, setDest] = useState(1);

  const axios = require("axios");

  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'a9c1796c42msh426cecf64ef5408p17e1acjsna4264236dd3f',
      'X-RapidAPI-Host': 'priceline-com-provider.p.rapidapi.com'
    }
  };

  function reset(){
    setFlightData([]);
  }
  
  function handleArrivalLocationChange(e) {
    setArrivalLocation (e.target.value);
  }

  function handleDepartureLocationChange(e) {
    setDepartLocation (e.target.value);
  }

  function handleDepartChange(e) {
    setDepartDate (e.target.value);
  }

  function handleReturnChange(e) {
    setReturnDate (e.target.value);
  }

  function getFlightData() {
    fetch(`https://priceline-com-provider.p.rapidapi.com/v1/flights/search?itinerary_type=ROUND_TRIP&class_type=ECO&location_arrival=${arrivalLocation}&date_departure=${departDate}&location_departure=${departLocation}&sort_order=PRICE&number_of_passengers=1&date_departure_return=${returnDate}`, options)
	  .then(response => response.json())
	  .then(response => {setFlightData(response.totalTripSummary.airline) 
      console.log(flightData)}
    )
	  .catch(err => console.error(err));
  }

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
          let hotel = {
            name: response.data.suggestions[1].entities[i].name,
            landmark: response.data.suggestions[2].entities[i].name,
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

  return(
    <>
    {modalOpen && <Modal closeModal={setModalOpen} flightList={flightData} hotelList={myHotel} />}
    <div className = "inputArea">
      <div className ="departureLocation">
        <input type = "text" className="text-black placeholder:text-black py-2 px-3 rounded-full border-solid border-gray-500 " placeholder="Enter departure location..." onChange={handleDepartureLocationChange}/>
      </div>
      <div className = "arrivalLocation">
        <input type = "text" placeholder="Enter arrival location..." onChange={handleArrivalLocationChange}/>
      </div>
      <div className = "departDate">
        <input type = "text" placeholder="Enter Departure Date..." onChange={handleDepartChange}/>
      </div>
      <div className = "returnDate">
        <input type = "text" placeholder="Enter Return Date..." onChange={handleReturnChange}/>
      </div>
      <div className = "searchButton">
        <button className= "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" onClick = {() => {reset(); resetState(); getFlightData(); setModalOpen(true); getHotels();}}>Search Flights</button>
      </div>
    </div>
    </>
  )
}

export default App;
