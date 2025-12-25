
/* Utils */
import React from "react";
import { Dimensions, SafeAreaView, Image, StyleSheet, StatusBar, Text} from "react-native";
import { View } from "react-native";
import { moderateScale, verticalScale } from "react-native-size-matters";
import { Button } from "../components/Button";

const styles = StyleSheet.create({
    container: {
      backgroundColor: "#36B1F0",
      flex: 1,
      paddingBottom : 10,
      justifyContent : "center",
      alignItems : "center",

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
      fontSize: 28,
      textAlign: "center",
      letterSpacing: -0.02,
      fontWeight: "600",
      paddingBottom : 20
    },
    safearea: {
      flex: 1,
      justifyContent: "space-between",
      alignItems : "center",
    }
  });
  

  
  
  class Rules extends React.Component {
  
    constructor (props) {
      super(props)
  
    }
     
    render() {

    
  
      return (
        <View
          style={styles.container}
        >
          <StatusBar barStyle="light-content" />
          <SafeAreaView style={styles.safearea}>




          <Text style={styles.title} marginBottom="m" textAlign="center">
            Les règles :
          </Text>

          <Text
          style={styles.text} 
          >
            La règle du 'Pour ou Contre' est simple : vous devez répondre tour par tour à une série de questions, en répondant à l'affirmative ou à la négative.
            </Text>

            <Text
          style={styles.text} 
          >
            Il est néanmoins formellement interdit de débattre sur chacune des questions et défendre sa réponse ou la nuancer.
            </Text> 
            <Text
          style={styles.text} 
          >
            Il n'y a pas de demi-mesure, vous êtes pour ou contre. Pas de place pour les votants de l'UDF.
            Assumez votre choix dans le silence et ne commentez pas le choix des autres. 
            Vivez pleinement votre : gauchisme, faschsime, extrémisme, complotisme, communisme, libéralisme, royalisme, intégrisme ou souverainisme. 
          </Text>
          <Button
                        
                        text="   Jouer   "
                        onPress={() => this.props.navigation.navigate('Mainscreen')}
                  />


         </SafeAreaView>
         </View>
        );
};
}

export default Rules


