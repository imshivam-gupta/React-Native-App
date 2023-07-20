import {  TouchableOpacity ,Image} from "react-native"


export default PressableImage = (props) => {

    return (
        <TouchableOpacity
                onPress={props.onPress}
                activeOpacity={0.7}
                className={`text-center justify-center items-center mx-4 w-12 h-12 bg-gray-200 rounded-2xl ${props.buttoncss}`}
              >
              <Image source={props.imgsrc} className={`w-8 h-8 ${props.imgcss}`} />
        </TouchableOpacity>
    )
}

