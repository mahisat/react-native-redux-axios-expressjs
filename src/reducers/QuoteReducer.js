import {
  SAMPLE_ACTION,
  ADD_QUOTE,
  UPDATE_QUOTE,
  DELETE_QUOTE,
  LIST_QUOTES,
  LOADING,
} from '../actions/types';

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
      let {quote} = action.data;

      const quotes = [quote, ...state.quotes]; //add the new quote to the top

      return {...state, quotes: quotes};
     case UPDATE_QUOTE: {
      let {quote} = action.data;

      //check if quote already exist
      const quoteIndex = state.quotes.findIndex((obj) => obj.id === quote.id);

      return {
        ...state,
        quotes: [
          ...state.quotes.slice(0, quoteIndex),
          quote,
          ...state.quotes.slice(quoteIndex + 1),
        ],
      };
    }
 case DELETE_QUOTE: {
      let {id} = action.data;

      const quoteIndex = state.quotes.findIndex((obj) => obj.id === id);

      const quotes = [
        ...state.quotes.slice(0, quoteIndex),
        ...state.quotes.slice(quoteIndex + 1),
      ];

      return {...state, quotes: quotes};
    }

    default:
      return state;
  }
};
