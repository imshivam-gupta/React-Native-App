import { Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';


export default PressableIonIcon = ({icon, color, size, onPress,className}) => {
    return(
        <Pressable
            className={`m-2 rounded-lg`}
            onPress={onPress}
        >
            <Ionicons name={icon} color={color} size={size} className={className}/>
        </Pressable>
    )
}

