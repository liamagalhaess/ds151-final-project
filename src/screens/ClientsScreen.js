import React, { useState, useEffect } from 'react';
import { Text, Input, Button} from 'react-native-elements';
import { StyleSheet, Modal, TouchableOpacity, Alert, View, FlatList, Pressable} from "react-native"; 
import deliveryApi from "../api/deliveryapi";
import Ionicons from '@expo/vector-icons/Ionicons'; 



const ClientsScreen = ({ navigation }) => {
  const [clients, setClients] = useState([]);
  const [alert, setAlert] = useState(false);
  
  async function getClients(){
    const responseClients = await deliveryApi.get("/client/listAllClientsByAssociate");
    if(responseClients){
      setClients(responseClients.data.clients);
    }
    
  }

  useEffect(() => {
    navigation.addListener('focus', () => {
      getClients();
    });

  }, []);


  async function deleteClient(id){
    try{
      await deliveryApi.delete(`/client/deleteClient?id=${id}`);  
      getClients();
    }catch(e){
      console.log(e);
    }
    setAlert(true);
    
  }


  if(clients.length == 0){
    return(
      <View>
        
          <Text style={{alignSelf: 'center', textAlignVertical: 'center'}}>No clients yet!</Text>
        
          <TouchableOpacity
            style={styles.add}
            onPress={() => navigation.navigate("NewClient")}
          >  
            <Ionicons name='add-circle' size={65} color='orange' />
          </TouchableOpacity>
      </View>
    )
  }  
  
  return(
    <View style={styles.container}>
      <View style={styles.centeredView} >
        <Modal 
          animationType="slide" 
          transparent={true} 
          visible={alert}
          onRequestClose={() => {setAlert(!alert)}}>
          
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalTextTitle} >Success!</Text>
              <Text style={styles.modalText} >Client deleted</Text>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setAlert(false)}
              >
              <Text style={styles.textStyle}>Fechar</Text>
            </Pressable>
            </View>
          </View>
         
         </Modal>
       </View>
      <View style={styles.grid}>
        <FlatList
          data={clients}
          keyExtractor={item => item.id}
          renderItem={({item}) => {
            return(              
              	<View style={styles.containerView}>
                  <View style={styles.containerTouchable}>
                    <TouchableOpacity onPress={() => {}}>
                      <Text style={styles.textLabel}>{item.companyName}</Text>
                      <Text style={styles.textContent}>Address: {item.address}</Text>  
                      <Text style={styles.textContent}>CNPJ: {item.cnpj}</Text>               
                    </TouchableOpacity>
                  </View>
                  
                  <TouchableOpacity 
                    style={styles.remove}
                    onPress={() => deleteClient(item.id)}
                  >  
                    <Ionicons name='trash-outline' size={35} color='black' />
                  </TouchableOpacity>
                </View>
            )
          }}
        >
        </FlatList>
        <View>
          <TouchableOpacity
            style={styles.add1}
            onPress={() => navigation.navigate("NewClient")}
          >  
            <Ionicons name='add-circle' size={65} color='orange' />
          </TouchableOpacity>
      </View> 
      </View>
      
     
    </View> 
  ) 
}
 
const styles = StyleSheet.create({


grid:{
    marginTop:10,
    marginBottom: 100
},

bottom: {
  flex: 1,
  justifyContent: 'flex-end',
  marginBottom: 36
},
container:{
  flex: 1,
},
containerView:{
    flex: 1,
    alignSelf: 'center',
    marginTop: 10,   
    padding: 5,
    borderRadius: 10,
    backgroundColor: 'white',
    borderColor: '#f0ddee',
    borderWidth: 2,
    alignContent: "center",
    width: 400,
    height: 105,

},
button: {
  borderRadius: 20,
  padding: 10,
  elevation: 2,
  width: 120,
  alignItems: 'center',
  justifyContent: 'center',
},
buttonClose: {
  backgroundColor: "#694fad",
},
modalText: {
  marginBottom: 15,
  textAlign: "center"
},
modalTextTitle: {
  marginBottom: 15,
  fontSize: 17,
  textAlign: "center",
  fontWeight: "bold"
},
textStyle:{
  color: "white"
},

containerTouchable:{
  marginRight: 50,
},

remove:{
  alignSelf: 'flex-end',
  marginTop: -55,
},

add:{
  marginTop:470,
  marginLeft:300

},

add1:{
  alignItems: 'flex-end',

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

viewAviso:{
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
},

modalView: {
  margin: 20,
  backgroundColor: "white",
  borderRadius: 20,
  borderWidth: 1,
  padding: 35,
  width: 320,
  height: 170,
  justifyContent: 'center',
  alignItems: "center",
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 2
  },
},
});


export default ClientsScreen;