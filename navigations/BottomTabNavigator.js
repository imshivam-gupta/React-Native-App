import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import CartScreen from '../screens/CartScreen';
import HomeScreen from '../screens/HomeScreen';
import DetailsScreen from '../screens/DetailsScreen';
import SettingScreen from '../screens/SettingScreen';

const Tab = createBottomTabNavigator();

function BottomTabNavigator() {

    return (
        <Tab.Navigator
            tabPosition="bottom"
            screenOptions={({route}) => ({
                swipeEnabled: false,
                headerShown: false,
                tabBarShowLabel: false,
                tabBarActiveBackgroundColor: "white",
                tabBarIndicatorStyle: {
                    position: 'absolute',
                    top: 0,
                    height: 6,
                    backgroundColor: "blue",
                },
                tabBarHideOnKeyboard: true,
                tabBarActiveTintColor: "darkblue",
                tabBarInactiveTintColor: "blue",
                tabBarStyle : {
                    paddingVertical:0,
                },
                tabBarIcon : ({color,size,focused}) => {
                    let iconName;

                    if(route.name==="Home"){
                        iconName = focused ? 'home' : 'home-outline';
                        color = focused ? "darkblue" : "black";
                        size = focused ? 28 : 22;
                    }else if(route.name==="User"){
                        iconName = focused ? 'person' : 'person-outline';
                        color = focused ? "darkblue" : "black";
                        size = focused ? 28 : 22;
                    }
                    else if(route.name==="Cart"){
                        iconName = focused ? 'cart' : 'cart-outline';
                        color = focused ? "darkblue" : "black";
                        size = focused ? 28 : 22;
                    }
                    else if(route.name==="Details"){
                        iconName = focused ? 'headset' : 'headset-outline';
                        color = focused ? "darkblue" : "black";
                        size = focused ? 28 : 22;
                    }

                    return <Ionicons name={iconName} color={color} size={size}/>
                }
            })}
        >
            <Tab.Screen 
                name="Home" 
                component={HomeScreen}   
            />
            <Tab.Screen 
                name="User" 
                component={SettingScreen}       
            />
            <Tab.Screen 
                name="Cart" 
                component={CartScreen}
            />
        </Tab.Navigator>
    );
}

export default BottomTabNavigator;