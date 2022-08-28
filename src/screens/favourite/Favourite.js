import { View, Text } from 'react-native'
import React from 'react'
import { useAuthContext } from '../../contexts/AuthContext'
export default function Favourite() {
    const {fav}  = useAuthContext();
  return (
    <View>
      <Text>Favourite</Text>
    </View>
  )
}