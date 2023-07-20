import {NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import { Intro } from '../Pages/Intro'
import { Intro2 } from '../Pages/Intro2'
import { SouEmpreendedora } from '../Pages/SouEmpreendedora'


export function Routes(){
    const {Navigator, Screen} = createNativeStackNavigator()
    return(
        <NavigationContainer>
            <Navigator>
                <Screen name='Intro' component={Intro} options={{headerShown:false, statusBarColor:'#DC0E7B'}}/>
                <Screen name='Intro2' component={Intro2} options={{statusBarHidden:false, statusBarColor:'#DC0E7B'}}/>
                <Screen name='SouEmpreendora' component={SouEmpreendedora} options={{statusBarColor:'#DC0E7B', headerShown:false}}/>
            </Navigator>
        </NavigationContainer>
    )
}