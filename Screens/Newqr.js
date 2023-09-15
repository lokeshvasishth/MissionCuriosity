import { View, Text, StyleSheet, TouchableOpacity, Dimensions, FlatList, Image } from 'react-native'
import React, { useState } from 'react'
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import { addCode } from './Action/Action';
import { Studentdatta } from './Data';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import Modal from "react-native-modal";
import LinearGradient from 'react-native-linear-gradient'

const { height, width } = Dimensions.get('window')

const Newqr = (props) => {
    const date = new Date().getDate()
    const month = new Date().getMonth() + 1
    const year = new Date().getFullYear()
    const hour = new Date().getHours()
    const mins = new Date().getMinutes()
    const [mobile, setMobile] = useState('')
    const [datastudent, setDatastudent] = useState()
    const [modalV, setaModalV] = useState(false)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [mobilen, setMobilen] = useState('')
    const [id, setID] = useState('')
    const [avail, setAvail] = useState('')
    const [cnfrm, setCnfrm] = useState(false)
    const scanData = async (item) => {
        setMobile(item)
        const result = await fetch('http://192.168.0.19:3000/findstudents', {
            method: 'post',
            body: JSON.stringify({ mobile }),
            headers: {
                'Content-Type': 'application/json'
            },
        })
        let resultt = await result.json()
        console.log(JSON.stringify(resultt))
        if (resultt._id) {
            setID(resultt._id)
            setName(resultt.name)
            setMobilen(resultt.mobile)
            setEmail(resultt.email)
            setAvail(resultt.avail)
            setaModalV(true)
            console.log(resultt)
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
        <View>
            <QRCodeScanner
                cameraStyle={styles.cameraView}
                onRead={({ data }) => {
                    scanData(data)
                }}
                flashMode={RNCamera.Constants.FlashMode.auto}
                reactivate={true}
                reactivateTimeout={2000}
                showMarker
            />
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
                <Modal
                    style={{ marginLeft: 0, marginRight: 0 }}
                    isVisible={cnfrm}
                    onBackButtonPress={() => setCnfrm(false)}
                    onBackdropPress={() => setCnfrm(false)}
                    animationIn={'fadeIn'}
                    animationOut={'fadeOut'}
                >
                    <View style={{ width: responsiveWidth(90), paddingBottom: responsiveHeight(5), paddingTop: responsiveHeight(2), backgroundColor: '#343434', alignSelf: 'center', borderRadius: responsiveWidth(5), paddingRight: responsiveWidth(5), paddingLeft: responsiveWidth(5) }}>
                        <Text style={{ fontSize: responsiveFontSize(2.5), color: '#fff', alignSelf: 'center', marginTop: responsiveHeight(2), textAlign: 'center' }}><Text style={{ color: '#4ECE07' }}>{name},</Text> Your Attendance has been markerd.</Text>
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
    centerText: {
        flex: 1,
        fontSize: 18,
        padding: 32,
        color: '#777',
    },
    textBold: {
        fontWeight: '500',
        color: '#000'
    },
    buttonText: {
        fontSize: 21,
        color: 'rgb(0,122,255)'
    },
    buttonTouchable: {
        padding: 16
    },
    cameraView: {
        height: height,
    },
    flatlistView: {
        width: width
    },
    middleView: {
        width: responsiveWidth(93),
        backgroundColor: '#343434',
        paddingTop: responsiveHeight(2),
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
        borderWidth: 1, marginTop: responsiveHeight(2)
    },
    btnallList: {
        width: '45%'
    },
    linearGradient1: {
        height: responsiveHeight(6),
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center'
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

export default Newqr