export const cartReducer = (state, action) => {
    switch (action.type) {
      case "ADD_TO_CART":
        return { ...state, cart: [...state.cart, { ...action.payload, qty: 1 }] };
      case "REMOVE_FROM_CART":
        return {
          ...state,
          cart: state.cart.filter((c) => c._id !== action.payload._id),
        };
      case "ADD_QTY":
        return {
          ...state,
          cart: state.cart.map((item) =>
            item._id === action.payload._id ? { ...item, qty: item.qty + 1 } : item
          ),
        };
      case "REMOVE_QTY":
        return {
          ...state,
          cart: state.cart.map((item) =>
            item._id === action.payload._id ? { ...item, qty: item.qty - 1 } : item
          ),
        };
      default:
        return state;
    }
  };