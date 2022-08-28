import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
  FlatList
} from 'react-native';
const { width } = Dimensions.get('window');
import { COLOURS } from '../../components/db';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useAuthContext } from '../../contexts/AuthContext';
const Home = ({ navigation }) => {

  const { user,fav } = useAuthContext();


  const Card = (({ item }) => {
    return (
      <View style={styles.card} >
        <View style={styles.subCard}>
          <View style={styles.body}>
            <Image style={{ width: "80%", height: "50%", borderRadius: 15 }} source={{ uri: item.url || "https://source.unsplash.com/200x150/?fashion" }} />


            <Text style={{
              marginLeft: 0
            }} >
              {item.title}

            </Text>
            <Text style={{
              marginLeft: 2
            }} >
              {`${item.price}$`}

            </Text>

            <TouchableOpacity >
              <MaterialCommunityIcons
                name="playlist-remove"
                style={{
                  fontSize: 20,
                  color: COLOURS.backgroundDark,
                  borderRadius: 10,
                  marginLeft: 130

                }}
              />
            </TouchableOpacity>

          </View>

        </View>

      </View >
    )
  })
  return (
    <>

      <FlatList
        data={fav}
        numColumns={2}

        renderItem={({ item }) => <Card item={item} />}

      />



    </ >
  );
};



export default Home;






const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    backgroundColor: "gray",
    padding: 10,


  }, card: {
    width: width * 0.543,
    height: 100,
    marginBottom: 110,
    borderRadius: 15,
    marginLeft:4

  },
  subCard: {
    height: 400,
    borderRadius: 15
  },

  font: {
    fontSize: 12,
    fontWeight: "bold",

    color: "black",
  }
});