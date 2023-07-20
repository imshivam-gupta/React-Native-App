import { useNavigation } from "@react-navigation/native";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { COLOURS } from "../colors/Colors"

export default StyledProductCard = ({data}) => {
    const navigation = useNavigation();
    return(
        <TouchableOpacity
            onPress={() => navigation.navigate('Details', {productID: data._id})}
            className="flex flex-col justify-center px-4 py-2 bg-white shadow-xl rounded-xl"
            style={{
                width: '44%',
                marginVertical: 14,
            }}
        >


        <Image
            source={{uri: data.main_image }} 
            className="w-full h-20 rounded-xl"
            style={{
                resizeMode: 'contain',
            }}
        />

        <Text
            style={{
                fontSize: 12,
                color: COLOURS.black,
                fontWeight: '600',
                marginBottom: 2,
            }}
        >
            {data.name.split(" ").slice(0, 3).join(" ")}
        </Text>


        <Text className="">&#8377; {data.price}</Text>
        </TouchableOpacity>
    )
}