import axios from "axios"
import React, { useEffect } from "react"
import { useQuery } from "react-query"
import { Link, useLocation, useParams } from "react-router-dom"
import Loading from "../Loading/Loading"
import { Helmet } from "react-helmet"

export default function Category() {
  let params = useParams()
  let location = useLocation()
  const { name, description } = location.state || {}
  function getCategory() {
    return axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${params.strCategory}`)
  }

  let { data, isLoading, isError, refetch } = useQuery(["getCategory", params.strCategory], getCategory, {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
    keepPreviousData: true,
  })

  useEffect(() => {
    refetch()
  }, [params.strCategory, refetch])

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
        <title>Category</title>
        <link rel='canonical' href='http://mysite.com/example' />
      </Helmet>
      <div className='container pt-5 mt-5'>
        <div className='row'>
          <h2 className='fs-1'>{name}</h2>
          <p>{description}</p>

          {data.data.meals.map((meal) => (
            <div className='col-md-3 g-3' key={meal.idMeal}>
              <Link to={"/mealdetails/" + meal.strMeal} style={{ textDecoration: "none", color: "black " }}>
                <img src={meal.strMealThumb} className='w-100 rounded-start-5 rounded-bottom-5 shadow' alt='' />
                <h2 className='text-center fs-4'>{meal.strMeal.split(" ").slice(0, 3).join(" ")}</h2>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
