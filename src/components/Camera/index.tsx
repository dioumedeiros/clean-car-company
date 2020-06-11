import React, { useState } from 'react';
import { Dimensions, Platform, PermissionsAndroid } from 'react-native';

import { RNCamera } from 'react-native-camera';
import CameraRoll, {
  PhotoIdentifier,
} from '@react-native-community/cameraroll';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { Alert, Modal } from 'react-native';

import {
  Button,
  ButtonCancel,
  ButtonContainer,
  CameraContainer,
  CancelContainer,
  Container,
  Image,
  ModalImage,
  ModalContainer,
  ScrollView,
  Text,
} from './styles';

interface Props {
  show: boolean;
  onClose: () => void;
  result: (value: any) => void;
}

const Camera: React.FC<Props> = ({ show, onClose, result }) => {
  const [camera, setCamera] = useState<RNCamera | null>();
  const [typeCamera, setTypeCamera] = useState(RNCamera.Constants.Type.back);
  const [image, setImage] = useState('');
  const [imageCount, setImageCount] = useState(0);
  const [imageList, setImageList] = useState<PhotoIdentifier[]>();
  const [showGallery, setShowGallery] = useState(false);
  const scrollWidth = Dimensions.get('window').width;

  async function takePicture() {
    if (camera) {
      try {
        const options = {
          base64: true,
          forceUpOrientation: true,
          fixOrientation: true,
        };

        const data = await camera.takePictureAsync(options);

        setImage(data.uri);
      } catch (err) {
        Alert.alert(JSON.stringify(err));
      }
    }
  }

  const checkAndroidPermission = async () => {
    try {
      const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;
      await PermissionsAndroid.request(permission);
      Promise.resolve();
    } catch (error) {
      Promise.reject(error);
    }
  };

  async function saveImage() {
    try {
      if (Platform.OS === 'android') {
        await checkAndroidPermission();
      }

      await CameraRoll.saveToCameraRoll(image);

      setImage('');
      setImageCount(imageCount + 1);
    } catch (err) {
      Alert.alert(JSON.stringify(err));
      console.log(JSON.stringify(err));
    }
  }

  function newImage() {
    setImage('');
    if (imageCount > 0) {
      setImageCount(imageCount - 1);
    }
  }

  function toggleCamera() {
    if (typeCamera == RNCamera.Constants.Type.back) {
      setTypeCamera(RNCamera.Constants.Type.front);
    } else {
      setTypeCamera(RNCamera.Constants.Type.back);
    }
  }

  function close() {
    setImage('');
    result(null);
    onClose();
  }

  async function toggleModalGallery() {
    if (!imageCount) {
      Alert.alert('Nenhuma imagem capturada');
      return;
    }

    if (!showGallery) {
      try {
        const images = await CameraRoll.getPhotos({
          first: imageCount,
          assetType: 'Photos',
        });
        setShowGallery(!showGallery);
        setImageList(images.edges);
        setImage(images.edges[0].node.image.uri);
      } catch (err) {
        Alert.alert(JSON.stringify(err));
      }
    } else {
      setImage('');
      setShowGallery(!showGallery);
    }
  }

  function chooseImage() {
    setShowGallery(!showGallery);
    result(image);
    setImage('');
  }

  function getImage(position: any) {
    console.log('scrollWidth', scrollWidth);
    console.log('position', position);
    console.log('imageList', imageList);

    if (position > 0 && imageList) {
      setImage(imageList[position / scrollWidth].node.image.uri);
    } else if (position == 0 && imageList) {
      setImage(imageList[0].node.image.uri);
    }
  }

  const toggleScreen = () =>
    !!!image ? (
      <CameraContainer>
        <CancelContainer>
          <ButtonCancel onPress={close}>
            <Icon name="close" size={30} color="#fff" />
          </ButtonCancel>
        </CancelContainer>
        <RNCamera
          ref={(ref) => setCamera(ref)}
          type={typeCamera}
          style={{
            flex: 1,
            justifyContent: 'flex-end',
            alignItems: 'center',
            opacity: 1,
          }}
          autoFocus={RNCamera.Constants.AutoFocus.on}
          flashMode={RNCamera.Constants.FlashMode.off}
          captureAudio={false}
        />
        <ButtonContainer>
          <Button onPress={toggleCamera}>
            <Icon name="cached" size={25} color="#fff" />
            <Text>Inverter</Text>
          </Button>
          <Button onPress={takePicture}>
            <Icon name="camera" size={25} color="#fff" />
            <Text>Capturar</Text>
          </Button>
          <Button onPress={toggleModalGallery}>
            <Icon name="collections" size={25} color="#fff" />
            <Text>Galeria</Text>
          </Button>
        </ButtonContainer>
      </CameraContainer>
    ) : (
      <Container>
        <Image source={{ uri: image }} resizeMode="contain" />
        <ButtonContainer>
          <Button onPress={newImage}>
            <Icon name="close" size={25} color="#fff" />
            <Text>Excluir</Text>
          </Button>
          <Button onPress={saveImage}>
            <Icon name="save" size={25} color="#fff" />
            <Text>Salvar</Text>
          </Button>
        </ButtonContainer>
      </Container>
    );

  return (
    <Modal visible={show}>
      <Container>
        <Modal
          animationType="slide"
          transparent
          visible={showGallery}
          onRequestClose={toggleModalGallery}
        >
          <ModalContainer>
            <ScrollView
              horizontal
              pagingEnabled
              onMomentumScrollEnd={(event) =>
                getImage(event.nativeEvent.contentOffset.x)
              }
            >
              {imageList &&
                imageList.map((image) => {
                  return (
                    <ModalImage
                      source={{ uri: image.node.image.uri }}
                      key={image.node.image.uri}
                      resizeMode="contain"
                    />
                  );
                })}
            </ScrollView>
            <ButtonContainer>
              <Button onPress={toggleModalGallery}>
                <Icon name="arrow-back" size={25} color="#fff" />
                <Text>Voltar</Text>
              </Button>
              <Button onPress={chooseImage}>
                <Icon name="check" size={25} color="#fff" />
                <Text>Selecionar</Text>
              </Button>
            </ButtonContainer>
          </ModalContainer>
        </Modal>
        {toggleScreen()}
      </Container>
    </Modal>
  );
};

export default Camera;
