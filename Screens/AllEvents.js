import { View, Text, StyleSheet, Dimensions, StatusBar, Image, TextInput, TouchableOpacity, FlatList } from 'react-native'
import React, {useContext} from 'react'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import LinearGradient from 'react-native-linear-gradient'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Studentcontext } from '../App';
import { TokenContext } from './AuthContext';

const { height, width } = Dimensions.get('window')

const AllEvents = (props) => {
 const [studentid, setStudentid]=useContext(Studentcontext)
 const [token, setToken]= useContext(TokenContext)
    return (
        <View style={styles.mainView}>
            <StatusBar barStyle="light-content" backgroundColor="black" />

            <Image source={require('../Images/logo.png')} style={
                styles.imageView
            } />

            <View style={styles.allEvntmain}>
                <Text style={styles.headingTxt}>All Events</Text>
                <FlatList
                    style={{
                        height:responsiveHeight(57)
                    }}
                    data={[1, 1, 1]}
                    renderItem={({ item, index }) => {
                        return (
                            <View style={styles.allevntView}>
                                <View style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between'
                                }}>
                                    <Text style={{
                                        color: '#D275EC',
                                        fontSize: responsiveFontSize(1.7)
                                    }}>Event Name</Text>

                                    <Text style={{
                                        color: 'white'
                                    }}>26 July 2023</Text>
                                </View>

                                <Text style={{
                                    color: 'white',
                                    marginTop: 7
                                }}>
                                    Timing 9:00 am to 5:00pm
                                </Text>

                                <Text style={{
                                    color: 'white',
                                    fontWeight: '200',
                                    marginTop: 7
                                }}>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
                                   </Text>
                            </View>
                        )
                    }}
                />
            </View>
            <View style={{
                width: width,
                alignItems: 'center'
            }}>
                <TouchableOpacity 
                onPress={()=>{props.navigation.navigate('BottamTab')
            console.log(`Auth is ${token}`)}}
                style={styles.btnLogin}>
                    <LinearGradient
                        colors={['#4C86DA', '#D575ED']}
                        style={styles.linearGradient}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}>
                        <Text style={styles.btnlogintxt}>Next</Text>
                    </LinearGradient>
                </TouchableOpacity>

            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    mainView: {
        backgroundColor: 'black',
        height: height,
        width: width,
        justifyContent:'space-between',
        paddingBottom: responsiveHeight(4)
    },
    imageView: {
        height: responsiveHeight(7),
        width: responsiveWidth(70),
        marginTop: responsiveHeight(4),
        alignSelf: 'center',
        resizeMode: 'contain'
    },
    allEvntmain: {
        width: responsiveWidth(93),
        alignSelf: 'center',
        alignItems: 'center',


    },
    headingTxt: {
        fontSize: responsiveFontSize(2.7),
        color: '#D075EC',
        fontWeight: '500'
    },
    allevntView: {
        width: responsiveWidth(93),
        backgroundColor: '#343434',
        paddingTop: responsiveHeight(2),
        paddingBottom: responsiveHeight(2),
        paddingLeft: responsiveWidth(4),
        paddingRight: responsiveWidth(4),
        borderRadius: 10,
        marginTop: 15
    },
    linearGradient: {
        height: responsiveHeight(6),
        width: responsiveWidth(80),
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    btnlogintxt: {
        fontSize: responsiveFontSize(2),
        color: 'white',
        fontWeight: '600'
    }
})
export default AllEvents