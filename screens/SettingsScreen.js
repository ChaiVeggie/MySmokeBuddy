import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  AsyncStorage,
} from 'react-native';

import { WebBrowser } from 'expo';

import { MonoText } from '../components/StyledText';

import { Container, Header, Left, Body, Right, Button, Icon, Title, Label, Form, Item,Input, Content } from 'native-base';
import { white } from 'ansi-colors';
import { Dropdown } from 'react-native-material-dropdown';

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      q: [],
      Question1: "",
      Question2: "",
      Question3: "",
      Question4: "",
    
    }
  }

  componentWillUnmount() {
    console.log("component UNMOUNT");
    this.didFocusListener.remove();
  }

  componentDidMount() {

    console.log("component RUNNING");

    this.didFocusListener = this.props.navigation.addListener(
      'didFocus', () => {
        AsyncStorage.getItem('QA').then((result) => {
          if (result != null) {
            console.log("RESULT" + result);
            this.setState({
              q: JSON.parse(result)

            })
            this.state.q.map((item, i) => {
                    this.setState({
                      Question1: item.Question1,
                      Question2: item.Question2,
                      Question3: item.Question3,
                      Question4: item.Question4,
                      

                    })
            })
          }
        }).catch((response) => {
          console.log(response)
        })
      }
    )
  }

  buttonUpdate(){
    
    let QArray1= [
      {'Question1': this.state.Question1,
      'Question2': this.state.Question2,
      'Question3': this.state.Question3,
      'Question4': this.state.data,
      }
    ]
    AsyncStorage.removeItem('QA');
    AsyncStorage.setItem('QA', JSON.stringify(QArray1), () => {
    this.props.navigation.navigate("Home");
    })
  }

  render() {
    let data = [{
      value: 'Marlboro',
    }, {
      value: 'Winston',
    }, {
      value: 'Dunhill',
    }];
   

    return (
      <Container>
      <Header style={styles.HeaderContainer} >
        <Body >
          <Title style={styles.TitleContainer}>Update your Details</Title>
        </Body>
        <Right>
          <Button transparent onPress={() =>this.buttonUpdate()}>
            <Icon  style={styles.IconContainer} name='ios-arrow-forward' />
          </Button>
        </Right>

      </Header>
  <Content>

    <Form style= {styles.FormContainer}>
    
  

   <Item stackedLabel>
   <Label>How many Cigarette sticks do you smoke per day?</Label>
     <Input
     keyboardType = 'numeric'
     onChangeText={(Question1) => this.setState({Question1})}

     >
     <Text>{this.state.Question1}</Text>
     </Input>
   </Item>

   <Item stackedLabel >
     <Label>What is the cost per pack?</Label>
      <Input
      keyboardType = 'numeric'
      onChangeText = {(Question2) => this.setState({Question2})}
      >
      <Text>{this.state.Question2}</Text>
      </Input>
   </Item>

   <Item stackedLabel>
     <Label>How many years have you smoked?</Label>
     <Input
     keyboardType = 'numeric'
     onChangeText={(Question3) => this.setState({Question3})}
     >
     <Text>{this.state.Question3}</Text>
     </Input>
   </Item>
     <Label style={{ fontSize: 15, color: 'grey', marginLeft: 5, marginTop: 10 }}>What brands of Cigarette do you smoke?</Label>
     <Dropdown
              label={this.state.data}
              data={data}
              onChangeText={(data) => this.setState({ data})}
              value= {this.state.Question4}
            />
     <Text>{this.state.data}</Text>
     
 </Form>
</Content>
    </Container>
    );
  }

  _maybeRenderDevelopmentModeWarning() {
    if (_DEV_) {
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
    backgroundColor: '#fff',
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
  HeaderContainer:{
   // color: '#2e78b7',
    backgroundColor:'#426DCB',
  },
  TitleContainer:{
    fontSize:16,
    color: 'white'

  },
  IconContainer:{
    color: 'white'

  },
  FormContainer:{
      marginTop: 20,

  },
  TextContainer:{
    marginBottom:30,
  }
});