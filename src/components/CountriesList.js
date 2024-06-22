import React, { useState, useEffect,useRef } from "react";
import axios from "axios";


const CountriesList = () => {

const[countries, setCountries] = useState([]);
const searchInput = useRef("");

const getCountries = async() => {

    
    try {
      const result = await axios.get("https://restcountries.com/v3.1/all");

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

    alert ("Please write something!!")
    return;
   }
    
  try {
    const result = await axios.get(`https://restcountries.com/v3.1/name/${search}`);

    if(result.status === 200) {

      setCountries(result.data)
    };


  } catch (error) {
      console.error(error);
  }

}

useEffect(() => {

  getCountries();
}, [])



  return (
    <>
    <div className="row my-5">
      <div className="col-md-8">
          <h1>List of Countries</h1>
      </div>
        <div className="col-md-4">
        <form onSubmit={searchCountries}   className="d-flex">
        <input ref={searchInput} className="form-control me-sm-2" type="search" placeholder="Search"/>
        <button className="btn btn-secondary my-2 my-sm-0" type="submit">Search</button>
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
