import { useNotes } from '../../context/notesContext';

const NoteItem = ({ note }) => {
    const { notesDispatch } = useNotes();

    const toggleNote = (id) => {
        notesDispatch({ type: 'NOTE_TOGGLED', payload: id });
    };
    return (
        <li className='flex items-center mb-2'>
            <label className={note.completed ? 'line-through':''}>
            <input
                type='checkbox'
                checked={note.completed}
                onChange={() => toggleNote(note.id)}
                className='mr-2'
            />
            {note.text}
            </label>
        </li>
    );
};

export default NoteItem;
