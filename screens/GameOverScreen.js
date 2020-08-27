import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
  ScrollView
} from 'react-native';

import BodyText from './../components/BodyText';
import TitleText from './../components/TitleText';
import MainButton from './../components/MainButton';

import Colors from './../constants/colors';

const GameOverScreen = props => {
  return (
    <ScrollView>
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
        <View style={styles.resultContainer}>
          <BodyText style={styles.resultText}>
            Your phone needed{' '}
            <Text style={styles.highlight}>{props.roundsNumber}</Text>
            {' '}rounds to guess the number{' '}
            <Text style={styles.highlight}>{props.userNumber}</Text>.
        </BodyText>
        </View>
        <MainButton onPress={props.onRestart}>
          NEW GAME
      </MainButton>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    width: Dimensions.get('window').width * 0.7,
    height: Dimensions.get('window').width * 0.7,
    borderRadius: Dimensions.get('window').width / 2,
    marginVertical: 15,
    borderWidth: 3,
    borderColor: Colors.black,
    overflow: 'hidden',
    marginVertical: Dimensions.get('window').height / 30
  },
  image: {
    width: '100%',
    height: '100%',
  },
  resultContainer: {
    width: '70%',
    marginVertical: Dimensions.get('window').height / 60
  },
  resultText: {
    textAlign: 'center',
    fontSize: Dimensions.get('window').height < 400 ? 16 : 20
  },
  highlight: {
    color: Colors.headerBgColor,
    fontFamily: 'open-sans-bold'
  }
});

export default GameOverScreen;