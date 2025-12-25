import React from "react";
import { View,Text,StyleSheet,ScrollView,SafeAreaView,Image } from "react-native";
import { ListItem} from 'react-native-elements'
import { Button } from "../components/Button";
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';




const styles = StyleSheet.create({
      container: {
        backgroundColor: "#36B1F0",
        paddingHorizontal: 20,
        paddingBottom : 10
      },
      safearea: {
        flex: 1,
        justifyContent: "space-between",
        backgroundColor: "#36B1F0",
      },
      text: {
        color: "#B3B5B4",
        fontSize: 15,
        textAlign: "center",
        letterSpacing: -0.02,
        fontWeight: "600"
      },
      result: {
            color: "#fff",
            fontSize: 30,
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
    });

const mapStateToProps = state => {
      return {
        inputs: state.inputs
      }
    }

class QuizResult extends React.Component {

      constructor (props) {
        super(props)
    
      }

      score=(theme,score)=> {
            if (theme != "id" & theme != "text" & theme != "validity" ){

            return <Text style={styles.text} key={theme}>{theme + ' : ' + Math.round(score * 100)/100}</Text>}
      };

      score_player=(player)=> {

        var Wokisme = player['Wokisme'];
        var Liberalisme = player['Liberalisme'];
        var Nationalisme = player['Nationalisme'];
        var Boboisme = player['Boboisme'];


        var max = Math.max(Wokisme, Liberalisme, Nationalisme,Boboisme);

        if(Wokisme == max)

        {return <Text style={styles.text} >{'Bravo tu es tout à fait woke. Les zones en non-mixité n\'on aucun secret pour toi et tu as conservé ton abonnement à Rue 89. Quel dommage que Sandrine Rousseau ne se présente pas.' }</Text>}

        if(Liberalisme == max)

        {return <Text style={styles.text} >{'Bravo tu as compris que la main invisible est plus efficace que tous les gouvernements réunis. Tu n\' est pas bourgeois, car tu sais que ton salaire ruissellera sur les prolétaires. Tu as déjà acheté le champagne pour la réélection de Macron.' }</Text>}

        if(Nationalisme == max)

        {return <Text style={styles.text} >{'Les mauvaises langues diront que tu es fasciste, alors qu\'en réalité tu n\'as rien contre les étrangers lorsqu\' ils ne sont pas en France. Tu ne sais pas s\' il faut voter extrême droite ou gauche, alors tu espères que Asselineau ne sera pas en prison en avril' }</Text>}
        if(Boboisme == max)

        {return <Text style={styles.text} >{'Tu vas sauver la planète à coup de salade au quinoa et de post sur Linkedin. Dommage que ton Iphone ne fonctionnera plus quand toutes les centrales seront fermées. Tu hésites entre Jadot et Hidalgo, tu as déjà écrit tes story pour leur défaite' }</Text>}

  };

  icone=(player)=> {

    var Wokisme = player['Wokisme'];
    var Liberalisme = player['Liberalisme'];
    var Nationalisme = player['Nationalisme'];
    var Boboisme = player['Boboisme'];


    var max = Math.max(Wokisme, Liberalisme, Nationalisme,Boboisme);

    if(Wokisme == max)

    {return <Icon name='bell-ring' size = {27} />}

    if(Liberalisme == max)
    {return <Icon name='currency-eur' size = {27}/>}

    if(Nationalisme == max)

    {return <Icon name='baguette' size = {27}/>}

     if(Boboisme == max)

    {return <Icon name='earth-off' size = {27} />}
};


  



   

      render() {
            const players = this.props.inputs.array;


            return(
              <SafeAreaView style={styles.safearea}>
              <ScrollView contentContainerStyle = { styles.container }>

                  <Text style={styles.result}>Résultat :</Text>
                  {
                  players.map((player) => (
                    <ListItem key={player.id} bottomDivider>
                        {this.icone(player)}
                    
                      <ListItem.Content>
                        <ListItem.Title>{player.text}</ListItem.Title>
                        
                        {this.score_player(player)}

                      </ListItem.Content>
                      <ListItem.Chevron />
                    </ListItem>
                  ))
                }


                 <View style ={{ alignItems: 'center'}}>
                  <Button
                              
                              text="Retour"
                              onPress={() => this.props.navigation.navigate('Mainscreen')}
                        />
                    </View>
      </ScrollView>
      </SafeAreaView>
            );
            }
            }

export default connect(mapStateToProps,)(QuizResult)
