import React from 'react';
import { StyleSheet, View } from 'react-native';

import Colors from '../constants/colors';

const Card = props => {
  return (
    <View style={{...styles.card, ...props.styles}}>
      {props.children}
    </View>
  );
}

// shadow only works on iOS, so we can use elevation for android. Elevation only works on Android.

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowRadius: 6,
    shadowOpacity: 0.26,
    elevation: 8,
    backgroundColor: Colors.white,
    padding: 20,
    borderRadius: 10
  }
});

export default Card;
