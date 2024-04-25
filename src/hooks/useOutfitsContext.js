import { OutfitsContext } from "../context/OutfitContext";
import { useContext } from 'react'

export const useOutfitsContext = () => {
    const context = useContext(OutfitsContext)

    if (!context) {
        throw Error('useOutfitsContext must be used inside an OutfitsContextProvider')
    }

    return context
}