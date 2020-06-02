import { Dimensions } from 'react-native';

import styled from 'styled-components/native';

export const Container = styled.View`
  justify-content: center;
  margin: 15px 0 0 25px;
`;

export const Scroll = styled.ScrollView`
  height: 100%;
`;

export const Feed = styled.View`
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

export const Service = styled.Text``;

export const Stage = styled.View`
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

export const CameraButton = styled.TouchableOpacity`
  margin-bottom: 5px;
  padding: 10px;
  background-color: #0055ff;
  border-radius: 6px;
  border-width: 1px;
  border-color: #fff;
  width: 110px;
  flex-direction: row;
`;

export const ProblemButton = styled.TouchableOpacity`
  padding: 10px;
  background-color: #0055ff;
  border-radius: 6px;
  border-width: 1px;
  border-color: #fff;
  width: 200px;
  margin-bottom: 10px;
`;
