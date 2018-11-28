import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  View,
  AsyncStorage,
  Alert,
  Switch,
  Modal,
  Keyboard,
} from 'react-native';
import { WebBrowser } from 'expo';

import { MonoText } from '../components/StyledText';
import { green } from 'ansi-colors';
import * as Progress from 'react-native-progress';
import { Card, Icon, Header } from 'react-native-elements';
import { Container, Left, Body, Right, Button, Title, Label, Form, Item, Input, Content, CardItem } from 'native-base';
import Dialog, { DialogContent, DialogTitle, } from 'react-native-popup-dialog';
import Toast, { } from 'react-native-easy-toast';
export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };
  constructor(props) {
    super(props);
    this.state = {
      q: [],
      smokecraveArray:[],

     
      smokeCount: 0,
      cravedCount: 0,
      colorChange: 'black',

      
      randomNoQuote: 0,
      selectedQuote: "",
      img: "",
      stickPrice: 0,

      image: require('../assets/images/lung1.png'),
      heartPerc: 0,
      cancerPerc: 0,
      lungPerc:0,
      visible:false,
      nico:""
     

    }
  }
  componentWillUnmount() {
    this.didFocusListener.remove();
    
  }

  componentDidMount() {
    Keyboard.dismiss();
    this.didFocusListener = this.props.navigation.addListener(
      'didFocus', () => {
        AsyncStorage.getItem('QA').then((result) => {
          if (result != null) {
            this.setState({
              q: JSON.parse(result)
            })
          }

        }).catch((response) => {
          console.log(response)
        
        })
      }
    )
  }


 
  onClickImg = () => {
    if (this.state.smokeCount <= 4) {
      this.setState({
        heartPerc:  9.22,
        cancerPerc: 6.37,
        lungPerc: 0.63,
        
      })
      console.log(this.state.heartPerc)
    } else if (this.state.smokeCount >= 5 && this.state.smokeCount <= 9) {
      this.setState({
        heartPerc: 10.4,
        cancerPerc: 8.94,
        lungPerc:2.41,
      })
     
    } else if (this.state.smokeCount >= 10 && this.state.smokeCount <= 14){
    this.setState({
      heartPerc: 10.5,
      cancerPerc: 10.6,
      lungPerc: 3.40
    })
    }else if (this.state.smokeCount >= 15 && this.state.smokeCount <= 19){
      this.setState({
        heartPerc: 11.42,
        cancerPerc: 11.5,
        lungPerc: 3.70
      })
    }else if (this.state.smokeCount >= 20 && this.state.smokeCount <= 24){
      this.setState({
        heartPerc: 11.93,
        cancerPerc: 13.0,
        lungPerc: 5.64,
      })
    }else if (this.state.smokeCount >= 25){
      this.setState({
        heartPerc: 11.96,
        cancerPerc: 15.0,
        lungPerc: 6.25
      })
    } 
  
  }


  onPressSmoked = () => {

    this.state.q.map((item, i) => {
      if (this.state.smokeCount < item.Question1) {
        this.setState(
          { smokeCount: this.state.smokeCount += 1 },
          this.onClickImg(),
          this.calculateNicotine(),
          this.calculateMoney(),
  
          this.renderImg(),
          
            
        )
        this.refs.toast.show( 'Increased chances of health risk! \n\n' + "Heart Diseases Percentage: " +  this.state.heartPerc + "%" + "\n" + "Cancer Percentage: " + this.state.cancerPerc + "%" + "\n" + "Lung Cancer Percentage: "+ this.state.lungPerc + "%", 500)
        

      } else {
        console.log(this.state.heartPerc)
        
        this.onClickImg()
        this.refs.toast.show('You are exceeding your daily cigarette intake!' + 'Increased chances of health risk! \n\n ' + 'Heart Diseases Percentage: ' + this.state.heartPerc + "%" + "\n" +"Cancer Percentage: "+ this.state.cancerPerc + "%" + "\n" + "Lung Cancer Percentage: "+ this.state.lungPerc + "%", 1000);
        this.changeCigTextColor()
      
        
    
        
      }
    })
    AsyncStorage.setItem('SC', JSON.stringify(this.state.smokeCount), () => {
     
    })

    console.log("CHECKING COUNT" + this.state.smokeCount)
    console.log("onPressSmoke" + this.state.stickPrice)

  }


  


  onPressCraved = () => {
    this.randNoGenerator()
    this.setState({ visible: true });
    this.setState({ cravedCount: this.state.cravedCount + 1 })
    AsyncStorage.setItem('CC', JSON.stringify(this.state.cravedCount), () => {
      console.log("CHECKING COUNT" + this.state.cravedCount)
    })
  }

  static navigationOptions = {
    header: null,
  };

  changeCigTextColor = () => {

    this.setState({
      smokeCount: this.state.smokeCount += 1,
      colorChange: 'red'
    })
    this.calculateNicotine()
    this.calculateMoney()
    this.renderImg()
  }
  randNoGenerator = () => {
    var RandomNumber = Math.floor(Math.random() * 10) + 1;
    this.setState({
      randomNoQuote: RandomNumber
    })
  }


  renderSwitch(param) {
    switch (param) {
      case 1:
        return 'If you are still trying, you have not failed';
      case 2:
        return 'Do it for your heart, and the hearts of your loved ones';
      case 3:
        return 'You have not failed until you quit trying';
      case 4:
        return 'Congratulation on almost quitting smoking';
      case 5:
        return 'Take care of your body, its the only place you have to live in';
      case 6:
        return 'You are greater than your addiction';
      case 7:
        return 'Dont think of it as quitting but as gaining';
      case 8:
        return 'YOU CAN AND YOU WILL';
      case 9:
        return 'Difficult road leads to beautiful destinations';
      case 10:
        return 'You have done well, young padawan';
      case 11:
        return 'Think it, achieve it, live your dreams';
      default:
        return 'You have to think it before you can do it. The mind is what makes it all possible'
    }
  }

  calculateMoney = () => {
    this.state.q.map((item, i) => {

      var cigPrice = (this.state.smokeCount * (item.Question2 / 20)).toFixed(2)
      console.log("check cig press in calMoney methid" + cigPrice)
      

      this.setState({
        stickPrice: cigPrice,
       
      })

      AsyncStorage.setItem('PA', JSON.stringify(cigPrice), () => {
      
      })
  
     
    })
  }

  calculateNicotine =()=>{
    this.state.q.map((item, i) => {

      if(item.Question4 == "Marlboro"){
        this.setState({
          nico: 1.07
        })
      }else if(item.Question4 == "Winston"){
        this.setState({
          nico: 0.8
        })
      }else if(item.Question4 == "Dunhill"){
        this.setState({
          nico:0.62
        })
      }

    })
   // console.log(this.state.nico)
  }

 



  renderImg = () => {

    if (this.state.smokeCount <= 4) {
      this.setState({
        image: require('../assets/images/lung1.png')
      })
    }
    else if (this.state.smokeCount >= 5 && this.state.smokeCount <= 9) {
      this.setState({
        image: require('../assets/images/lung2.png')
      })
    //  console.log("Should change image")
    }
    else if (this.state.smokeCount >= 10 && this.state.smokeCount <= 14) {
      this.setState({
        image: require('../assets/images/lung3.png')
      })
    //  console.log("Should change image")
    }
    else if (this.state.smokeCount >= 15 && this.state.smokeCount <= 19) {
      this.setState({
        image: require('../assets/images/lung4.png')
      })
    //  console.log("Should change image")
    }
    else if (this.state.smokeCount >= 20 && this.state.smokeCount <= 24) {
      this.setState({
        image: require('../assets/images/lung5.png')
      })
     // console.log("Should change image")
    }
    else if (this.state.smokeCount >= 25) {
      this.setState({
        image: require('../assets/images/lung6.png')
      })
      //console.log("Should change image")
    }

    this.forceUpdate()
  }



  render() {
    return (
      <Container>
        <Header containerStyle={{ backgroundColor: 'black'}} >
          <Body >
            <Header centerComponent={{ text: 'My Smoke Buddy', style: { color: '#fff'} }} />
          </Body>
        </Header>
        <Container >
          <Label style={styles.Titlestyle} >Overall Health per day   | </Label>
          {this.renderImg}
            <Image source={this.state.image} style={styles.imageContainer} />
     
        </Container>
        {
          this.state.q.map((item, i) => {

            return (
              
              <Container key={i} style={{ justifyContent: 'left' }}>
               
              
                <View style={styles.barinccontainer}>
              
                  <View style={{ width: "40%" }}>

                     <Label style={styles.LabelNico} >Nicotine Level</Label>
                    <Progress.Bar progress={(this.state.smokeCount * this.state.nico) / 35}
                      width={200}
                      animated={true}
                      color={"red"}
                      style={{ transform: [{ rotate: '-90deg' }] }} />
                  </View>
                  <View style={{ marginRight: 10, justifyContent: "space-between" }}>
                    <Text style={styles.HiProgressBarIndicate}>High</Text>
                    <Text style={styles.MidProgressBarIndicate}>Mid</Text>
                    <Text style={styles.LowProgressBarIndicate}>Low</Text>
                  </View>

                </View>



                <View style={styles.smokeandcravecontainer}>
                  <Card
                    title='Money Spent'>
                    <Text > $
                   {this.state.stickPrice}
                   </Text>

                  </Card>


                  <Card
                    title='Cigarette smoked'
                  >
                    <Text style={{
                      textAlign: 'center', // <-- the magic
                      fontWeight: 'bold',
                      fontSize: 15,
                      color: this.state.colorChange
                    }}>
                      {this.state.smokeCount} / {item.Question1}

                    </Text>

                  </Card>
                  <Card
                    title='Cigarette craved'>

                    <Text style={styles.headline2}>{this.state.cravedCount} </Text>

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


              </Container>


            );


          })

        }
        <Toast ref="toast" opacity={1} position={'center'} />

        <Dialog
          visible={this.state.visible}
          onTouchOutside={() => {
            this.setState({ visible: false });
          }}
          position={'center'}
          width={"80%"}

          dialogTitle={<DialogTitle title="Motivational Quotes" />}
        >
          <DialogContent>
            <Text center>{this.renderSwitch(this.state.randomNoQuote)}</Text>
          </DialogContent>
        </Dialog>

      



      </Container>
    );

  }

  _maybeRenderDevelopmentModeWarning() {
    if (__DEV__) {
      const learnMoreButton = (
        <Text onPress={this._handleLearnMorePress} style={styles.helpLinkText}>
          Learn more
        </Text>
      );

      return (
        <Text style={styles.developmentModeText}>
          Development mode is enabled, your app will be slower but you can use useful development
          tools. {learnMoreButton}
        </Text>
      );
    } else {
      return (
        <Text style={styles.developmentModeText}>
          You are not in development mode, your app will run at full speed.
        </Text>
      );
    }
  }

  _handleLearnMorePress = () => {
    WebBrowser.openBrowserAsync('https://docs.expo.io/versions/latest/guides/development-mode');
  };

  _handleHelpPress = () => {
    WebBrowser.openBrowserAsync(
      'https://docs.expo.io/versions/latest/guides/up-and-running.html#can-t-see-your-changes'
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    alignItems: 'stretch',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
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
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
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
    height: 80,
    marginBottom: 350

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
    fontSize: 15,

  },
  smokeandcravecontainer: {
    width: "37%",
    flex: 0,
    flexDirection: 'row',
    position: 'absolute',
    bottom: 100,
    height: 125,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 1.0,
    marginVertical: 1,
    borderRadius: 2,
    marginHorizontal: 1,
    margin: 0,
    padding: 0,
    justifyContent: 'center',
    marginLeft: 120,
    marginBottom: 30


  },
  financeContainer: {
    width: "100%",
    flex: 1,
    flexDirection: 'row',
    position: 'absolute',
    bottom: 205,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: "30%",


  },
  imageContainer: {
    width: 300,
    height: 300,
    resizeMode: "center",
    justifyContent: 'center',
    alignItems: 'center',

  },
  Titlestyle: {
    marginLeft: 60,
    fontSize: 20,


  },
  LabelNico: {
    top: -135,
    marginLeft: 60,
    fontSize: 20,
  },
  HeaderContainer:{
    backgroundColor: 'black',
  }


});
