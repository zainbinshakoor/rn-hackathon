import React, { createContext, useState, useContext, useEffect } from 'react'
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import AsyncStorage from "@react-native-async-storage/async-storage";

const AppContext = createContext();
export default function AuthContextProvider({ children }) {
    const [authenticated, setAuthenticated] = useState(false);
    const [user, setUser] = useState({});
    const [fav, setFav] = useState([]);

    const getData = async () => {
        try {
            const favourties = await AsyncStorage.getItem('Favourtie')
            const localFavourite = JSON.parse(favourties)

            setFav(localFavourite)
            console.log("local Fav", localFavourite)

        } catch (e) {
            console.error(e)

        }
    }


    useEffect(() => {
        getData();
    }, [])
    useEffect(() => {
        auth().onAuthStateChanged(async (user) => {

            if (user) {
                const userdata = await (await firestore().collection('users').doc(user.uid).get())._data;
                setUser(userdata)
                setAuthenticated(true)
            } else {
                setAuthenticated(false)
            }
        })

    }, []);
    return (
        <AppContext.Provider value={{ authenticated, setAuthenticated, user, fav, setFav }}>

            {children}

        </AppContext.Provider>
    )
}

export const useAuthContext = () => {

    return useContext(AppContext)

}
