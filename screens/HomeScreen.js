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
} from 'react-native';
import { WebBrowser } from 'expo';

import { MonoText } from '../components/StyledText';
import { Container, Header, Left, Body, Right, Button, Icon, Title, Label, Form, Item, Input, Content } from 'native-base';
export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };
  constructor(props) {
    super(props);
    this.state = {
      q: []
    }
  }
  componentWillUnmount() {
    this.didFocusListener.remove();
  }

  componentDidMount() {
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
  // DisplayQ(){

  //   let QArray = AsyncStorage.getItem('QArray');

  //   let data = JSON.parse(QArray);
  //   alert(data.Q1+ '' + data.Q2 + '' +data.Q3+ '' + data.Q4)
  // }

  render() {
    const { navigation } = this.props;
    const id = navigation.getParam('id', '1');
    const onPress = navigation.getParam('onPress', 'this.buttonnext().bind(this)');
    return (
      <Container>
        <Header style={styles.HeaderContainer} >
          <Body >
            <Title style={styles.TitleContainer}>Tracking</Title>
          </Body>
        </Header>
        {
          this.state.q.map((item, i) => {
            return (
              <View key={i}>
                <Text>
                  {item.Question1}
                </Text>
                <Text>
                  {item.Question2}
                </Text>
                <Text>
                  {item.Question3}
                </Text>
                <Text>
                  {item.Question4}
                </Text>
                <Text>
                  {item.Question5}
                </Text>
              </View>
            )
          })
        }
        <Button
          //  onPress={this.DisplayQ()}
          title="show my data"
        />
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
});
