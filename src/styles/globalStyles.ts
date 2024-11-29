import {Dimensions, Platform, StyleSheet} from 'react-native';
import {colors} from '../constants/colors';
import {fontFamilies} from '../constants/fontFamilies';

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgColor,
    padding: 20,
  },

  section: {
    marginBottom: 16,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  text: {
    fontSize: 14,
    fontFamily: fontFamilies.regular,
    color: colors.text,
  },

  inputContainer: {
    backgroundColor: colors.white,
    borderRadius: 12,
    paddingHorizontal: Platform.OS === 'ios' ? 10 : 8,
    paddingVertical: 10,
  },

  tag: {
    paddingHorizontal: 16,
    paddingVertical: Platform.OS === 'ios' ? 6 : 4,
    borderRadius: 90,
    backgroundColor: colors.blue,
  },
  card: {
    borderRadius: 12,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 100,
    backgroundColor: 'rgba(0,0,0,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  modal: {
    flex: 1,
  },

  modalContainer: {
    padding: 20,
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalContent: {
    width: Dimensions.get('window').width * 0.8,
    padding: 20,
    borderRadius: 12,
    backgroundColor: colors.white,
  },
});
