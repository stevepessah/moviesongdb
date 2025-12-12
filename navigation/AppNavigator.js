import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import ResultsScreen from '../screens/ResultsScreen';
import { Platform, TouchableOpacity, Text } from 'react-native';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
       name="Results"
       component={ResultsScreen}
       options={({ navigation }) => ({
         title: '',
         headerLeft: () =>
           Platform.OS === 'web' ? (
             <TouchableOpacity onPress={() => navigation.goBack()} style={{ paddingLeft: 15 }}>
               <Text style={{ color: '#007AFF', fontSize: 16 }}>← Back</Text>
             </TouchableOpacity>
           ) : undefined,
         headerStyle: {
           backgroundColor: '#121212', // Black background
         },
         headerShadowVisible: false,
       })}
     />
   </Stack.Navigator>
  );
}
