import React, { createContext, useReducer} from "react";
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as RootNavigation from "../../RootNavigation";


const AuthContext = createContext(null);

function authReducer(state,action){
 
  switch(action.type){
    case "signIn":
      return({
        ...state,
        signedIn: true,
        error: false,
        access_token: action.payload
      });
    case "error":
      return({
        ...state,
        error: true,
        errorMsg: action.payload
      });
    case "signOut":
      return({
        ...state,
        signedIn: false,
        access_token: null
      })
    default:
      return({...state});
  }
}


const AuthProvider = ({children}) => {
  const [authState, dispatch] = useReducer(authReducer, {
    signedIn: false,
    access_token: null,
    error: false,
    errorMsg: ''
  })

  const tryLocalSignIn = async () => {
    const access_token = await AsyncStorage.getItem('access_token');
    if(access_token){
      dispatch({type: 'signIn', paylod: access_token});
    }else{
      dispatch({type: 'signOut'});
      RootNavigation.navigate("Login");
    }
  };

  const signIn = async ({username, password}) => {
    try{
      const response = await axios({
        method: 'post',
        url: 'https://ds151-api.herokuapp.com/associate/authentication',
        data:{
          cnpj: username,
          password
        }
      });

      await AsyncStorage.setItem('access_token', response.data.access_token);
      dispatch({type: 'signIn', paylod: response.data.access_token});

    }catch(err){
      console.log(err)
      dispatch({type:'error', payload: 'Problemas para autenticar usuario, por favor, tente novamente!'});

    }
  };
  
  const signOut = async() => {
    
    dispatch({type:'signOut'});
    await AsyncStorage.removeItem('access_token');
  
  };
  
  return(
    <AuthContext.Provider value={{authState, signIn, tryLocalSignIn, signOut}}>
      {children}
    </AuthContext.Provider>
  )
};

export {AuthContext, AuthProvider}