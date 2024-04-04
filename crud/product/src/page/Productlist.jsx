import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function ProductTable() {
  const [products, setProducts] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newPrice, setNewPrice] = useState('');
  const [newDescription, setDescription] = useState("");



  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://api.escuelajs.co/api/v1/products"
      );
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://api.escuelajs.co/api/v1/products/${id}`);
      fetchData();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://api.escuelajs.co/api/v1/products/', {
        newTitle,
        newPrice,
      });
      fetchData();
      setNewTitle('');
      setNewPrice('');
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  return (
    <div>
      <h2>Add New Product</h2>
      <button>New</button>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
        </div>
        <div>
          <label>Price:</label>
          <input
            type="text"
            value={newPrice}
            onChange={(e) => setNewPrice(e.target.value)}
          />
        </div>
        <button type="submit">Add Product</button>
      </form>

      <h2>Product Table</h2>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.title}</td>
              <td>{product.price}</td>
              <td>
                <button className="btn btn-warning mr-2">Edit</button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(product.id)}>
                  Delete
                </button>
                {/* <Link
                  to={`/products/${product.id}`}
                  className="btn btn-info mr-2">
                  View
                </Link> */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductTable;
