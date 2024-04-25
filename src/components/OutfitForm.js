import { useState } from "react"
import { useOutfitsContext } from "../hooks/useOutfitsContext"
const OutfitForm = () => {
    const { dispatch } = useOutfitsContext()
    const [title, setTitle] = useState('')
    const [type, setType] = useState('')
    const [top, setTop] = useState('')
    const [bottom, setBottom] = useState('')
    const [shoes, setShoes] = useState('')
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault()

        const outfit = {title, type, top, bottom, shoes}

        const response = await fetch('/api/outfits', {
            method: 'POST',
            body: JSON.stringify(outfit),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
            setEmptyFields(json.emptyFields)
        }

        if (response.ok) {
            setTitle('')
            setType('')
            setTop('')
            setBottom('')
            setShoes('')
            setError(null)
            setEmptyFields([])
            console.log('New outfit added', json)
            dispatch({type: 'CREATE_OUTFIT', payload: json})
        }
    }

    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a new outfit: </h3>

            <label>Outfit Title:</label>
            <input 
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                value = {title}
                className={emptyFields.includes('title') ? 'error' : ''}
            />

            <label>Outfit Type:</label>
            <input 
                type="text"
                onChange={(e) => setType(e.target.value)}
                value = {type}
                className={emptyFields.includes('type') ? 'error' : ''}
            />

            <label>Outfit Top:</label>
            <input 
                type="text"
                onChange={(e) => setTop(e.target.value)}
                value = {top}
                className={emptyFields.includes('top') ? 'error' : ''}
            />  

            <label>Outfit Bottom:</label>
            <input 
                type="text"
                onChange={(e) => setBottom(e.target.value)}
                value = {bottom}
                className={emptyFields.includes('bottom') ? 'error' : ''}
            /> 

            <label>Outfit Shoes:</label>
            <input 
                type="text"
                onChange={(e) => setShoes(e.target.value)}
                value = {shoes}
                className={emptyFields.includes('shoes') ? 'error' : ''}
            />

            <button>Add Outfit</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default OutfitForm