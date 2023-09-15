import { View, Text, StyleSheet, Dimensions, StatusBar, Image, TextInput, TouchableOpacity, Button } from 'react-native'
import React, { useEffect, useState, useContext } from 'react'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import LinearGradient from 'react-native-linear-gradient'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Modal from "react-native-modal";
import { TokenContext } from './AuthContext';
import { Studentcontext } from '../App';

const { height, width } = Dimensions.get('window')

const Login = (props) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showm, setShowm] = useState(false)
    const [newr, setNewr] = useState([])
    const [studentid, setStudentid]= useContext(Studentcontext)
    const[token, setToken]= useContext(TokenContext)
    // useEffect(() => {
    //     AsyncStorage.clear()
    //   },[]);
    const CheckData = async () => {
        const result = await fetch('http://192.168.0.19:3000/login', {
            method: 'post',
            body: JSON.stringify({ email, password }),
            headers: {
                'Content-Type': 'application/json'
            },
        })
        let resultt = await result.json()
        console.log(JSON.stringify(resultt, null, 2))
        if (resultt.auth) {
            // console.log(resultt)
            await AsyncStorage.setItem("user", JSON.stringify(resultt.user.name))
            await AsyncStorage.setItem("token", JSON.stringify(resultt.auth))
            const auth = await AsyncStorage.getItem('token')
            console.log(auth)
            // setStudentid(auth)
            setToken(auth)
            props.navigation.navigate('AllEvent')
        }
        else {
            setShowm(true)
        }
        // if (resultt == '') {
        //     console.log("Please Enter Correct Details")
        // }
        // else {
        //     <Modal
        //         visible={showm}
        //     >
        //         <View style={{ width: width, height: responsiveHeight(50), borderColor: 'black', borderWidth: 1 }}>
        //             <Text>{newr}</Text>
        //             <Button title='Close' onPress={() => setShowm(false)} />
        //         </View>
        //     </Modal>
        // }
        // if (!resultt) {
        //     console.warn("Please Enter Correct Details")
        //     console.log("Please Enter Correct Details")
        // }
        // else {
        //     AsyncStorage.setItem("user", JSON.stringify(resultt))
        //     console.log(resultt)
        //     // localStorage.setItem("user", JSON.stringify(resultt))
        //     // localStorage.setItem("token", JSON.stringify(resultt.auth))
        //     props.navigation.navigate('AllEvent')
        // }
    }
    return (
        <View style={styles.mainView}>
            <StatusBar barStyle="light-content" backgroundColor="black" />
            <Image source={require('../Images/logo.png')} style={
                styles.imageView
            } />
            <View style={styles.formView}>
                <Text style={styles.headingText}>Welcome!</Text>
                <View style={styles.emailView}>
                    <Text style={{
                        color: '#D075EC'
                    }}>Email</Text>
                    <TextInput placeholder='Email'
                        style={styles.inputView}
                        value={email}
                        onChangeText={(e) => setEmail(e)}
                    />
                    <Text style={{
                        color: '#D075EC'
                    }}>Password</Text>
                    <TextInput placeholder='Password'
                        secureTextEntry
                        style={styles.inputView}
                        value={password}
                        onChangeText={(e) => setPassword(e)}
                    />
                </View>
            </View>
            <View style={{
                width: width,
                alignItems: 'center'
            }}>
                <TouchableOpacity
                    onPress={() => {
                        CheckData()
                        console.log("Clicked")
                    }}
                    style={styles.btnLogin}>
                    <LinearGradient
                        colors={['#4C86DA', '#D575ED']}
                        style={styles.linearGradient}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}>
                        <Text style={styles.btnlogintxt}>Login</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>
            <Modal
                animationIn={'fadeIn'}
                animationOut={'fadeOut'}
                onBackButtonPress={() => setShowm(false)}
                onBackdropPress={() => setShowm(false)}
                style={{ marginLeft: 0, marginRight: 0 }}
                isVisible={showm}>
                <View style={{ width: responsiveWidth(80), paddingTop: responsiveHeight(5),paddingBottom:responsiveHeight(5), backgroundColor: '#343434', alignSelf: 'center', alignItems: 'center', justifyContent: 'center', borderRadius: responsiveWidth(5) }}>
                    <Image source={require('../Images/error.png')}
                    style={{height:responsiveWidth(12), width:responsiveWidth(12)}}/>
                    <Text style={{ fontSize: responsiveFontSize(2), color: 'white', textAlign: 'center',marginTop:responsiveHeight(2) }}>Wrong Credentials. Please enter valid credentials.</Text>
                    <TouchableOpacity
                        onPress={() => {
                            setShowm(false)
                        }}
                        style={styles.btnLogin}>
                        <LinearGradient
                            colors={['#4C86DA', '#D575ED']}
                            style={styles.linearGradient1}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}>
                            <Text style={styles.btnlogintxt}>OK.</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            </Modal>
        </View>
    )}

const styles = StyleSheet.create({
    mainView: {
        backgroundColor: 'black',
        height: height,
        width: width,
        justifyContent: 'space-between',
        paddingBottom: responsiveHeight(4)
    },
    imageView: {
        height: responsiveHeight(7),
        width: responsiveWidth(70),
        marginTop: responsiveHeight(4),
        alignSelf: 'center',
        resizeMode: 'contain'
    },
    formView: {
        width: width,
        alignItems: 'center',
        marginTop: responsiveHeight(-5)
    },
    headingText: {
        color: '#D075EC',
        fontSize: responsiveFontSize(4.5),
    },
    emailView: {
        width: responsiveWidth(80),
        marginTop: responsiveHeight(6)
    },
    inputView: {
        width: responsiveWidth(80),
        height: responsiveHeight(5.5),
        borderBottomColor: 'white',
        borderBottomWidth: 1,
        color: 'white',
        fontSize: responsiveFontSize(1.7),
        marginBottom: 20

    },
    linearGradient: {
        height: responsiveHeight(6),
        width: responsiveWidth(80),
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    btnLogin: {

    },
    btnlogintxt: {
        fontSize: responsiveFontSize(2),
        color: 'white',
        fontWeight: '600'
    },
    linearGradient1: {
        height: responsiveHeight(6),
        width: responsiveWidth(50),
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: responsiveHeight(2.5)
    },
})

export default Login