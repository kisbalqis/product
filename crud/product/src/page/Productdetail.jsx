// ProductDetail.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`https://api.escuelajs.co/api/v1/products/${id}`);
      setProduct(response.data);
    } catch (error) {
      console.error('Error fetching product details:', error);
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Product Detail</h2>
      <div>
        <strong>ID:</strong> {product.id}<br />
        <strong>Title:</strong> {product.title}<br />
        <strong>Price:</strong> {product.price}<br />
      </div>
    </div>
  );
}

export default ProductDetail;
