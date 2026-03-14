import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  StyleSheet,
  Image,
} from 'react-native';
import Colors, { Fonts } from '../utils/Colors';
import { rf, wp } from './Responvie';
import images from '../assets/Images/images';

const CustomDropdown = ({
  data,
  selectedValue,
  onSelect,
  Placholder,
  logic,
  styless,
}) => {
  const [visible, setVisible] = useState(false);

  return (
    <View>
      {/* Selected Box */}
      <TouchableOpacity
        style={[styles.dropdown, styless]}
        onPress={() => setVisible(true)}
      >
        <Text
          allowFontScaling={false}
          style={[
            styles.text,
            { color: selectedValue ? Colors.white : Colors.gray },
          ]}
        >
          {selectedValue ? selectedValue.label : Placholder}
        </Text>

        <Image
          source={images.Downarrow}
          style={{ width: wp(3.5), height: wp(3.5) }}
          resizeMode="contain"
        />
      </TouchableOpacity>

      {/* Dropdown Modal */}
      <Modal transparent animationType="fade" visible={visible}>
        <TouchableOpacity
          style={styles.overlay}
          onPress={() => setVisible(false)}
        >
          <View style={styles.listContainer}>
            <FlatList
              data={data}
              keyExtractor={item => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.item}
                  onPress={() => {
                    onSelect(item);
                    setVisible(false);
                  }}
                >
                  {item.img ? (
                    <View
                      style={{
                        marginRight: 10,

                        backgroundColor:
                          logic === 'per' ? null : Colors.lightGray,
                        paddingVertical: 7,
                        paddingHorizontal: 7,
                        borderRadius: 999,
                      }}
                    >
                      <Image
                        resizeMode="contain"
                        source={item.img}
                        style={{
                          width: logic === 'per' ? wp(8) : wp(6),
                          height: logic === 'per' ? wp(8) : wp(6),
                          // marginRight: 10,
                          // backgroundColor: Colors.white,
                        }}
                      />
                    </View>
                  ) : null}

                  <Text allowFontScaling={false} style={styles.itemText}>
                    {item.label}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default CustomDropdown;
const styles = StyleSheet.create({
  dropdown: {
    // height: 50,
    borderWidth: 1,
    borderColor: Colors.white,
    borderRadius: 10,
    paddingVertical: 11,
    marginTop: 20,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    backgroundColor: Colors.background,
  },
  text: {
    fontSize: rf(15),
    fontFamily: Fonts.Pop400,
  },
  overlay: {
    flex: 1,
    paddingVertical: 50,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  listContainer: {
    borderWidth: 1,
    borderColor: Colors.white,
    backgroundColor: Colors.background,
    borderRadius: 10,
    // maxHeight: 250,
  },
  item: {
    // padding: 15,
    paddingVertical: 7,
    paddingHorizontal: 10,
    borderBottomWidth: 0.2,
    borderColor: Colors.gray,
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemText: {
    fontSize: rf(16),
    fontFamily: Fonts.pop600,
    color: Colors.primary,
  },
});
