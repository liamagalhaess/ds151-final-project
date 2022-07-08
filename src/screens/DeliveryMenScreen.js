import React, { useState, useEffect } from 'react';
import { Text, Input, Button} from 'react-native-elements';
import { StyleSheet, Modal, TouchableOpacity, Alert, Pressable, View, ActivityIndicator, FlatList } from "react-native"; 
import deliveryApi from "../api/deliveryapi";
import Ionicons from '@expo/vector-icons/Ionicons'; 



const DeliveryMenScreen = ({ navigation }) => {
  const [DeliveryMen, setDeliveryMen] = useState([]);
  const [alert, setAlert] = useState(false);
  
  async function getDeliveryMen(){
    const responseDeliveryMen = await deliveryApi.get("/deliveryman/listAllDeliveryMenByAssociate");
    if(responseDeliveryMen.data.deliveryMen){
      setDeliveryMen(responseDeliveryMen.data.deliveryMen);
    }
    //console.log(DeliveryMen)
  }

  useEffect(() => {
    navigation.addListener('focus', () => {
      getDeliveryMen();
    });
      
  }, []);


  async function deleteDeliveryMen(id){
    try{
      await deliveryApi.delete(`deliveryMan/deleteDeliveryman?id=${id}`);  
      getDeliveryMen();
    }catch(e){
      console.log(e);
    }
    setAlert(true);
    
  }


  if(DeliveryMen.length == 0){
    return(
      <View>
        
          <Text style={{alignSelf: 'center', textAlignVertical: 'center'}}>No DeliveryMens yet!</Text>
        
          <TouchableOpacity
            style={styles.add}
            onPress={() => navigation.navigate("NewDeliveryMen")}
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
              <Text style={styles.modalText} >Deliveryman deleted</Text>
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
          data={DeliveryMen}
          keyExtractor={item => item.id}
          renderItem={({item}) => {
            return(              
              	<View style={styles.containerView}>
                  <View style={styles.containerTouchable}>
                    <TouchableOpacity onPress={() => {}}>
                      <Text style={styles.textLabel}>{item.name}</Text>  
                      <Text style={styles.textContent}>Phone: {item.phone}</Text> 
                      <Text style={styles.textContent}>Cpf: {item.cpf}</Text>               
                    </TouchableOpacity>
                  </View>
                  
                  <TouchableOpacity 
                    style={styles.remove}
                    onPress={() => deleteDeliveryMen(item.id)}
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
            onPress={() => navigation.navigate("NewDeliveryMen")}
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
    marginBottom: 82
},

containerView:{
    flex: 1,
    alignSelf: 'center',
    marginTop: 5,   
    padding: 8,
    borderRadius: 10,
    backgroundColor: 'white',
    borderColor: 'orange',
    borderWidth: 1,
    alignContent: "center",
    width: 400,
    height: 102,

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
container:{
  flex: 1,
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


export default DeliveryMenScreen;