import React, { useState, useRef, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Alert,
  ScrollView,
  FlatList,
  Dimensions
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
// import * as ScreenOrientation from 'expo-screen-orientation';

import Card from './../components/Card';
import NumberContainer from './../components/NumberContainer';
import BodyText from './../components/BodyText';
import MainButton from './../components/MainButton';

import DefaultStyles from './../constants/default-styles';
import Colors from './../constants/colors';

const generateRandomBetween = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const rndNumber = Math.floor(Math.random() * (max - min)) + min;
  if (rndNumber === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return rndNumber;
  }
}

const renderListItem = (listLength, itemData) => (
  <View style={styles.listItem}>
    <BodyText>#{listLength - itemData.index}</BodyText>
    <BodyText>{itemData.item}</BodyText>
  </View>
);

const GameScreen = props => {

  // lock the orientation
  // ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);

  const initialGuess = generateRandomBetween(1, 100, props.userChoice);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [pastGuesses, setPastGuesses] = useState([initialGuess.toString()]);
  const [availableDeviceWidth, setAvailableDeviceWidth] = useState(Dimensions.get('window').width);
  const [availableDeviceHeight, setAvailableDeviceHeight] = useState(Dimensions.get('window').height);

  const currentLow = useRef(1);
  const currentHigh = useRef(100);

  const { userChoice, onGameOver } = props;

  useEffect(() => {
    const updateLayout = () => {
      setAvailableDeviceWidth(Dimensions.get('window').width);
      setAvailableDeviceHeight(Dimensions.get('window').height);
    }
    Dimensions.addEventListener('change', updateLayout);
    return () => {
      Dimensions.removeEventListener('change', updateLayout);
    }
  });

  useEffect(() => {
    if (currentGuess === userChoice) {
      onGameOver(pastGuesses.length);
    }
  }, [currentGuess, userChoice, onGameOver]);

  const nextGuessHandler = direction => {
    if (
      (direction === 'lower' && currentGuess < props.userChoice)
      ||
      (direction === 'greater' && currentGuess > props.userChoice)
    ) {
      Alert.alert(
        'Don\'t lie!',
        'You know that this is wrong...',
        [{ text: 'Sorry', style: 'cancel' }]
      );
      return;
    }

    if (direction === 'lower') {
      currentHigh.current = currentGuess;
    } else {
      currentLow.current = currentGuess + 1;
    }

    const nextNumber = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess);
    setCurrentGuess(nextNumber);
    // setRounds(currentRounds => currentRounds + 1);
    setPastGuesses(currPastGuesses => [nextNumber.toString(), ...currPastGuesses]);
  }

  let listContainerStyle = styles.listContainer;
  if (availableDeviceWidth < 350) {
    listContainerStyle = styles.listContainerBig;
  }

  if (availableDeviceHeight < 500) {
    return (
      <View style={styles.screen}>
        <BodyText style={DefaultStyles.title}>Opponent's Guess</BodyText>
        <View style={styles.controls}>
          <MainButton onPress={nextGuessHandler.bind(this, 'lower')}>
            <Ionicons name='md-remove' size={24} color={Colors.white} />
          </MainButton>
          <NumberContainer>{currentGuess}</NumberContainer>
          <MainButton onPress={nextGuessHandler.bind(this, 'greater')}>
            <Ionicons name='md-add' size={24} color={Colors.white} />
          </MainButton>
        </View>
        <View style={styles.listContainer}>
          {/* <ScrollView contentContainerStyle={styles.list}>
          {pastGuesses.map((index, guess) => renderListItem(pastGuesses.length - index, guess))}
        </ScrollView> */}
          <FlatList
            keyExtractor={(item) => item}
            data={pastGuesses}
            renderItem={renderListItem.bind(this, pastGuesses.length)}
            contentContainerStyle={styles.list}
          />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <BodyText style={DefaultStyles.title}>Opponent's Guess</BodyText>
      <NumberContainer>{currentGuess}</NumberContainer>
      <View style={styles.buttonCardContainer}>
        <Card>
          <View style={styles.buttonContainer}>
            <MainButton onPress={nextGuessHandler.bind(this, 'lower')}>
              <Ionicons name='md-remove' size={24} color={Colors.white} />
            </MainButton>
            <MainButton onPress={nextGuessHandler.bind(this, 'greater')}>
              <Ionicons name='md-add' size={24} color={Colors.white} />
            </MainButton>
          </View>
        </Card>
      </View>
      <View style={styles.listContainer}>
        {/* <ScrollView contentContainerStyle={styles.list}>
          {pastGuesses.map((index, guess) => renderListItem(pastGuesses.length - index, guess))}
        </ScrollView> */}
        <FlatList
          keyExtractor={(item) => item}
          data={pastGuesses}
          renderItem={renderListItem.bind(this, pastGuesses.length)}
          contentContainerStyle={styles.list}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center'
  },
  buttonCardContainer: {
    // marginTop: 20,
    marginTop: Dimensions.get('window').height > 600 ? 20 : 10,
    width: '80%',
    minWidth: 300,
    maxWidth: '90%'
  },
  buttonContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '80%'
  },
  listContainer: {
    flex: 1,
    width: '60%',
    marginVertical: 20
  },
  listContainerBig: {
    flex: 1,
    width: '80%',
    marginVertical: 20
  },
  list: {
    flexGrow: 1,
    // alignItems: 'center',
    justifyContent: 'flex-end'
  },
  listItem: {
    borderColor: Colors.grey,
    borderWidth: 1,
    padding: 15,
    marginVertical: 15,
    backgroundColor: Colors.white,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%'
  }
});

export default GameScreen;