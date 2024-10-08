import axios from "axios"
import React from "react"
import { useQuery } from "react-query"
import { Link } from "react-router-dom"
import Flags from "react-world-flags"
import Loading from "../Loading/Loading"
import { Helmet } from "react-helmet"

const countryCodeMap = {
  American: "US",
  British: "GB",
  Canadian: "CA",
  Chinese: "CN",
  Croatian: "HR",
  Dutch: "NL",
  Egyptian: "EG",
  Filipino: "PH",
  French: "FR",
  Greek: "GR",
  Indian: "IN",
  Irish: "IE",
  Italian: "IT",
  Jamaican: "JM",
  Japanese: "JP",
  Kenyan: "KE",
  Malaysian: "MY",
  Mexican: "MX",
  Moroccan: "MA",
  Polish: "PL",
  Portuguese: "PT",
  Russian: "RU",
  Spanish: "ES",
  Thai: "TH",
  Tunisian: "TN",
  Turkish: "TR",
  Ukrainian: "UA",
  Unknown: "",
  Vietnamese: "VN",
}

const countryNameMap = {
  American: "United States",
  British: "United Kingdom",
  Canadian: "Canada",
  Chinese: "China",
  Croatian: "Croatia",
  Dutch: "Netherlands",
  Egyptian: "Egypt",
  Filipino: "Philippines",
  French: "France",
  Greek: "Greece",
  Indian: "India",
  Irish: "Ireland",
  Italian: "Italy",
  Jamaican: "Jamaica",
  Japanese: "Japan",
  Kenyan: "Kenya",
  Malaysian: "Malaysia",
  Mexican: "Mexico",
  Moroccan: "Morocco",
  Polish: "Poland",
  Portuguese: "Portugal",
  Russian: "Russia",
  Spanish: "Spain",
  Thai: "Thailand",
  Tunisian: "Tunisia",
  Turkish: "Turkey",
  Ukrainian: "Ukraine",
  Unknown: "Unknown",
  Vietnamese: "Vietnam",
}

export default function Countries() {
  function getCountries() {
    return axios.get(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
  }

  const { data, isLoading, isError } = useQuery("countries", getCountries)

  if (isLoading) {
    return <Loading></Loading>
  }

  if (isError) {
    return <div className='text-center text-danger'>Error loading countries</div>
  }
  // console.log(data.data.meals)

  return (
    <div className='container mt-5 pt-2'>
      <Helmet>
        <meta charSet='utf-8' />
        <title>Countries</title>
        <link rel='canonical' href='http://mysite.com/example' />
      </Helmet>
      <h1 className='text-center my-3'>List of Countries</h1>
      <div className='row'>
        {data.data.meals.map((country) => {
          const countryCode = countryCodeMap[country.strArea] || ""
          const countryName = countryNameMap[country.strArea] || country.strArea
          return (
            <div className='col-md-4 mb-4' key={country.strArea}>
              <div className='card shadow-sm border-secondary' style={{ borderRadius: "15px" }}>
                <div className='card-body text-center'>
                  {countryCode && <Flags code={countryCode} size={60} alt={`Flag of ${country.strArea}`} style={{ width: "80px", height: "60px" }} />}
                  <h5 className='card-title'>{countryName}</h5>
                  <p className='card-text text-muted'>Explore dishes from {countryName}.</p>
                  <Link
                    to={"/Country/" + country.strArea}
                    className='alert alert-secondary rounded-pill'
                    style={{ textDecoration: "none", display: "flex", alignItems: "center", justifyContent: "center" }} // Adjust height and remove underline
                  >
                    Explore Dishes
                  </Link>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
