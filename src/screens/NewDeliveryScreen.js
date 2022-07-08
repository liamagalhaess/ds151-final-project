import React, { useState, useEffect } from 'react';
import {Input, Button} from 'react-native-elements';
import { StyleSheet, Modal, Alert, TextInput, View, ActivityIndicator, FlatList, Text } from "react-native"; 
import deliveryApi from "../api/deliveryapi"; 
import SelectDropdown from 'react-native-select-dropdown'
import * as RootNavigation from "../../RootNavigation";
import Ionicons from '@expo/vector-icons/Ionicons'; 



const NewDeliveryScreen = ({ navigation }) => {
  const [deliverymen, setDeliverymen] = useState([]);
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState({});
  const [selectedDeliveryman, setSelectedDeliveryman] = useState({});
  const [description, setDescription] = useState('');


  const getClients = async () => {
    try{
      let response = await deliveryApi.get("/client/listAllClientsByAssociate");
      if(response){
        setClients(response.data.clients);
      }
    }catch(err){
      console.log(err);
    }
  }
  const getDeliverymen = async () => {
    try{

      let response = await deliveryApi.get("/deliveryman/listAllDeliveryMenByAssociate");
      if(response){
        setDeliverymen(response.data.deliveryMen);
      }
    }catch(err){
      console.log(err);
    }
  }
  
  const createDelivery = async () => {
    try{
      await deliveryApi.post("/delivery/newDelivery", {
        description: description,
 	      clientId: selectedClient.id,
        deliveryManId: selectedDeliveryman.id
      });
    }catch(err){
      console.log(err);
    }
    RootNavigation.navigate("Pending");
  }

  useEffect(() => {
    getClients(); 
    getDeliverymen();
  },[]);

    return(
      <View style={styles.form}>
        <View>
          <Text style={styles.textLabel}>Client</Text>
          <SelectDropdown
            buttonStyle={styles.selectComponent}
            buttonTextStyle={styles.textButton}
	          data={clients}
	          onSelect={(selectedItem, index) => {
	           setSelectedClient(selectedItem)
          	}}
	          buttonTextAfterSelection={(selectedItem, index) => {
		          return selectedItem.companyName
          	}}
          	rowTextForSelection={(item, index) => {
		          return item.companyName
	          }}
          />    
          <Text style={styles.textLabel}>Deliveryman</Text>
          <SelectDropdown
            buttonStyle={styles.selectComponent}
            buttonTextStyle={styles.textButton}
	          data={deliverymen}
	          onSelect={(selectedItem, index) => {
	            	setSelectedDeliveryman(selectedItem)
          	}}
	          buttonTextAfterSelection={(selectedItem, index) => {
		          return selectedItem.name
          	}}
          	rowTextForSelection={(item, index) => {
		          return item.name
	          }}
          />  
        </View>
        <Text style={styles.textLabel}>Descrição</Text>
        <View style={styles.description}>
        <TextInput 
          placeholder="  Texto Texto Texto Texto"
          onChangeText={(text) => {setDescription(text)}}
        ></TextInput>
        </View>
        
        <Button buttonStyle={styles.buttonComponent} title="Criar" onPress={() => {createDelivery()}}></Button>
      </View>
    )

  
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  selectComponent:{
    backgroundColor:"white",
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'orange',
    width: 320,
    height: 45,

  },  
  form:{
    flex: 1,
    padding: 15,
  },  
  buttonComponent:{
    backgroundColor: "orange",
    borderRadius: 20,
    padding: 10,
    width: 150,
    alignSelf: 'center',
    marginTop: 10
  },
  textButton:{
    fontSize: 15,

  },
  textLabel:{
    fontSize: 18,
    fontWeight: 'bold',
    marginTop:10

  },
  
  description:{
    backgroundColor:"white",
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'orange',
    width: 320,
    height: 200,
  }

});

export default NewDeliveryScreen;