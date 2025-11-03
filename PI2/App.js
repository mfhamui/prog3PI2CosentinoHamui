import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import register from './src/screens/register';
import login from './src/screens/login';
import menu from './src/components/menu';
const Stack = createNativeStackNavigator();


export default function App() {
  return (
   
   <NavigationContainer>
     <Stack.Navigator>
        <Stack.Screen name="login" component={ login } options={ { headerShown: false } } />
        <Stack.Screen name="register" component={ register } options={ { headerShown: false } }  />
        <Stack.Screen name="menu" component={ menu } options={ { headerShown: false } }  />

      
     </Stack.Navigator>
   </NavigationContainer>

  );
}

