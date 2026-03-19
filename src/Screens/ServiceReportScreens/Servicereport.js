import {
  Alert,
  FlatList,
  Image,
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
import Colors, { Fonts } from '../../utils/Colors';
import { hp, rf, wp } from '../../components/Responvie';
import { styles } from '../HomeScreens/styles';
import CustomDropdown from '../../components/CustomDropdown';
import images from '../../assets/Images/images';
import YearPicker from '../../components/YearPicker';
import CustomInput from '../../components/CustomInput';
import { Styles } from '../Auth/Style';
import apiService from '../../Services/apiService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PrimaryButton from '../../components/PrimaryButton';
import { CommonActions, useNavigation } from '@react-navigation/native';
const Servicereport = ({ route }) => {
  const type = AsyncStorage.getItem('Type');
  const navigation = useNavigation();
  const Datafc = route?.params?.Data?.customer;
  const Customerdetails = route?.params?.Data?.services;
  const rows = [
    { label: 'Name', value: Datafc?.name },
    // { label: 'Name', value: 'jatin' },
    { label: 'Email Address', value: '-----@gmail.com' },
    // { label: 'Contact Number', value: 'asd' },
    { label: 'Contact Number', value: Datafc?.phoneNumber },
    { label: 'Customer Type', value: '------' },
  ];

  const DATA = () => [
    { label: i18n.t('Voltas'), img: images.voltas },
    { label: i18n.t('Blue Star'), img: images.bluestar },
    { label: i18n.t('LG'), img: images.LG },
    { label: i18n.t('Samsung'), img: images.samsung },
    { label: i18n.t('Daikin'), img: images.daikin },
    { label: i18n.t('Hitachi'), img: images.hitachi },
    { label: i18n.t('Panasonic'), img: images.panasonic },
    { label: i18n.t('Godrej'), img: images.godrej },
    { label: i18n.t('Carrier'), img: images.carrier },
    { label: i18n.t('Whirlpool'), img: images.whirepool },
    { label: i18n.t('Lloyd'), img: images.llyod },
    { label: i18n.t('Haier'), img: images.haier },
    { label: i18n.t('Onida'), img: images.onida },
    { label: i18n.t('IFB'), img: images.IFB },
    { label: i18n.t('Mitashi'), img: images.mitashi },
  ];
  const ServiceTypes = () => [
    { label: 'General Service' },
    { label: 'Deep Cleaning / Jet Wash' },
    { label: 'Gas Top-Up' },
    { label: 'Gas Refill' },
    { label: 'AC Repair' },
    { label: 'AC Not Cooling' },
    { label: 'Water Leakage Issue' },
    { label: 'Noise / Vibration Issue' },
    { label: 'New AC Installation' },
    { label: 'AC Uninstallation' },
    { label: 'Re-Installation' },
    { label: 'Split AC Installation' },
    { label: 'Window AC Installation' },
    { label: 'Cassette AC Installation' },
    { label: 'Tower AC Installation' },
  ];

  const renderOption = (label, value, index, item) => (
    <TouchableOpacity
      onPress={val => updateService(index, 'inverter', value)}
      style={{
        paddingHorizontal: 10,
        paddingVertical: 11,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: wp(45),
        borderBottomWidth: 2,
        // borderBottomColor: selected === value ? Colors.primary : Colors.gray,/
        borderBottomColor:
          item?.inverter === value ? Colors.primary : Colors.gray,
      }}
    >
      <Text
        style={{
          color: item?.inverter === value ? Colors.primary : Colors.gray,
          fontSize: rf(15),
          fontFamily: Fonts?.Pop400,
        }}
      >
        {label}
      </Text>

      {/* {selected === value ? (
        <Image
          source={images?.cehck}
          style={{
            width: wp(4.5),
            height: wp(4.5),
          }}
        />
      ) : (
        <Image
          source={images?.uncheck}
          style={{ width: wp(5), height: wp(5) }}
        />
      )} */}
      {item.inverter === value ? (
        <Image
          source={images?.cehck}
          style={{ width: wp(4.5), height: wp(4.5) }}
        />
      ) : (
        <Image
          source={images?.uncheck}
          style={{ width: wp(5), height: wp(5) }}
        />
      )}
    </TouchableOpacity>
  );
  const TypeOfAcData = () => [
    { label: i18n.t('SplitAC'), value: 'SplitAC', img: images.splitAc },
    { label: i18n.t('WindowAC'), value: 'WindowAC', img: images.splitAc },
    // { label: i18n.t('InverterAC'), value: 'InverterAC', img: images.splitAc },
    { label: i18n.t('PortableAC'), value: 'PortableAC', img: images.TowerAC },
    { label: i18n.t('CassetteAC'), value: 'CassetteAC', img: images.castelAc },
    { label: i18n.t('TowerAC'), value: 'TowerAC', img: images.TowerAC },
    { label: i18n.t('CentralAC'), value: 'CentralAC', img: images.castelAc },
    { label: i18n.t('ChillerAc'), value: 'CentralAC', img: images.vrvvrfAc },
    { label: i18n.t('VRVVRF'), value: 'CentralAC', img: images.vrvvrfAc },
    { label: i18n.t('ducted'), value: 'CentralAC', img: images.DuctedAC },
  ];
  useEffect(() => {
    GetMaterailList();
  }, []);
  const [Materialdata, setMaterialdata] = useState([]);
  const isFormValid = () =>
    serviceData.every(
      item =>
        item.ACBrand &&
        item.year &&
        item.TypeOfAc &&
        item.tr &&
        item.inverter &&
        item.ServiceType &&
        item.jobStatus,
    );
  const GetMaterailList = async () => {
    const token = await AsyncStorage.getItem('ACCESS_TOKEN');

    try {
      const res = await apiService.get('/technician/material/list', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res?.success === true) {
        // setMaterialdata(res?.data);
        const formattedData = res.data.map(item => ({
          ...item,
          quantity: item.quantity ? String(item.quantity) : '',
          amount: item.rate ?? 0, // ✅ backend amount show hoga
        }));

        setMaterialList(formattedData);
      } else {
      }
    } catch (error) {}
  };
  const [jobStatus, setJobStatus] = useState('');
  const [pendingOption, setPendingOption] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const onQuantityChange = (index, listType, text = 'selected') => {
    if (listType === 'selected') {
      const updated = [...selectedList];
      console.log(updated, 'llllllllllll');
      updated[index].quantity = text;
      updated[index].amount =
        Number(text || 0) * Number(updated[index].rate || 0);
      setSelectedList(updated);
    } else {
      const updated = [...materialList];
      updated[index].quantity = text;
      updated[index].amount =
        Number(text || 0) * Number(updated[index].rate || 0);
      setMaterialList(updated);
    }
  };
  const [showModal, setShowModal] = useState({ isVisible: false, index: null });
  const [selectedList, setSelectedList] = useState(
    materialList?.length ? [materialList[0]] : [],
  );

  const [materialList, setMaterialList] = useState(
    Materialdata.map(item => ({
      ...item,
      quantity: '',
      amount: 0,
    })),
  );
  const removeItem = index => {
    const updated = [...selectedList];
    updated.splice(index, 1);
    setSelectedList(updated);
  };
  const ITEM_HEIGHT = hp(7);
  const MAX_HEIGHT = hp(10000);
  const listHeight = Math.min(selectedList.length * ITEM_HEIGHT, MAX_HEIGHT);
  const [serviceData, setServiceData] = useState([]);
  const preparePayload = () => {
    let servData = serviceData.map(item => ({
      serviceDetailId: item._id,
      // serviceDetailId: item?.serviceId,

      acType: item.TypeOfAc?.label || '',
      // selected: item,

      brandName: item.ACBrand?.label || '',

      yom: item.year || null,
      tr: Number(item?.tr) || null,
      inverter: item.inverter === 'inverter',

      // selected: item,
      serviceType: item.ServiceType?.label?.toUpperCase().replace(/ /g, '_'),
      materials: item.materials.map(mat => ({
        material: mat._id,
        name: mat.name,
        unit: mat.unit,
        rate: mat.rate,
        qty: Number(mat.quantity || 0),
      })),
      remark: item?.remark,
      jobStatus:
        item.jobStatus === 'Complete'
          ? 'COMPLETED'
          : item.jobStatus === 'Pending'
          ? 'PENDING'
          : '',

      pendingReason:
        item.jobStatus === 'Pending'
          ? item.pendingOption === 'workshop'
            ? 'PART_TAKEN_TO_WORKSHOP'
            : item.pendingOption === 'ordered'
            ? 'PART_ORDERED'
            : 'OTHER'
          : null,
    }));

    return {
      bookingId: route?.params?.Data?._id,
      technician: route?.params?.Data?.technician,
      customer: {
        name: Datafc?.name || '',
        contactNumber: Datafc?.phoneNumber || '',
        email: '',
      },
      acs: servData,
      paidAmount: AmountValue,
    };
  };

  console.log('route?.params?.Data', route?.params?.Data);

  useEffect(() => {
    if (Customerdetails?.length) {
      console.log('this is material List', materialList);
      var formatted = [];

      Customerdetails.forEach(item => {
        const qty = Number(item.quantity) || 1;
        for (let i = 0; i < qty; i++) {
          formatted.push({
            ...item,
            ACBrand: null,
            year: null,
            TypeOfAc: null,
            tr: null,
            ServiceType: null,
            inverter: null,
            jobStatus: '',
            pendingOption: null,
            materials: materialList?.length ? [materialList[0]] : [],
            remark: null,
            qtyInd: i + 1,
          });
        }
      });

      setServiceData(formatted);
    }
  }, [Customerdetails, materialList]);
  const updateService = (index, key, value) => {
    const updated = [...serviceData];
    updated[index][key] = value;

    console.log('first', updated);
    setServiceData(updated);
  };
  const [Loading, setLoading] = useState(false);

  const onSubmit = async () => {
    setLoading(true);
    const finalData = preparePayload();
    const token = await AsyncStorage.getItem('ACCESS_TOKEN');

    console.log('finalData------==========+++++++++++++', finalData);
    try {
      const res = await apiService.post(
        '/technician/serviceReport/create',
        finalData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (res?.status === 'success') {
        centeralService();
      } else if (res?.status === 'fail') {
        Alert?.alert(res?.message);
      }
    } catch (error) {
      Alert?.alert(error?.message);
    } finally {
      setLoading(false);
    }

    // return
  };
  // const isDisabled = !AmountValue || AmountValue.trim() === '';

  const centeralService = async () => {
    setLoading(true);

    const token = await AsyncStorage.getItem('ACCESS_TOKEN');

    try {
      const res = await apiService.get(
        `/technician/serviceReport?jobId=${route?.params?.Data?._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log(res, 'response cetrilze services');
      if (res?.status === 'success') {
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [
              {
                name: 'Demo',
                // params: { Data: Data }, // 👈 yahan bhejo
              },
            ],
          }),
        );
      }
    } catch (error) {
      Alert?.alert(error?.message);
    } finally {
      setLoading(false);
    }
  };
  const [activeInput, setActiveInput] = useState(null);
  const [AmountValue, setAmountValue] = useState('');
  const onQuantityChange_new = (text, index, ind) => {
    setServiceData(prevData =>
      prevData.map((item, i) => {
        if (i !== index) return item; // untouched objects stay same
        const updatedMaterials = item.materials.map((mat, mIndex) => {
          if (mIndex !== ind) return mat;
          const quantity = Number(text || 0);
          const rate = Number(mat.rate || 0);
          return {
            ...mat,
            quantity: text,
            amount: quantity * rate,
          };
        });
        return {
          ...item,
          materials: updatedMaterials,
        };
      }),
    );
  };

  const onSelectFromModal = (material, index) => {
    setServiceData(prevData =>
      prevData.map((item, i) => {
        if (i !== index) return item; // untouched objects stay same
        const updatedMaterials = item.materials;
        return {
          ...item,
          materials: [...updatedMaterials, material],
        };
      }),
    );
  };
  const onRemoveFromIndex = (index, ind) => {
    setServiceData(prevData =>
      prevData.map((item, i) => {
        if (i !== index) return item;
        const updatedMaterials = item.materials.filter(
          (_, mIndex) => mIndex !== ind,
        );
        return {
          ...item,
          materials: updatedMaterials,
        };
      }),
    );
  };
  const [ModelVisible, setModelVisible] = useState(false);
  return (
    <MainContainer>
      <Header title={i18n.t('JobHistory')} />
      <Text style={styles.textheadeing}>Customer Details</Text>
      <View style={styles.container}>
        {rows.map((item, index) => {
          if (type === 'FC') {
            if (index === 2) return null;
          }
          return (
            <View style={styles.rowconteiner} key={index}>
              <Text style={styles.lableForrow}>{item.label}</Text>
              <Text style={styles.lableForrow}>{item.value}</Text>
            </View>
          );
        })}
      </View>
      {/* <View style={styles.container1}> */}

      <FlatList
        data={serviceData}
        renderItem={({ index, item }) => {
          // console.log(item, '-----------------');
          let mainItem = item;
          return (
            <>
              <Text
                style={{
                  alignSelf: 'flex-start',
                  fontSize: rf(18),
                  color: Colors?.white,
                  fontFamily: Fonts?.pop700,
                  textDecorationLine: 'underline',
                  marginTop: 15,
                }}
              >
                {item?.name} {item?.acType}
                {item?.qtyInd !== undefined ? `(${item?.qtyInd})` : ''}
              </Text>

              <View
                style={{
                  flexDirection: 'row',
                  //   backgroundColor: 'red',
                  marginTop: -10,
                  justifyContent: 'space-between',
                }}
              >
                <CustomDropdown
                  Placholder={'Brand Name'}
                  data={DATA()}
                  // selectedValue={ACBrand}
                  // onSelect={item => setACbrand(item)}
                  logic={'per'}
                  selectedValue={item.ACBrand}
                  onSelect={val => updateService(index, 'ACBrand', val)}
                  // onSelect={vae => console.log(index, 'AcBrnd', vae)}
                  styless={{ width: wp(45) }}
                />
                <YearPicker
                  startYear={1990}
                  value={item?.year}
                  // onSelect={setYear}
                  placeholder="Select Year"
                  style={{ width: wp(45) }}
                  // selectedValue={item.ACBrand}
                  onSelect={val => updateService(index, 'year', val)}
                />
              </View>
              {/* select ac type and TR */}
              <View
                style={{
                  flexDirection: 'row',
                  // backgroundColor: 'red',
                  marginTop: -10,
                  justifyContent: 'space-between',
                }}
              >
                <CustomDropdown
                  Placholder={'Type of AC'}
                  data={TypeOfAcData()}
                  selectedValue={item?.TypeOfAc}
                  onSelect={val => updateService(index, 'TypeOfAc', val)}
                  // onSelect={item => setTypeOfAc(item)}
                  logic={'per'}
                  styless={{ width: wp(45) }}
                />
                <TextInput
                  placeholder="TR"
                  onChangeText={val => updateService(index, 'tr', val)}
                  placeholderTextColor={Colors?.gray}
                  style={{
                    borderWidth: 1,
                    borderColor: Colors.white,
                    borderRadius: 10,
                    paddingVertical: 11,
                    marginTop: 20,
                    width: wp(45),
                    paddingHorizontal: 12,
                    backgroundColor: Colors.background,
                    color: Colors?.white,
                    fontSize: rf(15),
                    fontFamily: Fonts.Pop400,
                  }}
                />
              </View>
              {/* select ac type and TR */}

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginTop: 10,
                }}
              >
                {renderOption('Inverter', 'inverter', index, item)}
                {renderOption('Non - Inverter', 'nonInverter', index, item)}
                {/* {renderOption('Inverter', 'inverter')}
                {renderOption('Non - Inverter', 'nonInverter')} */}
              </View>

              <Text style={[Styles?.InputLable, { marginVertical: 10 }]}>
                Service Type
              </Text>
              <CustomDropdown
                Placholder={'Select Service Type'}
                data={ServiceTypes()}
                // selectedValue={ServiceType}
                styless={{ marginTop: 0 }}
                // onSelect={item => setServiceType(item)}
                logic={'per'}
                selectedValue={item?.ServiceType}
                onSelect={val => updateService(index, 'ServiceType', val)}
              />
              <Text style={[Styles?.InputLable, { marginTop: 10 }]}>
                Material{' '}
              </Text>

              <FlatList
                // style={{ maxHeight: listHeight }}
                keyExtractor={(item, index) => index.toString()}
                showsVerticalScrollIndicator={false}
                data={item?.materials || []}
                renderItem={({ item, index: ind, arr }) => {
                  console.log(item, '?');
                  return (
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginTop: 10,
                      }}
                    >
                      <View style={newstyles?.containerFormaterialname}>
                        <Text style={newstyles?.materlabe}>{item?.name}</Text>
                      </View>
                      <TextInput
                        style={newstyles?.textInputstyle}
                        placeholder={item?.unit}
                        placeholderTextColor={Colors?.gray}
                        value={item.quantity}
                        // onChangeText={text =>
                        //   onQuantityChange(index, 'selected', text)
                        // }
                        // onChangeText={text =>
                        //   onQuantityChange(text, index,ind ,'selected')
                        // }

                        onChangeText={text => {
                          onQuantityChange_new(text, index, ind);
                        }}
                      />
                      <View style={newstyles?.containerFormaterialname}>
                        <Text style={newstyles?.materlabe}>
                          {' '}
                          ₹ {Number(item?.amount).toFixed(2)}
                        </Text>
                      </View>
                      {mainItem?.materials?.length > 1 && (
                        <TouchableOpacity
                          style={{
                            position: 'absolute',
                            top: -6,
                            right: -1,
                            backgroundColor: Colors?.primary,
                            width: wp(6),
                            height: wp(6),
                            borderRadius: 999,
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                          // onPress={() => removeItem(index,ind)}
                          onPress={() => {
                            onRemoveFromIndex(index, ind);
                          }}
                        >
                          <Text
                            style={{
                              color: Colors.white,
                              fontSize: rf(12),
                              fontFamily: Fonts?.pop700,
                            }}
                          >
                            ✕
                          </Text>
                        </TouchableOpacity>
                      )}
                    </View>
                  );
                }}
              />

              <PrimaryButton
                style={{
                  marginTop: 10,
                  backgroundColor: Colors?.background,
                  borderWidth: 1,
                  borderColor: Colors?.primary,
                }}
                onPress={() => setShowModal({ isVisible: true, index: index })}
                title={'+ Add more spare parts'}
              />

              <Modal
                visible={showModal.isVisible && showModal.index == index}
                animationType="slide"
                transparent
              >
                <View
                  style={{
                    flex: 1,
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    justifyContent: 'flex-end',
                  }}
                >
                  <View
                    style={{
                      backgroundColor: Colors.background,
                      borderTopLeftRadius: 20,
                      borderTopRightRadius: 20,
                      borderWidth: 1,
                      borderColor: Colors?.white,
                      padding: 15,
                      // maxHeight: '70%',
                    }}
                  >
                    <Text
                      style={{
                        color: Colors?.white,
                        fontSize: rf(18),
                        fontFamily: Fonts?.pop700,
                        marginBottom: 10,
                        alignSelf: 'center',
                      }}
                    >
                      Select Spare Parts
                    </Text>

                    <FlatList
                      data={materialList}
                      keyExtractor={(item, index) => index.toString()}
                      renderItem={({ item }) => (
                        <TouchableOpacity
                          onPress={() => {
                            onSelectFromModal(item, showModal.index);
                            // setSelectedList(prev => [...prev, item]);
                            setShowModal({ isVisible: false, index: null });
                          }}
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            paddingVertical: 12,
                            borderWidth: 1,

                            paddingHorizontal: 12,
                            borderColor: Colors.gray,
                            borderRadius: 12,
                            marginTop: 15,
                          }}
                        >
                          <Text style={newstyles?.materlabe}>{item.name}</Text>
                          <Text style={newstyles?.materlabe}>
                            ₹ {item.rate}
                          </Text>
                        </TouchableOpacity>
                      )}
                    />

                    <PrimaryButton
                      style={{ marginTop: 20 }}
                      onPress={() =>
                        setShowModal({ isVisible: false, index: null })
                      }
                      title={'Close'}
                    />
                  </View>
                </View>
              </Modal>
              <Text style={[Styles?.InputLable, { marginTop: 10 }]}>
                Job Status{' '}
              </Text>

              <TouchableOpacity
                style={newstyles.completependingconatiner}
                onPress={() => setIsOpen(!isOpen)}
              >
                <Text style={[newstyles.materlabe, { color: Colors.white }]}>
                  {item?.jobStatus === 'Complete'
                    ? 'Complete'
                    : item?.jobStatus === 'Pending' &&
                      item?.pendingOption === 'workshop'
                    ? 'Part Taken to Workshop'
                    : item?.jobStatus === 'Pending' &&
                      item?.pendingOption === 'ordered'
                    ? 'Part Ordered'
                    : item?.jobStatus === 'Pending' &&
                      item?.pendingOption === 'other'
                    ? 'Other'
                    : 'Job Status'}
                </Text>

                {item?.jobStatus === 'Complete' ? (
                  <Image
                    source={images.cehck}
                    style={{
                      width: wp(5),
                      height: wp(5),
                      resizeMode: 'contain',
                    }}
                  />
                ) : item?.jobStatus === 'Pending' ? (
                  <Image
                    source={images.cehck}
                    style={{
                      width: wp(5),
                      height: wp(5),
                      resizeMode: 'contain',
                    }}
                  />
                ) : (
                  <Image
                    source={images.Downarrow}
                    style={{
                      width: wp(5),
                      height: wp(5),
                      resizeMode: 'contain',
                    }}
                  />
                )}
              </TouchableOpacity>

              {isOpen && (
                <View style={newstyles.dropdown}>
                  {/* COMPLETE OPTION */}
                  <TouchableOpacity
                    style={newstyles.option}
                    onPress={() => {
                      // setJobStatus('Complete');

                      updateService(index, 'jobStatus', 'Complete');
                      updateService(index, 'pendingOption', null);
                      // setPendingOption(null); // reset pending
                      setIsOpen(false);
                    }}
                  >
                    <Text style={newstyles?.materlabe}>Complete</Text>
                  </TouchableOpacity>

                  {/* PENDING HEADER */}
                  <TouchableOpacity
                    style={newstyles.option}
                    // onPress={() => setJobStatus('Pending')}
                    onPress={() => updateService(index, 'jobStatus', 'Pending')}
                  >
                    <Text style={newstyles?.materlabe}>Pending</Text>
                  </TouchableOpacity>

                  {/* PENDING SUB OPTIONS */}
                  {item?.jobStatus === 'Pending' && (
                    <>
                      {[
                        { key: 'workshop', label: 'Part Taken to Workshop' },
                        { key: 'ordered', label: 'Part Ordered' },
                        { key: 'other', label: 'Other' },
                      ].map(item => (
                        <TouchableOpacity
                          key={item.key}
                          style={newstyles.checkboxRow}
                          onPress={() => {
                            // setPendingOption(item.key);
                            // setIsOpen(false);
                            updateService(index, 'pendingOption', item.key);
                            setIsOpen(false);
                          }}
                        >
                          {/* <View style={newstyles.checkbox}>
                    {pendingOption === item.key && (
                      <View style={newstyles.checked} />
                    )}
                  </View> */}
                          <Text
                            style={[
                              newstyles?.materlabe,
                              { color: Colors?.gray },
                            ]}
                          >
                            {item.label}
                          </Text>

                          {pendingOption === item.key ? (
                            <Image
                              source={images?.cehck}
                              style={{
                                width: wp(5),
                                height: wp(5),
                                resizeMode: 'contain',
                              }}
                            />
                          ) : (
                            <Image
                              source={images?.uncheck}
                              style={{
                                width: wp(4),
                                height: wp(4),
                                resizeMode: 'contain',
                              }}
                            />
                          )}
                        </TouchableOpacity>
                      ))}
                    </>
                  )}
                </View>
              )}
              <TextInput
                placeholder="Remark :"
                placeholderTextColor={Colors?.gray}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
                onChangeText={val => updateService(index, 'remark', val)}
                style={{
                  borderColor: Colors?.gray,
                  marginTop: 10,
                  paddingHorizontal: 12,
                  paddingVertical: 10,
                  borderRadius: 10,
                  minHeight: 100,

                  borderWidth: 1,
                  color: Colors?.white,
                  fontSize: rf(15),
                  fontFamily: Fonts?.Pop400,
                }}
              />
              {/* <Text style={[Styles?.InputLable, { marginVertical: 10 }]}>
                Before Photo{' '}
              </Text>
              <TouchableOpacity style={newstyles?.cameraConatiner}>
                <Image source={images?.camera} style={newstyles?.cameraicon} />
                <Text style={newstyles?.cameratext}>{'Upload Photo'}</Text>
              </TouchableOpacity>
              <Text style={[Styles?.InputLable, { marginVertical: 10 }]}>
                After Photo{' '}
              </Text>
              <TouchableOpacity style={newstyles?.cameraConatiner}>
                <Image source={images?.camera} style={newstyles?.cameraicon} />
                <Text style={newstyles?.cameratext}>{'Upload Photo'}</Text>
              </TouchableOpacity> */}
            </>
          );
        }}
      />

      <PrimaryButton
        onPress={() => {
          setModelVisible(true);
        }}
        disabled={!isFormValid()}
        title={i18n.t('Continue')}
        style={{ marginTop: 20 }}
        loading={Loading}
      />
      <Modal
        onDismiss={() => setModelVisible(false)}
        visible={ModelVisible}
        transparent={true}
        animationType="slide"
      >
        <TouchableOpacity
          onPress={() => setModelVisible(false)}
          activeOpacity={1}
          style={{
            flex: 1,
            justifyContent: 'flex-end',
            // alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.3)', // transparent background
          }}
        >
          <View
            style={{
              width: '100%',
              borderTopWidth: 1,
              borderTopColor: Colors?.primary,
              borderLeftWidth: 1,
              borderLeftColor: Colors?.primary,
              borderRightWidth: 1,
              borderRightColor: Colors?.primary,
              padding: 20,
              backgroundColor: Colors?.lightGray,
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              paddingHorizontal: 20,
              // alignItems: 'center',
            }}
          >
            <Text
              style={{
                color: Colors?.white,
                fontSize: rf(22),
                alignSelf: 'center',
                fontFamily: Fonts?.pop600,
                paddingBottom: 10,
              }}
            >
              Payment
            </Text>
            <TouchableOpacity
              onPress={() => {
                setActiveInput('complete');
                setAmountValue('');
              }}
              style={[
                newstyles?.PaymentContainer,
                {
                  borderColor:
                    activeInput === 'complete'
                      ? Colors?.primary
                      : Colors?.white,
                },
              ]}
            >
              <Text style={newstyles?.PaymnetLabel}>Payment Complete</Text>
            </TouchableOpacity>
            {activeInput === 'complete' && (
              <TextInput
                value={AmountValue}
                onChangeText={i => setAmountValue(i)}
                placeholder="Enter Amount"
                placeholderTextColor={Colors?.gray}
                style={{
                  fontSize: rf(14),
                  fontFamily: Fonts?.pop600,
                  borderColor: Colors?.primary,
                  borderWidth: 1,
                  marginTop: 10,
                  color: Colors?.white,
                  borderRadius: 12,

                  padding: 10,
                }}
              />
            )}
            <TouchableOpacity
              onPress={() => {
                setActiveInput('pending');
                setAmountValue('');
              }}
              style={[
                newstyles?.PaymentContainer,
                {
                  borderColor:
                    activeInput === 'pending' ? Colors?.primary : Colors?.white,
                },
              ]}
            >
              <Text style={newstyles?.PaymnetLabel}>Payment Pending</Text>
            </TouchableOpacity>

            {activeInput === 'pending' && (
              <TextInput
                value={AmountValue}
                onChangeText={i => setAmountValue(i)}
                placeholderTextColor={Colors?.gray}
                placeholder="Enter Amount"
                style={{
                  fontSize: rf(14),
                  color: Colors?.white,

                  fontFamily: Fonts?.pop600,
                  borderColor: Colors?.primary,
                  borderWidth: 1,
                  marginTop: 10,
                  borderRadius: 12,
                  padding: 10,
                }}
              />
            )}
            <PrimaryButton
              onPress={onSubmit}
              disabled={AmountValue.trim() === ''}
              // disabled={true}
              title={i18n.t('Continue')}
              loading={Loading}
              style={{
                marginTop: 20,
                marginBottom: 10,
                // opacity: isDisabled ? 0.5 : 1, // optional UI effect
              }}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </MainContainer>
  );
};

export default Servicereport;
const newstyles = StyleSheet.create({
  PaymnetLabel: {
    color: Colors?.white,
    fontSize: rf(16),
    fontFamily: Fonts?.Pop400,
  },
  PaymentContainer: {
    marginTop: 10,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 10,
    // backgroundColor: Colors?.lightGray,
    borderWidth: 1,
    width: '100%',
    alignSelf: 'flex-start',
    borderColor: Colors?.gray,
  },

  textInputstyle: {
    borderWidth: 1,
    borderColor: Colors.gray,
    borderRadius: 10,
    paddingVertical: 11,
    // marginTop: 20,
    width: wp(30),
    paddingHorizontal: 12,
    backgroundColor: Colors.background,
    color: Colors?.white,
    fontSize: rf(15),
    fontFamily: Fonts.Pop400,
  },
  containerFormaterialname: {
    borderWidth: 1,
    borderColor: Colors?.gray,
    paddingVertical: 11,
    paddingHorizontal: 10,
    borderRadius: 10,
    width: wp(30),
    // marginTop: 10,
  },
  materlabe: {
    color: Colors?.white,
    fontSize: rf(15),
    fontFamily: Fonts?.Pop400,
  },
  completependingconatiner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    borderWidth: 1,
    borderColor: Colors.gray,
    borderRadius: 10,
    paddingVertical: 11,
    marginTop: 10,
    // width: wp(30),
    marginTop: 10,
    paddingHorizontal: 12,
    backgroundColor: Colors.background,
  },

  dropdown: {
    marginTop: 5,
    borderWidth: 1,
    borderRadius: 8,

    padding: 10,
    backgroundColor: Colors?.background,
    borderColor: Colors?.gray,
  },
  option: {
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: Colors?.primary,
    marginTop: 5,
    borderRadius: 12,
    paddingHorizontal: 12,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    marginTop: 8,
    borderBottomWidth: 1,
    borderBottomColor: Colors?.gray,
    paddingVertical: 10,
  },
  checkbox: {
    width: 18,
    height: 18,
    borderWidth: 1,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checked: {
    width: 10,
    height: 10,
    backgroundColor: 'green',
  },
  cameraConatiner: {
    // height: wp(25),
    paddingVertical: 30,
    borderRadius: 12,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: Colors?.gray,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cameraicon: { width: wp(8), height: wp(8), resizeMode: 'contain' },
  cameratext: {
    color: Colors?.gray,
    fontFamily: Fonts?.Pop400,
    fontSize: rf(15),
    marginTop: 4,
  },
});

const DUMMYDATA = {
  _id: '69959ba430ca7d873aaf09b1',
  bookingId: 'ACDOCBK18022026-88',
  status: 'IN_PROGRESS',
  slot: 'FIRST_HALF',
  date: '2026-02-18T00:00:00.000Z',
  createdAt: '2026-02-18T10:59:48.218Z',
  updatedAt: '2026-02-19T09:23:28.136Z',
  customer: {
    name: 'jatin',
    phoneNumber: '8085546699',
  },
  technician: {
    name: 'Deepali Mahajan',
    phoneNumber: '8878178317',
  },
  services: [
    {
      serviceId: '6738360b22c19de366dd94e4',
      name: 'Installation',
      quantity: '1',
      acType: 'Split AC',
      place: '',
      comment: '',
    },
  ],
  amount: 0,
  address: {
    house: '1234567',
    street: 'test',
    city: 'Indore',
    state: 'Madhya Pradesh',
    zipcode: '452001',
  },
};

const DUMMYDATA1 = {
  _id: '69943308b8a3ec02102dafa8',
  bookingId: 'ACDOCBK17022026-81',
  status: 'IN_PROGRESS',
  slot: 'FIRST_HALF',
  date: '2026-02-19T00:00:00.000Z',
  createdAt: '2026-02-17T09:21:12.229Z',
  updatedAt: '2026-02-19T10:03:25.853Z',
  customer: {
    name: 'Testing ',
    phoneNumber: '8770148721',
  },
  technician: {
    name: 'Deepali Mahajan',
    phoneNumber: '8878178317',
  },
  services: [
    {
      serviceId: '673833a022c19de366dd9484',
      name: 'Service',
      quantity: '4',
      acType: 'Split AC',
      place: '',
      comment: '',
    },
    {
      serviceId: '673834ee22c19de366dd94cc',
      name: 'Repair',
      quantity: '1',
      acType: 'Cassette AC',
      place: '',
      comment: '',
    },
  ],
  amount: 0,
  address: {
    house: 'test',
    street: 'test',
    city: 'test',
    state: 'test',
    zipcode: '45200',
  },
};
