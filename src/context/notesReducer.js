const notesReducer = (state, action) => {
  switch (action.type) {
    case 'NOTE_ADDED': {
      console.log({ ...action.payload, id: Date.now(), completed: false })
      return {
          ...state,
          notes: [
              { ...action.payload, id: Date.now(), completed: false },
              ...state.notes,
          ],
      };
  }

  case 'FILTER_SET': {
      return {
          ...state,
          filter: action.payload,
      };
  }

  case 'NOTE_TOGGLED': {
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
