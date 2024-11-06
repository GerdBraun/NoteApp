import { useNotes } from '../../context/notesContext';
import NoteItem from './NoteItem';

const NotesList = () => {
    const {
        notesState: { notes, filter },
    } = useNotes();

    const filteredNotes = notes.filter((note) => {
        if (filter === 'all') return true;
        if(!note.categories.length) return false;
        return note.categories.find((cat) => cat.value === filter);
    });    

    return (
        <ul className="p-4 mx-auto max-w-screen-xl grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredNotes.map((note) => (
                <NoteItem key={note.id} note={note} />
            ))}
        </ul>
    );
};

export default NotesList;
