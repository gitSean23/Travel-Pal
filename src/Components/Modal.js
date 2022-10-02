import React from 'react'

function Modal({ closeModal, flightList, hotelList }) {
  return (
    //Model content and background
    <div className= "fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
        {/*Modal box*/}
        <div className="relative bg-white p-5 h-3/6 w-2/6 rounded-lg border-solid border-slate-700">
            {/*X button*/}
            <div className="absolute right-3 top-1 font-bolder font-sans text-2xl text-yellow-400">
                <button onClick={() => {closeModal(false);}}> X </button>
            </div>
            {/*Title*/}
            <div className="font-bold text-4xl mt-3 mb-8 flex space-x-28 text-yellow-500">
                <h3>Flights</h3>
                <h3>Hotels</h3>
                <h3>Activities</h3>
            </div>
            <div className="flex space-x-28 flex-between">
                <div className='flex flex-col space-y-7 space-x-1 justify-between absolute left-5 font-semibold'>
                    {flightList.map((flight, index) =>
                    <h1 key = {index}> {flight.code} Price: ${flight.lowestTotalFare.amount} </h1>
                    )}
                </div>
                <div className='flex flex-col space-y-12 justify-between absolute right-1/3 font-semibold'>
                    <h1>{hotelList.map((hotel, index) => <h1 key={index}>{hotel.name}</h1>)}</h1>
                </div>
                <div className='flex flex-col space-y-6 justify-between absolute right-4 font-semibold'>
                    <h1>{hotelList.map((hotel, index) => <h1 key={index}>{hotel.landmark}</h1>)}</h1>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Modal;
