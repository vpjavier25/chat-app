import { useState } from 'react'
import { Link } from 'react-router-dom';

export default function LandingPage() {
    const [username, setUsername] = useState(null);

    const addUsername = (e) => {
        setUsername(e.target.value)
    }

    return (
        <div className='m-auto w-50'>
            <input className='border-4 border-gray-400' type="text" placeholder='enter a username' onChange={addUsername} />
            {username? <Link to={`/${username}`}> <button type='button'>log in</button></Link>: "" }
        </div>
    )
}