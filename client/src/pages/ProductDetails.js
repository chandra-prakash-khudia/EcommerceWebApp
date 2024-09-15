import React, { useEffect, useState } from 'react';
import Layout from './../components/Layout.js';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Card, Button, Modal } from 'antd';

const ProductDetails = () => {
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const navigate = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const params = useParams();

  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);

  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `${window.location.origin}/api/v1/product/get-product/${params.slug}`,
        { withCredentials: true }
      );
      setProduct(data?.product);
      getSimilarProduct(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };

  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `${window.location.origin}/api/v1/product/related-product/${pid}/${cid}`
      );
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <Layout>
      <div className="container mt-5">
        {product && (
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
              gap: '40px',
            }}
          >
            {/* Product Image on the left */}
            <div
              style={{
                maxWidth: '300px',
                maxHeight: '400px',
                overflow: 'hidden',
                borderRadius: '8px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                flexShrink: 0,
                cursor: 'pointer',
              }}
              onClick={showModal}
            >
              <img
                src={`${window.location.origin}/api/v1/product/product-photo/${product._id}`}
                alt={product.name}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            </div>

            {/* Product details on the right */}
            <div style={{ flex: '1' }}>
              <h2 style={{ marginBottom: '1rem', fontWeight: 'bold' }}>
                {product.name}
              </h2>
              <p
                style={{
                  fontSize: '1.1rem',
                  marginBottom: '1.5rem',
                }}
              >
                {product.description}
              </p>

              <Card
                style={{
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                  borderRadius: '8px',
                  padding: '20px',
                }}
              >
                <div
                  style={{
                    marginBottom: '1rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                  }}
                >
                  <span style={{ fontWeight: 'bold' }}>Price:</span>
                  <span>${product.price}</span>
                </div>

                <div
                  style={{
                    marginBottom: '1rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                  }}
                >
                  <span style={{ fontWeight: 'bold' }}>Category:</span>
                  <span>{product?.category?.name}</span>
                </div>

                <div
                  style={{
                    marginBottom: '1rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                  }}
                >
                  <span style={{ fontWeight: 'bold' }}>Quantity:</span>
                  <span>{product.quantity}</span>
                </div>

                <div
                  style={{
                    marginBottom: '1rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                  }}
                >
                  <span style={{ fontWeight: 'bold' }}>Shipping:</span>
                  <span>
                    {product.shipping ? 'Available' : 'Not Available'}
                  </span>
                </div>
              </Card>

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'flex-start',
                  marginTop: '2rem',
                }}
              >
                <Button
                  type="primary"
                  size="large"
                  style={{ marginRight: '1rem' }}
                >
                  Add to Cart
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modal for zoomed image */}
      <Modal
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        width={800}
        centered
      >
        <img
          src={`${window.location.origin}/api/v1/product/product-photo/${product._id}`}
          alt={product.name}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
          }}
        />
      </Modal>

      {/* Similar Products Section */}
      <div className="container mt-5">
        <h3>Similar Products</h3>
        <div className="row">
          {relatedProducts.length > 0 ? (
            relatedProducts.map((p) => (
              <div
                className="col-md-4 mb-4"
                key={p._id}
                style={{ cursor: 'pointer' }}
                onClick={() => navigate(`/product/${p.slug}`)}
              >
                <Card
                  cover={
                    <img
                      src={`${window.location.origin}/api/v1/product/product-photo/${p._id}`}
                      alt={p.name}
                      style={{
                        width: '100%',
                        height: '250px',
                        objectFit: 'cover',
                      }}
                    />
                  }
                  hoverable
                >
                  <Card.Meta
                    title={p.name}
                    description={`$${p.price}`}
                  />
                </Card>
              </div>
            ))
          ) : (
            <p>No similar products found</p>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
