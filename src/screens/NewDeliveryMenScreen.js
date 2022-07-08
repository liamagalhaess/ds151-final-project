import React, { useState, } from 'react';
import { Input, Button} from 'react-native-elements';
import { StyleSheet, View} from "react-native"; 
import deliveryApi from "../api/deliveryapi";
import Icon from 'react-native-vector-icons/FontAwesome';    
import * as RootNavigation from "../../RootNavigation";


const NewDeliveryMenScreen = ({ navigation }) => {
   
    const [name, setName] = useState("")
    const [cpf, setCpf] = useState("")
    const [password, setPassword] = useState("") 
    const [phone, setPhone] = useState("")  


    async function postDeliveryMen(){
      try{
        const response = await deliveryApi.post("/deliveryMan/newDeliveryMan", {
          name: name,
          cpf: cpf,
          password: password,
          phone: phone
        }); 
      }catch(err){
        console.log(err);
      }
      RootNavigation.navigate("DeliveryMen");

    }
    
    return(
        <View style={styles.form}>        
        <View>
            <Input 
                label="Name"
                placeholder = " Name"
                style = {styles.textInput} 
                leftIcon={
                    <Icon
                      style={{paddingRight: 10}} 
                      name='user'
                      size={21}
                      color='orange'
                    />
                }  
                onChangeText={(name) => setName(name)}         
            />
                        
            <Input 
                label="CPF"
                placeholder = " xxxxxxxxxxx"
                style = {styles.textInput}
                leftIcon={
                    <Icon
                      style={{paddingRight: 10}} 
                      name='pencil'
                      size={21}
                      color='orange'
                    />
                }   
                onChangeText={(t) => setCpf(t)} 
            />
            <Input 
                label= " Phone"
                placeholder = " (XX) XXXXX-XXXX"
                style = {styles.textInput}
                leftIcon={
                    <Icon
                      style={{paddingRight: 10}} 
                      name='phone'
                      size={18}
                      color='orange'
                    />
                } 
                onChangeText={(ad) => setPhone(ad)}  
                       
            />
            <Input 
                label= " Password"
                placeholder = " XXXXXXX"
                secureTextEntry={true}
                style = {styles.textInput}
                leftIcon={
                    <Icon
                      style={{paddingRight: 10}} 
                      name='lock'
                      size={18}
                      color='orange'
                    />
                } 
                onChangeText={(ad) => setPassword(ad)}  
                       
            />               
        </View>
        <View style={styles.confirm}>      
          <Button
            buttonStyle={styles.buttonLogin}
            title="Confirmar"
            onPress={() => {postDeliveryMen()} }
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


export default NewDeliveryMenScreen;