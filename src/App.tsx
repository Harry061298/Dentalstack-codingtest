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
  const [addMode, setAddMode] = useState(false);

  const [editMode, setEditMode] = useState(false);
  const [editedProduct, setEditedProduct] = useState<Product | null>(null);

  const handleEdit = (product: Product) => {
    setEditMode(true);
    setEditedProduct(product);
  };

  const [newProduct, setNewProduct] = useState<Product>({
    id: 0,
    title: "",
    description: "",
    price: 0
  });

  const handleAdd = () => {
    setAddMode(true);
  };

  const handleAddSave = () => {
    if (newProduct.title && newProduct.description && newProduct.price > 0) {
      // Generate a unique ID (replace with your logic)
      newProduct.id = Date.now();

      dispatch(addProduct(newProduct));
      setAddMode(false);
      setNewProduct({
        id: 0,
        title: "",
        description: "",
        price: 0
      });
    }
  };

  const handleAddCancel = () => {
    setAddMode(false);
    setNewProduct({
      id: 0,
      title: "",
      description: "",
      price: 0
    });
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
      {addMode ? (
        <div>
          <h2>Add Product</h2>
          <div>
            <label>Title:</label>
            <input
              type="text"
              value={newProduct.title}
              onChange={(e) =>
                setNewProduct({ ...newProduct, title: e.target.value })
              }
            />
          </div>
          <div>
            <label>Description:</label>
            <input
              type="text"
              value={newProduct.description}
              onChange={(e) =>
                setNewProduct({ ...newProduct, description: e.target.value })
              }
            />
          </div>
          <div>
            <label>Price:</label>
            <input
              type="number"
              value={newProduct.price}
              onChange={(e) =>
                setNewProduct({
                  ...newProduct,
                  price: parseFloat(e.target.value)
                })
              }
            />
          </div>
          <div>
            <button onClick={handleAddSave}>Add</button>
            <button onClick={handleAddCancel}>Cancel</button>
          </div>
        </div>
      ) : (
        <button onClick={handleAdd}>Add Product</button>
      )}

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
                  <input
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
