import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import TitleText from './../components/TitleText';

import Colors from '../constants/colors';

const Header = props => {
  return (
    <View style={styles.header}>
      <TitleText>
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
    backgroundColor: Colors.headerBgColor,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default Header;
