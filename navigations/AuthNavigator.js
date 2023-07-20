import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useContext, useEffect, useState } from 'react';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import { AuthContext } from '../store/auth-context';
import StyledSearchBar from '../components/StyledSearchBar';
import PressableIonIcon from '../components/PressableIonIcon';
import BottomTabNavigator from './BottomTabNavigator';
import LoadingScreen from '../screens/LoadingScreen';
import DetailsScreen from '../screens/DetailsScreen';
import { Text } from 'react-native';
import ShippingScreen from '../screens/ShippingScreen';
import OrderScreen from '../screens/OrderScreen';


const Stack = createStackNavigator();

const AuthStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name={"Login"}
                component={LoginScreen}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name={"Register"}
                component={RegisterScreen}
                options={{headerShown: false}}
            />
    </Stack.Navigator>)
}


const AuthenticatedStack = () => {
    const authCtx = useContext(AuthContext);
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: { backgroundColor: "white" },
                headerTintColor: 'white',
                contentStyle: { backgroundColor: "pink" },
            }}
        >
            <Stack.Screen
                name="Main"
                component={BottomTabNavigator}
                options={{
                    headerRight: ({ black }) => (
                    <PressableIonIcon
                        icon="exit"
                        color={black}
                        size={24}
                        onPress={authCtx.logout}
                    />
                    ),
                    headerTitle: ({ black }) => (
                        <StyledSearchBar
                            placeholder="Search Techspark.com"
                        />
                    ),
                }
                }
            />
            <Stack.Screen
                name="Details"
                component={DetailsScreen}
                options={({ route }) => ({
                    title: route.params.name ,
                    headerTintColor: 'black',
                    headerTitleAlign: "center",
                    headerStyle: { backgroundColor: "lightGray"},
                    headerLeftLabelVisible: false,
                })}
            />
            <Stack.Screen
                name="Orders"
                component={OrderScreen}
                options={({  }) => ({
                    title: "Orders",
                    headerTintColor: 'black',
                    headerTitleAlign: "center",
                    headerStyle: { backgroundColor: "lightGray"},
                    headerLeftLabelVisible: false,
                })}
            />
            <Stack.Screen
                name="Shipping"
                component={ShippingScreen}
                options={({ route }) => ({
                    title: "Shipping Details",
                    headerTintColor: 'black',
                    headerTitleAlign: "center",
                    headerStyle: { backgroundColor: "lightGray"},
                    headerLeftLabelVisible: false,
                })}
            />
        </Stack.Navigator>
    );
}


const AuthenticationChecker = async(authctx)=>{
    const ans = authctx.isAuthenticated;
    return ans;
}

const AuthNavigator = () => {
    const authctx = useContext(AuthContext);
    const [loading,setLoading] = useState(true);
    const [isAuthenticated,setIsAuthenticated] = useState(true);

    useEffect(() => {
        const authChecker = async () => {
          const res = await AuthenticationChecker(authctx);
          setIsAuthenticated(res);
          setLoading(false);
        };
      
      
        if (authctx.checking) {
          const waitForChecking = setInterval(() => {
            if (!authctx.checking) {
              clearInterval(waitForChecking);
              setLoading(true);
              authChecker();
            }
          }, 1000);
        } else {
          setLoading(true);
          authChecker();
        }
    }, [authctx]);

    if(loading){
        return (
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen
                        name={"Loading"}
                        component={LoadingScreen}
                        options={{headerShown: false}}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        )
    }


    return(
        <NavigationContainer>
            {isAuthenticated && <AuthenticatedStack />}
            {!isAuthenticated && <AuthStack />}
        </NavigationContainer>
    )
}

export default AuthNavigator;

  