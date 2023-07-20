import { Image, Pressable, Text, View } from 'react-native';


export default PressableCard = ({onPress,description,imgsrc,title}) => {
    return(
        <Pressable
            className={`flex flex-col w-full my-2 bg-white rounded-xl px-2 pb-4`}
            onPress={onPress}
        >

            <View className={`flex flex-row px-2 pt-2`}>
                <Image
                    source={{uri: imgsrc }} 
                    className="w-10 h-12 rounded-xl"
                    style={{
                        resizeMode: 'contain',
                    }}
                />
                <Text className="px-2 my-auto text-black text-lg font-semibold">{title}</Text>
            </View>

            <View>
                <Text className="px-2 text-gray-600">{description}</Text>
            </View>


        </Pressable>
    )
}

