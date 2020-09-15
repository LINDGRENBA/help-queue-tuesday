export default (state = {}, action) => {
  const { names, location, issue, id } = action;
  switch (action.type) {
    case 'ADD_TICKET': //also works for UPDATE
      return Object.assign({}, state, {
        [id] : {  //[id] is the key, the object is the value
          names: names,
          location: location,
          issue: issue,
          id: id
        }
      });
    case 'DELETE_TICKET':
      const newState = {...state};
      delete newState[id];
      return newState;
    default:
      return state;
  }
};