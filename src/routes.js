import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./pages/Home";
import { IAmEntrepreneur } from "../src/pages/IAmEntrepreneur";
import { Onboarding } from "../src/pages/Onboarding";
import Filter from "./pages/Filter";
import GoBackButton from "./components/GoBackButton";
import Register from "./pages/Register/Index";
import CreationSucessful from "./pages/CreationSucessful";

export default function Routes() {
  const { Navigator, Screen } = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Navigator  >
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

        <Screen
          name="Home"
          component={Home}

          options={{
            headerLeft: null,
            statusBarColor: "#DC0E7B", headerShown: false, headerBlurEffect: true
          }}
        />

        <Screen
          name="Filter"
          component={Filter}

          options={{
            headerStyle: {
              backgroundColor: '#fff',
            },
            headerTintColor: '#DC0E7B',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              color: '#DC0E7B',
              fontSize: 25
            },
            title: "Filtrar Empresas",
            headerLeft: () => <GoBackButton />,
          }}
        />


        <Screen
          name="Register"
          component={Register}

          options={{
            statusBarColor: "#DC0E7B",
            headerStyle: {
              backgroundColor: '#fff',
            },
            headerTintColor: '#DC0E7B',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              color: '#DC0E7B',
              fontSize: 25
            },
            title: "Criar Conta",
            headerLeft: () => <GoBackButton />,
          }}
        />


        <Screen
          name="CreateSucessful"
          component={CreationSucessful}
          options={{
            statusBarColor: "#DC0E7B", headerShown: false, headerBlurEffect: true
          }}
        />
      </Navigator>
    </NavigationContainer>
  );
}
