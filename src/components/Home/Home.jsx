import axios from "axios"
import { useFormik } from "formik"
import React, { useState } from "react"
import { Helmet } from "react-helmet"
import { Link } from "react-router-dom"

export default function Home() {
  const [data, setData] = useState({ meals: [] })
  const [name] = useState("Meals")
  const [description] = useState("Explore a variety of delicious meals")

  async function getMeals(meal) {
    try {
      let result = await axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${meal}`)
      if (result.data.meals) {
        setData(result.data)
      } else {
        setData({ meals: [] })
      }
    } catch (error) {
      console.error("Error fetching the data:", error)
    }
  }

  let register = useFormik({
    initialValues: {
      meal: "",
    },
    onSubmit: (values) => {
      getMeals(values.meal)
    },
  })

  function handleInputChange(e) {
    const value = e.target.value
    register.handleChange(e)
    getMeals(value)
  }

  return (
    <>
      <Helmet>
        <meta charSet='utf-8' />
        <title>Home</title>
        <link rel='canonical' href='http://mysite.com/example' />
      </Helmet>
      <div className='d-flex align-items-center justify-content-start backImg'>
        <div className='ms-4'>
          <h1 className='fs-2 text-dark'>Savor the Flavor.</h1>
          <p style={{ width: "400px", color: "dark" }}>Discover elegant recipes with detailed ingredients and step-by-step cooking instructions.</p>
          <a href='mailto:abdelrhmanahmed23i8@gmail.com' className='btn btn-secondary'>
            Contact Us
          </a>
        </div>
      </div>

      <div className='container my-5'>
        <h2>Search for your favorite Meal</h2>
        <form onSubmit={register.handleSubmit}>
          <label htmlFor='meal'>Meal name</label>
          <input onChange={handleInputChange} onBlur={register.handleBlur} placeholder='Enter your meal . . .' className='form-control my-3' type='text' name='meal' id='meal' />
        </form>

        <div className='container pt-5 mt-5'>
          <div className='row'>
            <h2 className='fs-1'>{name}</h2>
            <p>{description}</p>

            {data.meals.length > 0 ? (
              data.meals.map((meal) => (
                <div className='col-md-3 g-3' key={meal.idMeal}>
                  <Link to={"/mealdetails/" + meal.strMeal} style={{ textDecoration: "none", color: "black " }}>
                    <img src={meal.strMealThumb} className='w-100 rounded-start-5 rounded-bottom-5 shadow' alt={meal.strMeal} />
                    <h2 className='text-center fs-4'>{meal.strMeal.split(" ").slice(0, 3).join(" ")}</h2>
                  </Link>
                </div>
              ))
            ) : (
              <p className='text-center'>No meals found. Please try a different search term.</p>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
