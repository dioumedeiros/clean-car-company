import React from 'react';
import { View, Text } from 'react-native';

import { Card, Title, Controls, CardInfo, Button, ButtonText } from './styles';

const list = [1, 2, 3, 4];
const Attendance: React.FC = () => {
  return (
    <View>
      <Card>
        <Title>Novo Cliente</Title>

        <View>
          <CardInfo>Nome: Diego</CardInfo>
          <CardInfo>Endereço: Rua 12, nº 90, centro</CardInfo>
          <CardInfo>Ford Fiesta branco - MAW4422</CardInfo>
          <CardInfo>Serviço: Ducha externa</CardInfo>
          <CardInfo>Leva e traz: Não</CardInfo>
        </View>

        <Controls>
          <Button>
            <ButtonText>Rejeitar</ButtonText>
          </Button>
          <Button>
            <ButtonText>Aceitar</ButtonText>
          </Button>
        </Controls>
      </Card>
      <Card>
        <Title>Novo Cliente</Title>

        <View>
          <CardInfo>Nome: Diego</CardInfo>
          <CardInfo>Endereço: Rua 12, nº 90, centro</CardInfo>
          <CardInfo>Ford Fiesta branco - MAW4422</CardInfo>
          <CardInfo>Serviço: Ducha externa</CardInfo>
          <CardInfo>Leva e traz: Não</CardInfo>
        </View>

        <Controls>
          <Button>
            <ButtonText>Rejeitar</ButtonText>
          </Button>
          <Button>
            <ButtonText>Aceitar</ButtonText>
          </Button>
        </Controls>
      </Card>
    </View>
  );
};

export default Attendance;
