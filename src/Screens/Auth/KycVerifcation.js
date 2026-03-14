import {
  Alert,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Linking,
  PermissionsAndroid,
} from 'react-native';
import React, { useState } from 'react';
import MainContainer from '../../components/MainContainer';
import Header from '../../components/Header';
import i18n from '../../components/i18n';
import Colors, { Fonts } from '../../utils/Colors';
import { hp, rf, wp } from '../../components/Responvie';
import images from '../../assets/Images/images';
import { Styles } from './Style';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import PrimaryButton from '../../components/PrimaryButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import apiService from '../../Services/apiService';
import { all } from 'axios';
import { useNavigation } from '@react-navigation/native';

const KycVerifcation = () => {
  const navigation = useNavigation();
  const [aadharFront, setAadharFront] = useState(null);
  const [aadharBack, setAadharBack] = useState(null);

  const [aadharFrontData, setAadharFrontData] = useState(null);
  const [aadharBackData, setAadharBackData] = useState(null);
  const [loading, setLoading] = useState(false);
  const requestCameraPermission = async () => {
    if (Platform.OS !== 'android') return true;

    const granted = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.CAMERA,
    );

    if (granted) return true;

    const result = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
    );

    if (result === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    }

    if (result === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
      Alert.alert(
        'Permission Required',
        'Camera permission is blocked. Please enable it from settings.',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Open Settings', onPress: () => Linking.openSettings() },
        ],
      );
    }

    return false;
  };
  const HnadlePress = async () => {
    try {
      // FRONT
      setLoading(true);
      const frontUploadUrl = await getUploadUrl(aadharFrontData);
      console.log(frontUploadUrl, 'asdas');
      await uploadImageToS3(frontUploadUrl, aadharFrontData, 'AADHAR_FRONT');

      // BACK
      const backUploadUrl = await getUploadUrl(aadharBackData);
      await uploadImageToS3(backUploadUrl, aadharBackData, 'AADHAR_BACK');

      // Alert.alert('KYC uploaded successfully');
    } catch (error) {
      Alert.alert('Something went wrong--');
    } finally {
      setLoading(false); // ✅ always stop loader
    }
  };
  const options = {
    mediaType: 'photo',
    quality: 0.7,
  };

  /* ================= IMAGE PICKER ================= */
  // const openImagePicker = (setImage, setImageData) => {
  //   Alert.alert('Select Image', 'Choose an option', [
  //     {
  //       text: 'Camera',
  //       onPress: () => {
  //         launchCamera(options, response => {
  //           if (!response.didCancel && !response.errorCode) {
  //             setImage(response.assets[0].uri);
  //             setImageData(response.assets[0]);
  //           }
  //         });
  //       },
  //     },
  //     {
  //       text: 'Gallery',
  //       onPress: () => {
  //         launchImageLibrary(options, response => {
  //           if (!response.didCancel && !response.errorCode) {
  //             setImage(response.assets[0].uri);
  //             setImageData(response.assets[0]);
  //           }
  //         });
  //       },
  //     },
  //     { text: 'Cancel', style: 'cancel' },
  //   ]);
  // };

  const openImagePicker = (setImage, setImageData) => {
    Alert.alert('Select Image', 'Choose an option', [
      {
        text: 'Camera',
        onPress: async () => {
          const hasPermission = await requestCameraPermission();
          if (!hasPermission) {
            Alert.alert('Camera permission denied');
            return;
          }

          launchCamera(
            {
              mediaType: 'photo',
              quality: 0.7,
              saveToPhotos: true,
              cameraType: 'back',
            },
            response => {
              if (response.didCancel) return;
              if (response.errorCode) {
                Alert.alert('Camera error', response.errorMessage);
                return;
              }

              const asset = response.assets[0];

              setImage(asset.uri);
              setImageData({
                ...asset,
                fileName: asset.fileName || `photo_${Date.now()}.jpg`,
              });
            },
          );
        },
      },
      {
        text: 'Gallery',
        onPress: () => {
          launchImageLibrary({ mediaType: 'photo', quality: 0.7 }, response => {
            if (!response.didCancel && !response.errorCode) {
              const asset = response.assets[0];
              setImage(asset.uri);
              setImageData({
                ...asset,
                fileName: asset.fileName || `image_${Date.now()}.jpg`,
              });
            }
          });
        },
      },
      { text: 'Cancel', style: 'cancel' },
    ]);
  };

  /* ================= GET S3 URL ================= */
  const getUploadUrl = async imageData => {
    const accestoken = await AsyncStorage.getItem('ACCESS_TOKEN');

    const response = await apiService.get('/technician/kyc-upload/image-url', {
      params: {
        fileName: imageData.fileName,
        fileType: imageData.type,
      },
      headers: {
        Authorization: `Bearer ${accestoken}`,
      },
    });

    return response?.data;
  };

  //   try {
  //     setLoading(true);

  //     const response = await fetch(imageData.uri);
  //     const blob = await response.blob();

  //     const uploadResponse = await fetch(uploadUrl, {
  //       method: 'PUT',
  //       headers: {
  //         'Content-Type': imageData.type, // 👈 MUST match
  //       },
  //       body: blob,
  //     });

  //     if (uploadResponse.status === 200 || uploadResponse.status === 204) {
  //       const cleanUrl = uploadUrl.split('?')[0]; // 👈 public URL
  //       await callKycApi(cleanUrl, type);
  //     } else {
  //       throw new Error('Upload failed');
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     Alert.alert('Image upload failed===');
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  const uploadImageToS3 = async (uploadUrl, imageData, type) => {
    try {
      setLoading(true);

      await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('PUT', uploadUrl);

        xhr.setRequestHeader('Content-Type', imageData.type);

        xhr.onload = () => {
          if (xhr.status === 200 || xhr.status === 204) {
            resolve();
          } else {
            reject(new Error('Upload failed'));
          }
        };

        xhr.onerror = () => reject(new Error('Upload error'));

        xhr.send({
          uri:
            Platform.OS === 'android'
              ? imageData.uri
              : imageData.uri.replace('file://', ''),
          type: imageData.type,
          name: imageData.fileName,
        });
      });

      const cleanUrl = uploadUrl.split('?')[0];
      await callKycApi(cleanUrl, type);
    } catch (error) {
      console.log('S3 Upload Error:', error);
      Alert.alert('Image upload failed===');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.clear();
      navigation.reset({
        index: 0,
        routes: [{ name: 'WelcomeScreen' }],
      });
      // setVisible(false);
    } catch (error) {
      Alert.alert('Not Log Out');
      // setVisible(false);
    } finally {
      setVisible(false);
    }
  };
  const callKycApi = async (docUrl, type) => {
    const accestoken = await AsyncStorage.getItem('ACCESS_TOKEN');
    console.log(docUrl, 'aaa');
    try {
      setLoading(true); // 🔄 start loader

      const response = await apiService.post(
        '/technician/kyc',
        {
          type: type,
          docUrl: docUrl,
          comment: 'Uploaded from technician app',
        },
        {
          headers: {
            Authorization: `Bearer ${accestoken}`,
          },
        },
      );

      if (response?.status === true) {
        setLoading(false); // ✅ stop before navigation

        navigation.reset({
          index: 0,
          routes: [{ name: 'KycPending' }],
        });
      } else {
        setLoading(false);
        Alert.alert(response?.message || 'KYC upload failed');
      }
    } catch (error) {
      setLoading(false); // ❌ error case
      Alert.alert('Something went wrongas');
    } finally {
      setLoading(false);
    }
  };
  /* ================= FINAL SUBMIT ================= */

  /* ================= UI ================= */
  const renderUploadBox = (image, onPick, onRemove, label) => (
    <>
      {image ? (
        <View>
          <Image source={{ uri: image }} style={Styles.aadhraclicablestyle} />
          <TouchableOpacity onPress={onRemove} style={styles.removeBtn}>
            <Text allowFontScaling={false} style={styles.removeText}>
              ✕
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity onPress={onPick} style={Styles.aadhraclicablestyle}>
          <Image source={images.upload} style={Styles.aadhrupaloadImagestyle} />
          <Text allowFontScaling={false} style={Styles.AddharcardText}>
            {label}
          </Text>
        </TouchableOpacity>
      )}
    </>
  );

  return (
    <MainContainer>
      <Header title={i18n.t('KYCVerification')} />

      {renderUploadBox(
        aadharFront,
        () => openImagePicker(setAadharFront, setAadharFrontData),
        () => setAadharFront(null),
        i18n.t('UploadAadharfront'),
      )}

      {renderUploadBox(
        aadharBack,
        () => openImagePicker(setAadharBack, setAadharBackData),
        () => setAadharBack(null),
        i18n.t('UploadAadharback'),
      )}

      <View style={styles.warningBox}>
        <Image
          source={images.erroe}
          style={{ width: wp(4), height: wp(4), resizeMode: 'contain' }}
        />
        <Text allowFontScaling={false} style={styles.warningText}>
          {i18n.t('Pleaseupload')}
        </Text>
      </View>

      <PrimaryButton
        disabled={!aadharFront || !aadharBack}
        title={i18n.t('Upload')}
        loading={loading}
        onPress={HnadlePress}
      />
      <PrimaryButton
        style={{ marginTop: 30 }}
        onPress={() => handleLogout()}
        title={i18n.t('Logout')}
      />
    </MainContainer>
  );
};

export default KycVerifcation;

/* ================= STYLES ================= */
const styles = StyleSheet.create({
  removeBtn: {
    position: 'absolute',
    top: 30,
    right: 8,
    backgroundColor: Colors.primary,
    width: 26,
    height: 26,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
  },
  removeText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  warningBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF8B1',
    marginTop: 20,
    marginBottom: 50,
    borderRadius: 15,
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  warningText: {
    color: Colors.text,
    fontSize: rf(11),
    fontFamily: Fonts.pop300,
    marginLeft: 10,
  },
});
