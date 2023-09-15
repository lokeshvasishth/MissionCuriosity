import { View, Text, StyleSheet, Dimensions, StatusBar, Image, TextInput, TouchableOpacity, FlatList } from 'react-native'
import { React, useState, useEffect, useContext } from 'react'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import LinearGradient from 'react-native-linear-gradient'
import { useSelector, useDispatch, } from 'react-redux'
import { addCode } from './Action/Action'
import { StudentDa, Studentdatta } from './Data'
import AsyncStorage from '@react-native-async-storage/async-storage';

const { height, width } = Dimensions.get('window')

const Event = (props) => {
    // const auth =AsyncStorage.getItem('auth')
    const dispatch = useDispatch()

    const [dataa, setDataa] = useState('')
    // const CodeData = useSelector((state) => state.reducer)
    // console.log(CodeData)
    // console.log(props.route.params.DataFind.searchData)

    useEffect(() => {
        setDataa(CodeData)
        console.log(dataa)
    }, [CodeData])

    const CheckIn = item => {
        dispatch(addCode(item))
    }

    return (
        <View>

       {auth && <View style={styles.mainView}>
            <StatusBar barStyle="light-content" backgroundColor="black" />

            <Image source={require('../Images/logo.png')} style={
                styles.imageView
            } />

            <FlatList
                data={dataa}
                horizontal
                inverted
                initialScrollIndex={0}
                pagingEnabled
                renderItem={({ item, index }) => {
                    return (
                        <View style={styles.flatlistView}>
                            <View style={styles.middleView}>
                                <Text style={{
                                    fontSize: responsiveFontSize(2),
                                    alignSelf: 'center',
                                    color: '#D175EC',

                                }}>Event Name</Text>
                                <View style={{
                                    flexDirection: 'row',
                                    marginTop: 15,
                                    justifyContent: 'space-between'
                                }}>
                                    <Text style={{
                                        color: 'white'
                                    }}>ID:</Text>
                                    <Text style={{
                                        color: 'white'
                                    }}>{item.Id}</Text>
                                </View>

                                <View style={{
                                    flexDirection: 'row',
                                    marginTop: 15,
                                    justifyContent: 'space-between'
                                }}>
                                    <Text style={{
                                        color: 'white'
                                    }}>Date:</Text>
                                    <Text style={{
                                        color: 'white'
                                    }}>{item.Date}</Text>
                                </View>

                                <View style={{
                                    flexDirection: 'row',
                                    marginTop: 10,
                                    justifyContent: 'space-between'
                                }}>
                                    <Text style={{
                                        color: 'white'
                                    }}>Name:</Text>
                                    <Text style={{
                                        color: 'white'
                                    }}>{item.name}</Text>
                                </View>

                                <View style={{
                                    flexDirection: 'row',
                                    marginTop: 10,
                                    justifyContent: 'space-between'
                                }}>
                                    <Text style={{
                                        color: 'white'
                                    }}>Email:</Text>
                                    <Text style={{
                                        color: 'white'
                                    }}>{item.Email}</Text>
                                </View>

                                <View style={{
                                    flexDirection: 'row',
                                    marginTop: 10,
                                    justifyContent: 'space-between'
                                }}>
                                    <Text style={{
                                        color: 'white'
                                    }}>Mobile No.:</Text>
                                    <Text style={{
                                        color: 'white'
                                    }}>+91 {item.Mobno}</Text>
                                </View>
                                <View style={{
                                    width: responsiveWidth(75),
                                    alignItems: 'center',
                                    alignSelf: 'center',
                                    marginTop: responsiveHeight(3)
                                }}>
                                    <TouchableOpacity

                                        onPress={() => {
                                            CheckIn(item)
                                            props.navigation.navigate('StudentList')
                                        }}>
                                        <LinearGradient
                                            colors={['#4C86DA', '#D575ED']}
                                            style={styles.linearGradientchck}
                                            start={{ x: 0, y: 0 }}
                                            end={{ x: 1, y: 0 }}>
                                            <Text style={styles.btnlogintxt}>Check In</Text>
                                        </LinearGradient>
                                    </TouchableOpacity>

                                </View>
                            </View>
                        </View>
                    )
                }}
            />

            <View style={{
                width: responsiveWidth(90),
                alignItems: 'center',
                flexDirection: 'row',
                alignSelf: 'center',
                justifyContent: 'space-between'
            }}>

                <TouchableOpacity
                    onPress={() => props.navigation.navigate('Scanner')}
                    style={styles.btnQR}>
                    <Text style={styles.btnlogintxt}>QR Code</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => props.navigation.navigate('StudentList')}
                    style={styles.btnallList}>
                    <LinearGradient
                        colors={['#4C86DA', '#D575ED']}
                        style={styles.linearGradient}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}>
                        <Text style={styles.btnlogintxt}>All List</Text>
                    </LinearGradient>
                </TouchableOpacity>

            </View>
        </View>}
        </View>
    )
}

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
    flatlistView: {
        width:width
    },
    middleView: {
        width: responsiveWidth(93),
        backgroundColor: '#343434',
        paddingTop: responsiveHeight(2),
        paddingBottom: responsiveHeight(2),
        paddingLeft: responsiveWidth(4),
        paddingRight: responsiveWidth(4),
        borderRadius: 10,
        // marginTop: 15,
        alignSelf: 'center'
    },
    linearGradientchck: {
        height: responsiveHeight(6),
        width: responsiveWidth(75),
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    linearGradient: {
        height: responsiveHeight(6),
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    btnlogintxt: {
        fontSize: responsiveFontSize(2),
        color: 'white',
        fontWeight: '600'
    },
    btnQR: {
        width: '45%',
        height: responsiveHeight(6),
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#4F85DA',
        borderWidth: 1
    },
    btnallList: {
        width: '45%'
    }
})

export default Event