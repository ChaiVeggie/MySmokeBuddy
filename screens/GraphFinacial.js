import React from 'react';
import { StyleSheet, View, Text, AsyncStorage, Keyboard} from 'react-native';
import { BarChart, XAxis, Grid, YAxis, LineChart } from 'react-native-svg-charts';
import { VictoryBar, VictoryChart, VictoryTheme,VictoryAxis } from "victory-native";
import { Container, Header, Left, Body, Right, Button, Icon, Title, Label, Form, Item, Input, Content } from 'native-base';

import * as scale from 'd3-scale';

export default class GraphFinacial extends React.PureComponent {
  static navigationOptions = {
   header: null
  };

  constructor(props) {
    super(props);
    this.state = {
          QArray: [],
          moneySpent : 0,
          totalspent: 95,
         
    }
  }

  componentWillUnmount() {
    this.didFocusListener.remove();
    
  }

  componentDidMount() {
    Keyboard.dismiss();
    this.didFocusListener = this.props.navigation.addListener(
      'didFocus', () => {
        AsyncStorage.getItem('PA').then((result) => {
          if (result != null) {
            this.setState({
              moneySpent: JSON.parse(result)
            })
          }
          console.log("look here u jibai graph" + this.state.moneySpent)

        }).catch((response) => {
          console.log(response)
        
        })
      }
    )
  }
 

  render() {
   console.log(this.state.moneySpent)
    let data=[
      {date: "Mon", money: 12},
      {date: "Tues", money: 13},
      {date: "Wed", money: 15},
      {date: "Thurs", money:  17},
      {date: "Fri", money: 18},
      {date: "Sat", money:20},
      {date: "Sun", money: this.state.moneySpent*1},
    ]



    return (
      <Container>
        <Header style={styles.HeaderContainer} >
          <Body >
            <Title style={styles.TitleContainer}>Money Saved</Title>
          </Body>
          <Right>
            <Button transparent onPress={() => this.props.navigation.navigate("Chart")}>

              <Icon style={styles.IconContainer} name='ios-arrow-forward' />
            </Button>
          </Right>
        </Header>
     

      <View style={styles.container}>
      
        <Text>Total amount spent on Cigarettes: $ {this.state.moneySpent*1 + this.state.totalspent}</Text>

          <VictoryChart
          width={380}
          theme={VictoryTheme.material}
          domainPadding={10}
          animate={{
            duration: 2000,
            onLoad: { duration: 1000 }
          }}
          >
             
    
            <VictoryBar 
            data={data}
            // categories={{date: ["Mon", "Tues", "Wed", "Thurs", "Fri", "Sat", "Sun"] }}
            labels={(d) => d.money}
            x = "date"
            y = "money"
           
             

          />
          </VictoryChart>

          <Button title="hello" onPress = {this.switchToStack}>

          </Button>
        </View>
        </Container>
        
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
    
  },
  TitleContainer: {
    fontSize: 16,
    color: 'white'

  },
  HeaderContainer:{
    backgroundColor: '#426DCB',
  },
  IconContainer:{
    color: 'white'
  }
});
