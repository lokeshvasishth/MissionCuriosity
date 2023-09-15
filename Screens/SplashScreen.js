import { View, Text, StyleSheet, Dimensions, StatusBar, Image } from 'react-native'
import React from 'react'
import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize
  } from "react-native-responsive-dimensions";

const { height, width } = Dimensions.get('window')

const SplashScreen = () => {
    return (
        <View style={styles.mainView}>
            <StatusBar barStyle="light-content" backgroundColor="#343434" />
            <View style={styles.secondView}>
                <Image source={require('../Images/logo.png')}
                style={styles.imagestyle}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    mainView: {
        backgroundColor: '#343434',
        height: height,
        width:width,
        justifyContent:'center',
        alignItems:'center'

    },
    secondView:{
marginTop:responsiveHeight(-10)
    },
    imagestyle:{
        height:responsiveHeight(10),
        width:responsiveWidth(93),
        resizeMode:'contain'

    }
})

export default SplashScreen