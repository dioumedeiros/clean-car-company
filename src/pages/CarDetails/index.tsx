import React, { useState, useEffect } from 'react';
import { Alert, FlatList, Text } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

import Camera from '../../components/Camera';
import {
  Button,
  Container,
  Stage,
  Phase,
  Scroll,
  GridRow,
  TextButton,
  Title,
  TouchImage,
  MapButton,
  ModalImage,
} from './styles';

const car = {
  owner: 'R10',
  address: 'Rua Rubens Faraco, 1061 Humaitá',
  brand: 'Chevrolet',
  model: 'Celta',
  licensePlate: 'JSJ-8905',
  services: [
    {
      type: 'Lavação externa',
      price: 10,
    },
    {
      type: 'Polimento dos faróis',
      price: 12.1,
    },
    {
      type: 'Cera',
      price: 60.22,
    },
  ],
};

const CarDetails: React.FC = () => {
  const [sumServices, setSumServices] = useState(0);
  const [showCameraReceived, setShowCameraReceived] = useState(false);
  const [showCameraFinished, setShowCameraFinished] = useState(false);
  const [carDelivered, setCarDelivered] = useState(false);
  const [imageCarReceived, setImageCarReceived] = useState();
  const [imageCarFinished, setImageCarFinished] = useState();

  const icon = {
    size: 25,
    colorAccepted: '#08A4BD',
    colorReceived: imageCarReceived ? '#08A4BD' : '#d3d3d3',
    colorFinished: imageCarFinished ? '#08A4BD' : '#d3d3d3',
    colorDelivered: carDelivered ? '#08A4BD' : '#d3d3d3',
  };

  useEffect(() => {
    getSumServices();
  }, [car.services]);

  function toggleCamera(finished: boolean) {
    if (finished) {
      setShowCameraFinished(!showCameraFinished);
    } else {
      setShowCameraReceived(!showCameraReceived);
    }
  }

  function chooseImageReceived(value: any) {
    setImageCarReceived(value);
    setShowCameraReceived(false);
  }

  function chooseImageFinished(value: any) {
    setImageCarFinished(value);
    setShowCameraFinished(false);
  }

  function getSumServices() {
    // let sum = 0;
    // car.services.map((service) => {
    //   sum += service.price;
    // });

    const sum = car.services.reduce(
      (total, service) => total + service.price,
      0,
    );

    setSumServices(sum);
  }

  function reportProblem() {
    Alert.alert('Problema reportado');
  }

  function openMap() {
    Alert.alert('Abrir no mapa');
  }

  function toggleDelivered() {
    setCarDelivered(!carDelivered);
  }

  return (
    <Container>
      <Scroll>
        <Stage>
          <GridRow>
            <Icon
              name="checkcircle"
              size={icon.size}
              color={icon.colorAccepted}
            />
            <Phase>
              <Title>Aceitou</Title>
              <Text>Lavação Aceita</Text>
              <Text>Nome: {car.owner}</Text>
              <Text>Marca: {car.brand}</Text>
              <Text>Modelo: {car.model}</Text>
              <Text>Endereço: {car.address}</Text>
            </Phase>
            <MapButton onPress={() => openMap()}>
              <TextButton>Abrir no mapa</TextButton>
            </MapButton>
          </GridRow>
        </Stage>

        <Stage>
          <GridRow>
            <Icon
              name="checkcircle"
              size={icon.size}
              color={icon.colorReceived}
            />
            <Phase>
              <Title>Carro recebido</Title>
              {imageCarReceived && (
                <TouchImage onPress={() => toggleCamera(false)}>
                  <ModalImage
                    source={{
                      uri: imageCarReceived,
                    }}
                  />
                </TouchImage>
              )}
              {!imageCarReceived ? (
                <Button width="110" onPress={() => toggleCamera(false)}>
                  <Icon name="camera" size={15} color="#fff" />
                  <TextButton>Receber</TextButton>
                </Button>
              ) : (
                <GridRow>
                  <Button width="39" onPress={() => toggleCamera(false)}>
                    <Icon name="camera" size={15} color="#fff" />
                  </Button>
                  <Button width="159" onPress={() => reportProblem()}>
                    <TextButton>Relatar problema</TextButton>
                  </Button>
                </GridRow>
              )}
              <Camera
                show={showCameraReceived}
                onClose={() => toggleCamera(false)}
                result={(value) => chooseImageReceived(value)}
              />

              <FlatList
                data={car.services}
                keyExtractor={(item) => item.type}
                renderItem={({ item }) => <Text>- {item.type}</Text>}
                scrollEnabled={false}
              />
              <Text>
                {Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                }).format(sumServices)}
              </Text>
            </Phase>
          </GridRow>
        </Stage>
        <Stage>
          <GridRow>
            <Icon
              name="checkcircle"
              size={icon.size}
              color={icon.colorFinished}
            />
            <Phase>
              <Title>Lavação Finalizada</Title>
              {imageCarFinished && (
                <TouchImage onPress={() => toggleCamera(true)}>
                  <ModalImage
                    source={{
                      uri: imageCarFinished,
                    }}
                  />
                </TouchImage>
              )}
              {!imageCarFinished ? (
                <Button width="110" onPress={() => toggleCamera(true)}>
                  <Icon name="camera" size={15} color="#fff" />
                  <TextButton>Finalizar</TextButton>
                </Button>
              ) : (
                <GridRow>
                  <Button width="39" onPress={() => toggleCamera(true)}>
                    <Icon name="camera" size={15} color="#fff" />
                  </Button>
                  <Button width="159" onPress={() => reportProblem()}>
                    <TextButton>Relatar problema</TextButton>
                  </Button>
                </GridRow>
              )}
              <Camera
                show={showCameraFinished}
                onClose={() => toggleCamera(true)}
                result={(value) => chooseImageFinished(value)}
              />
            </Phase>
          </GridRow>
        </Stage>
        <Stage>
          <GridRow>
            <Icon
              name="checkcircle"
              size={icon.size}
              color={icon.colorDelivered}
            />
            <Phase>
              <Title>Automóvel entregue</Title>
              <Button width="110" onPress={() => toggleDelivered()}>
                <TextButton> Entregar </TextButton>
              </Button>
            </Phase>
          </GridRow>
        </Stage>
      </Scroll>
    </Container>
  );
};

export default CarDetails;
