import React, { createContext, useState, useContext, useEffect } from 'react'
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
const AppContext = createContext();
export default function AuthContextProvider({ children }) {
    const [authenticated, setAuthenticated] = useState(false);
    const [user, setUser] = useState({});
    const [fav, setFav] = useState([]);

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
