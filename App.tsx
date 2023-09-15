import { View, Text } from 'react-native'
import React, { createContext, useContext, useState } from 'react'

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './Screens/Login';
import AllEvents from './Screens/AllEvents';
import Scanner from './Screens/Scanner';
import Event from './Screens/Event';
import StudentList from './Screens/StudentList';
import Newqr from './Screens/Newqr';
import Exmpl from './Screens/Exmpl';
import AuthContext from './Screens/AuthContext';



const stack = createNativeStackNavigator()
export const Studentcontext = createContext<any>(null);
function App(): JSX.Element {
  const [studentid, setStudentid] = useState('')
  return (
    <>
      <Studentcontext.Provider value={[studentid, setStudentid]}>

        <NavigationContainer>
          <AuthContext />
        </NavigationContainer>
      </Studentcontext.Provider>
    </>
    
  )
}

export default App