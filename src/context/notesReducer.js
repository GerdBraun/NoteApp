const notesReducer = (state, action) => {
  switch (action.type) {
    case 'TODO_ADDED': {
      return {
          ...state,
          notes: [
              { id: Date.now(), text: action.payload, completed: false },
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
  case 'TODO_TOGGLED': {
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
