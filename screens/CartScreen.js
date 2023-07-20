import {
  View,
  Text,
  ScrollView,
  Image,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCartData } from "../store/cart-actions";
import { fetchProductData } from "../store/products-actions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import StyledCartCard from "../components/StyledCartCard";


export default CartScreen = () => {

  useEffect(() => {
    if (prodStateRedux.products.length === 0) {
      dispatch(fetchProductData());
    }
    async function LoadCartData() {
      let token = await AsyncStorage.getItem("token");
//      console.log("fetching cart data",cartStateRedux);
      if (cartStateRedux.changed === false){ 
        dispatch(fetchCartData(token));
      }
    }
    LoadCartData();
  }, [dispatch]);



  const navigation = useNavigation();
  const dispatch = useDispatch();
  const cartStateRedux = useSelector((state) => state.cart);
  const prodStateRedux = useSelector((state) => state.products);
  const { totalCost, items, loading } = cartStateRedux;



  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  if(items.length === 0){
    return (
      <View style={{ flex: 1, alignItems: "center" }}>
        <Text style={{fontSize: 20, color: "#000", fontWeight: "500", letterSpacing: 1, paddingTop: 20, paddingLeft: 16, marginBottom: 10,}}>No items in cart</Text>
        {/* Shop now button */}
        <Pressable
          className="mx-auto bg-purple-500 py-2 px-10 rounded-xl mt-4"
          onPress={() => navigation.navigate("Home")}
        >
          <Text className="text-xl font-semibold text-white">Shop Now</Text>
        </Pressable>
      </View>
    );
  }




  return (
    <View className="pb-2 w-full h-full bg-gray-100">
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text className="px-4 py-4 mt-2 bg-white rounded-xl mx-4 text-xl font-bold">
          Subtotal: &#8377; {totalCost}
        </Text>
        <Text
          style={{
            fontSize: 20,
            color: "#000",
            fontWeight: "500",
            letterSpacing: 1,
            paddingTop: 20,
            paddingLeft: 16,
            marginBottom: 10,
          }}
        >
          My Cart
        </Text>

        <View style={{ paddingHorizontal: 16 }}>
          {items?.map((item,index) => (
            <StyledCartCard
                key={index}
                data={item}
              />
          ))}
        </View>

        <Pressable
          className="mx-auto bg-purple-500 py-2 px-10 rounded-xl mt-4"
          onPress={() => navigation.navigate("Shipping")}
        >
          <Text className="text-xl font-semibold text-white">Checkout Now</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
};
