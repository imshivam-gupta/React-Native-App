import { useNavigation } from "@react-navigation/native";
import {
    View,
    Text,
    ActivityIndicator,
} from "react-native";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { BACKEND_URL } from "../utilities/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DataTable } from 'react-native-paper';


const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const dateformatter = (createdAt) => {
    const date = new Date(createdAt);
    const timstamp = `${date.getDate()} ${monthNames[date.getMonth()]}`
    return timstamp;
}


export default  OrderScreen = ({route}) => {



    const navigation = useNavigation();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
  

    useEffect(() => {

        const fetchOrders = async () => {
          setLoading(true);
          const token = await AsyncStorage.getItem("token");
          const response = await axios.get(`${BACKEND_URL}api/v1/users/myorders`, {
            headers: {
              "Content-Type": "application/json",
              authorization: `Bearer ${token}`,
            },
          });
  
          setOrders(response.data.data.orders);
          console.log(response.data.data.orders);
          setLoading(false);
        }
    
        fetchOrders();
        console.log(orders);
    },[]);

    if(loading){
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
              <ActivityIndicator size="large" color="#000" />
            </View>
        );
    }

    if(orders && orders.length===0){
        return (
            <View style={{ flex: 1, alignItems: "center" }}>
                <Text style={{fontSize: 20, color: "#000", fontWeight: "500", letterSpacing: 1, paddingTop: 20, paddingLeft: 16, marginBottom: 10,}}>No orders yet</Text>
            </View>
        );
    }
  

    return(
        <View className='flex flex-row mt-4 px-2'>
            <DataTable className='border border-gray-200 rounded-xl'>
                <DataTable.Header className="bg-white-100">
                    <DataTable.Title className="text-center">S.No.</DataTable.Title>
                    <DataTable.Title className="text-center">Placed on</DataTable.Title>
                    <DataTable.Title className="text-center">Amount</DataTable.Title>
                    <DataTable.Title className="text-center">Paid</DataTable.Title>
                    <DataTable.Title className="text-center">Delivered</DataTable.Title>
                </DataTable.Header>
                {orders.map((order,index) => (
                    <DataTable.Row key={order._id} className="flex flex-row bg-gray-100">
                        <DataTable.Cell className="border-x-1 border-gray-200">{index+1}</DataTable.Cell>
                        <DataTable.Cell className="border-x-1 border-gray-200">{dateformatter(order.createdAt)}</DataTable.Cell>
                        <DataTable.Cell className="border-x-1 border-gray-200">{order.totalPrice}</DataTable.Cell>
                        <DataTable.Cell className="border-x-1 border-gray-200">{order.isPaid===true?"Yes":"No"}</DataTable.Cell>
                        <DataTable.Cell className="border-x-1 border-gray-200">{order.isDelivered===true?"Yes":"No"}</DataTable.Cell>
                    </DataTable.Row>
                ))}
            </DataTable>
        </View>
    )
}  
