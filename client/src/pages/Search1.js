import React from 'react'
import Layout from "../components/Layout.js"
import {useSearch } from  "../context/search.js"
import { useNavigate } from "react-router-dom";
const Search = () => {
    const [values , setValues] = useSearch()
    const navigate = useNavigate();
  return (
    <Layout title = {"Search Results"}>
        <div className='container'>
            <div  classname ='text-center'>
                <h1>Search Results</h1>
                <h6>
                    {values?.results.length < 1 ? "No PrOdUcT FoUnD" : `Found ${values?.results.length}`}

                </h6>
                <div className="d-flex flex-wrap justify-content-start">
            {values?.results.map((p) => (
              <div
                key={p._id}
                className="card m-2 shadow"
                style={{
                  width: "20rem",
                  height: "25rem",
                  display: 'flex',
                  flexDirection: 'column',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.4)',
                  border: '1px solid rgba(0, 0, 0, 0.3)'
                }}
              >
                <div style={{ flex: '1 1 auto', overflow: 'hidden' }}>
                  <img
                    src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
                <div className="card-body" style={{ flex: '0 1 auto' }}>
                  <h5
                    className="card-title"
                    style={{
                      fontSize: '1rem',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}
                  >
                    {p.name}
                  </h5>
                  <p
                    className="card-text"
                    style={{
                      fontSize: '0.875rem',
                      whiteSpace: 'normal',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      maxHeight: '4rem'
                    }}
                  >
                    {p.description.substring(0, 100)}...
                  </p>
                  <p className="card-text"> $ {p.price}</p>
                  <button
                    className="btn btn-primary ms-1"
                    onClick={() => navigate(`/product/${p.slug}` )}
                  >
                    More Details
                  </button>
                  <button className="btn btn-secondary ms-1">
                    ADD TO CART
                  </button>
                </div>
              </div>
            ))}
            </div>
            </div>
        </div>
    </Layout>
  )
}

export default Search;