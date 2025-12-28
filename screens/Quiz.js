import React from "react";
import { 
  View, 
  Text, 
  SafeAreaView, 
  ImageBackground, 
  StatusBar, 
  TouchableOpacity 
} from "react-native";
import { connect } from 'react-redux';
import { addInput } from '../redux/ActionCreators';
import { styles } from '../styles/Styles'; // Import crucial de vos styles
import { Alert } from "../components/Alert";

const courtBackground = require("../assets/tribunal_bg.png");

const mapStateToProps = state => ({
  inputs: state.inputs
});

const mapDispatchToProps = (dispatch) => ({
  addInput: (identifier, text, validity) => dispatch(addInput(identifier, text, validity))
});

class Quiz extends React.Component {
  state = {
    correctCount: 0,
    totalCount: this.props.route.params.questions.length,
    totalPlayer: this.props.inputs.array.length,
    activeQuestionIndex: 0,
    activePlayerIndex: 0,
    answered: false,
    answerCorrect: false
  };

  // ... (votre logique answer et nextQuestion reste identique)
  answer = (answer) => {
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
      let nextPlayerIndex = state.activePlayerIndex + 1;
      let nextIndex = state.activeQuestionIndex;
      if (nextPlayerIndex >= state.totalPlayer) {
        nextPlayerIndex = 0;
        nextIndex = state.activeQuestionIndex + 1;
      }
      if (nextIndex >= state.totalCount) {
        return this.props.navigation.navigate("QuizResult", {
          title: "Résultat",
          result: state.correctCount
        });
      }
      return { activePlayerIndex: nextPlayerIndex, activeQuestionIndex: nextIndex, answered: false };
    });
  };

  render() {
    const { questions } = this.props.route.params;
    const question = questions[this.state.activeQuestionIndex];
    const players = this.props.inputs.array;
    const player = players[this.state.activePlayerIndex].text;
    const idplayer = players[this.state.activePlayerIndex].id;

    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <ImageBackground source={courtBackground} style={styles.backgroundImage}>
          <View style={styles.overlay}>
            <SafeAreaView style={styles.topSection}>
              
              {/* Titre Joueur identique à Participants */}
              <Text style={[styles.title, { color: '#FFFFFF', marginTop: 20 }]}>
                {player}
              </Text>
              
              <View style={styles.accentLine} />

              <View style={{ flex: 1, justifyContent: 'center', width: '100%' }}>
                {/* Question */}
                <Text style={[styles.subtitle, { marginBottom: 40, fontSize: 22 }]}>
                  {question.question}
                </Text>

                {/* BOUTONS IDENTIQUES À LA PAGE PRÉCÉDENTE */}
{/* Conteneur des boutons alignés horizontalement */}
<View style={{ 
    flexDirection: 'row', 
    justifyContent: 'space-around', 
    width: '100%', 
    marginTop: 20 
}}>
  {question.answers.map(answer => (
    <TouchableOpacity 
      key={answer.id}
      
      style={[
        styles.button, 
        { 
          flex: 1,           // Les boutons prennent la même largeur
          marginHorizontal: 10, // Espace entre les deux boutons
          minWidth: 120      // Largeur minimale pour garder un beau rendu
        }
      ]}
      activeOpacity={0.8}
      onPress={() => {
        for (const [key, value] of Object.entries(answer)) {
          if (key !== 'id' && key !== 'text') {
            this.props.addInput(idplayer, key, value);
          }
        }
        this.answer(answer);
      }}
    >
      <Text style={styles.buttonText}>{answer.text.toUpperCase()}</Text>
    </TouchableOpacity>
  ))}
</View>
              </View>

            </SafeAreaView>
          </View>
        </ImageBackground>

        <Alert
          correct={this.state.answerCorrect}
          visible={this.state.answered}
        />
      </View>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);