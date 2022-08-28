import React, { useEffect, useState } from "react";
import { View, Text, SafeAreaView, TouchableOpacity, ScrollView, Image, StyleSheet, Button } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { COLOURS, SIZES, FONTWEIGHT } from "../../components/db";
import { useAuthContext } from "../../contexts/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default function SingleItem({ navigation, route }) {
  const { user, fav, setFav } = useAuthContext();
  const item = route.params;
  const product = item.item



  const setItem = (product) => {
    let array = fav.slice(0);
    array.push(product)
    setFav(array)
    try {
      AsyncStorage.setItem("Favourtie", JSON.stringify(fav))
        .then(() => {
          console.log("Favourtie is added")
        })
    } catch (error) {
      console.log(error);
    }

  }


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.back}>
        <TouchableOpacity onPress={() => {
          navigation.navigate('Home');
        }}>
          <Icon name="chevron-left" size={30} color={COLOURS.primary} />
        </TouchableOpacity>
      </View>
      <ScrollView>
        <TouchableOpacity>
          <Image
            style={styles.image}
            source={{ uri: product.url }} />
        </TouchableOpacity>
        <View style={styles.nameAndQuantity}>
          <Text style={styles.name}>{product.title}</Text>

        </View>
        <View>
          <Text style={styles.description}>{product.type}</Text>
        </View>

        <View>
          <Text style={styles.description}>{product.detail}</Text>
        </View>

        <View>
          <Text style={styles.description}>{product.location}</Text>
        </View>
        <View style={styles.bottomRow}>
          <View style={styles.priceContainer}>
            <Text style={styles.subtitle}>Area</Text>
            <Text style={styles.price}>{product.area}</Text>
          </View>
          <View style={styles.priceContainer}>
            <Text style={styles.subtitle}>Total Price</Text>
            <Text style={styles.price}>$ {product.price}</Text>
          </View>


        </View>
        <View style={styles.bottomRow}>

          <View style={styles.priceContainer}>

            <Text style={styles.subtitle}>User Phone</Text>
            <Text style={styles.price}> {user.phonenumber} </Text>
          </View>
          

          <TouchableOpacity onPress={() => setItem(product)}>

            <Icon name="heart" size={20} color={COLOURS.primary} />

          </TouchableOpacity>

        </View>

      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  back: {
    paddingLeft: 15,
  },

  image: {

    height: 200,
    width: "100%",
  },
  nameAndQuantity: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 15,

  },
  name: {
    fontSize: SIZES.h2,
    fontWeight: FONTWEIGHT.bold,
  },
  quantityContainer: {
    flexDirection: 'row',
    backgroundColor: "gray",
    paddingVertical: 5,
    alignItems: 'center',
    borderRadius: 5,
  },
  quantity: {
    textAlign: 'center',
    fontWeight: FONTWEIGHT.bold,
    minWidth: 20,
  },
  quantityIcon: {
    backgroundColor: COLOURS.white2,
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 10,
    shadowColor: COLOURS.primary,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    shadowOpacity: 0.1,
    elevation: 2,
  },
  description: {
    marginHorizontal: 15,
    marginTop: 10,
    color: COLOURS.accent,
  },
  bottomRow: {
    flexDirection: 'row',
    marginHorizontal: 15,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 20,
    // paddingBottom: 80,
  },
  priceContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  price: {
    color: COLOURS.primary,
    fontWeight: FONTWEIGHT.bold,
    fontSize: SIZES.h4,
  },
  basketContainer: {
    backgroundColor: COLOURS.primary,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 50,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  addToBasket: {
    color: COLOURS.white,
    fontSize: SIZES.h4,
    fontWeight: FONTWEIGHT.bold,
  },
  basketIcon: {
    backgroundColor: COLOURS.white,
    marginLeft: 10,
    borderRadius: 50,
    padding: 5,
  }
});
