import React from 'react';
import { StyleSheet, View, Platform } from 'react-native';

import TitleText from './../components/TitleText';

import Colors from '../constants/colors';

const Header = props => {
  return (
    <View style={styles.header}>
      <TitleText style={styles.title}>
        {props.title}
      </TitleText>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: 90,
    paddingTop: 46,
    paddingBottom: 20,
    backgroundColor: Platform.OS === 'android' ? Colors.headerBgColor : Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomColor: Platform.OS === 'ios' ? Colors.lightGrey : 'transparent',
    borderBottomWidth: Platform.OS === 'ios' ? 1 : 0
  },
  title: {
    color: Platform.OS === 'ios' ? Colors.buttonColor : Colors.white
  }
});

export default Header;
