import formVisibleReducer from './form-visible-reducer';
import ticketListReducer from './ticket-list-reducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  formVisibleOnPage: formVisibleReducer,
  masterTicketList: ticketListReducer
}); // key is the state slice, value represents the reducer 

export default rootReducer;