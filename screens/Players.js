import * as React from 'react'
import { 
  ScrollView, 
  SafeAreaView, 
  ImageBackground, 
  View, 
  TouchableOpacity, 
  StatusBar 
} from 'react-native'
import { Text, Slider } from 'react-native-elements' // Ajout du Slider ici
import { connect } from 'react-redux'
import * as Shortid from 'shortid'
import { mutateInput } from '../redux/ActionCreators'
import { styles } from '../styles/Styles'
import TextInput from '../components/TextInputComponent'
import Question1 from "../data/liste1";

const courtBackground = require("../assets/tribunal_bg.png"); 

const mapStateToProps = state => ({
  inputs: state.inputs
})

const mapDispatchToProps = (dispatch) => ({
  mutateInput: (identifier, text, validity) => dispatch(
    mutateInput(identifier, text, validity)
  )
})

function getRandom(arr, n) {
  var result = new Array(n),
      len = arr.length,
      taken = new Array(len);
  if (n > len)
      throw new RangeError("getRandom: more elements taken than available");
  while (n--) {
      var x = Math.floor(Math.random() * len);
      result[n] = arr[x in taken ? taken[x] : x];
      taken[x] = --len in taken ? taken[len] : len;
  }
  return result;
}

class Main extends React.Component {
  // Initialisation du state avec 12 questions par défaut
  state = {
    questionCount: 12
  };

  componentDidMount () {
    if (this.props.inputs.array.length === 0) {
      this.props.mutateInput(Shortid.generate(), '', false)
    }
  }

  render () {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <ImageBackground source={courtBackground} style={styles.backgroundImage}>
          <View style={styles.overlay}>
            <SafeAreaView style={{ flex: 1, width: '100%' }}>
              
              <Text h4 style={[styles.title, { color: '#FFFFFF', marginTop: 20 }]}>
                Participants
              </Text>

              <ScrollView 
                showsVerticalScrollIndicator={false}
                style={{ flex: 1, width: '100%' }}
                contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 40 }}
              >
                {
                  this.props.inputs.array.map(
                    input => <TextInput
                      key={input.id.toString()}
                      value={input.id}
                    />
                  )
                }

                {/* --- SECTION SLIDER --- */}
                <View style={{ marginTop: 40, width: '100%', paddingHorizontal: 10 }}>
                  <Text style={{ color: '#FFFFFF', textAlign: 'center', fontWeight: '600', fontSize: 18 }}>
                    Nombre de questions : {this.state.questionCount}
                  </Text>
                  <Slider
                    value={this.state.questionCount}
                    onValueChange={(value) => this.setState({ questionCount: value })}
                    maximumValue={30} // Ajuste selon ton nombre total de questions
                    minimumValue={1}
                    step={1}
                    allowTouchTrack
                    trackStyle={{ height: 4, backgroundColor: 'transparent' }}
                    thumbStyle={{ height: 20, width: 20, backgroundColor: '#FFFFFF' }}
                    minimumTrackTintColor="#FFFFFF"
                    maximumTrackTintColor="rgba(255, 255, 255, 0.3)"
                  />
                </View>

                {/* Bouton Suivant utilisant la valeur du slider */}
                <View style={{ marginTop: 30, width: '100%', alignItems: 'center' }}>
                  <TouchableOpacity 
                    style={styles.button}
                    activeOpacity={0.8}
                    onPress={() => {
                      this.props.navigation.navigate("Quiz", {
                        title: "Questions",
                        // On utilise this.state.questionCount ici :
                        questions: getRandom(Question1, this.state.questionCount),
                        color: "#36b1f0" 
                      })
                    }}
                  >
                    <Text style={styles.buttonText}>SUIVANT</Text>
                  </TouchableOpacity>
                </View>

              </ScrollView>
            </SafeAreaView>
          </View>
        </ImageBackground>
      </View>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main)