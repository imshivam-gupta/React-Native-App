import React, { useContext, useState } from 'react';
import { Text, View, SafeAreaView, Alert, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import { createUser } from '../utilities/authentication.js';
import StyledInput from '../components/StyledInput';
import StyledButton from '../components/StyledButton';
import PressableImage from '../components/PressableImage';
import { AuthContext } from '../store/auth-context';


const Register = props => {

  const navigation = useNavigation();

  const authctx = useContext(AuthContext);

  const [enteredEmail, setEnteredEmail] = useState('');
  const [enteredName, setEnteredName] = useState('');
  const [enteredConfirmPassword, setEnteredConfirmPassword] = useState('');
  const [enteredPassword, setEnteredPassword] = useState('');
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const [credentialsInvalid, setCredentialsInvalid] = useState({
    name: false,
    email: false,
    password: false,
    confirmPassword: false,
  });

  const {
    name: nameisInvalid,
    email: emailIsInvalid,
    password: passwordIsInvalid,
    confirmPassword: passwordsNotEqual,
  } = credentialsInvalid;
  
  function updateInputValueHandler(inputType, enteredValue) {
    switch (inputType) {
      case 'name':
        setEnteredName(enteredValue);
        break;
      case 'email':
        setEnteredEmail(enteredValue);
        break;
      case 'password':
        setEnteredPassword(enteredValue);
        break;
      case 'confirmPassword':
        setEnteredConfirmPassword(enteredValue);
        break;
    }
  }

  async function signupHandler({ name,email, password,confirmPassword }) {
    setIsAuthenticating(true);
    try {
      const token = await createUser( name,email, password,confirmPassword);
      authctx.authenticate(token);
    } catch (error) {
      Alert.alert('Authentication failed.','Please try again later with correct input.')
    }
    
    setIsAuthenticating(false);
  }

  function submitHandler() {

    let email = enteredEmail;
    let password = enteredPassword;
    let confirmPassword = enteredConfirmPassword;
    let name = enteredName;

    email = email.trim();
    password = password.trim();
    confirmPassword = confirmPassword.trim();

    const emailIsValid = email.includes('@');
    const passwordIsValid = password.length > 6;
    const passwordsAreEqual = password === confirmPassword;
    const nameisValid = enteredName.length > 0;

    if ( !emailIsValid || !passwordIsValid || !passwordsAreEqual || !nameisValid) {
      Alert.alert('Invalid input', 'Please check your entered credentials.');
      setCredentialsInvalid({
        email: !emailIsValid,
        password: !passwordIsValid,
        confirmPassword: !passwordIsValid || !passwordsAreEqual,
      });
      return;
    }
    signupHandler({  name,email, password,confirmPassword });
  }

  if (isAuthenticating) {
    return <SafeAreaView className="flex-1 py-16">
    <Text>Logging you in</Text>
    </SafeAreaView>

  }

  return (
    <SafeAreaView className="flex-1 py-16">

        <View className='w-full mx-auto flex flex-row gap-x-6 justify-center'>
            <Image
              source={require('../assets/logosvg.png')}
              className='w-14 h-14 my-auto'
            />
            <Text className='text-4xl text-violet-700 font-medium my-auto'>Techspark</Text>
        </View>



        <View className="flex flex-col justify-around h-full">




            <Text className='text-2xl text-center text-gray-600 font-medium mb-6'>
              Register to Techspark
            </Text>

            <View className='flex flex-col gap-y-6 mb-6'>


                <StyledInput
                  placeholder="Name"
                  onChangeText={updateInputValueHandler.bind(this, 'name')}
                  isInvalid={nameisInvalid}
                  value={enteredName}
                />

                <StyledInput
                  placeholder="Email"
                  onChangeText={updateInputValueHandler.bind(this, 'email')}
                  isInvalid={emailIsInvalid}
                  value={enteredEmail}
                  keyboardType="email-address"
                />

                <StyledInput
                  placeholder="Password"
                  onChangeText={updateInputValueHandler.bind(this, 'password')}
                  isInvalid={passwordIsInvalid}
                  value={enteredPassword}
                  secureTextEntry={true}
                />

                <StyledInput
                  placeholder="Confirm Password"
                  onChangeText={updateInputValueHandler.bind(this, 'confirmPassword')}
                  isInvalid={passwordsNotEqual}
                  value={enteredConfirmPassword}
                  secureTextEntry={true}
                />         

            </View>


            <StyledButton
              onPress={submitHandler}
              label="Register"
            />

     

            {/* <View className='flex flex-row justify-center items-center mb-6 pt-6 border-t-2 border-gray-200'>
            
                <PressableImage 
                  imgsrc={require('../assets/google.png')}
                  onPress={() => navigation.navigate("Home")}
                />

                <PressableImage
                  imgsrc={require('../assets/twitter.png')}
                  onPress={() => navigation.navigate("Home")}
                />

                <PressableImage
                  imgsrc={require('../assets/facebook.png')}
                  onPress={() => navigation.navigate("Home")}
                />
      
            </View> */}
            

            <View className='flex flex-row mx-auto'>
              <Text className='text-md mr-2'>Already have an account</Text>
              <Text className='text-violet-600 text-md' onPress={()=>navigation.navigate("Login")}>Login Instead</Text>
            </View>
    
    
        </View>        
    </SafeAreaView>
  );
};

export default Register;

