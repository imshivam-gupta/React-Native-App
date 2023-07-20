import { TextInput,View} from "react-native"
import { Ionicons } from '@expo/vector-icons';
import { styled } from "nativewind";

const StyledIonicons = styled(Ionicons);


export default SearchBar = (props) => {
    return (
        <View className='w-full bg-gray-200 flex flex-row rounded-xl border-gray-300 h-3/5 ml-2 px-4'>
            <StyledIonicons
                name={"search-outline"}
                color={"black"}
                size={20}
                className={`rounded-xl my-auto`}
            />
            <TextInput 
                className={`w-10/12 text-gray-900 text-lg rounded-xl mx-auto pl-1 my-auto`}
                keyboardType={props.keyboardType}
                placeholder={props.placeholder}
                onChangeText={props.onChangeText}
                secureTextEntry={props.secureTextEntry}
                value={props.value}
            />
        </View>  
    )
}