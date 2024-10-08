import axios from "axios"
import React, { useEffect } from "react"
import { useQuery } from "react-query"
import { Link, useParams } from "react-router-dom"
import Loading from "../Loading/Loading"
import { Helmet } from "react-helmet"

export default function Categories() {
  let params = useParams()

  function getCategories() {
    return axios.get("https://www.themealdb.com/api/json/v1/1/categories.php")
  }

  let { data, isLoading, isError, refetch } = useQuery(["getCategories"], getCategories, {
    refetchOnWindowFocus: false,
  })

  useEffect(() => {
    refetch() // Refetch meals whenever the category changes
  }, [params.category, refetch])

  if (isLoading) {
    return <Loading></Loading>
  }

  if (isError) {
    return <div>Error loading categories</div>
  }

  return (
    <div className='container mt-5 pt-5 '>
      <Helmet>
        <meta charSet='utf-8' />
        <title>Categories</title>
        <link rel='canonical' href='http://mysite.com/example' />
      </Helmet>
      <div className='row'>
        {data.data.categories.map((category) => (
          <div
            className={`col-md-3 g-3`} // Change here
            key={category.idCategory}
          >
            <div className={`rounded-5 card shadow `}>
              <img src={category.strCategoryThumb} className='card-img-top' alt='...' />
              <div className={`card-body `}>
                <h5 className='card-title bodyFont'>{category.strCategory.split(" ").slice(0, 2).join(" ")}</h5>
                <p className='card-text bodyFont text-secondary'>{category.strCategoryDescription.split(" ").slice(0, 8).join(" ")}...</p>
                <Link
                  to={"/Category/" + category.strCategory}
                  className='alert alert-secondary'
                  style={{ height: "60px", textDecoration: "none", display: "flex", alignItems: "center", justifyContent: "center" }} // Adjust height and remove underline
                  state={{
                    name: category.strCategory,
                    description: category.strCategoryDescription,
                  }}
                >
                  <strong className='bodyFont'>Check Meals</strong>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
