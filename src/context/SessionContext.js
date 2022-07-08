import React, { createContext, useReducer} from "react";
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as RootNavigation from "../../RootNavigation";
import deliveryApi from "../api/deliveryapi";

const SessionContext = createContext(null);

function sessionReducer(state,action){

  switch(action.type){
    case "signIn":
      return({
        ...state,
        id: action.payload.id,
        companyName: action.payload.companyName,
        cnpj: action.payload.cnpj,
        address: action.payload.address,
      });
    case "signOut":
      return([...state, {id: '',
      companyName: '',
      cnpj: '',
      address: ''}]);
    default:
      return({...state});
  }
}


const SessionProvider = ({children}) => {
  const [sessionState, dispatch] = useReducer(sessionReducer, {
    id: '',
    companyName: '',
    cnpj: '',
    address: '',
  })

  const sessionSignIn = async () => {
  
      try{
        const response = await deliveryApi.get('associate/findAssociateById');

        dispatch({type: 'signIn', payload:{id: response.data.associate.id, companyName: response.data.associate.companyName, cnpj: response.data.associate.cnpj, address: response.data.associate.address}});

      }catch(err){
     
        console.log(err);
      }
      
  };

  const sessionSignOut = async ({id}) => {
    dispatch({type: 'signOut', payload:{id: id}})
    await AsyncStorage.removeItem('session');
};
  
  return(
    <SessionContext.Provider value={{sessionState, sessionSignIn, sessionSignOut}}>
      {children}
    </SessionContext.Provider>
  )
};

export {SessionContext, SessionProvider}