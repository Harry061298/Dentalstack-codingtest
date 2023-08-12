import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addProduct,
  deleteProduct,
  updateProduct
} from "./actions/productActions";

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
}

const App: React.FC = () => {
  const dispatch = useDispatch();
  const products = useSelector((state: any) => state.products);

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((response) => response.json())
      .then((data) => {
        const productsFromResponse: Product[] = data.products;
        productsFromResponse.forEach((product) =>
          dispatch(addProduct(product))
        );
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [dispatch]);

  const [editMode, setEditMode] = useState(false);
  const [editedProduct, setEditedProduct] = useState<Product | null>(null);

  const handleEdit = (product: Product) => {
    setEditMode(true);
    setEditedProduct(product);
  };

  const handleSave = () => {
    if (editedProduct) {
      dispatch(updateProduct(editedProduct));
      setEditMode(false);
      setEditedProduct(null);
    }
  };

  const handleCancel = () => {
    setEditMode(false);
    setEditedProduct(null);
  };

  const handleDelete = (productId: number) => {
    const updatedProducts = products.filter(
      (product: Product) => product.id !== productId
    );
    dispatch(deleteProduct(updatedProducts));
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    if (editedProduct) {
      setEditedProduct({
        ...editedProduct,
        [field]: event.target.value
      });
    }
  };

  return (
    <div className="App">
      <h1>Product List</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product: Product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>
                {editMode && editedProduct?.id === product.id ? (
                  <input
                    type="text"
                    value={editedProduct.title}
                    onChange={(e) => handleInputChange(e, "title")}
                  />
                ) : (
                  product.title
                )}
              </td>
              <td>
                {editMode && editedProduct?.id === product.id ? (
                  <textarea
                    value={editedProduct.description}
                    onChange={(e) => handleInputChange(e, "description")}
                  />
                ) : (
                  product.description
                )}
              </td>
              <td>
                {editMode && editedProduct?.id === product.id ? (
                  <input
                    type="number"
                    value={editedProduct.price}
                    onChange={(e) => handleInputChange(e, "price")}
                  />
                ) : (
                  `$${product.price}`
                )}
              </td>
              <td>
                {editMode && editedProduct?.id === product.id ? (
                  <>
                    <button onClick={handleSave}>Save</button>
                    <button onClick={handleCancel}>Cancel</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => handleEdit(product)}>Edit</button>
                    <button onClick={() => handleDelete(product.id)}>
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
