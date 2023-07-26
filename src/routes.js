import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { IAmEntrepreneur } from "../src/pages/IAmEntrepreneur";
import { Login } from "../src/pages/Login";
import { Onboarding } from "../src/pages/Onboarding";
import GoBackButton from "./components/GoBackButton";
import Filter from "./pages/Filter";
import Home from "./pages/Home";

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
          name="Login"
          component={Login}
          options={{ headerShown: false, statusBarColor: "#DC0E7B" }}
        />
        <Screen
          name="IAmEntrepreneur"
          component={IAmEntrepreneur}
          options={{ statusBarColor: "#DC0E7B", headerShown: false }}
        />

        <Screen
          name="Home"
          component={Home}
          options={{
            statusBarColor: "#DC0E7B",
            headerShown: false,
            headerBlurEffect: true,
          }}
        />

        <Screen
          name="Filter"
          component={Filter}
          options={{
            headerStyle: {
              backgroundColor: "#fff",
            },
            headerTintColor: "#DC0E7B",
            headerTitleAlign: "center",
            headerTitleStyle: {
              color: "#DC0E7B",
              fontSize: 25,
            },
            title: "Filtrar Empresas",
            headerLeft: () => <GoBackButton />,
          }}
        />
      </Navigator>
    </NavigationContainer>
  );
}
