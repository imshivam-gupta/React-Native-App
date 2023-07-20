import { BACKEND_URL } from "../utilities/constants";
import { productsActions } from "./products-slice";

export const fetchProductData = () => {

    return async (dispatch) => {
        
        const fetchData = async () => {
            const response = await fetch(
                `${BACKEND_URL}api/v1/products`
            );
           
            const data = await response.json();
            return data;
        };

        try {
            const productsData = await fetchData();
            // console.log(productsData.data.docs[0].reviews[0]);
            dispatch(
                productsActions.replaceProducts({
                    items: productsData.data.docs || [],
                })
            );
        } catch (error) {
            console.log("Error");
        }

    };
}