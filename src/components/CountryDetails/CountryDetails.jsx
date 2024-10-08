import axios from "axios"
import React, { useEffect } from "react"
import { useQuery } from "react-query"
import { Link, useParams } from "react-router-dom"
import Loading from "../Loading/Loading"
import { Helmet } from "react-helmet"

export default function CountryDetails() {
  let params = useParams()
  console.log(params.area)

  function getCountryMeals() {
    return axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${params.area}`)
  }

  let { data, isLoading, isError, refetch } = useQuery(["getCountryMeals", params.area], getCountryMeals, {
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
    keepPreviousData: true,
  })

  useEffect(() => {
    refetch()
  }, [params.area, refetch])

  if (isLoading) {
    return <Loading></Loading>
  }

  if (isError) {
    return <div>Error loading categories</div>
  }

  return (
    <>
      <Helmet>
        <meta charSet='utf-8' />
        <title>Country Meals</title>
        <link rel='canonical' href='http://mysite.com/example' />
      </Helmet>
      <div className='container pt-5 mt-5'>
        <h2>{params.area} Dishes</h2>
        <div className='row'>
          {data.data.meals.map((meal) => (
            <div className='col-md-3 g-3' key={meal.idMeal}>
              <Link to={"/mealdetails/" + meal.strMeal} style={{ textDecoration: "none", color: "black " }}>
                <img src={meal.strMealThumb} className='w-100 rounded-start-5 rounded-bottom-5 shadow' alt='' />
                <h2 className='text-center'>{meal.strMeal.split(" ").slice(0, 3).join(" ")}</h2>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
