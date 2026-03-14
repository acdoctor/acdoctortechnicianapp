import {
  Alert,
  FlatList,
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import MainContainer from '../../components/MainContainer';
import Header from '../../components/Header';
import i18n from '../../components/i18n';
import Colors, { Fonts } from '../../utils/Colors';
import { rf, wp } from '../../components/Responvie';
import AsyncStorage from '@react-native-async-storage/async-storage';
import apiService from '../../Services/apiService';
import PrimaryButton from '../../components/PrimaryButton';
import { useNavigation } from '@react-navigation/native';
import images from '../../assets/Images/images';
import { image_slider_data } from '../../utils/HardCodedata';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
const ToolsAssigned = () => {
  const navigation = useNavigation();
  const [visible, setVisible] = useState(false);
  const [secondmodal, setsecondmodal] = useState(false);
  const [data, setdata] = useState([]);
  const [Loading, setLoading] = useState(false);
  const [thirdmodel, setthirdmodel] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [SelectedData, setSelectedData] = useState([]);
  const [breakImages, setBreakImages] = useState([]);
  const [Finaldata, setFinaldata] = useState('');
  console.log(Finaldata, 'opopopopopop');
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const token = await AsyncStorage.getItem('ACCESS_TOKEN');

    try {
      const res = await apiService.get('/technician/myTool/list', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res?.status === true) {
        setdata(res?.data);
      } else {
      }
    } catch (error) {
      // seterror(error?.message);
      // Alert.alert(error?.message);
    }
  };
  const handlerequestTools = async () => {
    navigation.navigate('RequestTools');
  };
  const handelhistory = () => {
    navigation.navigate('Myrequesttool');
  };
  const handlepress = item => {
    setVisible(true);
    setSelectedData(item);
  };

  const handlemissingTool = async () => {
    setLoading(true);
    const token = await AsyncStorage.getItem('ACCESS_TOKEN');

    try {
      const res = await apiService.post(
        '/technician/report/tool/issue',
        {
          assignedToolId: Finaldata?._id,
          // comment: 'LOST',
          reason: 'LOST',
          // image: 'LOST',
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (res?.status === 'SUCCESS') {
        // setsecondmodal(false);
        setVisible(false);

        setFinaldata([]);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };
  //image uplaoda funtion start//

  const imageOptions = {
    mediaType: 'photo',
    quality: 0.7,
    selectionLimit: 0, // 👈 multiple images
  };
  const openImagePicker = () => {
    Alert.alert('Select Image', 'Choose an option', [
      {
        text: 'Camera',
        onPress: () => {
          launchCamera(imageOptions, response => {
            if (!response.didCancel && !response.errorCode) {
              setBreakImages(prev => [...prev, ...response.assets]);
            }
          });
        },
      },
      {
        text: 'Gallery',
        onPress: () => {
          launchImageLibrary(imageOptions, response => {
            if (!response.didCancel && !response.errorCode) {
              setBreakImages(prev => [...prev, ...response.assets]);
            }
          });
        },
      },
      { text: 'Cancel', style: 'cancel' },
    ]);
  };
  //image delete function
  const removeImage = index => {
    const updated = [...breakImages];
    updated.splice(index, 1);
    setBreakImages(updated);
  };

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
    // console.log(response, 'url d=get hus');
  };

  // const uploadAllImages = async () => {
  //   try {
  //     setLoading(true);

  //     const uploadedUrls = [];

  //     for (let i = 0; i < breakImages.length; i++) {
  //       const image = breakImages[i];
  //       const url = await uploadImageToS3(image);
  //       uploadedUrls.push(url);
  //     }

  //     console.log('Uploaded S3 URLs:', uploadedUrls);

  //     // ab ye array API me bhejna
  //     // submitBreakTool(uploadedUrls);
  //   } catch (err) {
  //     Alert.alert('Upload failed');
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  // const uploadImageToS3 = async imageData => {
  //   try {
  //     // 1. get presigned url from backend
  //     const s3Data = await getUploadUrl(imageData);

  //     const imageResponse = await fetch(imageData.uri);
  //     const blob = await imageResponse.blob();
  //     console.log(blob, 'resposn checlk');

  //     await uploadImageToS32(s3Data, imageData);
  //     console.log(s3Data, 'agdsjkahdkjlahs');
  //   } catch (error) {
  //     console.log('S3 Upload Error:', error);
  //     throw error;
  //   }
  // };

  const uploadImageToS3 = async imageData => {
    // 1. get presigned url
    const s3Data = await getUploadUrl(imageData);

    // 2. PUT image to S3
    await uploadImageToS32(s3Data.uploadUrl, imageData);

    // 3. return final S3 URL
    return s3Data.fileUrl;
  };
  const uploadAllImages = async () => {
    try {
      setLoading(true);

      const uploadedUrls = [];

      for (let i = 0; i < breakImages.length; i++) {
        const image = breakImages[i];
        const url = await uploadImageToS3(image);
        uploadedUrls.push(url);
      }

      console.log('Final Image URLs:', uploadedUrls);

      // ✅ NOW CALL FINAL API
      await submitBreakTool(uploadedUrls);
    } catch (err) {
      console.log(err);
      Alert.alert('Upload failed');
    } finally {
      setLoading(false);
    }
  };
  const uploadImageToS32 = async (uploadUrl, imageData) => {
    console.log(uploadUrl, ';p;p');
    try {
      // setLoading(true);
      const imageResponse = await fetch(uploadUrl);
      const blob = await imageResponse.blob();
      const response = await fetch(uploadUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': imageData.type || 'image/jpeg',
        },
        body: blob,
      });
      console.log(response, 'put ki apiu ka response');
      if (response.status === 200 || response.status === 204) {
        // await submitBreakTool(uploadedUrls);
        throw new Error('S3 upload failed');
      } else {
        throw new Error('Upload failed');
      }
    } catch (error) {
      console.log(error, 'popopopo');
      // Alert.alert('Ismage upload failed');
    } finally {
      // setLoading(false);
    }
  };

  const submitBreakTool = async imageUrls => {
    console.log(Finaldata?._id, 'images data');
    const token = await AsyncStorage.getItem('ACCESS_TOKEN');
    try {
      const res = await apiService.post(
        '/technician/report/tool/issue',
        {
          assignedToolId: Finaldata?._id,
          comment: 'Tool is broken',
          reason: 'BROKEN',
          images: imageUrls, // 👈 ARRAY OF S3 URLS
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (res?.status === 'SUCCESS') {
        Alert.alert('Success', 'Tool reported successfully');
        setthirdmodel(false);
        setBreakImages([]);
        setFinaldata([]);
      }
    } catch (error) {
      console.log(error?.error);
    }
  };

  return (
    <MainContainer>
      <Header
        title={i18n.t('Tools')}
        img={images.history}
        next={handelhistory}
      />

      {data.length === 0 ? (
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <Text
            allowFontScaling={false}
            style={{
              color: Colors.primary,
              fontSize: rf(16),
              fontFamily: Fonts.pop600,
              textAlign: 'center',
            }}
          >
            {'No assigned tools found for this technician'}
          </Text>
          <PrimaryButton
            onPress={handlerequestTools}
            title={i18n.t('reqfortool')}
            style={{ width: wp(80), marginTop: 20 }}
          />
        </View>
      ) : (
        <>
          <Text
            allowFontScaling={false}
            style={{
              color: Colors.white,
              fontSize: rf(16),
              fontFamily: Fonts.pop600,
              marginTop: 15,
              marginBottom: 10,
            }}
          >
            {i18n.t('ToolsAsign')}
          </Text>
          <FlatList
            data={data}
            renderItem={({ item, index }) => {
              console.log(item);
              return (
                <TouchableOpacity
                  onPress={() => {
                    handlepress(item);
                  }}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginTop: 6,
                    borderWidth: 1,
                    borderColor: Colors.lightGray,
                    paddingVertical: 8,
                    paddingHorizontal: 10,
                    borderRadius: 10,
                    //   width: wp(100),
                  }}
                >
                  <Text
                    allowFontScaling={false}
                    style={{
                      fontSize: rf(16),
                      fontFamily: Fonts.pop500,
                      color: Colors.white,
                      alignSelf: 'flex-end',
                    }}
                  >
                    {item?.name}
                  </Text>

                  <Text
                    allowFontScaling={false}
                    style={{
                      fontSize: rf(16),
                      fontFamily: Fonts.pop500,
                      color: Colors.white,
                      alignSelf: 'flex-end',
                    }}
                  >
                    #{item?.total_qty}
                  </Text>
                </TouchableOpacity>
              );
            }}
          />
          <PrimaryButton
            onPress={handlerequestTools}
            // style={{}}
            title={i18n.t('reqfortool')}
            style={{ width: wp(80), alignSelf: 'center' }}
          />

          <Modal
            transparent
            animationType="slide"
            visible={visible}
            onRequestClose={() => setVisible(false)}
          >
            <View style={styles.overlay}>
              <View style={styles.modalContainer}>
                <Image
                  source={{
                    uri: SelectedData?.image,
                  }}
                  style={{
                    width: wp(18),
                    height: wp(18),
                    alignSelf: 'center',
                    borderRadius: 1000,
                  }}
                  resizeMode="contain"
                />
                <FlatList
                  data={SelectedData?.assigned_tools}
                  style={{ marginTop: 10 }}
                  renderItem={({ item, index }) => {
                    return (
                      <TouchableOpacity
                        disabled={
                          item?.status === 'LOST'
                            ? true
                            : item?.status === 'IN_USE'
                            ? false
                            : item?.status === 'DAMAGED'
                            ? true
                            : null
                        }
                        onPress={() => setFinaldata(item)}
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          paddingVertical: 8,
                          paddingHorizontal: 10,
                          borderWidth: 1,
                          borderColor:
                            Finaldata?._id === item?._id ? 'red' : Colors.gray,
                          marginTop: 10,
                          borderRadius: 5,
                        }}
                      >
                        <Text
                          allowFontScaling={false}
                          style={{
                            color: Colors.white,
                            fontSize: rf(13),
                            fontFamily: Fonts?.pop600,
                          }}
                        >
                          {item?.identifier}
                        </Text>
                        <Text
                          allowFontScaling={false}
                          style={{
                            color:
                              item?.status === 'LOST'
                                ? '#E53935'
                                : item?.status === 'IN_USE'
                                ? '#1E88E5'
                                : item?.status === 'DAMAGED'
                                ? '#FB8C00'
                                : Colors.white,
                            fontFamily: Fonts.pop700,
                            fontSize: rf(12),
                          }}
                        >
                          {item?.status}
                        </Text>
                      </TouchableOpacity>
                    );
                  }}
                />
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <PrimaryButton
                    onPress={() => {
                      handlemissingTool();
                    }}
                    disabled={Finaldata?.status !== 'IN_USE'}
                    title={'Missing Tool'}
                    style={styles.btnst}
                    loading={Loading}
                  />
                  <PrimaryButton
                    onPress={() => {
                      setthirdmodel(true), setVisible(false);
                    }}
                    disabled={Finaldata?.status !== 'IN_USE'}
                    title={'Break Tool'}
                    style={styles.btnst}
                  />
                </View>
                <TouchableOpacity
                  style={{
                    marginTop: 20,
                    backgroundColor: Colors.background,
                    borderRadius: 45,
                    borderWidth: 1,
                    borderColor: Colors.primary,
                    paddingVertical: 10,
                    marginBottom: 15,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  onPress={() => {
                    setVisible(false), setFinaldata([]);
                  }}
                >
                  <Text allowFontScaling={false} style={styles.closeBtn}>
                    Close
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

          <Modal
            transparent
            animationType="slide"
            visible={thirdmodel}
            onRequestClose={() => setthirdmodel(false)}
          >
            <View style={styles.overlay}>
              <View style={styles.modalContainer}>
                <Image
                  source={{
                    uri: SelectedData?.image,
                  }}
                  style={{
                    width: wp(18),
                    height: wp(18),
                    alignSelf: 'center',
                    borderRadius: 1000,
                  }}
                  resizeMode="contain"
                />
                <Text
                  allowFontScaling={false}
                  style={{
                    color: Colors.white,
                    fontSize: rf(16),
                    fontFamily: Fonts.pop500,
                    textAlign: 'center',
                    marginTop: 10,
                  }}
                >
                  Upload image for Breaked Tool
                </Text>
                <TouchableOpacity
                  onPress={openImagePicker}
                  style={{
                    borderWidth: 1,
                    borderColor: Colors.white,
                    borderStyle: 'dashed',
                    paddingVertical: 20,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 12,
                    marginTop: 20,
                  }}
                >
                  <Image
                    source={images.upload}
                    style={{ width: wp(10), height: wp(10) }}
                  />
                </TouchableOpacity>

                <FlatList
                  data={breakImages}
                  keyExtractor={(item, index) => index.toString()}
                  style={{ marginTop: 15, alignSelf: 'center' }}
                  renderItem={({ item, index }) => (
                    <View style={{ marginHorizontal: 15, marginVertical: 8 }}>
                      <Image
                        source={{ uri: item.uri }}
                        style={{
                          width: wp(21),
                          height: wp(21),
                          resizeMode: 'contain',
                          borderRadius: 8,
                        }}
                      />
                      <TouchableOpacity
                        onPress={() => removeImage(index)}
                        style={{
                          position: 'absolute',
                          top: -5,
                          right: -5,
                          backgroundColor: 'red',
                          borderRadius: 12,
                          padding: 4,
                        }}
                      >
                        <Text
                          allowFontScaling={false}
                          style={{ color: '#fff', fontSize: 12 }}
                        >
                          X
                        </Text>
                      </TouchableOpacity>
                    </View>
                  )}
                />

                {/* Submit Button (only if images exist) */}
                {breakImages.length > 0 && (
                  <PrimaryButton
                    title="Submit"
                    style={{ marginTop: 20 }}
                    loading={Loading}
                    onPress={() => {
                      // console.log('Images:', breakImages);
                      uploadAllImages();
                      // API call yahan karega
                    }}
                  />
                )}

                <TouchableOpacity
                  style={{
                    marginTop: 20,
                    backgroundColor: Colors.background,
                    borderRadius: 45,
                    borderWidth: 1,
                    borderColor: Colors.primary,
                    paddingVertical: 10,
                    marginBottom: 15,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  onPress={() => {
                    setthirdmodel(false);
                    setBreakImages([]);
                  }}
                >
                  <Text allowFontScaling={false} style={styles.closeBtn}>
                    Close
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </>
      )}
    </MainContainer>
  );
};

export default ToolsAssigned;

const styles = StyleSheet.create({
  btnst: {
    marginTop: 20,
    width: '48%',
  },
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  modalContainer: {
    backgroundColor: Colors.background,
    padding: 20,
    borderWidth: 1,
    borderColor: Colors.white,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  closeBtn: {
    textAlign: 'center',
    color: 'red',
    fontSize: 16,
  },
});
