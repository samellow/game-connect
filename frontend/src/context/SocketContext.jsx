import { createContext, useContext, useEffect, useState } from "react";
import { useAuthContext } from "./AuthContext";
import io from 'socket.io-client'

const SocketContext = createContext();

export const useSocketContext = ()=> {
    return useContext(SocketContext)
}

export const SocketContextProvider = ({ children }) => {
    const [socket, setSocket] = useState(null)
    const [onlineUsers, setOnlineUsers] = useState([])
    const [userDataUpdates, setUserDataUpdates] = useState({})
    const { authUser } = useAuthContext();

    useEffect(()=>{
        if(authUser) {
            const newSocket = io('http://localhost:4000', {
                query: {
                    userId: authUser._id
                }
            });

            setSocket(newSocket)
            
            newSocket.on('getOnlineUsers', (users)=>{
                setOnlineUsers(users);
            })

            newSocket.on('userDataUpdated', (data) =>{
                setUserDataUpdates(prevData => [...prevData, data])
            });

            return () => newSocket.close();
        }else {
            if(socket) {
                socket.close();
                setSocket(null);
                setUserDataUpdates({});
            }
        }
    },[])

    return <SocketContext.Provider value={{socket, onlineUsers, userDataUpdates}}>{children}</SocketContext.Provider>
}