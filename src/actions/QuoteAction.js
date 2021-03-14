import {
  SAMPLE_ACTION,
  ADD_QUOTE,
  UPDATE_QUOTE,
  DELETE_QUOTE,
  LIST_QUOTES,
  LOADING,
} from './types';
import axios from 'axios';
import {MyToast} from '../components';

export const sampleQuoteAction = () => ({
  type: SAMPLE_ACTION,
});

const isLoading = (name, value) => {
  return async (dispatch, getState) => {
    dispatch({
      type: LOADING,
      data: {
        name: name,
        value: value,
      },
    });
  };
};

//List Quote
const baseUrl = 'http://localhost:3000';
export const listQuotes = () => {
  return async (dispatch, getState) => {
    dispatch(isLoading('isListQuoteLoading', true));
    try {
      const response = await axios.get(`${baseUrl}/api/listQuotes`);
      console.log('respojse', response);
      if (response.status === 200) {
        dispatch(isLoading('isListQuoteLoading', false));

        return dispatch({
          type: LIST_QUOTES,
          data: response.data.quotes,
        });
      }
    } catch (error) {
      dispatch(isLoading('isListQuoteLoading', false));
      // console.log('error', error);
      if (error.response) {
        MyToast(error.response.data.message);
      } else if (error.request) {
        // console.log('error.request', error.request);
        // The request was made but no response was received
        // Error details are stored in error.reqeust
        if (error.request._response) {
          MyToast(error.request._response);
        }
      } else {
        // Some other errors
        MyToast(error.message);
      }
    }
  };
};

export const addQuote = ({quote, author, navigation}) => {
  return async (dispatch, getState) => {
    const header = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    let data = {
      quote: quote,
      author: author,
    };
    dispatch(isLoading('isSubmitQuoteLoading', true));

    try {
      const response = await axios.post(
        `${baseUrl}/api/createQuote`,
        data,
        header,
      );
      if (response.status === 200) {
        dispatch(isLoading('isSubmitQuoteLoading', false));
        MyToast(response.data.message);
        dispatch({type: ADD_QUOTE, data: response.data.quote});
        navigation.goBack();
      }
    } catch (error) {
      dispatch(isLoading('isSubmitQuoteLoading', false));

      // console.log('error', error);
      if (error.response) {
        MyToast(error.response.data.message);
      } else if (error.request) {
        if (error.request._response) {
          MyToast(error.request._response);
        }
      } else {
        MyToast(error.message);
      }
    }
  };
};

export const updateQuote = ({author, quote, id, navigation}) => {
  return async (dispatch, getState) => {
    const header = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    let data = {
      author: author,
      quote: quote,
    };
    dispatch(isLoading('isSubmitQuoteLoading', true));

    try {
      const response = await axios.put(
        `${baseUrl}/api/updateQuote/${id}`,
        data,
        header,
      );
      if (response.status === 200) {
        dispatch(isLoading('isSubmitQuoteLoading', false));
        MyToast(response.data.message);
        dispatch({
          type: UPDATE_QUOTE,
          data: {quote: quote, author: author, id: id},
        });
        navigation.goBack();
      }
    } catch (error) {
      dispatch(isLoading('isSubmitQuoteLoading', false));

      // console.log('error', error);
      if (error.response) {
        MyToast(error.response.data.message);
      } else if (error.request) {
        if (error.request._response) {
          MyToast(error.request._response);
        }
      } else {
        MyToast(error.message);
      }
    }
  };
};

export const deleteQuote = ({id}) => {
  return async (dispatch, getState) => {
    const header = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const response = await axios.put(
        `${baseUrl}/api/deleteQuote/${id}`,
        {},
        header,
      );
      if (response.status === 200) {
        MyToast(response.data.message);

        dispatch({
          type: DELETE_QUOTE,
          data: {
            id,
          },
        });
      }
    } catch (error) {
      // console.log('error', error);
      if (error.response) {
        MyToast(error.response.data.message);
      } else if (error.request) {
        if (error.request._response) {
          MyToast(error.request._response);
        }
      } else {
        MyToast(error.message);
      }
    }
  };
};
