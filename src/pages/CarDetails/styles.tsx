import { Dimensions } from 'react-native';

import styled from 'styled-components/native';

const blueButton = '#0036a3';

export const Container = styled.View`
  justify-content: center;
  margin: 0 0 0 25px;
`;

export const Scroll = styled.ScrollView`
  height: 100%;
`;

export const Stage = styled.View`
  margin-top: 10px;
`;

export const TouchImage = styled.TouchableOpacity`
  width: 200px;
`;

export const Phase = styled.View`
  margin-left: 15px;
  width: ${Dimensions.get('window').width * 0.85}px;
`;

export const Title = styled.Text`
  font-weight: bold;
  margin-bottom: 5px;
`;

export const GridRow = styled.View`
  flex-direction: row;
`;

export const ModalImage = styled.Image`
  margin-bottom: 3px;
  width: 200px;
  height: 200px;
  border-radius: 6px;
`;

export const MapButton = styled.TouchableOpacity`
  margin-left: -40%;
  padding-top: 10px;
  background-color: #1e6738;
  border-radius: 6px;
  border-width: 1px;
  border-color: #fff;
  height: 40px;
`;

export const TextButton = styled.Text`
  color: #fff;
  text-align: center;
  padding-left: 10px;
  padding-right: 10px;
  font-weight: bold;
`;

export const Button = styled.TouchableOpacity`
  padding: 10px;
  background-color: ${blueButton};
  border-radius: 6px;
  border-width: 1px;
  border-color: #fff;
  width: ${(props) => (props.width ? props.width : 150)}px;
  height: 40px;
  margin-bottom: 10px;
  margin-right: 2px;
  flex-direction: row;
`;
