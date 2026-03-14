// import {
//   ActivityIndicator,
//   Alert,
//   FlatList,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from 'react-native';
// import React, { Activity, useEffect, useState } from 'react';
// import MainContainer from '../../components/MainContainer';
// import Header from '../../components/Header';
// import i18n from '../../components/i18n';
// import { rf } from '../../components/Responvie';
// import Colors, { Fonts } from '../../utils/Colors';
// import PrimaryButton from '../../components/PrimaryButton';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import apiService from '../../Services/apiService';
// import { useNavigation } from '@react-navigation/native';

// const RequestTools = () => {
//   const [toolid, settoolid] = useState('');
//   const [Loadings, setLoadings] = useState(false);
//   const navigation = useNavigation();
//   const [quantities, setQuantities] = useState({});
//   console.log(toolid, quantities, 'pppppp');
//   const [load, setload] = useState(true);
//   const increaseQty = toolId => {
//     setQuantities(prev => ({
//       ...prev,
//       [toolId]: (prev[toolId] || 0) + 1,
//     }));
//   };

//   const decreaseQty = toolId => {
//     setQuantities(prev => {
//       const newQty = (prev[toolId] || 0) - 1;
//       if (newQty <= 0) {
//         const updated = { ...prev };
//         delete updated[toolId];
//         return updated;
//       }
//       return { ...prev, [toolId]: newQty };
//     });
//   };

//   useEffect(() => {
//     getToollist();
//     setTimeout(() => {
//       setload(true);
//     }, 10000);
//   }, []);
//   const [Data, setData] = useState([]);
//   console.log(Data, 'loplplplplplplp;');
//   const getToollist = async () => {
//     const token = await AsyncStorage.getItem('ACCESS_TOKEN');
//     console.log(token, 'token is recivers');
//     try {
//       const res = await apiService.get('/technician/tool/list', {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       if (res?.success === true) {
//         console.log(res, 'asdasdas');
//         setData(res?.data);
//       } else {
//       }
//     } catch (error) {
//       // seterror(error?.message);
//       // Alert.alert('no');
//     } finally {
//       setload(false);
//     }
//   };
//   const handlerequesttool = async () => {
//     setLoadings(true);
//     const toolsArray = Object.entries(quantities).map(
//       ([tool_id, quantity]) => ({
//         tool_id,
//         quantity,
//       }),
//     );
//     const token = await AsyncStorage.getItem('ACCESS_TOKEN');
//     try {
//       const res = await apiService.post(
//         '/technician/tool/request',
//         {
//           comment: 'jatin',
//           tools: toolsArray,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         },
//       );
//       if (res?.status === true) {
//         navigation.goBack();
//       } else {
//       }
//     } catch (error) {
//     } finally {
//       setLoadings(false);
//     }
//   };
//   return (
//     <MainContainer>
//       <Header title={i18n.t('Tools')} />
//       {load ? (
//         <View
//           style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
//         >
//           <ActivityIndicator size={'large'} />
//         </View>
//       ) : (
//         <>
//           <Text allowFontScaling={false}
//             style={{
//               color: Colors.white,
//               fontSize: rf(16),
//               fontFamily: Fonts.pop600,
//               marginTop: 15,
//               marginBottom: 5,
//             }}
//           >
//             {i18n.t('NeedTools')}
//           </Text>

//           <FlatList
//             data={Data}
//             keyExtractor={(_, index) => index.toString()}
//             renderItem={({ item, index }) => {
//               // const qty = quantities[index] || 0;
//               const qty = quantities[item._id] || 0;

//               return (
//                 <View
//                   style={{
//                     flexDirection: 'row',
//                     alignItems: 'center',
//                     justifyContent: 'space-between',
//                     marginTop: 15,
//                     borderWidth: 1,
//                     borderColor: Colors.white,
//                     paddingVertical: 8,
//                     paddingHorizontal: 10,
//                     borderRadius: 10,
//                   }}
//                 >
//                   <Text allowFontScaling={false}
//                     style={{
//                       fontSize: rf(14),
//                       fontFamily: Fonts.pop500,
//                       color: Colors.white,
//                     }}
//                   >
//                     {item?.name}
//                   </Text>

//                   {qty === 0 ? (
//                     <TouchableOpacity
//                       onPress={() => increaseQty(item._id)}
//                       style={styles.touchablecontainer}
//                     >
//                       <Text allowFontScaling={false}
//                         style={{
//                           color: Colors.primary,
//                           fontSize: rf(10),
//                           fontFamily: Fonts.pop500,
//                         }}
//                       >
//                         Add
//                       </Text>
//                     </TouchableOpacity>
//                   ) : (
//                     <View style={styles.qtyContainer}>
//                       <TouchableOpacity onPress={() => decreaseQty(item._id)}>
//                         <Text allowFontScaling={false}  style={styles.qtyText}>−</Text>
//                       </TouchableOpacity>

//                       <Text allowFontScaling={false}  style={styles.qtyNumber}>{qty}</Text>

//                       <TouchableOpacity onPress={() => increaseQty(item._id)}>
//                         <Text allowFontScaling={false}  style={styles.qtyText}>+</Text>
//                       </TouchableOpacity>
//                     </View>
//                   )}
//                 </View>
//               );
//             }}
//           />
//           <PrimaryButton
//             loading={Loadings}
//             onPress={() => handlerequesttool()}
//             title={i18n.t('Submit')}
//           />
//         </>
//       )}
//     </MainContainer>
//   );
// };

// export default RequestTools;
// const styles = StyleSheet.create({
//   touchablecontainer: {
//     paddingVertical: 3,
//     paddingHorizontal: 12,
//     borderRadius: 40,
//     backgroundColor: Colors.background,
//     borderWidth: 1,
//     borderColor: Colors.primary,
//   },
//   qtyContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderWidth: 1,
//     borderColor: Colors.primary,
//     borderRadius: 20,
//     paddingHorizontal: 8,
//     paddingVertical: 2,
//   },
//   qtyText: {
//     fontSize: rf(16),
//     color: Colors.primary,
//     paddingHorizontal: 6,
//   },
//   qtyNumber: {
//     color: Colors.white,
//     fontFamily: Fonts.pop500,
//     marginHorizontal: 6,
//     fontSize: rf(10),
//   },
// });

import {
  ActivityIndicator,
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import MainContainer from '../../components/MainContainer';
import Header from '../../components/Header';
import i18n from '../../components/i18n';
import { rf } from '../../components/Responvie';
import Colors, { Fonts } from '../../utils/Colors';
import PrimaryButton from '../../components/PrimaryButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import apiService from '../../Services/apiService';
import { useNavigation } from '@react-navigation/native';

const RequestTools = () => {
  const navigation = useNavigation();

  const [data, setData] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [text, setText] = useState('');
  console.log(quantities, 'popopopopo');
  const hasSelectedTools = Object.keys(quantities).length > 0;
  useEffect(() => {
    setLoading(true);
    getToollist();
  }, []);

  const getToollist = async () => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem('ACCESS_TOKEN');
      const res = await apiService.get('/technician/tool/list', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res?.success) {
        setData(res?.data || []);
      }
    } catch (error) {
      console.log('Tool list error:', error);
    } finally {
      setLoading(false);
    }
  };

  const increaseQty = toolId => {
    setQuantities(prev => ({
      ...prev,
      [toolId]: (prev[toolId] || 0) + 1,
    }));
  };

  const decreaseQty = toolId => {
    setQuantities(prev => {
      const newQty = (prev[toolId] || 0) - 1;
      if (newQty <= 0) {
        const updated = { ...prev };
        delete updated[toolId];
        return updated;
      }
      return { ...prev, [toolId]: newQty };
    });
  };

  const handleRequestTool = async () => {
    setVisible(true);
  };
  const handleSubmit = async () => {
    setVisible(true);
    setSubmitLoading(true);
    const toolsArray = Object.entries(quantities).map(
      ([tool_id, quantity]) => ({
        tool_id,
        quantity,
      }),
    );

    try {
      const token = await AsyncStorage.getItem('ACCESS_TOKEN');
      const res = await apiService.post(
        '/technician/tool/request',
        {
          comment: text,
          tools: toolsArray,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (res?.status === true) {
        navigation.goBack();
      }
    } catch (error) {
      console.log('Request error:', error);
    } finally {
      setSubmitLoading(false);
    }
  };

  return (
    <MainContainer>
      <Header title={i18n.t('Tools')} />

      {loading ? (
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <ActivityIndicator color={Colors.primary} size={'large'} />
        </View>
      ) : (
        <>
          <Text allowFontScaling={false} style={styles.title}>
            {i18n.t('NeedTools')}
          </Text>

          <FlatList
            data={data}
            keyExtractor={item => item._id}
            renderItem={({ item }) => {
              const qty = quantities[item._id] || 0;

              return (
                <View style={styles.itemContainer}>
                  <Text allowFontScaling={false} style={styles.itemText}>
                    {item?.name}
                  </Text>

                  {qty === 0 ? (
                    <TouchableOpacity
                      onPress={() => increaseQty(item._id)}
                      style={styles.touchablecontainer}
                    >
                      <Text allowFontScaling={false} style={styles.addText}>
                        Add
                      </Text>
                    </TouchableOpacity>
                  ) : (
                    <View style={styles.qtyContainer}>
                      <TouchableOpacity onPress={() => decreaseQty(item._id)}>
                        <Text allowFontScaling={false} style={styles.qtyText}>
                          −
                        </Text>
                      </TouchableOpacity>

                      <Text allowFontScaling={false} style={styles.qtyNumber}>
                        {qty}
                      </Text>

                      <TouchableOpacity onPress={() => increaseQty(item._id)}>
                        <Text allowFontScaling={false} style={styles.qtyText}>
                          +
                        </Text>
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
              );
            }}
          />

          <PrimaryButton
            style={{ marginBottom: 30 }}
            onPress={handleRequestTool}
            disabled={!hasSelectedTools}
            title={i18n.t('Submit')}
          />

          <Modal
            transparent
            animationType="slide"
            visible={visible}
            onRequestClose={() => setVisible(false)}
          >
            <View style={styles.overlay}>
              <View style={styles.modalContainer}>
                <Text allowFontScaling={false} style={styles.title1}>
                  Reason Of Required Extra Tool
                </Text>

                <TextInput
                  allowFontScaling={false}
                  Input
                  placeholderTextColor={Colors.gray}
                  style={styles.input}
                  placeholder="Reason"
                  value={text}
                  onChangeText={i => setText(i)}
                />

                <TouchableOpacity
                  style={{
                    backgroundColor: Colors.background,
                    borderRadius: 45,
                    borderWidth: 1,
                    borderColor: Colors.primary,
                    paddingVertical: 10,
                    marginBottom: 15,
                  }}
                  onPress={() => setVisible(false)}
                >
                  <Text allowFontScaling={false} style={styles.closeBtn}>
                    Close
                  </Text>
                </TouchableOpacity>
                <PrimaryButton
                  loading={submitLoading}
                  disabled={submitLoading}
                  title={'Submit'}
                  onPress={() => handleSubmit()}
                />
              </View>
            </View>
          </Modal>
        </>
      )}
    </MainContainer>
  );
};

export default RequestTools;

const styles = StyleSheet.create({
  title: {
    color: Colors.white,
    fontSize: rf(16),
    fontFamily: Fonts.pop600,
    marginTop: 15,
    marginBottom: 5,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15,
    borderWidth: 1,
    borderColor: Colors.white,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  itemText: {
    fontSize: rf(14),
    fontFamily: Fonts.pop500,
    color: Colors.white,
  },
  touchablecontainer: {
    paddingVertical: 3,
    paddingHorizontal: 12,
    borderRadius: 40,
    backgroundColor: Colors.background,
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  addText: {
    color: Colors.primary,
    fontSize: rf(10),
    fontFamily: Fonts.pop500,
  },
  qtyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: 20,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  qtyText: {
    fontSize: rf(16),
    color: Colors.primary,
    paddingHorizontal: 6,
  },
  qtyNumber: {
    color: Colors.white,
    fontFamily: Fonts.pop500,
    marginHorizontal: 6,
    fontSize: rf(10),
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
  title1: {
    fontSize: rf(16),
    fontFamily: Fonts.pop500,
    marginBottom: 10,
    alignSelf: 'center',
    color: Colors.white,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    color: Colors.white,
    fontFamily: Fonts.Pop400,
    paddingVertical: 10,
  },
  closeBtn: {
    textAlign: 'center',
    color: 'red',
    fontSize: 16,
  },
});
