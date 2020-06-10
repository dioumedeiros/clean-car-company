import { Dimensions } from 'react-native';
import styled from 'styled-components/native';
import { isIphoneX } from 'react-native-iphone-x-helper';

export const Container = styled.View`
  flex: 1;
  background-color: black;
`;

export const CameraContainer = styled.View`
  flex: 1;
  flex-direction: column;
`;

export const ButtonContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  height: 10%;
  background-color: #000;
  margin-bottom: 15px;
`;

export const Button = styled.TouchableOpacity`
  margin-top: 10px;
  padding: 15px;
  padding-right: 10%;
  padding-left: 10%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

export const Text = styled.Text`
  margin-top: 5px;
  font-size: 14px;
  color: #fff;
`;

export const ModalImage = styled.Image`
  width: ${Dimensions.get('window').width * 0.8}px;
  margin-right: ${Dimensions.get('window').width * 0.1}px;
  margin-left: ${Dimensions.get('window').width * 0.1}px;
`;

export const Image = styled.Image`
  flex: 1;
  margin-bottom: -20%;
`;

export const ModalContainer = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.85);
`;

export const CancelContainer = styled.View`
  opacity: 1;
  height: ${isIphoneX() ? 15 : 11}%;
`;

export const ButtonCancel = styled.TouchableOpacity`
  margin-left: 3%;
  margin-top: ${isIphoneX() ? 15 : 9}%;
`;

export const ScrollView = styled.ScrollView``;
