import { View, Text, Image } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Scanner from './Scanner'
import StudentList from './StudentList'
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'

const BottomTab = () => {
    const bottamstck = createBottomTabNavigator()
    return (
        <bottamstck.Navigator screenOptions={{
            tabBarStyle: { height: responsiveHeight(7.5), backgroundColor: '#1D1D1D', paddingTop: responsiveHeight(1) },
            tabBarShowLabel: false,
            headerShown: false,
        }}>
            <bottamstck.Screen name='Scan&Number' component={Scanner}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={{
                            height: responsiveHeight(7.5)
                        }}>
                            {focused ? <Image source={require('../Images/scanner.png')}
                                style={{
                                    height: responsiveWidth(6),
                                    width: responsiveWidth(6),
                                    alignSelf: 'center',
                                    marginTop: 5, tintColor: '#D575ED'
                                }}
                            /> : <Image source={require('../Images/scan.png')}
                                style={{
                                    height: responsiveWidth(6),
                                    width: responsiveWidth(6),
                                    alignSelf: 'center',
                                    marginTop: 5,
                                    tintColor: 'white'
                                }}
                            />}
                            <Text style={{
                                color: focused ? '#D575ED' : 'white',
                                alignSelf: 'center',
                                textAlign: 'center'
                            }}>
                                Scan Code
                            </Text>

                        </View>
                    )
                }} />
            <bottamstck.Screen name='StudentList' component={StudentList}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={{
                            height: responsiveHeight(7.5)
                        }}>
                            {focused ? <Image source={require('../Images/listactv.png')}
                                style={{
                                    height: responsiveWidth(6),
                                    width: responsiveWidth(6),
                                    alignSelf: 'center',
                                    marginTop: 5, tintColor: '#D575ED'
                                }}
                            /> : <Image source={require('../Images/list.png')}
                                style={{
                                    height: responsiveWidth(6),
                                    width: responsiveWidth(6),
                                    alignSelf: 'center',
                                    marginTop: 5,
                                    tintColor: 'white'
                                }}
                            />}
                            <Text style={{
                                color: focused ? '#D575ED' : 'white',
                                alignSelf: 'center',
                                textAlign: 'center'
                            }}>
                                Student's List
                            </Text>
                        </View>
                    )
                }} />
        </bottamstck.Navigator>
    )
}

export default BottomTab