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

  return(
    <>
    <button className="openModelBtn" onClick={() => {setModalOpen(true);}}>Open</button>
    {modalOpen && <Modal closeModal={setModalOpen}/>}
    <div className = "inputArea">
      <div className = "departureLocation">
        <input type = "text" placeholder="Enter departure location..." onChange={handleDepartureLocationChange}/>
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
        <button onClick = {() => {reset(); getFlightData();}}>Search Flights</button>
      </div>
      {flightData.map((flight, index) =>
      <p key = {index}>{flight.code} {flight.lowestTotalFare.amount}</p>
      )}
    </div>
    </>
  )
}

function TailwindCSSButton() {
  return(
    <button className="bg-blue-500">Testing Button</button>
  )
}

export default App;
