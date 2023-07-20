import { SafeAreaView, View,Text, Alert,Image } from "react-native"
import {useNavigation} from '@react-navigation/native';
import { AuthContext } from '../store/auth-context';
import StyledInput from "../components/StyledInput";
import StyledButton from "../components/StyledButton";
import { useContext, useState } from "react";
import { login } from "../utilities/authentication";
import PressableImage from "../components/PressableImage";
import {Appearance} from 'react-native';



 export default LoginScreen = () => {

    const colorScheme = Appearance.getColorScheme();
    const navigation = useNavigation();
    const authctx = useContext(AuthContext);

    const [credentialsInvalid, setCredentialsInvalid] = useState({
        email: false,
        password: false,
    });

    const [enteredEmail, setEnteredEmail] = useState('');
    const [enteredPassword, setEnteredPassword] = useState('');
    const [isAuthenticating, setIsAuthenticating] = useState(false);

    const {
        email: emailIsInvalid,
        password: passwordIsInvalid,
    } = credentialsInvalid;

    function updateInputValueHandler(inputType, enteredValue) {
        switch (inputType) {
            case 'email':
                setEnteredEmail(enteredValue);
                break;
            case 'password':
                setEnteredPassword(enteredValue);
                break;
        }
    }

     async function loginHandler({ email, password }) {
         setIsAuthenticating(true);
         try {
           const token = await login(email, password);
           authctx.authenticate(token);
         } catch (error) {
           Alert.alert('Login failed.','Please try again later with correct input.')
         }
         setIsAuthenticating(false);
     }

    const [signinProgress, setSigninProgress] = useState(false);

//    async function onGoogleButtonPress() {
//        try {
//            setIsAuthenticating(true);
//            setSigninProgress(true);
//            await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
//            const data  = await GoogleSignin.signIn();
//            authctx.googleAuthenticate(data);
//          } catch (error) {
//            console.log(error)
//            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
//                Alert.alert('Sign in cancelled by Google.Please Retry');
//            } else if (error.code === statusCodes.IN_PROGRESS) {
//                Alert.alert('Sign in is already in progress');
//            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
//                Alert.alert('Play services not available or outdated');
//            } else {
//                Alert.alert('Something went wrong');
//            }
//        }
//        setSigninProgress(false);
//        setIsAuthenticating(false);
//    }


    function submitHandler() {
        let email = enteredEmail;
        let password = enteredPassword;

        email = email.trim();
        password = password.trim();

        const emailIsValid = email.includes('@');
        const passwordIsValid = password.length > 6;

        if (!emailIsValid || !passwordIsValid) {
        Alert.alert('Invalid input', 'Please check your entered credentials.');
        setCredentialsInvalid({
            email: !emailIsValid,
            password: !passwordIsValid,
        });
        return;
        }
    loginHandler({ email, password });
    }


    if (isAuthenticating) {
        return(
            <SafeAreaView className="flex-1 py-16">
                <Text>Logging you in</Text>
            </SafeAreaView>
        )
    }


     return(
         <SafeAreaView className="flex-1 py-16">

             <View className='w-full mx-auto flex flex-row gap-x-6 justify-center'>
                 <Image
                     source={require('../assets/logosvg.png')}
                     className='w-14 h-14 my-auto'
                 />
                 <Text className='text-4xl text-violet-700 font-medium my-auto'>Techspark</Text>
             </View>


             <View className="flex flex-col justify-around h-full">


                     <Text className='text-2xl text-center text-gray-600 font-medium mb-6'>Login in to continue</Text>

                     <View className='flex flex-col gap-y-2 mb-6'>

                         <StyledInput
                             placeholder="Email"
                             onChangeText={updateInputValueHandler.bind(this, 'email')}
                             isInvalid={emailIsInvalid}
                             keyboardType="email-address"
                         />

                         <StyledInput
                             placeholder="Password"
                             onChangeText={updateInputValueHandler.bind(this, 'password')}
                             isInvalid={passwordIsInvalid}
                             secureTextEntry
                         />

                     </View>

                     <StyledButton
                         label="Login"
                         onPress={submitHandler}
                         disabled={signinProgress}
                     />





                     <View className='flex flex-row mx-auto'>
                         <Text className='text-md mr-2'>Don't have an account </Text>
                         <Text className='text-violet-600 text-md' onPress={()=>navigation.replace("Register")}>Register Now</Text>
                     </View>


             </View>
         </SafeAreaView>
     )
 }

