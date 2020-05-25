import { StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  cameraContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  camera: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    opacity: 1,
  },
  buttonContainer: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#fff',
    height: '11%',
  },
  button: {
    flex: 0,
    borderRadius: 5,
    padding: 5,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
  buttonText: {
    fontSize: 14,
  },
  image: {
    flex: 1,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.85)',
  },
  modalImage: {
    width: Dimensions.get('window').width * 0.8,
    marginHorizontal: Dimensions.get('window').width * 0.1,
  },
  cancel: {
    opacity: 1,
    backgroundColor: 'white',
    height: '10%',
  },
  buttonCancel: {
    marginLeft: '3%',
    marginTop: '8%',
  },
});

export default styles;
