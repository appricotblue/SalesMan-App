import { FadeFromBottomAndroid } from '@react-navigation/stack/lib/typescript/src/TransitionConfigs/TransitionPresets';

const INITAL_STATE = {

  movies: [],
  selectedMovie: null,
  loading: false,
  error: null,
};
export default (state = INITAL_STATE, action) => {
  switch (action.type) {

    case 'SET_MOVIES':
      return { ...state, movies: action.payload, loading: false, error: null };
    case 'SET_SELECTED_MOVIE':
      return { ...state, selectedMovie: action.payload, loading: false, error: null };
    case 'SET_LOADING':
      return { ...state, loading: action.payload, error: null };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};
