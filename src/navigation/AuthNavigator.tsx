import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RouteName } from "../config/navigation";
import LoginScreen from "../modules/auth/login/LoginScreen";
import RegisterScreen from "../modules/auth/register/RegisterScreen";

export type AuthStackParamList = {
  [RouteName.Login]: undefined;
  [RouteName.Register]: undefined;
  [RouteName.ForgotPassword]: undefined;
};

const Stack = createNativeStackNavigator<AuthStackParamList>();

export default function AuthNavigator() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name={RouteName.Login} component={LoginScreen}/>
      <Stack.Screen name={RouteName.Register} component={RegisterScreen}/>
    </Stack.Navigator>
  );
}