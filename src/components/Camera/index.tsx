import React, { useState } from 'react';
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

const Camera: React.FC = () => {
  const [camera, setCamera] = useState<RNCamera | null>();
  const [typeCamera, setTypeCamera] = useState(RNCamera.Constants.Type.back);
  const [image, setImage] = useState('');
  const [imagesCount, setImagesCount] = useState(0);
  const [imagesList, setImagesList] = useState<PhotoIdentifier[]>();
  const [modalVisible, setModalVisible] = useState(false);

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
        console.log('takePicture', err);

        Alert.alert(JSON.stringify(err));
      }
    }
  }

  async function saveImage() {
    try {
      await CameraRoll.saveToCameraRoll(image);

      setImage('');
      setImagesCount(imagesCount + 1);

      Alert.alert('Imagem salva com sucesso!');
    } catch (err) {
      console.log('saveImage', err);

      Alert.alert(JSON.stringify(err));
    }
  }

  function newImage() {
    setImage('');
    if (imagesCount > 0) setImagesCount(imagesCount - 1);
    Alert.alert('Imagem descartada com sucesso!');
  }

  function toggleCamera() {
    if (typeCamera == RNCamera.Constants.Type.back)
      setTypeCamera(RNCamera.Constants.Type.front);
    else setTypeCamera(RNCamera.Constants.Type.back);
  }

  function catchau() {
    setImage('');
    Alert.alert('Voltar');
  }

  async function toggleModalVisibility() {
    if (!modalVisible) {
      try {
        const images = await CameraRoll.getPhotos({
          first: imagesCount,
          assetType: 'Photos',
        });
        setModalVisible(!modalVisible);
        setImagesList(images.edges);
      } catch (err) {
        console.log('newImage', err);

        Alert.alert(JSON.stringify(err));
      }
    } else {
      setModalVisible(!modalVisible);
    }
  }

  const toggleScreen = () =>
    !!!image ? (
      <View style={styles.cameraContainer}>
        <View style={styles.cancel}>
          <TouchableOpacity style={styles.buttonCancel} onPress={catchau}>
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
          <TouchableOpacity
            onPress={toggleModalVisibility}
            style={styles.button}
          >
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
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={newImage}>
            <Icon name="close" size={25} color="#0330fc" />
          </TouchableOpacity>
        </View>
      </View>
    );

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent
        visible={modalVisible}
        onRequestClose={toggleModalVisibility}
      >
        <View style={styles.modalContainer}>
          <ScrollView horizontal pagingEnabled>
            {imagesList &&
              imagesList.map((image) => {
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
              onPress={toggleModalVisibility}
            >
              <Text style={styles.buttonText}>Voltar para câmera</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {toggleScreen()}
    </View>
  );
};

export default Camera;
