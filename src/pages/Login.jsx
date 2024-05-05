import { useState } from "react"
import userAPI from '../apiService/userApi'
import { useNavigate } from "react-router-dom"

export const Login = () => {
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate();

    const onClickLogin = async () => {
        const token = await userAPI.login(name, password)
        console.log('a ver que nos devuelve el login', token)
        localStorage.setItem('access_token', token)
        navigate('/home')
    }

    return (
        <section>
            <h1>Login</h1>
            <label>Name:</label><input value={name} onChange={e => setName(e.currentTarget.value)}></input>
            <label>Password:</label><input type="password" value={password} onChange={e => setPassword(e.currentTarget.value)}></input>
            <div>
                <button onClick={onClickLogin}>Login</button>
            </div>
        </section>
    )
}