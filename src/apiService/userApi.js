const baseUrl = 'http://localhost:3000'

const getAllUsers = async () => {
    const token = localStorage.getItem('access_token')
    const response = await fetch(`${baseUrl}/users`, {headers: {"authorization": `Bearer ${token}` }})
    const users = await response.json();
    return users
    // return fetch(`${baseUrl}/users`).then(response => response.json())
}

const addUser = async (userData) => {
    const token = localStorage.getItem('access_token')
    try {
        const response = await fetch(`${baseUrl}/users/register`, {method: 'POST', body: JSON.stringify({...userData, password: 'perro', role: 'admin'}), headers: {"Content-Type": "application/json","authorization": `Bearer ${token}`} } )
        if (!response.ok) throw Error(response.statusText)
        const newlyCreatedUser = await response.json();
        return newlyCreatedUser
    } catch (error) {
        console.log('entramos en el error')
        return {isError: true, message: error.message}
    }

}

const deleteUser = (id) => fetch(`${baseUrl}/users/${id}`, {method: 'DELETE', headers: {"authorization": `Bearer ${localStorage.getItem('access_token')}` } } )

const login = async (name, password) => {
    const response = await fetch(`${baseUrl}/users/login`, {method: 'POST', body: JSON.stringify({name, password}), headers: {"Content-Type": "application/json"}, } )
    const token = await response.json()
    return token
}


export default { getAllUsers, addUser, deleteUser, login }

