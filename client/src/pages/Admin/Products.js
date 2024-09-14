import React, { useEffect, useState } from 'react'
import Layout from "../../components/Layout.js"
import AdminMenu from '../../components/AdminMenu.js'
import axios from 'axios'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'

const Products = () => {

    const token = localStorage.getItem('token');  // Or wherever you're storing the token

  const config = {
    headers: {
      'Authorization': `Bearer ${token}`  // Ensure 'Bearer' is followed by the token
    }
  };
  const [products, setProducts] = useState([])
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/get-product`, { withCredentials: true } , config);
      setProducts(data.products)
    }
    catch (error) {
      console.log(error)
      toast.error("something went wrong in getting all Product ")

    }
  }
  useEffect(() => {
    getAllProducts()
  }, []);
  return (



    <Layout>
      <div className="row">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className='col-md-9'>
          <h1 className='text-center'>All Product List</h1>
          <div className='d-flex flex-wrap justify-content-start'>
            {products?.map((p) => (
              <Link
                key={p._id}
                to={`/dashboard/admin/product/${p.slug}`}
                className='product-link'
              >
                <div
                  className='card m-2 shadow'
                  style={{
                    width: "15rem",
                    height: "20rem",
                    display: 'flex',
                    flexDirection: 'column',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                    border: '1px solid rgba(0, 0, 0, 0.1)'
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
                    <h5 className="card-title" style={{ fontSize: '1rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {p.name}
                    </h5>
                    <p className="card-text" style={{ fontSize: '0.875rem', whiteSpace: 'normal', overflow: 'hidden', textOverflow: 'ellipsis', maxHeight: '4rem' }}>
                      {p.description}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Products