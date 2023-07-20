import {
  View,
  Text,
  ActivityIndicator,
  Dimensions,
  Animated,
  AccessibilityPropertiesIOS,
  ScrollView,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductData } from "../store/products-actions";
import { cartActions } from "../store/cart-slice";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Picker } from "@react-native-picker/picker";
import { useRef } from "react";
import { useState } from "react";
import { BACKEND_URL } from "../utilities/constants";

const ReviewBox = ({ review }) => {
  return (
    <View className="border-b-2 border-gray-300 p-4 m-4 rounded-xl px-6">
      <View className="flex flex-row items-center">
        <Image
          source={{ uri: review.image }}
          style={{ width: 50, height: 50, borderRadius: 25 }}
        />
        <View className="flex flex-col ml-4">
          <Text className="text-lg font-bold">{review.name}</Text>
          <Text className="text-base text-gray-500">
            {review.createdAt.substring(0, 10)}
          </Text>
        </View>
      </View>
      <View className="mt-4">
        <Text className="text-base">{review.comment}</Text>
      </View>
    </View>
  );
};

export default DetailsScreen = ({ route }) => {
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { productID } = route.params;
  const prodStateRedux = useSelector((state) => state.products);
  const { products } = prodStateRedux;
  const [product, setProduct] = useState();
  const [countInStockArray, setCountInStockArray] = useState([]);

  useEffect(() => {
    if (products.length === 0) dispatch(fetchProductData());
  }, [dispatch]);

  useEffect(() => {
    if (products.length !== 0) setLoading(false);
    let temp =
      products && products.find((product) => product._id === productID);
    setProduct(temp);
    navigation.setOptions({ title: temp.name });
    const countInStock = temp && temp.countInStock;
    for (let i = 1; i <= countInStock; i++) {
      countInStockArray.push(i);
    }
  }, [products]);

  const pickerRef = useRef();
  const [selectedQty, setSelectedQty] = useState(1);

  const width = Dimensions.get("window").width;
  const scrollX = new Animated.Value(0);

  const addToCartHandler = async () => {
    const prod = {
      productId: product._id,
      productName: product.name,
      productPrice: product.price,
      productImage: product.main_image,
      qty: selectedQty,
      countInStock: product.countInStock,
    };

    async function PostCartData() {
      let token = await AsyncStorage.getItem("token");

      await fetch(`${BACKEND_URL}api/v1/cart/item`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          productId: product._id,
          qty: selectedQty,
        }),
      })
        .then((res) => {
          dispatch(cartActions.addItemToCart(prod));
          navigation.navigate("Cart");
          setLoading(false);
        })
        .catch((err) => {
          Alert("Error", "Something went wrong maybe you are not logged in");
        });
    }

    setLoading(true);
    PostCartData();
    setLoading(false);
  };

  const renderProduct = ({ item, index }) => {
    return (
      <View
        className="bg-white h-48 items-center justify-center"
        style={{
          width: width,
        }}
      >
        <Image
          source={{ uri: `${item}` }}
          style={{
            width: "100%",
            height: "100%",
            resizeMode: "contain",
          }}
        />
      </View>
    );
  };

  function open() {
    pickerRef.current.focus();
  }

  function close() {
    pickerRef.current.blur();
  }

  if (loading || !product) {
    return (
      <View className="mx-auto my-60">
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

//  if (product.reviews) console.log(product.reviews);

  return (
    <View className="pb-2 w-full h-full bg-gray-100">
      <ScrollView showsVerticalScrollIndicator={false}>
        <FlatList
          data={product.images ? product.images : null}
          horizontal
          renderItem={renderProduct}
          decelerationRate={0.8}
          snapToInterval={width}
          bounces={false}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: false }
          )}
        />

        <View
          className="px-4"
          style={{
            flexDirection: "row",
            marginVertical: 4,
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text
            style={{
              fontSize: 24,
              fontWeight: "600",
              letterSpacing: 0.5,
              marginVertical: 4,
              color: "#000",
              maxWidth: "84%",
            }}
          >
            {product.name}
          </Text>
          <Ionicons
            name="share-outline"
            style={{
              fontSize: 24,
              color: "blue",
              padding: 8,
              borderRadius: 100,
            }}
          />
        </View>

        <View className="flex flex-row justify-between">
          <Text className="text-2xl pl-6 mb-1 font-semibold">
            &#8377; {product.price}
          </Text>

          <Text className="text-xl pr-10 mb-1 font-semibold flex flex-row text-yellow-500">
            {product.rating} <Ionicons name="star" className="text-xl" /> Rated
          </Text>
        </View>

        <View
          className={`flex flex-row justify-around w-full gap-x-2 px-2 mx-auto rounded-xl mb-8 mt-4 `}
        >
          <View className="flex flex-col items-center justify-center px-2 bg-white rounded-xl ">
            <Picker
              ref={pickerRef}
              selectedValue={selectedQty}
              style={{ height: 50, width: 80, color: "black" }}
              itemStyle={{
                backgroundColor: "grey",
                color: "blue",
                fontFamily: "Ebrima",
                fontSize: 17,
              }}
              dropdownIconColor="black"
              mode="dropdown"
              selectionColor={"purple"}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedQty(itemValue)
              }
            >
              {countInStockArray.map((item, index) => (
                <Picker.Item label={item.toString()} value={item} key={index} />
              ))}
            </Picker>
          </View>

          <TouchableOpacity
            onPress={() => addToCartHandler()}
            activeOpacity={0.7}
            className="text-center justify-center items-center w-3/6 h-12 rounded-xl bg-indigo-400"
          >
            <Text className="text-white text-xl font-semibold rounded-xl">
              Add To Cart
            </Text>
          </TouchableOpacity>
        </View>

        <View>
          <Text className="mt-1 px-5 text-gray-600 text-sm antialiased tracking-wide leading-5">
            {product.tagline}
          </Text>
        </View>

        <Text className="mt-2 px-6 text-lg font-black">Description</Text>

        <View className="flex flex-col justify-between px-6">
          {product.description &&
            product.description.map((data, index) => (
              <Text className="text-gray-500 py-1" key={index}>
                {data}
              </Text>
            ))}
        </View>

        <Text className="mt-2 px-6 text-md font-black">Rating and Reviews</Text>

        <View className="flex flex-col justify-between">
          {product.reviews &&
            product.reviews.map((data, index) => (
              <ReviewBox key={index} review={data} />
            ))}
        </View>
      </ScrollView>
    </View>
  );
};
