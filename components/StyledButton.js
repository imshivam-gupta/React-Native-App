import { TouchableOpacity, View,Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default StyledButton = (props) => {
    return (
        <View className={`w-9/12 mx-auto rounded-xl mb-8 ${props.className && props.className}`}>
            <LinearGradient
            colors={["#A376F1", "#7d5fff"]}
            start={{y: 0.0, x: 0.0}}
            end={{y: 1.0, x: 0.0}}
            style={{borderRadius: 20}}
            >
                <TouchableOpacity
                    onPress={props.onPress}
                    activeOpacity={0.7}
                    className="text-center justify-center items-center w-full h-12 rounded-xl"
                    disabled={props.disabled===true}
                >
                    <Text className='text-white text-xl font-semibold rounded-xl'>{props.label}</Text>
                </TouchableOpacity>
            </LinearGradient>
        </View>
    )
}

