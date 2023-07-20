import { Image, ActivityIndicator,Pressable, Text, View , Alert} from "react-native";
import { useDispatch } from "react-redux";
import { COLOURS } from "../colors/Colors";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { cartActions } from "../store/cart-slice";
import { Picker } from "@react-native-picker/picker";
import { useRef,useState } from "react";
import { BACKEND_URL } from "../utilities/constants";
import { fetchCartData } from "../store/cart-actions";


export default StyledCartCard = ({data}) => {
    const dispatch = useDispatch();
    const [selectedQty, setSelectedQty] = useState(data.qty);
    const [loading, setLoading] = useState(false);
    const countInStockArray = [];
    for (let i = 1; i <= data.countInStock; i++) {
      countInStockArray.push(i);
    }
    const pickerRef = useRef();


    const addToCartHandler = async (itemval) => {
      const prod = {
        productId: data.productId,
        productName: data.productName,
        productPrice: data.productPrice,
        productImage: data.productImage,
        qty: itemval,
        countInStock: data.countInStock
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
            productId: data.productId,
            qty: itemval,
          }),
        })
        .then((res) => {
          dispatch(cartActions.addItemToCart(prod));
          dispatch(fetchCartData());
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


    const deleteHandler = async (id) => {

      async function DeleteItem() {
          let token = await AsyncStorage.getItem('token')
          dispatch(cartActions.removeItemFromCart(id));
    
  
          await fetch(`${BACKEND_URL}api/v1/cart/item/${id}`, {
            method: "DELETE",
            headers: {
              "content-type": "application/json",
              "authorization": `Bearer ${token}`,
            },
          }).then(
            // dispatch(fetchCartData(token))
          ).catch((err) => {
            Alert("Error","Something went wrong!");
          });

        }
    
        DeleteItem();
    };

    function open() {
      pickerRef.current.focus();
    }
  
    function close() {
      pickerRef.current.blur();
    }
    

    if (loading || !data) {
      return (
        <View className="mx-auto my-60">
          <ActivityIndicator size="large" color="#000" />
        </View>
      );
    }


    return (

        <View
          key={data.productId}
          style={{
            width: '100%',
            height: 100,
            marginVertical: 6,
            flexDirection: 'row',
            alignItems: 'center',
        }}>
            <View
                style={{
                width: '30%',
                height: 100,
                padding: 14,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: COLOURS.backgroundLight,
                borderRadius: 10,
                marginRight: 22,
            }}>
    
          
            <Image
              source={{uri: `${data.productImage}`}}
              style={{
                width: '100%',
                height: '100%',
                resizeMode: 'cover',
              }}
            />
         
           
          </View>
          <View
            style={{
              flex: 1,
              height: '100%',
              justifyContent: 'space-around',
            }}>
            <View className={`flex flex-row justify-between`}>
              <Text
                style={{
                  fontSize: 15,
                  maxWidth: '100%',
                  color: "#000",
                  fontWeight: '600',
                  letterSpacing: 1,
                }}>
                {data.productName.split(" ").slice(0, 3).join(" ")}
              </Text>
 
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: '400',
                    maxWidth: '85%',
                    marginRight: 4,
                  }}>
                  &#8377;{data.productPrice}
                </Text>
               

            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>

                <View className="flex flex-col items-center justify-center px-2 py-0 bg-white rounded-xl ">
                  <Picker
                    ref={pickerRef}
                    selectedValue={selectedQty}
                    style={{  width: 80, color: "black" }}
                    itemStyle={{
                      backgroundColor: "grey",
                      color: "blue",
                      fontFamily: "Ebrima",
                      fontSize: 17,
                    }}
                    dropdownIconColor="black"
                    mode="dropdown"
                    selectionColor={"purple"}
                    onValueChange={(itemValue, itemIndex) =>{
                      setSelectedQty(itemValue)
                      addToCartHandler(itemValue)
                      }
                    }
                  >
                    {countInStockArray.map((item, index) => (
                      <Picker.Item label={item.toString()} value={item} key={index} />
                    ))}
                  </Picker>
                </View>

              </View>
              <Pressable onPress={() => deleteHandler(data.productId)}>
                <Ionicons
                  name="trash-bin-outline"
                  style={{
                    fontSize: 16,
                    color: COLOURS.backgroundDark,
                    backgroundColor: COLOURS.backgroundLight,
                    padding: 8,
                    borderRadius: 100,
                  }}
                />
              </Pressable>
            </View>
          </View>
        </View>
    );
    
}


  