import {  ActivityIndicator, ScrollView, View } from "react-native";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductData } from "../store/products-actions";
import { StatusBar } from "expo-status-bar";
import StyledProductCard from "../components/StyledProductCard";



function HomeScreen() {

  const dispatch = useDispatch();

  const productState = useSelector((state) => state.products);
  const { products,loading } = productState;


  useEffect(() => {
    if(products.length === 0) dispatch(fetchProductData());
  }, [dispatch]);

  if(loading){
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }



  return (

    <View className="px-4 py-2 w-full h-full bg-gray-100">
        <ScrollView showsVerticalScrollIndicator={false}>

          <View className="flex flex-row flex-wrap justify-around">
            {products.map(data => {
              return <StyledProductCard data={data} key={data._id} />;
            })}
          </View>

    </ScrollView>
    </View>
  );
}

export default HomeScreen;


