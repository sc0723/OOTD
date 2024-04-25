import { useState } from 'react';

const EditOutfitForm = ({ outfit, onSave, onCancel }) => {
    const [title, setTitle] = useState(outfit.title);
    const [type, setType] = useState(outfit.type);
    const [top, setTop] = useState(outfit.top);
    const [bottom, setBottom] = useState(outfit.bottom);
    const [shoes, setShoes] = useState(outfit.shoes);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedOutfit = { title, type, top, bottom, shoes };
        const response = await fetch('/api/outfits/' + outfit._id, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedOutfit),
        });
        if (response.ok) {
            onSave(await response.json());
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
            <input type="text" value={type} onChange={(e) => setType(e.target.value)} />
            <input type="text" value={top} onChange={(e) => setTop(e.target.value)} />
            <input type="text" value={bottom} onChange={(e) => setBottom(e.target.value)} />
            <input type="text" value={shoes} onChange={(e) => setShoes(e.target.value)} />
            <button type="submit">Save Changes</button>
            <button type="button" onClick={onCancel}>Cancel</button>
        </form>
    );
};

export default EditOutfitForm;
