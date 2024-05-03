import { useEffect, useState } from 'react'

import './App.css'
import { UserCard } from './components/UserCard'
import userAPI from './apiService/userApi'




function App() {
  const [users, setUsers] = useState([])

  const [name, setName] = useState('')

  const [error, setError] = useState('')

  const [dummy, refresh] = useState(false)

  const getUsers = async () => {
    const users = await userAPI.getAllUsers();
    setUsers(users)
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
      {error && <p>{error}</p>}
    </>
  )
}

export default App
