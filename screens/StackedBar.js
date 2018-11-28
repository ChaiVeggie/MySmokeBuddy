import React from 'react';
import { StyleSheet, View, Text, AsyncStorage, Keyboard} from 'react-native';
import { BarChart, XAxis, Grid, YAxis, LineChart } from 'react-native-svg-charts';
import { VictoryLegend,VictoryStack, VictoryArea, VictoryChart, VictoryTheme,VictoryAxis } from "victory-native";
import { Container, Header, Left, Body, Right, Button, Icon, Title, Label, Form, Item, Input, Content } from 'native-base';
import * as scale from 'd3-scale';

export default class StackedBar extends React.PureComponent {
  static navigationOptions = {
   header: null
  };

  constructor(props) {
    super(props);
    this.state = {
          QArray: [],
          moneySpent : 0,
          totalspent: 95,
          cravecount: 0,
          smokecount:0,
    }
  }

  componentWillUnmount() {
    this.didFocusListener.remove();
    
  }

  componentDidMount() {
    Keyboard.dismiss();
    this.didFocusListener = this.props.navigation.addListener(
      'didFocus', () => {
        AsyncStorage.getItem('CC').then((result) => {
          if (result != null) {
            this.setState({
              cravecount: JSON.parse(result)
            })
          }
          console.log("look here u jibai graph" + this.state.cravecount)

        }).catch((response) => {
          console.log(response)
        
        })
        AsyncStorage.getItem('SC').then((result) => {
          if (result != null) {
            this.setState({
              smokecount: JSON.parse(result)
            })
          }
          console.log("look here u jibai graph" + this.state.smokecount)

        }).catch((response) => {
          console.log(response)
        
        })

      }
    )
  }
  switchToStack = () =>{

    this.props.navigation.navigate("Chart");
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
        
        <Left>
          <Button transparent onPress={() => this.props.navigation.navigate("Graph")}>

            <Icon style={styles.IconContainer} name='ios-arrow-back' />
          </Button>
        </Left>
        <Body >
          <Title style={styles.TitleContainer}>Crave Vs Smoke </Title>
        </Body>
      </Header>
      <View style={styles.container}>

          <VictoryChart
          width={380}
          theme={VictoryTheme.material}
          domainPadding={10}
          animate={{
            duration: 2000,
            onLoad: { duration: 1000 }
          }}
          >
           <VictoryLegend  x={150} y={5}
  	        title="Legend"
             centerTitle
             orientation="horizontal"
              gutter={20}
             style={{ border: { stroke: "black" }, title: {fontSize: 20 } }}
             data={[
                     { name: "Smoke Count", symbol: { fill: "tomato", type: "star" } },
                     { name: "Crave Count", symbol: { fill: "orange" } },
                     
                  ]}
                   />
             
         <VictoryStack>
          <VictoryArea
             data={[{x: "Mon", y: 2, fill: "tomato"}, 
                    {x: "Tues", y: 3, fill: "tomato"},
                     {x: "Wed", y: 5, fill: "tomato"}, 
                     {x: "Thurs", y: 5,fill: "tomato"},
                      {x: "Fri", y: 5, fill: "tomato"},
                       {x: "Sat", y: 5, fill: "tomato"}, 
                       {x: "Sun", y: this.state.smokecount, fill: "tomato"},
                   ]}
            />
          <VictoryArea
            data={[{x: "Mon", y: 3, fill: "orange"}, {x: "Tues", y: 5, fill: "orange"}, {x: "Wed", y: 2, fill: "orange"}, {x: "Thurs", y: 1, fill: "orange"}, {x: "Fri", y: 7, fill: "orange"}, {x: "Sat", y: 4, fill: "orange"}, {x: "Sun", y: this.state.cravecount, fill: "orange"}]}
            />
          
          {/* labels={(d) => d.money} */}
          </VictoryStack>
       </VictoryChart>
       

          
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
  HeaderContainer:{
    backgroundColor: '#426DCB',
  },
  IconContainer:{
    color: 'white'
  },
  TitleContainer:{
    fontSize: 16,
    color: 'white',
    
    
    
  }
});
