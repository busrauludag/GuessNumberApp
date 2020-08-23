import React from 'react';
import {
  StyleSheet,
  View,
  Button,
  Image
} from 'react-native';

import BodyText from './../components/BodyText';
import TitleText from './../components/TitleText';
import Colors from './../constants/colors';

const GameOverScreen = props => {
  return (
    <View style={styles.screen}>
      <TitleText>The Game is Over!</TitleText>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          fadeDuration={500}
          source={require('./../assets/success.png')}
          // source={{uri: 'https://media.istockphoto.com/photos/female-hiker-celebrating-success-picture-id1137978889'}}
          resizeMode='cover'
        />
      </View>
      <BodyText>Number of Rounds: {props.roundsNumber}</BodyText>
      <BodyText>Number was: {props.userNumber}</BodyText>
      <Button title='NEW GAME' onPress={props.onRestart} />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    width: 300,
    height: 300,
    borderRadius: 150,
    marginVertical: 15,
    borderWidth: 3,
    borderColor: Colors.black,
    overflow: 'hidden'
  },
  image: {
    width: '100%',
    height: '100%',
  }
});

export default GameOverScreen;