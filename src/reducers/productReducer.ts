import { ADD_PRODUCT, UPDATE_PRODUCT, DELETE_PRODUCT } from "../actions/types";

interface Action {
  type: string;
  payload: any;
}

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
}

const initialState: Product[] = [];

const productReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case ADD_PRODUCT:
      return [...state, action.payload];
    case UPDATE_PRODUCT:
      return state.map((product: Product) =>
        product.id === action.payload.id ? action.payload : product
      );
    case DELETE_PRODUCT:
      return action.payload;
    default:
      return state;
  }
};

export default productReducer;
