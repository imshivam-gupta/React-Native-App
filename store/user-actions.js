import AsyncStorage from "@react-native-async-storage/async-storage";
import { BACKEND_URL } from "../utilities/constants";
import { userActions } from "./user-slice";

export const fetchuserdata = () => {

    return async (dispatch) => {
        
        const fetchData = async () => {
            const token = await AsyncStorage.getItem("token");
            console.log("fetching user data",token);
            const response = await fetch(
                `${BACKEND_URL}api/v1/users/me`,{
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "authorization": `Bearer ${token}`,
                    },
                }
            );
            const data = await response.json();
            return data;
        };

        try {
            const userData = await fetchData();
            console.log(userData);
            dispatch(
                userActions.replaceUser(userData.data.data)
            );
        } catch (error) {
            console.log(error);
        }

    };
}