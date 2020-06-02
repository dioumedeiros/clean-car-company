import React, { useState, useEffect } from 'react';
import { Alert, FlatList, Text } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

import Camera from '../../components/Camera';
import {
  CameraButton,
  Container,
  Feed,
  Phase,
  ProblemButton,
  Service,
  TextButton,
  Title,
  TouchImage,
  Scroll,
  Stage,
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
      price: 12.12,
    },
    {
      type: 'Cera',
      price: 50.2,
    },
  ],
};

const CarDetails: React.FC = () => {
  const [sumServices, setSumServices] = useState(0);
  const [showCameraReceived, setShowCameraReceived] = useState(false);
  const [showCameraFinished, setShowCameraFinished] = useState(false);
  const [imageCarReceived, setImageCarReceived] = useState();
  const [imageCarFinished, setImageCarFinished] = useState();

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
    let sum = 0;
    car.services.map((service) => {
      sum += service.price;
    });

    setSumServices(sum);
  }

  function reportProblem() {
    Alert.alert('Problema reportado');
  }

  function openMap() {
    Alert.alert('Abrir no mapa');
  }

  return (
    <Container>
      <Scroll>
        <Feed>
          <Stage>
            <Icon name="checkcircle" size={25} color="#0080ff" />
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
          </Stage>
        </Feed>

        <Feed>
          <Stage>
            <Icon name="checkcircle" size={25} color="#d3d3d3" />
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
                <CameraButton onPress={() => toggleCamera(false)}>
                  <Icon name="camera" size={15} color="#fff" />
                  <TextButton>Receber</TextButton>
                </CameraButton>
              ) : (
                <ProblemButton onPress={() => reportProblem()}>
                  <TextButton>Relatar um problema</TextButton>
                </ProblemButton>
              )}
              <Camera
                show={showCameraReceived}
                onClose={() => toggleCamera(false)}
                result={(value) => chooseImageReceived(value)}
              />

              <FlatList
                data={car.services}
                keyExtractor={(item) => item.type}
                renderItem={({ item }) => <Service>- {item.type}</Service>}
                scrollEnabled={false}
              />
              <Text>R$ {sumServices}</Text>
            </Phase>
          </Stage>
        </Feed>
        <Feed>
          <Stage>
            <Icon name="checkcircle" size={25} color="#d3d3d3" />
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
                <CameraButton onPress={() => toggleCamera(true)}>
                  <Icon name="camera" size={15} color="#fff" />
                  <TextButton>Finalizar</TextButton>
                </CameraButton>
              ) : (
                <ProblemButton onPress={() => reportProblem()}>
                  <TextButton>Relatar um problema</TextButton>
                </ProblemButton>
              )}
              <Camera
                show={showCameraFinished}
                onClose={() => toggleCamera(true)}
                result={(value) => chooseImageFinished(value)}
              />
            </Phase>
          </Stage>
        </Feed>
        <Feed>
          <Stage>
            <Icon name="checkcircle" size={25} color="#d3d3d3" />
            <Phase>
              <Title>Automóvel entregue</Title>
            </Phase>
          </Stage>
        </Feed>
      </Scroll>
    </Container>
  );
};

export default CarDetails;
