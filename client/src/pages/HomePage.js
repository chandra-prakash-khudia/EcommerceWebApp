import React, { useEffect, useState, useCallback } from "react";
import Layout from "./../components/Layout.js";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Prices.js";
import { useCart } from "../context/cart.js";
import toast from "react-hot-toast";


const HomePage = () => {
  const navigate = useNavigate();
  const [cart,SetCart] = useCart()
  const [products, setProducts] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  // Get all categories
  const getAllCategory = useCallback(async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/category/get-category`,
        { withCredentials: true }
      );
      if (data?.success) setCategories(data?.category);
    } catch (error) {
      console.log(error);
    }
  }, []);

  // Get all products
  const getAllProducts = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/product-list/${page}`,
        { withCredentials: true }
      );
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }, [page]);

  // Get total number of products
  const getTotal = useCallback(async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/product-count`,
        { withCredentials: true }
      );
      setTotal(data.count);
    } catch (error) {
      console.log(error);
    }
  }, []);

  // Load more products
  const loadMore = useCallback(async () => {
    try {
      console.log("Loading more products for page:", page); // Debugging line
      setLoading(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/product-list/${page}`,
        { withCredentials: true }
      );
      setLoading(false);
      console.log("More products:", data?.products); // Debugging line
      setProducts((prevProducts) => [...prevProducts, ...data?.products]);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }, [page]);

  // Handle category filter
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  // Fetch filtered products
  const filterProduct = useCallback(async () => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/product/product-filters`,
        { checked, radio },
        { withCredentials: true }
      );
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  }, [checked, radio]);

  // Fetch categories, total, and products on mount
  useEffect(() => {
    getAllCategory();
    getTotal();
    getAllProducts();
  }, [getAllCategory, getTotal, getAllProducts]);

  // Fetch more products when page changes
  useEffect(() => {
    if (page === 1) return; // Skip fetching on initial render
    console.log("Page changed to:", page); // Debugging line
    loadMore();
  }, [page, loadMore]);

  // Fetch products based on selected filters
  useEffect(() => {
    if (!checked.length && !radio.length) getAllProducts();
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio, getAllProducts, filterProduct]);

  return (
    <Layout title={"All Products - Best offers"}>
      <div className="container-fluid row mt-3">
        <div className="col-md-2">
          <h4 className="text-center">Filter By Category</h4>
          <div className="d-flex flex-column">
            {categories?.map((c) => (
              <Checkbox
                key={c._id}
                onChange={(e) => handleFilter(e.target.checked, c._id)}
              >
                {c.name}
              </Checkbox>
            ))}
          </div>
          {/* Price filter */}
          <h4 className="text-center mt-4">Filter By Price</h4>
          <div className="d-flex flex-column">
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {Prices?.map((p) => (
                <div key={p._id}>
                  <Radio value={p.array}>{p.name}</Radio>
                </div>
              ))}
            </Radio.Group>
          </div>
          <div className="d-flex flex-column">
            <button
              className="btn btn-danger"
              onClick={() => window.location.reload()}
            >
              RESET FILTERS
            </button>
          </div>
        </div>

        <div className="col-md-9 offset-1">
          <h1 className="text-center">All Products</h1>
          <div className="d-flex flex-wrap justify-content-start">
            {products?.map((p) => (
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
                  <p className="card-text"> ${p.price}</p>
                  <button
                    className="btn btn-primary ms-1"
                    onClick={() => navigate(`/product/${p.slug}` )}
                  >
                    More Details
                  </button>
                  <button className="btn btn-secondary ms-1" onClick={()=>{SetCart([...cart ,p])
                    toast.success("Item Added to Cart")
                  }}>
                    ADD TO CART
                  </button>
                </div>
              </div>
            ))}
          </div>
          {/* <div className="m-2 p-3">
            {products.length < total && (
              <button
                className="btn btn-warning"
                onClick={(e) => {
                  e.preventDefault();
                  console.log("Load more clicked!"); // Debugging line
                  setPage((prevPage) => prevPage + 1);
                }}
              >
                {loading ? "Loading ..." : "Load more"}
              </button>
            )}
          </div> */}
          <div className="m-2 p-3">
            {/* Debugging lines to verify values */}
            {console.log('Products:', products.length, 'Total:', total)}

            {/* Check if there are more products to load */}
            {(
              <button
                className="btn btn-warning"
                onClick={(e) => {
                  e.preventDefault();
                  console.log("Load more clicked!"); // Debugging line

                  // Update page to fetch next set of products
                  setPage((prevPage) => prevPage + 1);
                }}
              >
                {loading ? "Loading ..." : "Load more"}
              </button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
