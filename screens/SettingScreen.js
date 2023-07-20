import { useNavigation } from "@react-navigation/native";
import { ScrollView, View } from "react-native";
import PressableCard from "../components/PressableCard";

export default SettingScreen = ({ }) => {
 
  const navigation = useNavigation();

  return (
    <ScrollView className="px-6 py-4">

          <PressableCard 
            title={"My Orders"}
            imgsrc={"https://freesvg.org/img/Open-Cardboard-Box.png"} 
            description={"View order details, track shipments, and effortlessly download invoices for your records."}
            onPress={() => navigation.navigate("Orders")}
          />

          <PressableCard 
            title={"Update Your Profile"}
            imgsrc={"https://cdn-icons-png.flaticon.com/512/166/166256.png"} 
            description={"Easily edit and modify your profile details, such as name, contact information."}
          />

          
          <PressableCard 
            title={"Security and Privacy"}
            imgsrc={"https://cdn1.iconfinder.com/data/icons/checkout-flat/48/Ecommerce_Check_Out_Artboard_10-512.png"} 
            description={"Discover the robust security measures in place to protect your data, including encryption, secure connections, and strict access controls."}
          />
         
          <PressableCard 
            title={"Techspark Developer"}
            imgsrc={"https://thumbs.dreamstime.com/b/web-developer-design-concept-technology-icons-vector-illustration-eps-graphic-62575623.jpg"} 
            description={"Explore my profile to get a glimpse into my web development expertise and discover my portfolio of projects."}
          />
         


    </ScrollView>
  );
}

