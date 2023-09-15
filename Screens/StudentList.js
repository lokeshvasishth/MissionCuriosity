import { View, Text, StyleSheet, Dimensions, StatusBar, Image, TextInput, TouchableOpacity, FlatList } from 'react-native'
import { React, useState, useEffect, useContext } from 'react'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import LinearGradient from 'react-native-linear-gradient'
import { Studentcontext } from '../App';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { TokenContext } from './AuthContext';
// import { useSelector, useDispatch, } from 'react-redux'

const { height, width } = Dimensions.get('window')

const StudentList = (props) => {
    const navigation = useNavigation()
    const [listData, setListData] = useState('')
    const [filter, setFilter] = useState(false)
    const [choosedate, setChoosedate] = useState(false)
    const [datadate, setDatadate] = useState()
    const [studentid, setStudentid] = useContext(Studentcontext)
    const avail = "Present"
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [mobilen, setMobilen] = useState('')
    const [id, setID] = useState('')
    const [availstudents, setavailstudents] = useState([])
    const [token, setToken]=useContext(TokenContext)
    useEffect(() => { scanData() }, [])

    const scanData = async (item) => {
        const result = await fetch('http://192.168.0.19:3000/presentstudents', {
            method: 'post',
            body: JSON.stringify({ avail }),
            headers: {
                'Content-Type': 'application/json'
            },
        })
        let resultt = await result.json()
        if (resultt) {
            setavailstudents(resultt)
            setListData(resultt)
        }
        else {
            console.log("not found")
        }
        console.log(availstudents)
    }
    const Logout=()=>{
        AsyncStorage.clear()
        setToken(null)
        props.navigation.navigate('Login')  
    }
    const SearchingData = (txt, txt2) => {
        if (!txt) {
            setavailstudents(listData)
            return;
        }
        let tempData = availstudents.filter(el => el.name.includes(txt));
        setavailstudents(tempData)
    }

    useEffect(() => { }, [SearchingData])
    return (
        <View style={styles.mainView}>
            <StatusBar barStyle="light-content" backgroundColor="black" />
            <Image source={require('../Images/logo.png')} style={
                styles.imageView
            } />
            <Text style={{
                color: 'white',
                fontSize: responsiveFontSize(2), alignSelf:'center', marginTop:responsiveHeight(1)
            }} >All Students List</Text>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: responsiveWidth(93),
                alignSelf: 'center',
                paddingTop: responsiveHeight(2),
                paddingBottom: responsiveHeight(1.5),
            }}>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                }}>
                    <Text style={{
                        color: 'white',
                        fontSize: responsiveFontSize(1.8),
                        marginRight: 5
                    }} >Export All</Text>
                    <TouchableOpacity >
                        <Image source={require('../Images/export.png')}
                            style={{
                                height: responsiveWidth(5),
                                width: responsiveWidth(5),
                                resizeMode: 'contain'
                            }}
                        />
                    </TouchableOpacity>
                </View>
                {/* <TouchableOpacity 
                onPress={()=>Logout()}
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                }}>
                    <Text style={{
                        color: 'white',
                        fontSize: responsiveFontSize(1.8),
                        marginRight: 5
                    }}>Log-Out</Text>
                    <Image source={require('../Images/logout.png')}
                        style={{ height: responsiveWidth(5), width: responsiveWidth(5), marginLeft:responsiveWidth(1) }} />
                </TouchableOpacity> */}
                <View style={{
                alignItems: 'center',
                justifyContent: 'space-between',
                alignSelf: 'center',
                paddingBottom: 9
            }}>
                 <TouchableOpacity
                    onPress={() => setFilter(!filter)}
                    style={{
                        flexDirection: 'row',
                        alignSelf:'flex-end'
                    }}>
                    <Text style={{
                        color: 'white',
                        fontSize: responsiveFontSize(1.8),
                        marginRight: 5
                    }} >Filter</Text>
                    <Image source={require('../Images/setting.png')}
                        style={{
                            height: responsiveWidth(4.5),
                            width: responsiveWidth(4.5),
                            resizeMode: 'contain',
                            tintColor: 'white',
                            marginLeft: 5
                        }}
                    />
                </TouchableOpacity>
                {filter ? <View>
                    <View style={{
                        width: responsiveWidth(72),
                        flexDirection: 'row',
                        justifyContent: 'center',
                        paddingRight: 10,
                        alignItems: 'center'
                    }}>
                        {/* <Text style={{color:'white', marginTop:responsiveHeight(1.5)}}>Enter Name/Mobile No.</Text> */}
                        <TextInput style={styles.txtInput} placeholder='Enter Name/Mobile No.' placeholderTextColor={'white'} onChangeText={(txt) => { SearchingData(txt) }} />
                        {/* <TouchableOpacity
                            onPress={() => setChoosedate(!choosedate)}
                            style={{
                                flexDirection: 'row'
                            }}>
                            <Text style={{ color: 'white' }}>Choose Date</Text>
                            <Image source={require('../Images/drop-down.png')}
                                style={{
                                    height: responsiveWidth(5),
                                    width: responsiveWidth(5),
                                    resizeMode: 'contain',
                                    tintColor: 'white',
                                    marginLeft: 5
                                }}
                            />
                        </TouchableOpacity> */}
                    </View>
                    {/* {choosedate ? <View>
                        <FlatList
                            data={[1, 1, 1]}
                            renderItem={({ item, index }) => {
                                return (
                                    <TouchableOpacity
                                        style={{
                                            borderColor: 'white',
                                            borderWidth: 1,
                                            width: responsiveWidth(30),
                                            height: responsiveHeight(4),
                                            marginTop: 5,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            alignSelf: 'flex-end'
                                        }}>
                                        <Text style={{
                                            color: 'white',
                                            fontSize: responsiveFontSize(1.8)
                                        }}> 02 Aug 2023</Text>
                                    </TouchableOpacity>
                                )
                            }}
                        />
                    </View> : null} */}
                </View> : null}
            </View>
            </View>
            <FlatList
                data={availstudents}
                contentContainerStyle={{ paddingBottom: responsiveHeight(5) }}
                renderItem={({ item, index }) => {
                    return (
                        <View style={styles.middleView}>
                            <View style={{
                                flexDirection: 'row',
                                marginTop: 10
                            }}>
                                <Text style={{
                                    color: 'white',
                                }}>Name :  </Text>
                                <Text style={{
                                    color: 'white',
                                }}>{item.name}</Text>
                            </View>
                            <View style={{
                                flexDirection: 'row',
                                marginTop: 10
                            }}>
                                <Text style={{
                                    color: 'white',
                                }}>Email :  </Text>
                                <Text style={{
                                    color: 'white',
                                }}>{item.email}</Text>
                            </View>
                            <View style={{
                                flexDirection: 'row',
                                marginTop: 10
                            }}>
                                <Text style={{
                                    color: 'white',
                                }}>Mob No. :  </Text>
                                <Text style={{
                                    color: 'white',
                                }}>+91 {item.mobile}</Text>
                            </View>
                            <View style={{
                                flexDirection: 'row',
                                marginTop: 10
                            }}>
                                <Text style={{
                                    color: 'white',
                                }}>Date & Time : </Text>
                                <Text style={{
                                    color: 'white',
                                }}>26 Aug, 2023</Text>
                            </View>
                        </View>
                    )
                }}
            />

            {/* <View style={{
                width: width,
                alignItems: 'center',
                marginTop: 10
            }}>
                <TouchableOpacity
                    onPress={() => scanData()}
                    style={styles.btnLogin}>
                    <LinearGradient
                        colors={['#4C86DA', '#D575ED']}
                        style={styles.linearGradient}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}>
                        <Text style={styles.btnlogintxt}>Show Data</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View> */}

            {/* <View style={{
                width: width,
                alignItems: 'center',
                marginTop: 10
            }}>
                <TouchableOpacity
                    onPress={() => props.navigation.navigate('Scanner')}
                    style={styles.btnLogin}>
                    <LinearGradient
                        colors={['#4C86DA', '#D575ED']}
                        style={styles.linearGradient}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}>
                        <Text style={styles.btnlogintxt}>Scan QR Code</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View> */}
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
    middleView: {
        width: responsiveWidth(93),
        backgroundColor: '#343434',
        paddingTop: responsiveHeight(0.5),
        paddingBottom: responsiveHeight(2),
        paddingLeft: responsiveWidth(4),
        paddingRight: responsiveWidth(4),
        borderRadius: 10,
        alignSelf: 'center',
        borderColor: 'white',
        borderWidth: 1,
        marginTop: 15
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
        width: responsiveWidth(80),
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
    },
    txtInput: {
        borderBottomColor: 'white',
        borderBottomWidth: 1,
        color: 'white',
        width: '80%',
        height: responsiveHeight(5),
        marginLeft:responsiveWidth(3)
    }
})

export default StudentList