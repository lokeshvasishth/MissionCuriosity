import { View, Text, StyleSheet, Dimensions, StatusBar, Image, TextInput, TouchableOpacity, FlatList } from 'react-native'
import { React, useEffect, useState, useContext } from 'react'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import LinearGradient from 'react-native-linear-gradient'
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import { StudentDa, Studentdatta } from './Data'
import Modal from "react-native-modal";
import { useSelector, useDispatch, } from 'react-redux'
import { addCode } from './Action/Action';
import { Studentcontext } from '../App';

const { height, width } = Dimensions.get('window')

const Scanner = (props) => {
    const date = new Date().getDate()
    const month = new Date().getMonth() + 1
    const year = new Date().getFullYear()
    const hour = new Date().getHours()
    const mins = new Date().getMinutes()
    const [modalV, setaModalV] = useState(false)
    const [qrScan, setQrscan] = useState(true)
    const [mobno, setMobno] = useState(false)
    const [search, setSearch] = useState(Studentdatta)
    const [nullmodal, setNullmodal] = useState(false)
    const [mobile, setMobile] = useState('')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [mobilen, setMobilen] = useState('')
    const [id, setID] = useState('')
    const [avail, setAvail] = useState('')
    const [cnfrm, setCnfrm] = useState(false)

    const scanData = async (item) => {
        const result = await fetch('http://192.168.0.19:3000/findstudents', {
            method: 'post',
            body: JSON.stringify({ mobile }),
            headers: {
                'Content-Type': 'application/json'
            },
        })
        let resultt = await result.json()
        console.log(JSON.stringify(resultt, null, 2))
        let newr = JSON.stringify(resultt)
        if (resultt._id) {
            setID(resultt._id)
            setName(resultt.name)
            setMobilen(resultt.mobile)
            setEmail(resultt.email)
            setAvail(resultt.avail)
            setaModalV(true)
        }
        else {
            setNullmodal(true)
        }
    }

    const handleGetChekinStatus = () => {
        if (avail == "Not Present") {
            return "Present"
        }
        else {
            return 'Present'
        }
    }
    const UpdateData = async () => {
        const result = await fetch(`http://192.168.0.19:3000/findstudent/${id}`, {
            method: 'put',
            body: JSON.stringify({ avail: handleGetChekinStatus() }),
            headers: {
                'Content-Type': 'application/json'
            },
        })
        let resultt = await result.json()
        console.log(resultt)
        setCnfrm(true)

        if (resultt.message) {
            scanData()
        }
    }
    return (
        <View style={styles.mainView}>
            <StatusBar barStyle="light-content" backgroundColor="black" />
            <View>
                <Image source={require('../Images/logo.png')} style={
                    styles.imageView
                } />
                <View style={styles.toggleView}>
                    <TouchableOpacity
                        onPress={() => {
                            setQrscan(true)
                            setMobno(false)
                        }}
                        style={{
                            width: '50%',
                            height: 45,
                            backgroundColor: qrScan ? '#D075EC' : 'white',
                            borderTopLeftRadius: 20,
                            borderBottomLeftRadius: 20,
                            borderTopRightRadius: qrScan ? 30 : null,
                            justifyContent: 'center'
                        }}>
                        <Text style={{
                            color: qrScan ? 'white' : '#D075EC',
                            fontSize: responsiveFontSize(1.8),
                            fontWeight: '600',
                            textAlign: 'center'
                        }}>Scan QR code</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            setMobno(true)
                            setQrscan(false)
                        }}
                        style={{
                            width: '50%',
                            height: 45,
                            justifyContent: 'center',
                            backgroundColor: mobno ? '#D075EC' : 'white',
                            borderTopLeftRadius: mobno ? 30 : null,
                            borderTopRightRadius: 20,
                            borderBottomRightRadius: 20

                        }}>
                        <Text style={{
                            color: mobno ? 'white' : '#D075EC',
                            fontSize: responsiveFontSize(1.8),
                            fontWeight: '600',
                            textAlign: 'center'
                        }}>Enter mobile No.</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{ marginTop: responsiveHeight(-5) }}>
                {qrScan ? <View style={styles.allEvntmain}>
                    <Text style={styles.headingTxt}>Scan QR Code</Text>
                </View> : null}
                {mobno ? <View style={styles.mobnoView}>
                    <Text style={styles.headingTxt}>Enter Mobile Number</Text>
                    <View style={styles.noinptView}>
                        <Text style={{
                            color: '#D075EC'
                        }}>Mobile Number</Text>
                        <TextInput placeholder='Mobile No.'
                            value={mobile}
                            onChangeText={(txt) => setMobile(txt)}
                            style={styles.inputView}
                        />
                    </View>
                </View> : null
                }
            </View>
            <View style={{
                width: width,
                alignItems: 'center',
            }}>
                {qrScan ? <TouchableOpacity
                    onPress={() => {
                        props.navigation.navigate('QRScanner')
                    }}
                    style={styles.btnLogin}>
                    <LinearGradient
                        colors={['#4C86DA', '#D575ED']}
                        style={styles.linearGradient}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}>
                        <Text style={styles.btnlogintxt}>Scan</Text>
                    </LinearGradient>
                </TouchableOpacity> : null}
                {mobno ? <TouchableOpacity
                    onPress={() => {
                        scanData()
                    }}
                    style={styles.btnLogin}>
                    <LinearGradient
                        colors={['#4C86DA', '#D575ED']}
                        style={styles.linearGradient}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}>
                        <Text style={styles.btnlogintxt}>Enter</Text>
                    </LinearGradient>
                </TouchableOpacity> : null}
            </View>
            <View>
                {avail !== 'Present' ? <Modal
                    style={{ marginLeft: 0 }}
                    onBackButtonPress={() => setaModalV(false)}
                    onBackdropPress={() => setaModalV(false)}
                    animationIn={'fadeIn'}
                    animationOut={'fadeOut'}
                    isVisible={modalV}>
                    <View style={{ width: width }}>
                        <View style={styles.flatlistView}>
                            <View style={styles.middleView}>
                                <Text style={{
                                    fontSize: responsiveFontSize(2),
                                    alignSelf: 'center',
                                    color: '#D175EC',
                                }}>Event Name</Text>
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
                                    }}>{name}</Text>
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
                                    }}>{email}</Text>
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
                                    }}>+91 {mobilen}</Text>
                                </View>
                                <View style={{
                                    flexDirection: 'row',
                                    marginTop: 10,
                                    justifyContent: 'space-between'
                                }}>
                                    <Text style={{
                                        color: 'white'
                                    }}>Date:</Text>
                                    <Text style={{
                                        color: 'white'
                                    }}>26 Aug 2023</Text>
                                </View>
                                <View style={{
                                    width: responsiveWidth(75),
                                    alignItems: 'center',
                                    alignSelf: 'center',
                                    marginTop: responsiveHeight(3)
                                }}>
                                    <TouchableOpacity

                                        onPress={() => {
                                            UpdateData()
                                            setaModalV(false)
                                        }}>
                                        <LinearGradient
                                            colors={['#4C86DA', '#D575ED']}
                                            style={styles.linearGradientchck}
                                            start={{ x: 0, y: 0 }}
                                            end={{ x: 1, y: 0 }}>
                                            <Text style={styles.btnlogintxt}>Check In</Text>
                                        </LinearGradient>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        onPress={() => {
                                            setaModalV(false)
                                        }}
                                        style={styles.btnQR}>
                                        <Text style={styles.btnlogintxt}>Back</Text>
                                    </TouchableOpacity>
                                    {/* <View style={{
                                        width: responsiveWidth(75),
                                        alignItems: 'center',
                                        flexDirection: 'row',
                                        alignSelf: 'center',
                                        justifyContent: 'space-between',
                                        marginTop: responsiveHeight(4)
                                    }}>
                                        <TouchableOpacity
                                            onPress={() => {
                                                setaModalV(false)
                                                props.navigation.navigate('Scanner')
                                            }}
                                            style={styles.btnQR}>
                                            <Text style={styles.btnlogintxt}>QR Code</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            onPress={() => {
                                                // setavailstudent('Present')
                                                // UpdateData()
                                                setaModalV(false)
                                                props.navigation.navigate('StudentList')
                                            }}
                                            style={styles.btnallList}>
                                            <LinearGradient
                                                colors={['#4C86DA', '#D575ED']}
                                                style={styles.linearGradient1}
                                                start={{ x: 0, y: 0 }}
                                                end={{ x: 1, y: 0 }}>
                                                <Text style={styles.btnlogintxt}>All List</Text>
                                            </LinearGradient>
                                        </TouchableOpacity>
                                    </View> */}
                                </View>
                            </View>
                        </View>
                    </View>
                </Modal>
                    :
                    <Modal
                        style={{ marginLeft: 0 }}
                        onBackButtonPress={() => setaModalV(false)}
                        onBackdropPress={() => setaModalV(false)}
                        animationIn={'fadeIn'}
                        animationOut={'fadeOut'}
                        isVisible={modalV}>
                        <View style={{ width: width }}>
                            <View style={styles.flatlistView}>
                                <View style={styles.middleView}>
                                    <Text style={{
                                        fontSize: responsiveFontSize(2.5),
                                        alignSelf: 'center',
                                        color: '#D175EC',
                                    }}>Student Already Present.</Text>
                                    <View style={{
                                        width: responsiveWidth(75),
                                        alignItems: 'center',
                                        alignSelf: 'center',
                                        marginTop: responsiveHeight(1.5)
                                    }}>
                                        <TouchableOpacity
                                            onPress={() => {
                                                setaModalV(false)
                                            }}
                                            style={styles.btnQR}>
                                            <Text style={styles.btnlogintxt}>Back</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </Modal>}
            </View>
            <View>
                <Modal
                    style={{ marginLeft: 0 }}
                    onBackButtonPress={() => setNullmodal(false)}
                    onBackdropPress={() => setNullmodal(false)}
                    animationIn={'fadeIn'}
                    animationInTiming={100}
                    animationOut={'fadeOut'}
                    animationOutTiming={100}
                    isVisible={nullmodal}>
                    <View style={{ width: width }}>
                        <View style={styles.flatlistView}>
                            <View style={styles.middleView}>
                                <Text style={{
                                    fontSize: responsiveFontSize(2),
                                    alignSelf: 'center',
                                    color: '#D175EC',
                                }}>Data Not Found</Text>
                                <View style={{
                                    flexDirection: 'row',
                                    marginTop: 20,
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}>
                                    <Text style={{
                                        color: 'white',
                                    }}>Try again with valid Mobile Number</Text>
                                </View>
                                <View style={{
                                    width: responsiveWidth(75),
                                    alignItems: 'center',
                                    flexDirection: 'row',
                                    alignSelf: 'center',
                                    justifyContent: 'space-between',
                                    marginTop: responsiveHeight(4)
                                }}>
                                    <TouchableOpacity
                                        onPress={() => {
                                            setNullmodal(false)
                                        }}
                                        style={styles.btnQR}>
                                        <Text style={styles.btnlogintxt}>Check Again</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>

            {/* Confirmation massge Modal >>>>>>>>>>>>> */}
            <View>
                <Modal
                    style={{ marginLeft: 0, marginRight: 0 }}
                    isVisible={cnfrm}
                    onBackButtonPress={() => setCnfrm(false)}
                    onBackdropPress={() => setCnfrm(false)}
                    animationIn={'fadeIn'}
                    animationOut={'fadeOut'}
                >
                    <View style={{ width: responsiveWidth(90), paddingBottom: responsiveHeight(5), paddingTop: responsiveHeight(2), backgroundColor: '#343434', alignSelf: 'center', borderRadius: responsiveWidth(5), paddingRight: responsiveWidth(5), paddingLeft: responsiveWidth(5) }}>
                        <Text style={{ fontSize: responsiveFontSize(2.5), color: '#fff', alignSelf: 'center', marginTop: responsiveHeight(3), textAlign: 'center' }}><Text style={{ color: '#4ECE07' }}>{name},</Text> Your Attendance has been markerd.</Text>
                        <View style={{ width: responsiveWidth(65), alignSelf: 'center', flexDirection: 'row', justifyContent: 'space-between', marginTop: responsiveHeight(3) }}>
                            <Text style={{ fontSize: responsiveFontSize(2), color: '#fff', alignSelf: 'center', }}>Date:- </Text>
                            <Text style={{ fontSize: responsiveFontSize(2), color: '#fff', alignSelf: 'center', }}>{date}/{month}/{year} </Text>
                        </View>
                        <View style={{ width: responsiveWidth(65), alignSelf: 'center', flexDirection: 'row', justifyContent: 'space-between', marginTop: responsiveHeight(1) }}>
                            <Text style={{ fontSize: responsiveFontSize(2), color: '#fff', alignSelf: 'center', }}>Time:- </Text>
                            <Text style={{ fontSize: responsiveFontSize(2), color: '#fff', alignSelf: 'center', }}>{hour}:{mins} </Text>
                        </View>
                        <TouchableOpacity
                            onPress={() => {
                                setCnfrm(false)
                            }}
                            style={styles.btnallList2}>
                            <LinearGradient
                                colors={['#4C86DA', '#D575ED']}
                                style={styles.btnallList1}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}>
                                <Text style={styles.btnlogintxt}>Done</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                </Modal>
            </View>
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
    toggleView: {
        width: responsiveWidth(93),
        marginTop: responsiveHeight(6),
        alignSelf: 'center',
        flexDirection: 'row',
        backgroundColor: 'white',
        borderRadius: 20,
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
    noinptView: {
        width: responsiveWidth(80),
        marginTop: responsiveHeight(6)
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
    mobnoView: {
        width: responsiveWidth(90),
        alignSelf: 'center',
        alignItems: 'center',
    },
    inputView: {
        width: responsiveWidth(80),
        height: responsiveHeight(5),
        borderBottomColor: 'white',
        borderBottomWidth: 1,
        color: 'white',
        fontSize: responsiveFontSize(1.7),
        marginBottom: 10
    },
    flatlistView: {
        width: width
    },
    middleView: {
        width: responsiveWidth(93),
        backgroundColor: '#343434',
        paddingTop: responsiveHeight(4),
        paddingBottom: responsiveHeight(2),
        paddingLeft: responsiveWidth(4),
        paddingRight: responsiveWidth(4),
        borderRadius: 10,
        alignSelf: 'center'
    },
    linearGradientchck: {
        height: responsiveHeight(6),
        width: responsiveWidth(75),
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    linearGradient1: {
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
        width: responsiveWidth(75),
        height: responsiveHeight(6),
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#4F85DA',
        borderWidth: 1,
        marginTop: responsiveHeight(2)
    },
    btnallList: {
        width: '45%',
    },
    btnAllist: {
        alignSelf: 'center'
    },
    btnallList1: {
        height: responsiveHeight(6),
        width: responsiveWidth(75),
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    btnallList2: {
        width: responsiveWidth(80),
        alignItems: 'center',
        marginTop: responsiveHeight(3)
    },
})
export default Scanner