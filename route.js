import {  Text, View,StyleSheet } from 'react-native';

import Register from './screens/Register';
import Login from './screens/Login';
import Home from './screens/Home';
import { useContext } from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { AuthContext } from './context/AuthContext';
import CashEntry from './screens/CashEntry';
import EntryDetails from './screens/EntryDetails';
const Stack = createNativeStackNavigator();
import Entries from './screens/Entries'
import UpdateEntry from './screens/UpdateEntry';
import QuestionPage from './screens/QuestionPage';
export default function Route() {
    const { user } = useContext(AuthContext);
    return (
        <NavigationContainer>
        <Stack.Navigator>
        {user ? (
            // Screens for logged in users
            <Stack.Group screenOptions={{ headerShown: false }}>
              <Stack.Screen name="Home" component={Home} />
            </Stack.Group>
          ) : (
            // Auth screens
            <Stack.Group screenOptions={{ headerShown: false }}>
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="Register" component={Register} />
            </Stack.Group>
          )}
          {/* Common modal screens */}
          <Stack.Group screenOptions={{ presentation: 'modal' }}>
            <Stack.Screen name="Entries" component={Entries} />
            <Stack.Screen name="CashEntry" component={CashEntry} />
            <Stack.Screen name="EntryDetails" component={EntryDetails} />
            <Stack.Screen name="UpdateEntry" component={UpdateEntry} />
            <Stack.Screen name="QuestionPage" component={QuestionPage} options={{ title: '' }}/>
          </Stack.Group>
        </Stack.Navigator>
      </NavigationContainer>
    );
}

const styles=StyleSheet.create({
  container:{
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
    position:'relative'
  },
  navBarSelected:{
    width:'100%',
    backgroundColor:'blue',
    position:'absolute',
    height:4,
    top:'-25%',
  },
  navBarNotSelected:{
    width:'100%',
    position:'absolute',
    height:4,
    top:'-25%',
  }
})