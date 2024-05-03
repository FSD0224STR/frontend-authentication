const baseUrl = 'http://localhost:3000'

const getAllUsers = async () => {
    const response = await fetch(`${baseUrl}/users`)
    const users = await response.json();
    return users
    // return fetch(`${baseUrl}/users`).then(response => response.json())
}

const addUser = async (userData) => {
    try {
        const response = await fetch(`${baseUrl}/users`, {method: 'POST', body: JSON.stringify(userData), headers: {"Content-Type": "application/json"}, } )
        if (!response.ok) throw Error(response.statusText)
        const newlyCreatedUser = await response.json();
        return newlyCreatedUser
    } catch (error) {
        console.log('entramos en el error')
        return {isError: true, message: error.message}
    }

}

const deleteUser = (id) => fetch(`${baseUrl}/users/${id}`, {method: 'DELETE' } )


export default { getAllUsers, addUser, deleteUser }

