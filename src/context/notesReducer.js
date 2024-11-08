const notesReducer = (state, action) => {
  switch (action.type) {
    case "NOTES_LOADED": {
      return {
        ...state,
        notes: action.payload,
      };
    }

    case "CATEGORIES_LOADED": {
     return {
        ...state,
        categoryOptions: action.payload,
        categoriesLoaded: true,
      };
    }

    case "USER_LOGGED_IN": {
      return {
        ...state,
        userData: action.payload,
      };
    }

    case "NOTE_ADDED": {
      return {
        ...state,
        notes: [
          { ...action.payload, id: Date.now(), completed: false },
          ...state.notes,
        ],
      };
    }

    case "FILTER_SET": {
      return {
        ...state,
        filter: action.payload,
      };
    }

    case "NOTE_TOGGLED": {
      return {
        ...state,
        notes: state.notes.map((note) => {
          if (note.id === action.payload) {
            return { ...note, completed: !note.completed };
          }
          return note;
        }),
      };
    }
    default:
      return state;
  }
};
export default notesReducer;
