import { ADD_PRODUCT, UPDATE_PRODUCT, DELETE_PRODUCT } from "./types";

export const addProduct = (product: any) => ({
  type: ADD_PRODUCT,
  payload: product
});

export const updateProduct = (product: any) => ({
  type: UPDATE_PRODUCT,
  payload: product
});

export const deleteProduct = (productId: number) => ({
  type: DELETE_PRODUCT,
  payload: productId
});
