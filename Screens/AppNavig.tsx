import { View, Text } from 'react-native';
import React, {createContext, useContext, useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './Login';
import AllEvents from './AllEvents';
import Scanner from './Scanner';
import StudentList from './StudentList';
import Event from './Event';
import Newqr from './Newqr';
import Exmpl from './Exmpl';

const stack = createNativeStackNavigator()
export const Studentcontext = createContext<any>(null);
function AppNavig(): JSX.Element{
  const [studentid, setStudentid]=useState('')
  return (
    <Studentcontext.Provider value={[studentid, setStudentid]}>
    <NavigationContainer>
      <stack.Navigator initialRouteName='Login' screenOptions={{
        headerShown:false
      }}>
        <stack.Screen name='Login' component={Login} /> 
        <stack.Screen name='AllEvent' component={AllEvents} /> 
        <stack.Screen name='Scanner' component={Scanner} /> 
        <stack.Screen name='Event' component={Event} /> 
        <stack.Screen name='StudentList' component={StudentList} /> 
        <stack.Screen name='QRScanner' component={Newqr} /> 
        <stack.Screen name='Example' component={Exmpl} /> 
      </stack.Navigator>
     </NavigationContainer>
     </Studentcontext.Provider>
  )
}

export default AppNavig