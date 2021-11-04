import {Source} from 'react-native-fast-image';

export interface OnBoardingDataType {
  id: number;
  image: number | Source;
  text: string;
}
const onBoardingData: Array<OnBoardingDataType> = [
  {
    id: 1,
    image: require('assets/images/OnboardOne.png'),
    text: 'Welcome to EateryOrder',
  },
  {
    id: 2,
    image: require('assets/images/OnboardTwo.png'),
    text: 'Manage the order with a click.',
  },
  {
    id: 3,
    image: require('assets/images/OnboardThree.png'),
    text: 'Get instant notification of order.',
  },
  {
    id: 4,
    image: require('assets/images/OnboardFour.png'),
    text: 'Manage your menu from the app.',
  },
];

export default onBoardingData;
