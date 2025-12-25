
export const welcomeAssets = require("../assets/welcome.png")

/* Utils */
import React from "react";
import { Dimensions, SafeAreaView, Image, StyleSheet, StatusBar, Text} from "react-native";
import { View } from "react-native";
import { moderateScale, verticalScale } from "react-native-size-matters";
import { Button } from "../components/Button";

const { height, width } = Dimensions.get("window");

const styles = StyleSheet.create({
    container: {
      backgroundColor: "#36B1F0",
      flex: 1,
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
      fontSize: 28,
      textAlign: "center",
      letterSpacing: -0.02,
      fontWeight: "600",
      paddingBottom : 20
    },
    safearea: {
      flex: 1,
      justifyContent: "space-between"
    }
  });
  

  
  
  class Welcome extends React.Component {
  
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

          <View flex={1} backgroundColor="white" justifyContent="flex-start">
            <View height={height * 0.5} justifyContent="center" alignItems="center">

            <Image
              source={welcomeAssets}
              style={{ flex: 1,
                width: 200,
                height: 200}}
              resizeMode="contain"
            />

            </View>
            <View
          style={{
            backgroundColor: "#36B1F0",
            height: 500 + height,
            width: width * 2,
            borderRadius: 1000,
            position: "absolute",
            alignSelf: "center",
            top: 0.52 * height,
          }}
        />
       <View
          style={{
            height: height * 0.35,
            width: width,
            position: "absolute",
            bottom: 0,
            alignSelf: "center",
            padding: 20,
            alignItems: "center",
          }}
        >
          <Text style={styles.title} marginBottom="m" textAlign="center">
            Pour ou Contre
          </Text>

          <Text
          style={styles.text} 
            color="white"
            textAlign="center"
            marginBottom="m"
          >
            L'application qui va vous cliver
          </Text>
          <Button
                        
                        text="Start"
                        onPress={() => this.props.navigation.navigate('Rules')}
                  />


        </View>

         </View>
         </SafeAreaView>
         </View>
        );
};
}

export default Welcome


