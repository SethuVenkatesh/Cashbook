import {  Text, View,StyleSheet } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import { SafeAreaView } from 'react-native';
import CashBook from './CashBook';
import Help from './Help'
import Settings from './Settings'
import Passbook from './Passbook'

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function Home() {
  const Tab = createBottomTabNavigator();
    return (
      <SafeAreaView style={{flex:1,marginTop:35}}>
        <Tab.Navigator
           screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
              if (route.name === 'Cashbook') {
                iconName = focused
                  ? 'wallet'
                  : 'wallet-outline';
              }
              else if(route.name==='Passbook'){
                iconName = focused
                  ? 'card'
                  : 'card-outline';
              } 
              else if(route.name==='Help')
              {
                iconName = focused
                ? 'help-circle'
                : 'help-circle-outline';
              }
              else if (route.name === 'Settings') {
                iconName = focused ? 'settings' : 'settings-outline';
              }
             let Line=focused ? <Text style={styles.navBarSelected} ></Text> :<Text style={styles.navBarNotSelected}></Text>
              // You can return any component that you like here!
              return(
              <View style={styles.container}>
                {Line}
                <Text >
                  <Ionicons name={iconName} size={30} color={color} fontWeight="bold"/>
                </Text>
              </View>
              )
            },

            tabBarActiveTintColor: 'blue',
            tabBarInactiveTintColor: 'gray',
            tabBarLabelStyle:{
              fontSize:12,
              fontWeight:'500',
            }
            
          })}
          
        >
          <Tab.Screen
           name="Cashbook" 
           component={CashBook}  
           options={{
            title: 'Cash Book',
            headerStyle: {
              backgroundColor: '#4082ed',
              height:50,
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                marginTop:-25,
              fontWeight: '100',
            },
        }} />
          <Tab.Screen 
          name="Passbook" 
          component={Passbook} 
          options={{
            title: 'Passbook',
            headerStyle: {
              backgroundColor: '#4082ed',
              height:50,
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: '100',
              marginTop:-25,

            },
          }}
          />
          <Tab.Screen
           name="Help" 
           component={Help}
           options={{
            title: 'Help',
            headerStyle: {
              backgroundColor: '#4082ed',
              height:50,
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: '100',
              marginTop:-25,

            },
          }}
           />
          <Tab.Screen 
          name="Settings"
          component={Settings}
          options={{
          title: 'Settings',
            headerStyle: {
              backgroundColor: '#4082ed',
              height:50,
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: '100',
              marginTop:-25,
            },
            
          }}
           />
        </Tab.Navigator>
      </SafeAreaView>

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