import { useEffect, useState } from 'react'

import './Home.css'
import { UserCard } from '../components/UserCard'
import userAPI from '../apiService/userApi'
import { useNavigate } from 'react-router-dom'




function Home() {
  const [users, setUsers] = useState([])

  const [name, setName] = useState('')

  const [error, setError] = useState('')

  const [dummy, refresh] = useState(false)

  const navigate = useNavigate()

  const getUsers = async () => {
    const users = await userAPI.getAllUsers();
    if (users.length) setUsers(users)
    else setError(users.message)
    if (users.message === 'jwt expired') {
      localStorage.removeItem('access_token')
      setTimeout(() => navigate('/login'), 3000 )
     
    }
  }

  const addUserAndSync = async () => {

    const data = await userAPI.addUser({name})
    if (!data._id) setError('ha habido un error añadiendo usuario')
    refresh(!dummy)
  }

  const deleteUserAndSync = (idToDelete) => userAPI.deleteUser(idToDelete).then(message => refresh(!dummy))


  useEffect(() => {
    getUsers()
  }, [dummy])

  return (
    <>
      <h1>Lista de usuarios</h1>
      {users.map(user => <UserCard key={user._id} {...user} onDelete={() => deleteUserAndSync(user._id)}></UserCard>)}
      <label>Name:</label><input value={name} onChange={e => setName(e.currentTarget.value)}></input>
      <button onClick={addUserAndSync}>Click para añadir</button>
      {error && <p>Ha habido un error: {error}</p>}
    </>
  )
}

export default Home
