import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from "react-redux";
import AuthNavigator from './navigations/AuthNavigator';
import store from "./store";
import AuthContextProvider from "./store/auth-context";
import { StripeProvider } from '@stripe/stripe-react-native';

export default function App() {

  const STRIPE_KEY = "pk_test_51NFVHqSHS6cBSQ8Vn8Zhgk4reG7hYdO4BlymG1KVlbeW9FIeVPjMGyXHxOfCZ7ErGqO6Rmxwy1jv44oSjdTFvZBz00lp19LW93"

  return (
    <AuthContextProvider>
      <Provider store={store}>
        <StripeProvider publishableKey={STRIPE_KEY}>
          <StatusBar style="dark"/>
          <AuthNavigator />
        </StripeProvider>
      </Provider>
    </AuthContextProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
