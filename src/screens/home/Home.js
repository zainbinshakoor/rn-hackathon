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
import firestore from '@react-native-firebase/firestore';

const Home = ({ navigation }) => {
  const [products, setProduct] = useState([]);


  useEffect(() => {
    firestore()
      .collection('products')
      .get().then(querySnapshot => {

        let array = [];
        querySnapshot.forEach(documentSnapshot => {

          array.push({ ...documentSnapshot.data() })
          setProduct(array)
        });

      });

  }, []);
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

            <TouchableOpacity onPress={() => navigation.navigate("Detail", { item })}>
              <Entypo
                name="shopping-bag"
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
    <View
      nestedScrollEnabled={true}
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: COLOURS.white,
      }}>
      <StatusBar backgroundColor={COLOURS.white} barStyle="dark-content" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 16,
          }}>
          <TouchableOpacity>
            <Entypo
              name="shopping-bag"
              style={{
                fontSize: 18,
                color: COLOURS.backgroundMedium,
                padding: 12,
                borderRadius: 10,
                backgroundColor: COLOURS.backgroundLight,
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('favourite')}>
            <MaterialCommunityIcons
              name="cart-heart"
              style={{
                fontSize: 18,
                color: COLOURS.backgroundMedium,
                padding: 12,
                borderRadius: 10,
                borderWidth: 1,
                borderColor: COLOURS.backgroundLight,
              }}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            marginBottom: 10,
            padding: 16,
          }}>
          <Text
            style={{
              fontSize: 26,
              color: COLOURS.black,
              fontWeight: '500',
              letterSpacing: 1,
              marginBottom: 10,
            }}>
            ZEE RealEstate &amp; Service
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: COLOURS.black,
              fontWeight: '400',
              letterSpacing: 1,
              lineHeight: 24,
            }}>
            Owning a home is a keystone of wealth
            {'\n'}both financial affluence and emotional security.
          </Text>
        </View>






      </ScrollView>

      <FlatList
        data={products}
        numColumns={2}

        renderItem={({ item }) => <Card item={item} />}

      />



    </View >
  );
};



export default Home;






const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    backgroundColor: "gray",
    padding: 10,


  }, card: {
    width: width * 0.503,
    height: 100,
    marginBottom: 110,
    borderRadius: 15
  },
  subCard: {
    height: 400,
    backgroundColor: "white",
    borderRadius: 15
  },

  font: {
    fontSize: 12,
    fontWeight: "bold",

    color: "black",
  }
});