
import { View, Text } from 'react-native'
import React, { createContext, useState } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './Login';
import AllEvents from './AllEvents';
import Scanner from './Scanner';
import StudentList from './StudentList';
import Event from './Event';
import Newqr from './Newqr';
import Exmpl from './Exmpl';
import BottomTab from './BottomTab';

const stack = createNativeStackNavigator()
export const TokenContext = createContext<any>(null);
const AuthContext = () => {
  const [token, setToken] = useState(null)
  return (
    <>
      <TokenContext.Provider value={[token, setToken]}>
       {token !== null? <stack.Navigator initialRouteName='AllEvent' screenOptions={{
          headerShown: false
        }} >
          <stack.Screen name='AllEvent' component={AllEvents} />
          <stack.Screen name='BottamTab' component={BottomTab} />
          <stack.Screen name='QRScanner' component={Newqr} />
            {/* <stack.Screen name='Scanner' component={Scanner} />
            <stack.Screen name='Event' component={Event} />
            <stack.Screen name='StudentList' component={StudentList} />
            
            <stack.Screen name='Example' component={Exmpl} /> */}
         
          </stack.Navigator>:
          <stack.Navigator initialRouteName='Login' screenOptions={{
            headerShown: false
          }} >
            <stack.Screen name='Login' component={Login} />
        </stack.Navigator>
            }
          
      </TokenContext.Provider>
    </>
  )
}

export default AuthContext

