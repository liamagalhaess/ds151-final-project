import React, { useState, } from 'react';
import { Input, Button} from 'react-native-elements';
import { StyleSheet, View} from "react-native"; 
import deliveryApi from "../api/deliveryapi";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Icon from 'react-native-vector-icons/FontAwesome';    
import * as RootNavigation from "../../RootNavigation";


const NewClientScreen = ({ navigation }) => {
   
    const [companyName, setCompany] = useState("")
    const [cnpj, setCnpj] = useState("")
    const [address, setAddress] = useState("")  
    const [error, setError] = useState(false);
   

    const insets = useSafeAreaInsets();

    async function postClient(){
      try{
        const response = await deliveryApi.post("/client/newClient", {
          
            companyName: companyName,
            cnpj: cnpj,
            address: address,
        }); 
      }catch(err){
        console.log(err);
      }
      RootNavigation.navigate("Client");

    }
    
    return(
        <View style={styles.form}>        
        <View>
            <Input 
                label="Company Name"
                placeholder = "  Name"
                style = {styles.textInput} 
                leftIcon={
                    <Icon
                      style={{paddingRight: 10}} 
                      name='user'
                      size={21}
                      color='orange'
                    />
                }  
                onChangeText={(name) => setCompany(name)}         
            />
                        
            <Input 
                label="Cnpj"
                placeholder = "  xxxxxxxxxxxxxx"
                style = {styles.textInput}
                leftIcon={
                    <Icon
                      style={{paddingRight: 10}} 
                      name='pencil'
                      size={21}
                      color='orange'
                    />
                }   
                onChangeText={(t) => setCnpj(t)} 
            />
            <Input 
                label= "Adress"
                placeholder = "  Rua, 123"
                style = {styles.textInput}
                leftIcon={
                    <Icon
                      style={{paddingRight: 10}} 
                      name='map'
                      size={18}
                      color='orange'
                    />
                } 
                onChangeText={(ad) => setAddress(ad)}  
                       
            />               
        </View>
        <View style={styles.confirm}>      
          <Button
            buttonStyle={styles.buttonLogin}
            title="Confirmar"
            onPress={() => {postClient()} }
          />
        </View> 
        </View> 
    ) 
    
}

const styles = StyleSheet.create({


form:{
    flex: 1,
    padding: 12,
},

containerView:{
    flex: 1,
    //flexDirection: 'row',
    //left: 10,
    //top: 10,   
    padding: 5,
    borderRadius: 10,
    backgroundColor: 'white',
    borderColor: '#f0ddee',
    borderWidth: 2,
    alignContent: "center",
    width: 330,
    height: 105,
   // marginLeft: 15,
    //marginBottom: 10,
},

containerTouchable:{
  marginRight: 50,
},

buttonLogin: {
    backgroundColor: "orange",
    borderRadius: 20,
    padding: 10,
    marginTop: 50,
    width: 180,
    alignSelf: 'center'
  },

textLabel:{
    fontSize: 16,
    fontWeight: 'bold', 
    marginLeft: 10,
    color: '#803790'

},

textContent:{
    marginTop: 10,
    marginRight: 80,
    marginLeft: 10,
    fontSize: 13,
},

centeredView: {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  marginTop: 22
},
modalView: {
  margin: 20,
  backgroundColor: "white",
  borderRadius: 20,
  padding: 35,
  alignItems: "center",
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 2
  },
},
});


export default NewClientScreen;