import React, { useState } from 'react';
import { Dimensions } from 'react-native';

import { RNCamera } from 'react-native-camera';
import CameraRoll, {
  PhotoIdentifier,
} from '@react-native-community/cameraroll';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {
  Text,
  TouchableOpacity,
  View,
  Image,
  Modal,
  ScrollView,
  Alert,
} from 'react-native';

import styles from './styles';

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

  async function saveImage() {
    try {
      await CameraRoll.saveToCameraRoll(image);

      setImage('');
      setImageCount(imageCount + 1);
    } catch (err) {
      Alert.alert(JSON.stringify(err));
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
    if (position > 0 && imageList) {
      setImage(imageList[position / scrollWidth].node.image.uri);
    } else if (position == 0 && imageList) {
      setImage(imageList[0].node.image.uri);
    }
  }

  const toggleScreen = () =>
    !!!image ? (
      <View style={styles.cameraContainer}>
        <View style={styles.cancel}>
          <TouchableOpacity style={styles.buttonCancel} onPress={close}>
            <Icon name="close" size={30} color="#0330fc" />
          </TouchableOpacity>
        </View>
        <RNCamera
          ref={(ref) => setCamera(ref)}
          style={styles.camera}
          type={typeCamera}
          autoFocus={RNCamera.Constants.AutoFocus.on}
          flashMode={RNCamera.Constants.FlashMode.off}
          captureAudio={false}
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={toggleCamera} style={styles.button}>
            <Icon name="cached" size={25} color="#0330fc" />
          </TouchableOpacity>
          <TouchableOpacity onPress={takePicture} style={styles.button}>
            <Icon name="camera" size={25} color="#0330fc" />
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleModalGallery} style={styles.button}>
            <Icon name="collections" size={25} color="#0330fc" />
          </TouchableOpacity>
        </View>
      </View>
    ) : (
      <View style={styles.container}>
        <Image
          source={{ uri: image }}
          style={styles.image}
          resizeMode="contain"
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={saveImage}>
            <Icon name="save" size={25} color="#0330fc" />
            <Text style={styles.buttonText}>Salvar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={newImage}>
            <Icon name="close" size={25} color="#0330fc" />
            <Text style={styles.buttonText}>Excluir</Text>
          </TouchableOpacity>
        </View>
      </View>
    );

  return (
    <Modal visible={show}>
      <View style={styles.container}>
        <Modal
          animationType="slide"
          transparent
          visible={showGallery}
          onRequestClose={toggleModalGallery}
        >
          <View style={styles.modalContainer}>
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
                    <Image
                      style={styles.modalImage}
                      source={{ uri: image.node.image.uri }}
                      key={image.node.image.uri}
                      resizeMode="contain"
                    />
                  );
                })}
            </ScrollView>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={toggleModalGallery}
              >
                <Icon name="arrow-back" size={25} color="#0330fc" />
                <Text style={styles.buttonText}>Voltar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={chooseImage}>
                <Icon name="check" size={25} color="#0330fc" />
                <Text style={styles.buttonText}>Selecionar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        {toggleScreen()}
      </View>
    </Modal>
  );
};

export default Camera;
