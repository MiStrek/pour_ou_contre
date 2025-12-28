import React from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  SafeAreaView, 
  ImageBackground, 
  StatusBar, 
  TouchableOpacity 
} from "react-native";
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { styles as globalStyles } from "../styles/Styles";

const courtBackground = require("../assets/tribunal_bg.png");

const localStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  playerName: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 5,
  },
  description: {
    color: "#e0e0e0",
    fontSize: 14,
    lineHeight: 20,
    fontStyle: 'italic'
  },
  headerTitle: {
    color: "#fff",
    fontSize: 32,
    textAlign: "center",
    fontWeight: "700",
    marginTop: 40,
    marginBottom: 10,
  }
});

const mapStateToProps = state => ({
  inputs: state.inputs
});

class QuizResult extends React.Component {

  score_player = (player) => {
    const { Wokisme, Liberalisme, Nationalisme, Boboisme } = player;
    const max = Math.max(Wokisme, Liberalisme, Nationalisme, Boboisme);

    if (Wokisme === max) return "Bravo tu es tout à fait woke. Les zones en non-mixité n'ont aucun secret pour toi. Quel dommage que Sandrine Rousseau ne se présente pas.";
    if (Liberalisme === max) return "La main invisible est ton guide. Tu sais que ton salaire ruissellera sur les prolétaires. Le champagne est déjà au frais.";
    if (Nationalisme === max) return "Tu n'as rien contre les étrangers... quand ils ne sont pas en France. Tu espères qu'Asselineau sera libre en avril.";
    if (Boboisme === max) return "Tu sauves la planète à coup de quinoa et de posts LinkedIn. Tu hésites entre Jadot et Hidalgo pour ta story de défaite.";
    return "";
  };

  getIconName = (player) => {
    const { Wokisme, Liberalisme, Nationalisme, Boboisme } = player;
    const max = Math.max(Wokisme, Liberalisme, Nationalisme, Boboisme);
    if (Wokisme === max) return 'bell-ring';
    if (Liberalisme === max) return 'currency-eur';
    if (Nationalisme === max) return 'baguette';
    if (Boboisme === max) return 'earth-off';
    return 'account';
  };

  render() {
    const players = this.props.inputs.array;

    return (
      <View style={localStyles.container}>
        <StatusBar barStyle="light-content" />
        <ImageBackground source={courtBackground} style={{ flex: 1 }}>
          <View style={localStyles.overlay}>
            <SafeAreaView style={{ flex: 1 }}>
              
              <Text style={localStyles.headerTitle}>Verdict</Text>
              <View style={[globalStyles.accentLine, { alignSelf: 'center', marginBottom: 30 }]} />

              <ScrollView showsVerticalScrollIndicator={false}>
                {players.map((player) => (
                  <View key={player.id} style={localStyles.card}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                      <Icon 
                        name={this.getIconName(player)} 
                        size={30} 
                        color="#fff" 
                        style={{ marginRight: 15 }}
                      />
                      <Text style={localStyles.playerName}>{player.text || "Anonyme"}</Text>
                    </View>
                    
                    <Text style={localStyles.description}>
                      {this.score_player(player)}
                    </Text>
                  </View>
                ))}

                <View style={{ alignItems: 'center', marginTop: 20, marginBottom: 40 }}>
                  <TouchableOpacity 
                    style={globalStyles.button}
                    onPress={() => this.props.navigation.navigate('Mainscreen')}
                  >
                    <Text style={globalStyles.buttonText}>RETOUR AU MENU</Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
              
            </SafeAreaView>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

export default connect(mapStateToProps)(QuizResult);