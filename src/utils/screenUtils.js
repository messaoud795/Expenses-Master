import {useEffect, useState, useRef} from 'react';
import {Dimensions, Alert} from 'react-native';
import {useDeviceOrientation} from '@react-native-community/hooks';
import {isEqual} from 'lodash';

export const getScreenWidth = () => Dimensions.get('window').width;
export const getScreenHeight = () => Dimensions.get('window').height;

export const alertModal = (
  title,
  msg = '',
  confirmFct = undefined,
  cancelFct = undefined,
) => {
  Alert.alert(title, msg, [
    {
      text: 'Cancel',
      style: 'cancel',
      ...(cancelFct && {onPress: cancelFct()}),
    },
    {text: 'OK', ...(confirmFct && {onPress: confirmFct})},
  ]);
};

export const isLandscapeActive = () => {
  return getScreenWidth() > getScreenHeight();
};

//custom hooks
export const useScreenWidth = () => {
  const [screenWidth, setScreenWidth] = useState(getScreenWidth());
  const orientation = useDeviceOrientation();

  useEffect(() => {
    setScreenWidth(getScreenWidth());
  }, [orientation]);

  return screenWidth;
};

export const useScreenHeight = () => {
  const [screenHeight, setScreenHeight] = useState(getScreenHeight());
  const orientation = useDeviceOrientation();

  useEffect(() => {
    setScreenHeight(getScreenHeight());
  }, [orientation]);

  return screenHeight;
};

const getLoaderTopMargin = (orientation, screenHeight) => {
  return orientation === 'landscape' ? screenHeight * 0.1 : screenHeight * 0.25;
};

export const useLoaderMargin = () => {
  const orientation = useDeviceOrientation();
  const screenHeight = useScreenHeight();
  const [margin, setMargin] = useState(
    getLoaderTopMargin(orientation, screenHeight),
  );

  useEffect(() => {
    setMargin(getLoaderTopMargin(orientation, screenHeight));
  }, [orientation, screenHeight]);

  return margin;
};

//custom hook to get previous value of a state
export function usePrevious(value) {
  const ref = useRef(value);
  useEffect(() => {
    ref.current = value; //assign the value of ref to the argument
  }, [value]); //this code will run when the value of 'value' changes
  return ref.current; //in the end, return the current ref value.
}

export const arePropsEqual = (previousProps, nextProps) =>
  isEqual(previousProps, nextProps);
