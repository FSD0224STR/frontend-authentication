const baseUrl = 'http://localhost:3000'

const getAllUsers = async () => {
  const response = await window.fetch(`${baseUrl}/users`)

  if (!response.ok) {
    const error = await response.json()
    return {error:  error.message};
  }

  const users = await response.json();
  return {data: users} 
}

const addUser = async (userData) => {
  const token = localStorage.getItem('access_token')

  const response = await fetch(`${baseUrl}/users/add`, {method: 'POST', body: JSON.stringify({...userData, password: 'perro', role: 'admin'}), headers: {"Content-Type": "application/json","authorization": `Bearer ${token}`} } )

  if (!response.ok) {
    const error = await response.json()
    return {error: error.message};
  }

  const newlyCreatedUser = await response.json();
  return {data: newlyCreatedUser}

}

const deleteUser = async id => {
  const token = localStorage.getItem('access_token')

  const response = await fetch(`${baseUrl}/users/${id}`, {method: 'DELETE', headers: {"authorization": `Bearer ${token}` } } )

  if (!response.ok) {
    const error = await response.json()
    return {error:  error.message};
  }

  return {data: 'ok, borrado'}
}

const login = async (name, password) => {
  const response = await fetch(`${baseUrl}/users/login`, {method: 'POST', body: JSON.stringify({name, password}), headers: {"Content-Type": "application/json"}, } )

  if (!response.ok) return {error: response.statusText};

  const token = await response.json()
  return {data: token}
}

const getMyProfile = async () => {
  const token = localStorage.getItem('access_token')

  const response = await fetch(`${baseUrl}/users/me`, {method: 'GET', headers: {"authorization": `Bearer ${token}` } } )

  if (!response.ok) {
    const error = await response.json()
    return {error:  error.message};
  }

  return {data: await response.json()}
}

export default { getAllUsers, addUser, deleteUser, login, getMyProfile }

