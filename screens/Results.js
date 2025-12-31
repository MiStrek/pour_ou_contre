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
import ResultatsPhrases from "../data/results";
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
  themeTag: {
    color: "#ffd700", // Couleur or pour faire ressortir le thème
    fontSize: 14,
    fontWeight: "400",
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

  trouverMaxTheme = (themesRef, scoresImportes) => {
    const clesValides = Object.keys(themesRef);
    return clesValides.reduce((maxCle, cleActuelle) => {
      const scoreActuel = scoresImportes[cleActuelle] || 0;
      const scoreMax = scoresImportes[maxCle] || 0;
      return scoreActuel > scoreMax ? cleActuelle : maxCle;
    }, clesValides[0]);
  };
  
  score_player = (player) => {
    const max = this.trouverMaxTheme(ResultatsPhrases, player);
    return ResultatsPhrases[max];
  };

  getIconName = (player) => {
    const iconMap = {
      "Union Européenne": "eu-flag",
      "Egalité Hommes/Femmes": "gender-male-female",
      "Environnement": "leaf",
      "Alimentation": "food-apple",
      "Etats Unis": "google-maps",
      "Racisme": "account-group",
      "Cinéma": "movie-open",
      "Energie": "lightning-bolt",
      "Politique Industrielle": "factory",
      "Lutte des classes": "hand-fist",
      "Justice": "gavel",
      "Violences Policières": "shield-alert",
      "Salaires": "cash-multiple",
      "Religion": "church",
      "Inégalités sociales": "scale-unbalanced",
      "Finances": "chart-line",
      "Nucléaire": "atom",
      "Energies Renouvelables": "solar-power",
      "Histoire": "fountain-pen-tip",
      "Patrimoine": "castle",
      "Devoir de mémoire": "candle",
      "Musique": "music-note",
      "Ordre Moral": "incognito",
      "Sécularisation": "eye-off",
      "LGBTIQ+": "gender-transgender",
      "Politique Etrangère": "earth",
      "Enseignement": "school",
      "Internet": "web",
      "Démocratie": "vote",
      "Droits des minorités": "account-voice",
      "Interventionnisme": "crane",
      "Laisser-faire": "hand-pointing-right",
      "Libéralisme économique": "currency-eur",
      "Souverainisme": "flag-variant",
      "Mondialisation": "airplane-takeoff",
      "Libéralisation des moeurs": "human-female-boy",
      "Liberté d'expression": "bullhorn",
      "Education sexuelle": "book-open-variant",
      "Economie circulaire": "recycle",
      "Libertarisme": "snake",
      "Boboisme": "car-bicycle"
    };

    const max = this.trouverMaxTheme(ResultatsPhrases, player);
    return iconMap[max];
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
                {players.map((player) => {
                  // On calcule le thème gagnant pour l'afficher à côté du nom
                  const winningTheme = this.trouverMaxTheme(ResultatsPhrases, player);
                  
                  return (
                    <View key={player.id} style={localStyles.card}>
                      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                        <Icon 
                          name={this.getIconName(player)} 
                          size={30} 
                          color="#fff" 
                          style={{ marginRight: 15 }}
                        />
                        <View>
                          <Text style={localStyles.playerName}>{player.text || "Anonyme"}</Text>
                          <Text style={localStyles.themeTag}>Profil : {winningTheme}</Text>
                        </View>
                      </View>
                      
                      <Text style={localStyles.description}>
                        {this.score_player(player)}
                      </Text>
                    </View>
                  );
                })}

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