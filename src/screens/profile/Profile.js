import React, { useState } from 'react'
import { View, Text, ScrollView, Image, StyleSheet, TouchableOpacity } from 'react-native'
import CustomButton from '../../components/CustomButton';
import { useAuthContext } from '../../contexts/AuthContext';
export default function Profile({navigation}) {
  const [image, setImage] = useState({});

  const { user } = useAuthContext();
  
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={[styles.cover]}>
      </View>
      <View style={
        {
          alignItems: "center"
        }

      }
      >

        <TouchableOpacity>
          <Image
            style={[styles.userImg]}
            source={{ uri: user.url? user.url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2wrXPLf0fSGdZXCPKp3Y-NrRNrnWLqQwvoQ&usqp=CAU' }}

          />

        </TouchableOpacity>
        {/* <TouchableOpacity style={{ position: 'absolute' }} onPress={imageUplaod}>


          <FontIcon style={{ textAlign: 'center', marginLeft: 150 }} name="camera" size={22} />

        </TouchableOpacity> */}
      </View>
      <View style={styles.info}>
        <Text>Name</Text>

        <Text >{user.userName}</Text>

      </View>
      <View style={styles.info}>
        <Text>Email</Text>

        <Text >{[user.email]}</Text>

      </View>
      <View style={styles.info}>
        <Text>Address</Text>

        <Text >{[user.address ? user.address : "Address"]}</Text>

      </View>
      <View style={styles.info}>
        <Text>Phonenumber</Text>

        <Text >{[user.phonenumber ? user.phonenumber : "PhoneNumnber"]}</Text>

      </View>
      <TouchableOpacity style={styles.customBtn}>

        <CustomButton label={'Edit Profile'} onPress={()=>navigation.navigate("UpdateProfile")}>

        </CustomButton>
      </TouchableOpacity>

    </ScrollView>
  )
}

const styles = StyleSheet.create({
  cover: {
    backgroundColor: "#AD40AF",
    width: "100%",
    height: 180,
    marginTop: 0,
    borderBottomLeftRadius: 300,
    borderBottomRightRadius: 300
  },
  userImg: {
    marginLeft: 16,
    marginTop: -90,
    height: 150,
    width: 150,
    borderRadius: 75,

  }, info: {
    width: "90%",
    marginLeft: 15,
    marginTop: 50,
    flexDirection: 'row',
    borderBottomColor: '#ccc',
    flexDirection: 'row',
    justifyContent: 'space-between'

  },
  customBtn: {
    marginTop: 50,
    marginLeft: 35,
    width: "80%",

  }



})