import React, { useState, useEffect } from "react";
import Layout from "../components/Layout.js";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";



const CategoryProduct = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]); // Initialize as an array
  const [category, setCategory] = useState({}); // Initialize as an object

  useEffect(() => {
    if (params?.slug) getProductsByCat();
  }, [params?.slug]);

  const getProductsByCat = async () => {
    try {
      const { data } = await axios.get(
        `${window.location.origin}/api/v1/product/product-category/${params.slug}`,
        { withCredentials: true }
      );
      setProducts(data?.products || []); // Default to empty array
      setCategory(data?.category || {}); // Default to empty object
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="container mt-3">
        <h4 className="text-center">Category - {category?.name || 'Unknown'}</h4>
        <h6 className="text-center">
          {products.length} result{products.length !== 1 ? 's' : ''} found
        </h6>
        <div className="row">
          <div className="col-md-9 offset-1">
            <div className="d-flex flex-wrap">
              {products.map((p) => (
                <div
                  className="card m-2"
                  style={{ width: "18rem" }}
                  key={p._id}
                >
                  <img
                    src={`${window.location.origin}/api/v1/product/product-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{p.name}</h5>
                    <p className="card-text">
                      {p.description.length > 30 ? p.description.substring(0, 30) + "..." : p.description}
                    </p>
                    <p className="card-text"> ${p.price}</p>
                    <button
                      className="btn btn-primary ms-1"
                      onClick={() => navigate(`/product/${p.slug}`)}
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
            {/* Uncomment the following if you want to include pagination or a Load More button */}
            {/* <div className="m-2 p-3">
              {products && products.length < total && (
                <button
                  className="btn btn-warning"
                  onClick={(e) => {
                    e.preventDefault();
                    setPage(page + 1);
                  }}
                >
                  {loading ? "Loading ..." : "Load More"}
                </button>
              )}
            </div> */}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CategoryProduct;
