import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  StyleSheet,
} from 'react-native';
import Colors, { Fonts } from '../utils/Colors';
import { rf } from './Responvie';

const YearPicker = ({
  startYear = 1950,
  value,
  onSelect,
  placeholder = 'Select Year',
  style,
}) => {
  const [visible, setVisible] = useState(false);

  const CURRENT_YEAR = new Date().getFullYear();

  const years = [];
  for (let i = CURRENT_YEAR; i >= startYear; i--) {
    years.push(i.toString());
  }

  return (
    <View>
      {/* Picker Box */}
      <TouchableOpacity
        style={[styles.dropdown, style]}
        onPress={() => setVisible(true)}
      >
        <Text
          allowFontScaling={false}
          style={[styles.text, { color: value ? Colors.white : Colors.gray }]}
        >
          {value || placeholder}
        </Text>
      </TouchableOpacity>

      {/* Modal */}
      <Modal transparent animationType="fade" visible={visible}>
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPress={() => setVisible(false)}
        >
          <View style={styles.listContainer}>
            <FlatList
              data={years}
              keyExtractor={item => item}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.item}
                  onPress={() => {
                    onSelect(item);
                    setVisible(false);
                  }}
                >
                  <Text
                    allowFontScaling={false}
                    allowFontScaling={false}
                    style={[
                      styles.itemText,
                      item === value && { color: Colors.white },
                    ]}
                  >
                    {item}
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

export default YearPicker;
const styles = StyleSheet.create({
  dropdown: {
    borderWidth: 1,
    borderColor: Colors.white,
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 12,
    marginTop: 20,
    backgroundColor: Colors.background,
  },
  text: {
    fontSize: rf(15),
    fontFamily: Fonts.Pop400,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  listContainer: {
    backgroundColor: Colors.background,
    borderRadius: 10,
    maxHeight: 300,
    borderWidth: 1,
    borderColor: Colors.white,
  },
  item: {
    paddingVertical: 12,
    borderBottomWidth: 0.3,
    borderColor: Colors.gray,
    alignItems: 'center',
  },
  itemText: {
    fontSize: rf(16),
    fontFamily: Fonts.pop600,
    color: Colors.primary,
  },
});
