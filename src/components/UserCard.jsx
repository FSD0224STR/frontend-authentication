
export const UserCard = ({ name, createdAt, onDelete }) => {
    return <div className="card">
        <h5>{name}</h5>
        <p>{createdAt}</p>
        <button onClick={onDelete}>Borrar</button>
    </div>
}

