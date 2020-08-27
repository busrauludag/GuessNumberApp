import React from 'react';
import { StyleSheet, View, Platform } from 'react-native';

import TitleText from './../components/TitleText';

import Colors from '../constants/colors';

const Header = props => {
  return (
    <View
      style={{
        ...styles.headerBase,
        ...Platform.select({ ios: styles.headerIOS, android: styles.headerAndroid })
      }}
    >
      <TitleText style={styles.title}>
        {props.title}
      </TitleText>
    </View>
  );
}

const styles = StyleSheet.create({
  headerBase: {
    width: '100%',
    height: 90,
    paddingTop: 46,
    paddingBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerIOS: {
    backgroundColor: Colors.white,
    borderBottomColor: Colors.lightGrey,
    borderBottomWidth: 1
  },
  headerAndroid: {
    backgroundColor: Colors.headerBgColor,
  },
  title: {
    color: Platform.OS === 'ios' ? Colors.buttonColor : Colors.white
  }
});

export default Header;
