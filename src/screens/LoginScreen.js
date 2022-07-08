import React, { useContext, useState, useEffect } from 'react';
import { Text, Input, Button} from 'react-native-elements';
import { StyleSheet, Modal, Alert, Pressable, View, ActivityIndicator, Image } from "react-native";  
import { AuthContext } from '../context/AuthContext';
import { SessionContext } from '../context/SessionContext';
import Icon from 'react-native-vector-icons/FontAwesome'; 



const LoginScreen = ({ navigation }) => {
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const { authState, signIn, tryLocalSignIn} = useContext(AuthContext);
  const { sessionState, sessionSignIn} = useContext(SessionContext);
  
  const login = async (username, password) => {
    setLoading(true);
    await signIn({username, password});
    await sessionSignIn();
  }

  

  useEffect(() => {
    if(authState.signedIn){
      sessionSignIn();
      setLoading(false);
      navigation.navigate("Home");
    }
  },[authState.signedIn]);

  useEffect(() => {
    if(authState.error){
      setLoading(false)
      setError(true);
    }
  }, [authState.error]);

  useEffect(() => {
    tryLocalSignIn();
  },[]);
  return(
    <View>
      {/* Modal de Loading */}
      <View style={styles.centeredView} >
        <Modal 
          animationType="slide" 
          transparent={true} 
          visible={loading}
          onRequestClose={() => {setLoading(!loading)}}>
          
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <ActivityIndicator size="large" color="#694fad" />
              <Text style={styles.modalText} >Autenticando...</Text>
            </View>
          </View>
         
         </Modal>
       </View>

      {/* Modal de Erro de Autentica��o */}
       <View style={styles.centeredView} >
        <Modal 
          animationType="slide" 
          transparent={true} 
          visible={error}
          onRequestClose={() => {setError(false)}}>
          
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalTextTitle} >Erro</Text>
              <Text style={styles.modalText} >{authState.errorMsg}</Text>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setError(false)}
              >
              <Text style={styles.textStyle}>Fechar</Text>
            </Pressable>
            </View>
          </View>
         
         </Modal>
       </View>

      {/* Corpo da Tela */}
      <View style={styles.centeredBody} >
        <View style={styles.imagem}>
          <Image style={styles.imagem} source={require('../../images/logoapi.png') } />
        </View>
        <Input
          placeholder="  cnpj"
          onChangeText={(value) => setUsername(value)}
          value={username}
          leftIcon={
            <Icon
              name='user'
              size={25}
              color='#694fad'
            />
          }
        />
        <Input
          placeholder="  password"
          onChangeText={(value) => setPassword(value)}
          value={password}
          secureTextEntry={true}
          leftIcon={
            <Icon
              name='lock'
              size={25}
              color='#694fad'
            />
          }
        />
        <Button
          buttonStyle={styles.buttonLogin}
          title="Login"
          onPress={() => {
            login(username, password)
          }}
        />
      </View>
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
  centeredBody: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',

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
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonLogin: {
    backgroundColor: "#694fad",
    borderRadius: 20,
    padding: 10,
    width: 150,
    alignSelf: 'center'
  },
  buttonClose: {
    backgroundColor: "#694fad",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  modalTextTitle: {
    marginBottom: 15,
    textAlign: "center",
    fontWeight: "bold"
  },
  container:{
    alignItems: 'center',
    justifyContent: 'center',

  },
  imagem:{
    alignSelf: 'center',
    width: 250,
    height: 200,

  },
});

export default LoginScreen;