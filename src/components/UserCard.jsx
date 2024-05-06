import { Button, Card, Typography } from "@mui/material"

export const UserCard = ({ name, createdAt, onDelete }) => {
    return (
        <Card sx={{p: 1}}>
            <Typography variant="h6">{name}</Typography>
            <Typography variant="body2">{createdAt}</Typography>
            <Button onClick={onDelete}>Borrar</Button>
        </Card>
    )
}

