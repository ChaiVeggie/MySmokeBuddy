import React from 'react';
import { Alert, Platform, StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { Card, Icon, Header } from 'react-native-elements'
import { Container } from 'native-base';

import * as Progress from 'react-native-progress';
import { green } from 'ansi-colors';

export default class HomeScreen extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      smokeCount: 0,
      cravedCount: 0,
      colorChange: 'black',
      cigNico: {
        dunhillMenthol: 0.62,
        marlboroRed: 1.07,
        luckyRed: 0.8,

      }
    }
  }


  onPressSmoked = () => {

    if (this.state.smokeCount < 7) {
      this.setState({ smokeCount: this.state.smokeCount + 1 })

    } else {

      Alert.alert(
        'Are you sure ?',
        'You are smoking more than you are suppose ',
        [
          { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
          { text: 'Yes, I am aware', onPress: () => this.changeCigTextColor() },
        ],

        { cancelable: false }
      )
    }
  }
  onPressCraved = () => {
    this.setState({ cravedCount: this.state.cravedCount + 1 })
  }

  static navigationOptions = {
    header: null,
  };

  changeCigTextColor = () => {
    this.setState({
      smokeCount: this.state.smokeCount + 1,
      colorChange: 'red'
    })
  }



  render() {
    const data = [15, 25, 35, 45]


    return (

      <View style={styles.container}>
        <Header centerComponent={{ text: 'My Pal', style: { color: '#fff' } }} />
        <View style={styles.barinccontainer}>
          <View style={{ width: "40%" }}>
            <Progress.Bar progress={this.state.smokeCount * this.state.cigNico.marlboroRed / 45}
              width={200}
              animated={true}
              style={{ transform: [{ rotate: '-90deg' }] }} />
          </View>
          <View style={{ marginRight: 10, justifyContent: "space-between" }}>
            <Text style={styles.HiProgressBarIndicate}>High</Text>
            <Text style={styles.MidProgressBarIndicate}>Mid</Text>
            <Text style={styles.LowProgressBarIndicate}>Low</Text>
          </View>
        </View>
        <View style={{ width: "50%", flex: 1, flexDirection: 'row', position: 'absolute', bottom: 100 }}>
          <Card
            title='Ciggerettes smoked'>
            <Text style={{
              textAlign: 'center', // <-- the magic
              fontWeight: 'bold',
              fontSize: 18,
              color: this.state.colorChange
            }}>
              {this.state.smokeCount} / 7
            </Text>
          </Card>
          <Card
            title='Ciggrettes craved'>

            <Text style={styles.headline2}>{this.state.cravedCount}</Text>

          </Card>
        </View>
        <View style={styles.tabBarInfoContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={this.onPressSmoked}
          >
            <Icon
              name='smoking-rooms'
            />
            <Text> I smoked </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={this.onPressCraved}
          >
            <Icon
              name='smoke-free'
            />
            <Text center> I craved </Text>
          </TouchableOpacity>
        </View>

      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    alignItems: 'stretch',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  button: {
    width: 100,
    height: 50,
    alignItems: 'center',
    padding: 10
  },
  headline2: {
    textAlign: 'center', // <-- the magic
    fontWeight: 'bold',
    fontSize: 18,

  },
  barinccontainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-end",
  },


  HiProgressBarIndicate: {
    color: 'red',
    height: 80,
    marginTop: -95
  },
  MidProgressBarIndicate: {
    color: 'orange',
    height: 80
  },
  LowProgressBarIndicate: {
    color: 'green',
    height: 80

  },

});
