import React, { useState, useEffect } from 'react';
import { Text, Input, Button} from 'react-native-elements';
import { StyleSheet, Modal, Alert, Pressable, View, ActivityIndicator, FlatList, TouchableOpacity, SafeAreaView } from "react-native"; 
import deliveryApi from "../api/deliveryapi"; 


const DeliveredScreen = ({ navigation }) => {
  const [deliveries, setDeliveries] = useState([]);


  async function getDeliveries(){
    const response = await deliveryApi.get("/delivery/listAllDeliveredByAssociate");
    if(response.data.deliveries){
      setDeliveries(response.data.deliveries);
    }

  }

  useEffect(() => {
    navigation.addListener('focus', () => {
      getDeliveries();
    });
  }, []);


  if(deliveries.length == 0){
    return(
      <View style={styles.viewAviso}>
        <Text>No deliveries yet!</Text>
      </View>
    )
  }
  return(
    <SafeAreaView>
      <View style={styles.grid}>
        <FlatList
          data={deliveries}
          keyExtractor={item => item.id}
          renderItem={({item}) => {
            return(
              
                <View style={styles.containerView}>
                <TouchableOpacity style={styles.container} onPress={() => {}}>
                  <Text style={styles.textLabel}>Descrição</Text>
					        <Text style={styles.textContent}>{item.description}</Text>
                  <Text style={styles.textLabel}>Valor</Text>
                  <Text style={styles.textContent}>{item.value}</Text>
                  <Text style={styles.textLabel}>Data</Text>
                  <Text style={styles.textContent}>{item.deliveredAt}</Text>
                </TouchableOpacity>
                
              </View>
              	
            )
          }}
        >

        </FlatList>
      </View>
    </SafeAreaView>
  
  )
  
}

const styles = StyleSheet.create({
  grid:{
    marginBottom: 50,
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
  
  container:{
    flex: 1,
  },

  viewAviso:{
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  }, 

  itemView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
  },

  textView:{
    fontWeight: "bold",
    fontSize: 20,
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
    height: 200,
    
},


textLabel:{
    fontSize: 16,
    fontWeight: 'bold', 
    marginLeft: 10,
    marginTop: 8,
    color: '#803790'

},

textContent:{
    marginTop: 5,
    marginRight: 80,
    marginLeft: 10,
    fontSize: 13,
},
});

export default DeliveredScreen;