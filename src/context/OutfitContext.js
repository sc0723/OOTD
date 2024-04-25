import { createContext, useReducer } from 'react'

export const OutfitsContext = createContext()
export const outfitsReducer = (state, action) => {
    switch (action.type) {
        case 'SET_OUTFITS':
            return {
                outfits: action.payload
            }
        case 'CREATE_OUTFIT':
            return {
                outfits: [action.payload, ...state.outfits]
            }
        case 'DELETE_OUTFIT':
            return {
                outfits: state.outfits.filter((o) => o._id !== action.payload._id)
            }
        case 'UPDATE_OUTFIT':
            const updatedOutfits = state.outfits.map(o =>
                o._id === action.payload._id ? action.payload : o
            );
            console.log('Updated Outfits:', updatedOutfits);
            return {
                ...state,
                outfits: updatedOutfits,
            }
        default:
            return state
    }
}

export const OutfitsContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(outfitsReducer, {
        outfits: []
    })

    
    return (
        <OutfitsContext.Provider value={{...state, dispatch}}>
            { children }
        </OutfitsContext.Provider>
    )
}

