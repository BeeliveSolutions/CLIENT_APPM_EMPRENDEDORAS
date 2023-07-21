import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// import Home from "../src/pages/Home"
import { IAmEntrepreneur } from "../src/pages/IAmEntrepreneur";
import { Onboarding } from "../src/pages/Onboarding";

export default function Routes() {
  const { Navigator, Screen } = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Navigator>
        <Screen
          name="Onboarding"
          component={Onboarding}
          options={{ headerShown: false, statusBarColor: "#DC0E7B" }}
        />
        <Screen
          name="IAmEntrepreneur"
          component={IAmEntrepreneur}
          options={{ statusBarColor: "#DC0E7B", headerShown: false }}
        />
      </Navigator>
    </NavigationContainer>
  );
}
