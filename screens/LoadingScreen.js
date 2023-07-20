import { ActivityIndicator, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

function LoadingScreen({ navigation }) {
 
  return (
    <SafeAreaView className="">
      <View className="mx-auto my-60">
        <ActivityIndicator size="large" color="#000" />
      </View>
    </SafeAreaView>
  );
}

export default LoadingScreen;