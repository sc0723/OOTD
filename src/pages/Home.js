import { useEffect } from "react"
import { useOutfitsContext } from "../hooks/useOutfitsContext"
// components
import OutfitDetails from '../components/OutfitDetails'
import OutfitForm from "../components/OutfitForm"

const Home = () => {
    const {outfits, dispatch} = useOutfitsContext()
    

    useEffect(() => {
        const fetchOutfits = async () => {
            const response = await fetch('/api/outfits')
            const json = await response.json()

            if (response.ok) {
                dispatch({type: 'SET_OUTFITS', payload: json})
            }
        } 

        fetchOutfits()
    }, [dispatch])
    return (
        <div className="Home">
            <div className="outfits">
                {outfits && outfits.map((outfit) => (
                    <OutfitDetails key={outfit._id} outfit={outfit} />
                ))}
            </div>
            <OutfitForm />
        </div>
    )
}

export default Home