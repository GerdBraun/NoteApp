import { createContext, useContext } from "react";

const NotesContext = createContext();

const useNotes = () => {
    const context = useContext(NotesContext);
    if (!context)
        throw new Error(
            'useNotes must be used inside of a NotesContextProvider'
        );
    return context;
}

export {NotesContext, useNotes};