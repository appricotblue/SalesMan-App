import { FadeFromBottomAndroid } from '@react-navigation/stack/lib/typescript/src/TransitionConfigs/TransitionPresets';

const INITAL_STATE = {

  orders: [],
  shops: [],
  shopitems: [],
  shopdetails: {},
  shoporders: [],
  earnings:[],
  profile: {},
  selectedMovie: null,
  loading: false,
  error: null,
};
export default (state = INITAL_STATE, action) => {
  switch (action.type) {

    case 'SET_ORDERS':
      // console.log(action.payload, 'here redu')
      return { ...state, orders: action.payload, loading: false, error: null };
    case 'SET_SHOPS':
      return { ...state, shops: action.payload, loading: false, error: null };
    case 'SET_PROFILE':
      return { ...state, profile: action.payload, loading: false, error: null };
      case 'SET_EARNINGS':
        return { ...state, earnings: action.payload, loading: false, error: null };
    case 'SET_SHOPDETAILS':
      return { ...state, shopdetails: action.payload, loading: false, error: null };
    case 'SET_SHOPORDERS':
      return { ...state, shoporders: action.payload, loading: false, error: null };
    case 'SET_ITEMS':
      return { ...state, shopitems: action.payload, loading: false, error: null };
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
