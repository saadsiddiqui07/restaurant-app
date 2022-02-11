// initial state values of the application
export const initialState = {
  cart: [],
  user: null,
  total: 0,
  isDrawerOpen: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };

    case "OPEN_DRAWER":
      return {
        ...state,
        isDrawerOpen: action.payload,
      };

    case "CLOSE_DRAWER":
      return {
        ...state,
        isDrawerOpen: false,
      };

    case "ADD_TO_CART":
      return {
        ...state,
        cart: [...state.cart, action.item],
      };

    case "REMOVE_FROM_CART":
      let filterCart = [...state.cart];

      const index = state.cart.findIndex(
        (cartItem) => cartItem.id === action.id
      );

      if (index >= 0) {
        filterCart.splice(index, 1);
      } else {
        console.alert(`Cannot delete product from (id: ${action.id})`);
      }
      return { ...state, cart: filterCart };

    case "EMPTY_CART":
      return {
        ...state,
        cart: [],
      };

    // INCREASE THE AMOUNT OF THE PRODUCT
    case "INCREASE":
      // looping through the cart
      let tempCart = state.cart.map((cartItem) => {
        // checking the cart product id to the action payload id
        if (cartItem.id === action.payload.id) {
          // if it matches then increase the amount of the product through the matching id
          cartItem = { ...cartItem, amount: cartItem.amount + 1 };
        }
        // then return the product with the newest amount
        return cartItem;
      });
      return {
        ...state,
        cart: tempCart,
      };

    // DECREASE THE AMOUNT OF THE PRODUCT
    case "DECREASE":
      let newCart = [];
      // when the amount will be less than 1 then remove that item
      if (action.payload.amount === 1) {
        newCart = state.cart.filter(
          (cartItem) => cartItem.id !== action.payload.id
        );
      } else {
        newCart = state.cart.map((cartItem) => {
          // checking the cart product id to the action payload id
          if (cartItem.id === action.payload.id) {
            // if it matches then decrease the amount of the product through the matching id
            cartItem = { ...cartItem, amount: cartItem.amount - 1 };
          }
          // then return the product with the newest amount
          return cartItem;
        });
      }
      return {
        ...state,
        cart: newCart,
      };

    // GETTING CART TOTAL
    case "GET_TOTAL":
      let { total, amount } = state.cart.reduce(
        (cartTotal, cartItem) => {
          const { price, amount } = cartItem;
          const itemTotal = price * amount;

          cartTotal.total += itemTotal;
          cartTotal.amount += amount;

          return cartTotal;
        },
        {
          total: 0,
          amount: 0,
        }
      );
      total = parseFloat(total.toFixed(2));
      return {
        ...state,
        total,
        amount,
      };

    default:
      return state;
  }
};

export default reducer;
