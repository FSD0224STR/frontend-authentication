
export const UserCard = ({ name, createdAt, onDelete, hobbies }) => {
    return <div className="card">
        <h5>{name}</h5>
        <p>{createdAt}</p>
        <button onClick={onDelete}>Borrar</button>
        {hobbies.map(hobby => <p key={hobby}>{hobby}</p>)}
    </div>
}

