import { useNotes } from '../../context/notesContext';
import NoteItem from './NoteItem';

const NotesList = () => {
    const {
        notesState: { notes, filter },
    } = useNotes();

    const filteredNotes = notes.filter((note) => {
        if (filter === 'all') return true;
        if (filter === 'completed' && note.completed) return true;
        if (filter === 'active' && !note.completed) return true;
        return false;
    });    

    return (
        <ul className='grid grid-cols-3 gap-4'>
            {filteredNotes.map((note) => (
                <NoteItem key={note.id} note={note} />
            ))}
        </ul>
    );
};

export default NotesList;
