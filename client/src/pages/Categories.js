import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout.js';
import useCategory from '../hooks/useCategory.js';
import { Link } from 'react-router-dom';
import { Card } from 'antd'; // Using Ant Design Card for better design

const Categories = () => {
  const categories = useCategory();

  return (
    <Layout title={"All Categories"}>
      <div className="container">
        <h1 className="text-center mt-4">Browse Categories</h1>
        <div className="row">
          {categories.map((c) => (
            <div className="col-md-4 col-sm-6 mt-4 mb-3" key={c._id}>
              <Link to={`/category/${c.slug}`} style={{ textDecoration: 'none' }} >
                <Card
                  hoverable
                  className="category-card"
                  style={{
                    textAlign: 'center',
                    borderRadius: '12px',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                  }}
                >
                  <h3 style={{ margin: '1rem 0', fontWeight: 'bold' }}>
                    {c.name}
                  </h3>
                </Card>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Categories;
