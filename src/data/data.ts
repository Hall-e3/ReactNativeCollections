import {AnimationObject} from 'lottie-react-native';
import {Lottie1, Lottie2, Lottie3} from '../constants/animations';

export interface OnboardingData {
  id: number;
  animation: AnimationObject;
  text: string;
  textColor: string;
  backgroundColor: string;
}

export const data: OnboardingData[] = [
  {
    id: 1,
    animation: Lottie1,
    text: 'Lorem Ipsum dolor sit amet',
    textColor: '#005b4f',
    backgroundColor: '#ffa3ce',
  },
  {
    id: 2,
    animation: Lottie2,
    text: 'Lorem Ipsum dolor sit amet',
    textColor: '#1e2169',
    backgroundColor: '#bae4fd',
  },
  {
    id: 3,
    animation: Lottie3,
    text: 'Lorem Ipsum dolor sit amet',
    textColor: '#F15937',
    backgroundColor: '#faeb8a',
  },
];
