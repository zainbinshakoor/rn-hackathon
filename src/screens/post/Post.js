import React, { useState } from 'react';
import {
    SafeAreaView,
    ScrollView,
    View,
    Text,
    TouchableOpacity,
    Image,
    StyleSheet
} from 'react-native';

import DatePicker from 'react-native-date-picker';
import InputField from "../../components/InputField";

import Ionicons from 'react-native-vector-icons/Ionicons';


import CustomButton from '../../components/CustomButton';
import { launchImageLibrary } from 'react-native-image-picker';

import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';



export default function Post({ navigation }) {
    const [date, setDate] = useState(new Date());
    const [open, setOpen] = useState(false);
    const [dobLabel, setDobLabel] = useState('Date of Product');
    const [title, setTitle] = useState("");
    const [detail, setDetail] = useState("");
    const [price, setprice] = useState("");

    const [image, setImage] = useState({});





    const handleSubmit = () => {


        console.log(singleItem)

    }

    const imageUplaod = async () => {

        try {
            const result = await launchImageLibrary();
            result.didCancel = true;
            let file = result.assets[0]

            setImage(file)
            console.log(image)



        } catch (err) {
            console.error(err)
            console.log("uploading while error")

        }

    }
    const id = Math.random().toString(36).slice(2)
    const singleItem = {
        title, detail, price, date
    }
    singleItem.id = id
    const productUpload = async () => {
        if (image.uri) {
            await storage().ref(`images/${image.fileName}`).putFile(image.uri).then(async () => {
                const url = await storage().ref(`images/${image.fileName}`).getDownloadURL();

                firestore().collection('products').doc(singleItem.id).set({ ...singleItem, url })
                    .then(() => {
                        console.log("product has been successfully added.")
                    })
                    .catch(err => {
                        console.error(err)
                    })

            })
            console.log("product added")


        } else {

            firestore().collection('products').doc(singleItem.id).set({ ...singleItem, url })
                .then(() => {
                    console.log("product has been successfully added.")
                })
                .catch(err => {
                    console.error(err)
                })



        }
    }
    return (
        <SafeAreaView style={{ flex: 1, justifyContent: 'center' }}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={{ paddingHorizontal: 25 }}>
               

                <Text
                    style={{
                        fontFamily: 'Roboto-Medium',
                        fontSize: 28,
                        fontWeight: '500',
                        color: '#333',
                        marginBottom: 30,
                    }}>
                    RealEstate
                </Text>



                <Text style={{ textAlign: 'center', color: '#666', marginBottom: 30 }}>
                    Post 
                </Text>

                <InputField
                    label={'Title'}
                    icon={
                        <Ionicons
                            name="pencil"
                            size={20}
                            color="#666"
                            style={{ marginRight: 5 }}
                        />
                    }
                    labelValue={title}
                    onChangeText={(userName) => setTitle(userName)}

                />

                <InputField
                    label={'detail'}
                    icon={
                        <Ionicons
                            name="ios-clipboard-outline"
                            size={20}
                            color="#666"
                            style={{ marginRight: 5 }}
                        />
                    }
                    labelValue={detail}
                    onChangeText={(itemDetail) => setDetail(itemDetail)}

                />

                <InputField
                    label={'Price'}
                    icon={
                        <Ionicons
                            name="md-pricetags-outline"
                            size={20}
                            color="#666"
                            style={{ marginRight: 5 }}
                        />
                    }
                    labelValue={price}
                    onChangeText={(itemPrice) => setprice(itemPrice)}

                />



                <View
                    style={{
                        flexDirection: 'row',
                        borderBottomColor: '#ccc',
                        borderBottomWidth: 1,
                        paddingBottom: 8,
                        marginBottom: 30,
                    }}>
                    <Ionicons
                        name="calendar-outline"
                        size={20}
                        color="#666"
                        style={{ marginRight: 5 }}
                    />
                    <TouchableOpacity onPress={() => setOpen(true)}>
                        <Text style={{ color: '#666', marginLeft: 5, marginTop: 5 }}>
                            {dobLabel}
                        </Text>
                    </TouchableOpacity>
                </View>

                <DatePicker
                    modal
                    open={open}
                    date={date}
                    mode={'date'}
                    maximumDate={new Date('2030-01-01')}
                    minimumDate={new Date('1980-01-01')}
                    onConfirm={date => {
                        setOpen(false);
                        setDate(date);
                        setDobLabel(date.toDateString());
                    }}
                    onCancel={() => {
                        setOpen(false);
                    }}


                />
                <TouchableOpacity onPress={imageUplaod}>
                    {image.uri
                        ?

                        <Image
                            style={styles.userImg}
                            source={{ uri: image.uri || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2wrXPLf0fSGdZXCPKp3Y-NrRNrnWLqQwvoQ&usqp=CAU' }}

                        />

                        :
                        <Ionicons
                            name="image-outline"
                            size={100}
                            color="#666"
                            style={{ textAlign: 'center' }}
                        />
                    }
                </TouchableOpacity>
                <TouchableOpacity>

                    <CustomButton label={'Add Data'} onPress={productUpload} />
                </TouchableOpacity>


            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    userImg: {
        marginTop: 10,
        marginLeft: 90,
        height: 200,
        width: 200,
    }
})