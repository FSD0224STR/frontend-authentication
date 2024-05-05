import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import Home from './pages/Home'
import { Login } from './pages/Login'
import { useEffect } from 'react';

export const App = () => {
    const logout = () => localStorage.removeItem('access_token');

    const navigate = useNavigate()

    useEffect(() => {
        // vamos a ver a donde te mandamos
        // si tienes token, vamos a comprobar que sigue vigente
        const token = localStorage.getItem('access_token');
        if (!token) navigate('/login')
        else navigate('/home')
    },[])

    return (
        <>
            <nav>
                <Link to="/login">Login</Link>
                <Link to="/home">Home</Link>
                <button onClick={logout}>Logout</button>
            </nav>
            <Routes>
                <Route path='/home' element={<Home></Home>}></Route>
                <Route path='/login' element={<Login></Login>}></Route>
                {/* <Route path='/register' element={} ></Route> */}
            </Routes>
        </>
    )
}
