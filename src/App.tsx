import React, { useState } from 'react';
import {
  FlatList,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import Snackbar from 'react-native-snackbar';
import Icons from './components/icons';

function App(): React.JSX.Element {
  
  const [isCross, setIsCross] = useState<boolean>(false) //This is the same functionality to what you've seen before. Variable isCross is created, with function setIsCross to change it. Then useState() is called, with default value to false. But you use Typescript so that it expects a boolean value and nothing else. Its good practice.
  const [gameWinner, setGameWinner] = useState<string>('')
  const [gameState, setGameState] = useState(new Array(9).fill('empty', 0, 9)) //The default value here is a new array of size 9, and by default, it is filled with 'empty' strings from index 0, to index 9.

  const reloadGame = () => {
    setIsCross(false)
    setGameWinner('')
    setGameState(new Array(9).fill('empty', 0, 9))
  }
  // Above method reloads/resets the game, settings everything back to default

  const checkIsWinner = () => {
    //Checking the winner of the game by checking the vertical, diagonal, and horizontal lanes of the array to make sure that there is a match, then setting the game winner. Also checks if there is a draw by checking if there is 'empty' element in the array, using .includes() and searching from index 0.
    if (
      gameState[0] === gameState[1] &&
      gameState [0] === gameState[2] &&
      gameState[0] !== 'empty'
    ) {
      setGameWinner(`${gameState[0]} won the game!`);
    } else if (
      gameState[3] !== 'empty' &&
      gameState[3] === gameState[4] &&
      gameState[4] === gameState[5]
    ) {
      setGameWinner(`${gameState[3]} won the game!`);
    } else if (
      gameState[6] !== 'empty' &&
      gameState[6] === gameState[7] &&
      gameState[7] === gameState[8]
    ) {
      setGameWinner(`${gameState[6]} won the game!`);
    } else if (
      gameState[0] !== 'empty' &&
      gameState[0] === gameState[4] &&
      gameState[4] === gameState[8]
    ) {
      setGameWinner(`${gameState[0]} won the game!`)
    } else if (
      gameState[2] !== 'empty' &&
      gameState[2] === gameState[4] &&
      gameState[4] === gameState[6]
    ) {
      setGameWinner(`${gameState[2]} won the game!`)
    } else if (
      gameState[0] !== 'empty' &&
      gameState[0] === gameState[3] &&
      gameState[3] === gameState[6]
    ) {
      setGameWinner(`${gameState[0]} won the game!`)
    } else if (
      gameState[1] !== 'empty' &&
      gameState[1] === gameState[4] &&
      gameState[4] === gameState[7]
    ) {
      setGameWinner(`${gameState[1]} won the game!`)
    } else if (
      gameState[2] !== 'empty' &&
      gameState[2] === gameState[5] &&
      gameState[8] === gameState[8]
    ) {
      setGameWinner(`${gameState[2]} won the game!`)
    } else if (!gameState.includes('empty', 0)) {
      setGameWinner('Tied game...')
    }
  }

  const onChangeItem = (itemNumber: number) => {
    if (gameWinner) {
      return Snackbar.show({
        text: gameWinner,
        backgroundColor: '#000000',
        textColor: '#FFFFFF',
        duration: Snackbar.LENGTH_LONG
      })
      // If there already is a gamewinner, then a snackbar will pop up and show that there is already a winner, while not changing any of the items on the board.
    }

    if (gameState[itemNumber] === 'empty') {
      gameState[itemNumber] = isCross ? 'cross': 'circle'
      //Above, you are setting gameState[itemNumber] (the the index "itemNumber" provided in as a paremeter) to either 'cross' or 'circle' depending on whether or not isCross is true. If true, then its circle's turn, if false, it is cross's turn. This is done ONLY IF the gameState at the point is 'empty'.
      setIsCross(!isCross) //This then flips the isCross value to the opposite of whatever it was (either true or false). It must change on every turn.
    } else {
      return Snackbar.show({
        text: "Position is already filled",
        backgroundColor: 'red',
        textColor: '#FFFFFF',
        duration: Snackbar.LENGTH_LONG
      })
    } //Else condition is when the position is already filled by a cross or circle

    checkIsWinner() //Checks if there is a winner each time a change is made.

  }

  return (
    <SafeAreaView>
      <StatusBar />
      {/* In the below code, the line starts like this (not including the layout code): {gameWinner ? () : ()}   This is a conditional statement that will render different things onto the screen depending on whether gameWinner is a truthy value (i.e. if it contains a string(truthy), or not (falsy)). The code for different renderings happens inside the () brackets. What I mean by "renderings" is <View><View> and <Text><Text> componenets for example. I just can't think of the correct word atm. */}
      {gameWinner ? (
        <View style={[styles.playerInfo, styles.winnerInfo]}>
          <Text style={styles.winnerTxt}>
            {gameWinner}
          </Text> 
        </View>
      ) : (
        <View style={[styles.playerInfo, isCross ? styles.playerX : styles.playerO]}>
          <Text style={styles.gameTurnTxt}>
            Player {isCross ? 'X' : 'O'}'s Turn
          </Text>
        </View>
      )}

      {/* Game Grid */}
      <FlatList 
      numColumns={3}
      data={gameState}
      style={styles.grid}
      renderItem={({item, index}) => (
        <Pressable
        key={index}
        style={styles.card}
        onPress={ () => onChangeItem(index) }
        >
          <Icons name={item} />
        </Pressable>
      )}
      />

      {/* Reset Game */}
      <Pressable
      style={styles.gameBtn}
      onPress={reloadGame}
      >
        <Text style={styles.gameBtnTxt}>
          {gameWinner ? 'Start New Game' : 'Reload the Game'}
        </Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  playerInfo: {
    height: 56,

    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',

    borderRadius: 4,
    paddingVertical: 8,
    marginVertical: 12,
    marginHorizontal: 14,

    shadowOffset: {
      width: 1,
      height: 1
    },
    shadowColor: '#333',
    shadowOpacity: 0.2,
    shadowRadius: 1.5
  },
  gameTurnTxt: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  playerX: {
    backgroundColor: '#38CC77'
  },
  playerO: {
    backgroundColor: '#F7CD2E'
  },
  grid: {
    margin: 12
  },
  card: {
    height: 100,
    width: '33.33%',

    alignItems: 'center',
    justifyContent: 'center',

    borderWidth: 1,
    borderColor: '#333'
  },
  winnerInfo: {
    borderRadius: 8,
    backgroundColor: '#38CC77',
    
    shadowOpacity: 0.1
  },
  winnerTxt: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: '600',
    textTransform: 'capitalize'
  },
  gameBtn: {
    alignItems: 'center',

    padding: 10,
    borderRadius: 8,
    marginHorizontal: 36,
    backgroundColor: '#8D3DAF'
  },
  gameBtnTxt: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: '500'
  }
});

export default App;
