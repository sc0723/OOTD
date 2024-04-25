import { useOutfitsContext } from "../hooks/useOutfitsContext";
import EditOutfitForm from './editForm'
import { useState } from 'react'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
const OutfitDetails = ({ outfit }) => {
    const { dispatch } = useOutfitsContext()
    const [isEditing, setIsEditing] = useState(false);
    const handleClick = async () => {
        const response = await fetch('/api/outfits/' + outfit._id, {
            method: 'DELETE'
        })
        const json = await response.json()

        if (response.ok) {
            dispatch({type: 'DELETE_OUTFIT', payload: json})
        }
    }

    const handleEdit = async () => {
        setIsEditing(true);   
    }

    const handleSave = (updatedOutfit) => {
        dispatch({ type: 'UPDATE_OUTFIT', payload: updatedOutfit });
        setIsEditing(false);
    }

    const handleCancel = () => {
        setIsEditing(false);
    }

    if (isEditing) {
        return <EditOutfitForm outfit={outfit} onSave={handleSave} onCancel={handleCancel} />;
    }

    return (
        <div className="outfit-details">
            <h4>{outfit.title}</h4>
            <p><strong>Type: </strong>{outfit.type}</p>
            <p><strong>Top: </strong>{outfit.top}</p>
            <p><strong>Bottom: </strong>{outfit.bottom}</p>
            <p><strong>Shoes: </strong>{outfit.shoes}</p>
            <p>{formatDistanceToNow(new Date(outfit.createdAt), { addSuffix: true})}</p>
            <div className="buttons-container">
                <span className="material-symbols-outlined delete-button" onClick={handleClick}>delete</span>
                <span className="material-symbols-outlined edit-button" onClick={handleEdit}>edit</span>
            </div>
        </div>
    )
}

export default OutfitDetails