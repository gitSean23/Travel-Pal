import React, { Component } from "react";
//`{${hotel.id}`}

const Slider = ({ hotels }) => {
  return (
    <div className="carousel w-[750px] mx-auto">
      {hotels.map((hotel, index) => (
          <div id={`slide${index + 1}`} key={hotel.id} className="carousel-item relative w-full">
              <div className="absolute left-0 right-0 mx-auto bottom-10">{hotel.name}</div>
            <img src="https://exp.cdn-hotels.com/hotels/1000000/20000/15900/15838/cecb5f75.jpg" className="w-full" />
            <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
              <a href={`#slide${index == 0 ? hotels.length : index}`} className="btn btn-circle">
                ❮
              </a>
              <a href={`#slide${index + 1 == hotels.length ? 1 : index + 2}`} className="btn btn-circle">
                ❯
              </a>
            </div>
          </div>
      ))}
    </div>
  );
};

export default Slider;
