import { createBrowserRouter } from "react-router-dom";
import UsersBar from "./components/UsersBar";
import ChatView from "./components/ChatView";
import LandingPage from "./components/LandingPage"


const router = createBrowserRouter([
    {
        path:"/",
        element: <LandingPage/>
    },
    {
        path: "/:username",
        element: <UsersBar/>,
        children: [
            {
                path: "/:username/:id1/:id2",
                element: <ChatView />
            }
        ]
    },
])


export default router
