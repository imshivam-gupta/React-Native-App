import { TextInput } from "react-native"

export default StyledInput = (props) => {
    return(
        <TextInput 
            className={`bg-gray-100 border my-2 w-10/12 border-gray-300 text-gray-900 text-lg rounded-xl focus:ring-blue-500 focus:border-blue-500 block mx-auto py-2 px-6 ${props.isInvalid ? 'border-red-500 text-red-600 font-bold' : ''} ${props.className && props.className}`}
            keyboardType={props.keyboardType}
            placeholder={props.placeholder}
            onChangeText={props.onChangeText}
            secureTextEntry={props.secureTextEntry}
            value={props.value}
        />
    )
}