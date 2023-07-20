import { View,TextInput,Text,ScrollView, Image, Pressable, ActivityIndicator, Alert } from "react-native";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCartData } from "../store/cart-actions";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { BACKEND_URL } from "../utilities/constants";
import { fetchuserdata } from "../store/user-actions";
import { Picker } from "@react-native-picker/picker";
import  {useStripe} from "@stripe/stripe-react-native";
import { cartActions } from "../store/cart-slice";


function ShippingScreen() {

   
    const { initPaymentSheet, presentPaymentSheet } = useStripe();

    const navigation = useNavigation();
    const dispatch = useDispatch();


    const [email,setEmail]=useState("");
    const [name,setName]=useState("");
    const [address, setAddress] = useState("");
    const [selectedCountry, setSelectedCountry] = useState("India");
    const [selectedState, setSelectedState] = useState("Delhi");
    const [selectedCity, setSelectedCity] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [formErrors, setFormErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);
    const [retreiving, setRetreiving] = useState(false);
  
    const cartState = useSelector((state) => state.cart);
    if(cartState.changed===false) dispatch(fetchCartData());
  
    const userState = useSelector((state) => state.user);

    useEffect(() => {
      const fetchSession = async () => {
        const token = await AsyncStorage.getItem("token");
        if (!token) {
          Alert.alert("Not logged in");
          return;
        }
        else{
//          console.log("token",userState);
          dispatch(fetchuserdata());
        };
      }
      fetchSession();
    }, []);
  
  
    useEffect(() => {
      const fetchSession = async () => {
        const token = await AsyncStorage.getItem("token");
        if (!token) {
          Alert.alert("Not logged in");
          return;
        }
        else{
//          console.log("token",userState);
          setEmail(userState.email);
          setName(userState.name);
        };
      }
        
      fetchSession();
    }, []);
    

    const validateForm = () => {
      let errors = {};
  
      if (email.length < 5) {
        errors.email = "Email should be at least 5 characters long.";
        Alert.alert("Email should be at least 5 characters long.");
      } else {
        errors.email = "";
      }
  
      if (name.length === 0) {
        errors.name = "Name is required.";
        Alert.alert("Name is required.");
      } else {
        errors.name = "";
      }
  
      if (address.length === 0) {
        errors.address = "Address is required.";
        Alert.alert("Address is required.");
      } else {
        errors.address = "";
      }
  
      if (!selectedCountry.name) {
        errors.country = "Country is required.";
      } else {
        errors.country = "";
      }
  
      if (!selectedState.name) {
        errors.state = "State is required.";
      } else {
        errors.state = "";
      }
  
      if (selectedCity.length === 0) {
        errors.city = "City is required.";
      } else {
        errors.city = "";
      }
  
      if (postalCode.length === 0) {
        errors.postalCode = "Postal code is required.";
      } else {
        errors.postalCode = "";
      }
  
      setFormErrors(errors);
      
      return Object.values(errors).every((error) => error === "");
    };


    const placeOrderHandler = async (e) => {
      e.preventDefault();
      validateForm();

      const orderplacer = async () => {
        setSubmitting(true);
        const token = await AsyncStorage.getItem("token");

        
        try {
                let data = await axios.post(`${BACKEND_URL}api/v1/orders`, {
            shippingAddress: {
              address: address,
              country: selectedCountry,
              state: selectedState,
              city: selectedCity,
              postalCode: postalCode,
            },
          }, {
            headers: {
              "Content-Type": "application/json",
              "authorization": `Bearer ${token}`,
            },
          });


    
          const orderId = data.data.data.order._id;
          setSubmitting(false);


          try {
            const newres = await axios.post(`${BACKEND_URL}api/v1/orders/createIntent/${orderId}`,{},{ 
              headers: {
                "Content-Type": "application/json",
                "authorization": `Bearer ${token}`,
              }
            });
  


            const intent = newres.data.paymentIntent;


  // 
            // console.log("payment intent",newres.data.data.paymentIntent);
      
            const initResponse = await initPaymentSheet({
              merchantDisplayName: "Shopify",
              paymentIntentClientSecret: intent,
            });
  

  
  
  
            if(initResponse.error){
              console.log("error",initResponse.error);
              Alert.alert("Something went wrong, please try again");
              setSubmitting(false);
              return;
            }
  
            await presentPaymentSheet();
            dispatch(cartActions.resetCart());
            Alert.alert("Order placed successfully");
            setSubmitting(false);
            navigation.navigate("Orders");
  
          } catch (error) {
            console.log(error);
          }
         
        } catch (error) {
          Alert.alert("Something went wrong, please try again");
          setSubmitting(false);
          console.log(error);
        }
      }

      orderplacer();
    
    };
  

   
    const { items, loading, totalCost } = cartState;

 
    if(loading || submitting || retreiving){
      return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="large" color="#000" />
        </View>
      );
    }


    return (
      <View className="pb-2 w-full h-full bg-gray-100">

        <ScrollView showsVerticalScrollIndicator={false}>

        {/* Form for shipping details where we ask name email address, country,state,city,ppstal code  */}

        <View className="mt-4 flex flex-col justify-between gap-x-4 w-full">
         
         
          <View className="mt-4 flex flex-col justify-between gap-x-4 w-11/12">
            <Text className="text-md font-semibold my-auto">Email</Text>
            <TextInput 
              className={`bg-white border my-2 w-full border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block mx-auto py-2 px-4 ${formErrors.email ? 'border-red-500 text-red-600 font-bold' : ''}`}
              placeholder="Email"
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
        </View>    

        <View className="mt-4 flex flex-col justify-between gap-x-4 w-11/12">
            <Text className="text-md font-semibold my-auto">Name</Text>
            <TextInput
              className={`bg-white border my-2 w-full border-gray-300 text-gray-900 text-md rounded-xl focus:ring-blue-500 focus:border-blue-500 block mx-auto py-2 px-4 ${formErrors.name ? 'border-red-500 text-red-600 font-bold' : ''}`}
              placeholder="Name"
              value={name}
              onChangeText={(text) => setName(text)}
            />
        </View> 

        <View className="mt-4 flex flex-col justify-between gap-x-4 w-11/12">
            <Text className="text-md font-semibold my-auto">Address</Text>
            <TextInput
              className={`bg-white border my-2 w-full  border-gray-300 text-gray-900 text-md rounded-xl focus:ring-blue-500 focus:border-blue-500 block mx-auto px-4 ${formErrors.address ? 'border-red-500 text-red-600 font-bold' : ''}`}
              placeholder="Address"
              multiline={true}
              numberOfLines={4}
              value={address}
              onChangeText={(text) => setAddress(text)}
            />
          </View>

          {/* Putting below 4 inputs in grid of 2*2  */}

        
        


          <View className="mt-4 flex flex-row justify-between gap-x-4 w-11/12 px-2"> 
            <View className="w-1/2">
              <Text className="text-md font-semibold my-auto">Country</Text>
              <View className="border my-2 w-full bg-white border-gray-300 text-gray-900 text-md rounded-xl focus:ring-blue-500 focus:border-blue-500 block">
              <Picker
                selectedValue={selectedCountry}
                style={{ height: 50 }}
                mode="dropdown"
                onValueChange={(itemValue, itemIndex) => setSelectedCountry(itemValue)}
              >
                <Picker.Item label="India" value="India" />
                <Picker.Item label="USA" value="USA" />
                <Picker.Item label="UK" value="UK" />
              </Picker>
              </View>
             
            </View>
            
            <View className="w-1/2">
            
            <Text className="text-md font-semibold my-auto">State</Text>
            <View className="border my-2 w-full bg-white border-gray-300 text-gray-900 text-md rounded-xl focus:ring-blue-500 focus:border-blue-500 block">

            <Picker
              selectedValue={selectedState}
              style={{ height: 50 }}
              mode="dropdown"
              onValueChange={(itemValue, itemIndex) => setSelectedState(itemValue)}
            >
              <Picker.Item label="Maharashtra" value="Maharashtra" />
              <Picker.Item label="Karnataka" value="Karnataka" />
              <Picker.Item label="Delhi" value="Delhi" />
            </Picker>
            </View>
            </View>
          </View>
              


          <View className="mt-4 flex flex-row justify-between gap-x-4 w-11/12 px-2">

            <View className="w-1/2">
              <Text className="text-md font-semibold my-auto">City</Text>
              <TextInput
                className={`bg-white border my-2 w-full bg-white border-gray-300 text-gray-900 text-md rounded-xl focus:ring-blue-500 focus:border-blue-500 block mx-auto py-3 px-4 ${formErrors.city ? 'border-red-500 text-red-600 font-bold' : ''}`}
                placeholder="City"
                value={selectedCity}
                onChangeText={(text) => setSelectedCity(text)}
              />
              </View>


              <View className="w-1/2">
                <Text className="text-md font-semibold my-auto">Postal Code</Text>  
                <TextInput
                  className={`bg-white border my-2 w-full bg-white border-gray-300 text-gray-900 text-md rounded-xl focus:ring-blue-500 focus:border-blue-500 block mx-auto py-2 px-4 ${formErrors.postalCode ? 'border-red-500 text-red-600 font-bold' : ''}`}
                  placeholder="Postal Code"
                  value={postalCode}
                  onChangeText={(text) => setPostalCode(text)}
                  keyboardType="numeric"
                />
            </View>


          </View>


        </View>



      
       
        
        <Pressable 
          className="mx-auto bg-purple-500 py-2 px-10 rounded-xl mt-4"
          onPress={placeOrderHandler}
        >
          <Text className="text-xl font-semibold text-white">Complete Payment</Text>
        </Pressable> 
       
        </ScrollView>
      </View>

    );
  }
  
  export default ShippingScreen;