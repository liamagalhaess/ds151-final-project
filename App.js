import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import LoginScreen from './src/screens/LoginScreen';
import { AuthProvider } from './src/context/AuthContext';
import { navigationRef } from './RootNavigation';
import ClientsScreen from './src/screens/ClientsScreen';
import DeliveredScreen from './src/screens/DeliveredScreen';
import NewClientScreen from './src/screens/NewClientScreen';
import PendingDeliveriesScreen from './src/screens/PendingDeliveriesScreen';
import CustomDrawer from './src/components/CustomDrawer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SessionProvider } from './src/context/SessionContext';
import NewDeliveryScreen from './src/screens/NewDeliveryScreen';
import DeliveryMenScreen from './src/screens/DeliveryMenScreen';
import NewDeliveryMenScreen from './src/screens/NewDeliveryMenScreen';

const Tab = createMaterialBottomTabNavigator();
const Drawer = createDrawerNavigator();
const TopTab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();


function Deliveries(){
  return(
   <TopTab.Navigator>
     <TopTab.Screen name="Pending" component={PendingDeliveriesScreen}></TopTab.Screen>
     <TopTab.Screen name="New Delivery" component={NewDeliveryScreen} />
     <TopTab.Screen name="Delivered" component={DeliveredScreen}></TopTab.Screen>
   </TopTab.Navigator>
  )
}

//teste
function Clients(){
  return(
    <Stack.Navigator initialRouteName="Clients" screenOptions={{
      headerShown: false       
    }}>
      <Stack.Screen name="Client" component={ClientsScreen} />
      <Stack.Screen name="NewClient" component={NewClientScreen} />
    </Stack.Navigator>
  )
}

function Deliveryman(){
  return(
    <Stack.Navigator initialRouteName="DeliveryMen" screenOptions={{
      headerShown: false       
    }}>
      <Stack.Screen name="DeliveryMen" component={DeliveryMenScreen} />
      <Stack.Screen name="NewDeliveryMen" component={NewDeliveryMenScreen} />
    </Stack.Navigator>
  )
}

function Home(){
  return(
    <Tab.Navigator
      activeColor="#f0edf6"
      inactiveColor="#3e2465"
      barStyle={{ backgroundColor: '#694fad' }}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Deliveries') {
            iconName = focused
              ? 'ios-paper-plane'
              : 'ios-paper-plane-outline';
          }else if (route.name === 'Deliverymen'){
            iconName = focused
              ? 'ios-bicycle'
              : 'ios-bicycle-outline';
          } else if( route.name === 'Clients'){
            iconName = focused
              ? 'ios-people'
              : 'ios-people-outline';
          }

          size = 20;
          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
        
          <Tab.Screen name="Clients" component={Clients} />
          <Tab.Screen name="Deliveries" component={Deliveries} />
          <Tab.Screen name="Deliverymen" component={Deliveryman} />    
        
    </Tab.Navigator>    
  )
}


export default function App() {
  return (
    <AuthProvider>
      <SessionProvider>
        <NavigationContainer ref={ navigationRef}>
          <Drawer.Navigator 
            drawerContent={ props => <CustomDrawer {...props} />}  
            screenOptions={{
            
              drawerActiveBackgroundColor: '#694fad',
              drawerActiveTintColor: '#fff',
              drawerInactiveTintColor: '#333'
            }}
            initialRouteName="Login"
          >
            <Drawer.Screen name="Home" component={Home} options={{
              drawerIcon: ({ color }) => (
                <Ionicons name='home-outline' size={22} color={color} />

              )
            }}/>
            <Drawer.Screen options={{headerShown: false}} name="Login" component={LoginScreen}options={{
              drawerIcon: ({ color }) => (
                <Ionicons name='log-in-outline' size={22} color={color} />

              )
            }}/>

          </Drawer.Navigator>
        </NavigationContainer>
      </SessionProvider>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
