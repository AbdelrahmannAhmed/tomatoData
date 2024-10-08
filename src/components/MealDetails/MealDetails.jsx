import axios from "axios"
import React, { useState, useEffect } from "react"
import { useQuery } from "react-query"
import { useParams } from "react-router-dom"
import Loading from "../Loading/Loading"
import { Helmet } from "react-helmet"

export default function MealDetails() {
  const [mealData, setMealData] = useState({})
  let params = useParams()
  //   console.log(params.meal)

  function getMeal() {
    return axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${params.meal}`)
  }

  let { data, isLoading, isError } = useQuery(["getMeal"], getMeal, {
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
    keepPreviousData: true,
  })

  useEffect(() => {
    if (data && data.data && data.data.meals) {
      setMealData(data.data.meals[0])
    }
  }, [params.meal, data])

  if (isLoading) {
    return <Loading></Loading>
  }

  if (isError) {
    return <div>Error loading meal details</div>
  }
  let ingredients = []

  Object.keys(mealData).forEach((key) => {
    // Check if key is for ingredient
    if (key.startsWith("strIngredient") && mealData[key]?.trim() !== "") {
      let measureKey = key.replace("strIngredient", "strMeasure") // Get the corresponding measure key
      let measure = mealData[measureKey]?.trim() || "" // Use optional chaining for safety

      if (measure !== "") {
        ingredients.push(`${measure} of ${mealData[key]}`)
      }
    }
  })

  //   console.log(ingredients)
  //   console.log(mealData)

  return (
    <>
      <Helmet>
        <meta charSet='utf-8' />
        <title>Meal Details</title>
        <link rel='canonical' href='http://mysite.com/example' />
      </Helmet>
      <div className='container mt-5 pt-5'>
        <div className='row align-items-center'>
          <div className='col-md-4 '>
            <img src={mealData.strMealThumb} className='w-100 rounded-start-5 rounded-bottom-5 shadow' alt='' />
            <a href={mealData.strYoutube} style={{ textDecoration: "none", color: "#000" }} className='d-flex justify-content-center align-items-center'>
              <i className='fa-brands fa-youtube fs-1' style={{ color: "#ff0000" }}></i>{" "}
              <span className='mx-2'>
                <strong>Recipe Video</strong>
              </span>
            </a>
          </div>
          <div className='col-md-8'>
            <h3>{mealData.strMeal}</h3>
            <h4>Origin: {mealData.strArea}</h4>
            <h5>How to Prepare ?</h5>
            <p className='bodyFont'>{mealData.strInstructions?.split(/\d+\.\s/).join(" ")}</p>
            <h4>Ingredients</h4>
            {ingredients.map((ingredient, index) => (
              <span key={index} className='badge rounded-pill text-bg-success m-2 fst-normal'>
                {ingredient}
              </span>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
