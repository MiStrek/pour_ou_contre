import React from "react";
import { 
  View, 
  Text, 
  SafeAreaView, 
  Image, 
  ImageBackground, 
  StatusBar, 
  TouchableOpacity 
} from "react-native";
import { styles, colors } from "../styles/Styles"; // Import du fichier ci-dessus

// Remplace par tes propres chemins d'assets
const welcomeLogo = require("../assets/welcome.png");
const courtBackground = require("../assets/tribunal_bg.png"); 

const Welcome = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      <ImageBackground 
        source={courtBackground} 
        style={styles.backgroundImage}
        blurRadius={0} // Effet de flou sur le tribunal révolutionnaire
      >
        <View style={styles.overlay}>
          <SafeAreaView style={styles.topSection}>
            <Image
              source={welcomeLogo}
              style={styles.logo}
              resizeMode="contain"
            />
            <Text style={styles.title}>Pour ou Contre</Text>
            <View style={styles.accentLine} />
            <Text style={styles.subtitle}>
              L'application qui va vous cliver
            </Text>
          </SafeAreaView>

          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              style={styles.button}
              activeOpacity={0.8}
              onPress={() => navigation.navigate('Rules')}
            >
              <Text style={styles.buttonText}>COMMENCER L'AVENTURE</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default Welcome;