import { useState } from 'react';
import { useNotes } from '../context/notesContext';

const AddNote = () => {
    const { notesDispatch } = useNotes();

    const [newNote, setNewNote] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!newNote) return;
        notesDispatch({ type: 'NOTE_ADDED', payload: newNote });
        setNewNote('');
    };

    return (
        <form onSubmit={handleSubmit} className='mb-4 flex'>
            <input
                type='text'
                name='todo'
                placeholder='Add a new to-do'
                className='flex-1 border rounded px-2 py-1 mr-2'
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
            />
            <button
                type='submit'
                className='bg-blue-500 text-white px-4 py-2 rounded'
            >
                Add
            </button>
        </form>
    );
};

export default AddNote;
