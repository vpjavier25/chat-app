import statusIcon from "../assets/icons8-status-100.png";
import { Link, Outlet, useParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { socket } from "../sokect";

export default function UsersBar() {

    const { username } = useParams();
    const [users, setUsers] = useState([]);
    const [messages, setMessages] = useState([]);
    const currentUserId = useRef("");


    useEffect(() => {
        socket.auth = { username }
        console.log(username)
        socket.connect();


        return () => {
        
            socket.disconnect();
        }
    }, [])



    socket.on("users connected", (users) => {
        setUsers(users)
        console.log(users)
        currentUserId.current = socket.id
        
    })

    console.log(currentUserId);
   

    socket.on("user connected", (user) =>{
        const newUsers = [...users, user];
        setUsers(newUsers);
    })

    socket.on("private message", (message)=>{
        setMessages([...messages, message])
    })

    console.log(messages)
   
    console.log(users);

    return (
        <>
            <nav className="w-1/3 h-full bg-cyan-300">
                <ul className="p-6 divide-y divide-slate-200">
                    {users?.filter(user=> user.username !== username).map(user => {
                        return (
                            <Link key={user.userId} className="w-full h-20" to={`/${username}/${currentUserId.current}/${user.userId}`}>
                                <li  className="flex h-20 items-center">
                                    <p className="flex-auto text-md font-medium text-slate-900 p-3">{user.username}</p>
                                    <span className="basis-1/12">
                                        <img src={statusIcon} placeholder="online" />
                                    </span>
                                </li>
                            </Link>
                        )
                    })}
                </ul>
            </nav >
            <Outlet context={[messages, setMessages]}></Outlet>
        </>

    )
}
