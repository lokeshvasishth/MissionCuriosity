import { View, Text, Button, FlatList, TextInput } from 'react-native'
import {React,useState} from 'react'
import { useDispatch } from 'react-redux'
import { Checkdata, addCode } from './Action/Action'
import { Studentdatta } from './Data'



const Exmpl = (props) => {
    const[inputData, setInputdata]=useState('')
    const[searchData, setSearchData]=useState()

    const dispatch = useDispatch()
    const scanData = item => {
        let tempData = Studentdatta.filter((item)=>item.Mobno==inputData);
        setSearchData(tempData)
        console.log(searchData)
    }
    const sendData=item=>{
        dispatch(Checkdata(item))
    }
    return (
        <View>
            <FlatList
                data={searchData}
                renderItem={({ item, index }) => {
                    return (
                        <View>
                            <Text>ID :{item.Id}</Text>
                            <Text>Date :{item.Date}</Text>
                            <Text>Name :{item.name}</Text>
                            <Text>Email :{item.Email}</Text>
                            <Text>Mob Number :{item.Mobno}</Text>
                            <Button onPress={() => {
                            sendData(item)
                                props.navigation.navigate('Event')
                            }} title='Send Data' />
                        </View>
                    )
                }}
            />

            <TextInput
            value={inputData}
            onChangeText={(txt)=>setInputdata(txt)}
            placeholder='Enter mob no'/>
            <Button title='Scan'
            onPress={()=>{scanData()
        }}
            />
        </View>
    )
}

export default Exmpl

