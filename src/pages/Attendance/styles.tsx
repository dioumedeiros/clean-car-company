import styled from 'styled-components/native';

export const Card = styled.View`
  background: #08a4bd;
  color: #000;
  padding: 15px;
  margin: 15px;
  border: 2px;
  border-color: #08a4bd;
  border-radius: 10px;

  justify-content: space-evenly;
  align-items: flex-start;
`;

export const CardInfo = styled.Text`
  color: #fff;
  font-size: 14px;
`;

export const Title = styled.Text`
  font-size: 24px;
  font-weight: 700;
  color: #fff;
  margin-bottom: 10px;
`;

export const Controls = styled.View`
  width: 80%;
  margin-top: 20px;
  margin-left: 75px;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: flex-end;
`;

export const Button = styled.TouchableOpacity`
  height: 36px;
  width: 100px;
  background: #08a4bd;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
`;

export const ButtonText = styled.Text`
  color: #fff;
  font-size: 16px;
  font-weight: 700;
`;
