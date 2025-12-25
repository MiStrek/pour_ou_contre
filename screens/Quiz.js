import React from "react";
import { View, StyleSheet, StatusBar, Text, SafeAreaView } from "react-native";

import { Button, ButtonContainer } from "../components/Button";
import { Alert } from "../components/Alert";

import { connect } from 'react-redux'

import { addInput } from '../redux/ActionCreators'

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#36B1F0",
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom : 10
  },
  text: {
    color: "#fff",
    fontSize: 20,
    textAlign: "center",
    letterSpacing: -0.02,
    fontWeight: "600"
  },
  title: {
    color: "#fff",
    fontSize: 25,
    textDecorationLine: 'underline',
    textAlign: "center",
    letterSpacing: -0.02,
    fontWeight: "600"
  },
  safearea: {
    flex: 1,
    marginTop: 100,
    justifyContent: "space-between"
  }
});

const mapStateToProps = state => {
  return {
    inputs: state.inputs
  }
}

const mapDispatchToProps = (dispatch) => (
  {
    addInput: (identifier, text, validity) => dispatch(
      addInput(identifier, text, validity)
    )
  }
)


class Quiz extends React.Component {

  constructor (props) {
    super(props)

  }
 
  state = {
    correctCount: 0,
    totalCount: this.props.navigation.getParam("questions", []).length,
    totalPlayer: this.props.inputs.array.length,
    activeQuestionIndex: 0,
    activePlayerIndex : 0,
    answered: false,
    answerCorrect: false
  };

  answer = (answer)=> {
    this.setState(
      state => {
        const nextState = { answered: true };

        if (answer.id == 1) {
          nextState.correctCount = state.correctCount + 1;
          nextState.answerCorrect = true;
        } else {
          nextState.answerCorrect = false;
        }




        return nextState;
      },
      () => {
        setTimeout(() => this.nextQuestion(), 750);
      }
    );
  };

  nextQuestion = () => {
    this.setState(state => {
       nextPlayerIndex = state.activePlayerIndex + 1;
       nextIndex = state.activeQuestionIndex;

      if (nextPlayerIndex >= state.totalPlayer) {

        nextPlayerIndex = 0
         nextIndex = state.activeQuestionIndex +1 ;
      }

      if (nextIndex >= state.totalCount) {
        return this.props.navigation.navigate("QuizResult", {
          title: "Résultat",
          result: state.correctCount
        });
      }

      return {
        activePlayerIndex: nextPlayerIndex,
        activeQuestionIndex: nextIndex,
        answered: false
      };
    });
  };

  render() {
    const questions = this.props.navigation.getParam("questions", []);
    const question = questions[this.state.activeQuestionIndex];

    const players = this.props.inputs.array;
    const player = players[this.state.activePlayerIndex].text;
    const idplayer = players[this.state.activePlayerIndex].id;
  

    return (
      <View
        style={[
          styles.container,
          { backgroundColor: this.props.navigation.getParam("color") }
        ]}
      >
        <StatusBar barStyle="light-content" />
        <SafeAreaView style={styles.safearea}>
          <View>
            <Text style={styles.title}>{player}</Text>

            <Text style={styles.text}>{question.question}</Text>

            <ButtonContainer>
              {question.answers.map(answer => (
                <Button
                  key={answer.id}
                  text={answer.text}
                  onPress={() =>  {
                    for (const [key,value] of  Object.entries(answer) ) {
                      if (key != 'id' &  key !='text') {
                      this.props.addInput(idplayer,key,value);
                    }
        
        
                }
                this.answer(answer)}}
                />
              ))}
            </ButtonContainer>
          </View>

        </SafeAreaView>
        <Alert
          correct={this.state.answerCorrect}
          visible={this.state.answered}
        />
      </View>
    );
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Quiz)

