import { cartActions } from './cart-slice';
import axios from 'axios';
import { BACKEND_URL } from '../utilities/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const fetchCartData = () => {

    return async (dispatch) => {

        const fetchData = async () => {
          const token = await AsyncStorage.getItem("token");
          const response = await axios.get(
            `${BACKEND_URL}api/v1/cart`,
            {headers: {
              "Content-Type": "application/json",
              "authorization": `Bearer ${token}`,
            }}
          ).catch((err) => {
            console.log(err);
          });
    
          const data = await response.data.data;
          return data;
        };
    
        try {
          const cartData = await fetchData();
          dispatch(
            cartActions.replaceCart({
              data:cartData,
            })
          );
        } catch (error) {
            console.log(error);
        }
    };
};


export const sendCartData = (id,quant,email) => {
   
    return async (dispatch) => {
    
        const sendRequest = async () => {
            await fetch("https://techspark.vercel.app/api/cart", {
                method: "POST",
                headers: {
                "Content-Type": "application/json",
                user_email: email,
                },
                body: JSON.stringify({
                productId: id,
                qty: quant,
                }),
            });

        };
    
        try {
            await sendRequest();
        } catch (error) {
            console.log("Error");
        }
    };
};