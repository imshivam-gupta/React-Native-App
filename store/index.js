import  {configureStore,createSlice} from "@reduxjs/toolkit";
import cartSlice from "./cart-slice";
import productsSlice from "./products-slice";
import userSlice from "./user-slice";

const store = configureStore({
    reducer: {
        products: productsSlice.reducer,
        cart: cartSlice.reducer,
        user: userSlice.reducer
    }
});

export default store;