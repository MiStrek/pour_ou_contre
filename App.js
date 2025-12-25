import * as React from 'react'
import { Provider } from 'react-redux'
import { ConfigureStore } from './redux/configureStore'
import Main from './screens/Players'
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import QuizIndex from "./screens/QuizIndex";
import Quiz from "./screens/Quiz";
import QuizResult from "./screens/Results"
import Welcome from './screens/Welcome';
import Rules from './screens/Rules';


const store = ConfigureStore()


const MainStack = createStackNavigator({
  Welcome: {
    screen: Welcome,
    navigationOptions: {
      headerTitle: "Pour ou Contre"
    }
  },
  Rules: {
    screen: Rules,
    navigationOptions: {
      headerTitle: "Règles"
    }
  },   
  Mainscreen: {
    screen: Main,
    navigationOptions: {
      headerTitle: "Joueurs"
    }
  },
  QuizIndex: {
    screen: QuizIndex,
    navigationOptions: {
      headerTitle: "Quizzes"
    }
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: ({ navigation }) => ({
      headerLeft: ()=> null,
      headerTitle: navigation.getParam("title"),
      headerTintColor: "#fff",
      headerStyle: {
        backgroundColor: navigation.getParam("color"),
        borderBottomColor: navigation.getParam("color")
      }
    })
  },
  QuizResult: {
    screen: QuizResult,
    navigationOptions: {
      headerLeft: ()=> null,
      headerTitle: "Résultat"
    }
}});

const AppContainer = createAppContainer(MainStack);

export default class App extends React.Component {

  render () {
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    )
  }
}

