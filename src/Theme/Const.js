import {Dimensions} from 'react-native';
export const getHeight = percent => {
  return percent === 0 ? 0 : Dimensions.get('window').height / percent;
};

export const getWidth = percent => {
  return percent === 0 ? 0 : Dimensions.get('window').width / percent;
};
