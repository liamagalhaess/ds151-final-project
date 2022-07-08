import React, { useContext } from 'react';
import { View, Text, StyleSheet, ImageBackground, Image, TouchableOpacity} from 'react-native';
import {DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { AuthContext } from '../context/AuthContext';
import * as RootNavigation from "../../RootNavigation";
import { SessionContext } from '../context/SessionContext';


const CustomDrawer = (props) => {
 const { authState, signOut } = useContext(AuthContext);
 const { sessionState} = useContext(SessionContext);

 const logout = () => {
  signOut();
  RootNavigation.navigate("Login");
 }

 

  return(
    <View style={styles.firstView}>
      <DrawerContentScrollView contentContainerStyle={{backgroundColor: '#694fad'}}>
        <ImageBackground source={require("../../images/menu-bg.jpeg")} style={styles.bgImage}>
          <Image source={require("../../images/profile.png")} style={styles.profileImage} />
          
          {authState.signedIn  ?  <Text style={styles.profileText}>{sessionState.companyName}</Text>  : <Text style={styles.profileText}>Realize Login</Text>}
          {authState.signedIn  ?  <Text style={styles. profileSubText}>{sessionState.cnpj}</Text>  : null}
        
        
        </ImageBackground>
        <View style={styles.secondView}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <View style={styles.thirdView}>
        <TouchableOpacity style={styles.firstTouchable}  onPress={() => {logout()}}>
          <View style={styles.fourthView}>
            <Ionicons name='log-out-outline' size={22} />
            <Text style={styles.logoutText} >Logout</Text>
          </View>
        </TouchableOpacity>

      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  firstView:{
    flex: 1,
  },
  secondView:{
    flex:1,
    backgroundColor: "#fff",
    paddingTop: 15,
  },
  thirdView:{
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  fourthView:{
    flexDirection: 'row',
    alignItems: 'center',
  },
  bgImage:{
    padding:20,
  },
  profileImage:{
    height:80,
    width:80,
    borderRadius:40,
    marginBottom: 10,
  },
  profileText:{
    color:"#fff",
    fontSize:18,
  },
  profileSubText:{
    color:"#fff",
    fontSize:14,
  },
  logoutText:{
    fontSize: 15,
    marginLeft: 5
  },  
  firstTouchable:{
    paddingVertical:15,
  }
});
export default CustomDrawer;