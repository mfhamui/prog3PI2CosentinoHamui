
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Comentar from './Comentar';
const Stack = createNativeStackNavigator();

function NavegacionComentar() {
  return (

    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Comentar" component={Comentar} options={{ headerShown: false }} />

      </Stack.Navigator>
    </NavigationContainer>

  );
}
export default NavegacionComentar;