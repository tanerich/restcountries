import React, { useState, useEffect, useRef } from "react";
import axios from "axios";


const CountriesList = () => {

const[countries, setCountries] = useState([]);
const [segment, setSegment] = useState("all")
const searchInput = useRef("");

const getCountries = async() => {

    
    try {
      const result = await axios.get(`https://restcountries.com/v3.1/${segment}`);

      if(result.status === 200) {

        setCountries(result.data)
      };


    } catch (error) {
        console.error(error);
    }

}

const searchCountries = async(e) => {
  
  e.preventDefault();
  
  let search = searchInput.current.value;
  
  if(search === "") {
    
    alert("Please write something!!")
    return;
  }
  
 setSegment(`name/${search}`)
  
}

const reset = () => {

  searchInput.current.value= ""
  setSegment("all")

}

useEffect(() => {

  getCountries();
}, [segment]);



  return (
    <>
    <div className="row my-5 ">
      <div className="col-md-8">
          <h1>List of Countries</h1>
      </div>
        <div className="col-md-4 ">

        <form onSubmit={searchCountries}   className="d-flex">
        <select>
          <option value="">Select a country</option>
          <option value="americas">Americas</option>
          <option value="africa">Africa</option>
          <option value="asia">Asia</option>
          <option value="oceania">Oceania</option>
        </select>
        <input ref={searchInput} className="form-control me-sm-2" type="search" placeholder="Search"/>
        <button className="btn btn-secondary my-2 my-sm-0" type="submit">Search</button>
        {segment !== "all" ?  (
       <button onClick={reset} className="btn btn-secondary my-2 my-sm-0" type="delete">Reset</button>
        ): ""}
      </form>
        </div>
    </div>

    <div className="row">

      {countries.map(((country,index) => (

     <div key= {index} className="col-md-4">
      <div className="card">
        <img className="card-img-top" src={country.flags.png} alt={country.name} />
        <div className="card-body">
          <h4 className="card-title">{country.name.official}</h4>
          <p className="card-text">Region  : {country.region}</p>
          <p className="card-text">Capital : {country.capital}</p>
        </div>
      </div>
      
     </div>

      )))}
    </div>

    </>
  );
};

export default CountriesList;
