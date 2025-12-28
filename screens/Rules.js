import React from "react";
import { 
  View, 
  Text, 
  SafeAreaView, 
  Image, 
  ImageBackground, 
  StatusBar, 
  TouchableOpacity,
  ScrollView 
} from "react-native";
import { styles } from "../styles/Styles"; 

const welcomeLogo = require("../assets/welcome.png");
const courtBackground = require("../assets/tribunal_bg.png"); 

const Rules = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      <ImageBackground source={courtBackground} style={styles.backgroundImage}>
        <View style={styles.overlay}>
          <SafeAreaView style={styles.topSection}>
            <Image source={welcomeLogo} style={styles.logo} resizeMode="contain" />
            
            <Text style={styles.title}>Les Règles</Text>
            <View style={styles.accentLine} />
            
            {/* On réduit l'espace ici en utilisant un marginTop contrôlé */}
            <View style={{ marginTop: 30, paddingHorizontal: 10 }}>
              <Text style={styles.subtitle}>
                • Répondez par "Pour" ou "Contre".
              </Text>
              <Text style={[styles.subtitle, { marginTop: 10 }]}>
                • Interdiction de débattre.
              </Text>
              <Text style={[styles.subtitle, { marginTop: 10 }]}>
                • Assumez votre choix en silence.
              </Text>
            </View>

            {/* Bouton remonté : on le met juste après le texte au lieu de tout en bas */}
            <View style={{ marginTop: 40, alignItems: 'center', width: '100%' }}>
              <TouchableOpacity 
                style={styles.button}
                activeOpacity={0.8}
                onPress={() => navigation.navigate('Mainscreen')}
              >
                <Text style={styles.buttonText}>JOUER</Text>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </View>
      </ImageBackground>
    </View>
  );
};

export default Rules;