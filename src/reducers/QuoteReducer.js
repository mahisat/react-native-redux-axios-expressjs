import {
  SAMPLE_ACTION,
  ADD_QUOTE,
  UPDATE_QUOTE,
  DELETE_QUOTE,
  LIST_QUOTES,
  LOADING,
} from '../actions/types';
import lodash from 'lodash';

const INITIAL_STATE = {
  quotes: [],
  isListQuoteLoading: false,
  isSubmitQuoteLoading: false,
};
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SAMPLE_ACTION:
      return state;
    case LOADING:
      return {...state, [action.data.name]: action.data.value};

    case LIST_QUOTES:
      return {...state, quotes: action.data};
    case ADD_QUOTE:
      let quote = action.data;

      //clone the current state
      let clone = lodash.cloneDeep(state.quotes);

      clone.unshift(quote); //add the new quote to the top

      return {...state, quotes: clone};
    case UPDATE_QUOTE: {
      let quote = action.data;

      //clone the current state
      let clone = lodash.cloneDeep(state.quotes);

      //check if quote already exist
      const index = clone.findIndex((obj) => obj.id === quote.id);

      //if the quote is in the array, replace the quote
      if (index !== -1) clone[index] = quote;

      return {...state, quotes: clone};
    }
    case DELETE_QUOTE: {
      let {id} = action.data;
      //clone the current state
      let clone = lodash.cloneDeep(state.quotes);

      //check if quote already exist
      const index = clone.findIndex((obj) => obj.id === id);

      //if the quote is in the array, remove the quote
      if (index !== -1) clone.splice(index, 1);

      return {...state, quotes: clone};
    }
    default:
      return state;
  }
};
