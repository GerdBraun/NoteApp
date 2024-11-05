const notesReducer = (state, action) => {
  switch (action.type) {
    case "NOTE_ADDED":
      return {};
    default:
      return state;
  }
};
export default notesReducer;
