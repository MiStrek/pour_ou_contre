/**
 * Main component for the project, Dynamic Text-Input for React Native, that
 * presents the view inside of which the text-input components are presented.
 *
 * @author Michael David Gill <michaelgill1969@gmail.com>
 * @license
 * Copyright 2019 Michael David Gill
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License.  You may obtain a copy
 * of the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.  See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */

import * as React from 'react'
import { ScrollView,SafeAreaView } from 'react-native'
import { Button, Text } from 'react-native-elements'
import { connect } from 'react-redux'
import * as Shortid from 'shortid'
import { mutateInput } from '../redux/ActionCreators'
import { styles } from '../styles/Styles'
import TextInput from '../components/TextInputComponent'
import Question1 from "../data/liste1";


const mapStateToProps = state => {
  return {
    inputs: state.inputs
  }
}

const mapDispatchToProps = (dispatch) => (
  {
    mutateInput: (identifier, text, validity) => dispatch(
      mutateInput(identifier, text, validity)
    )
  }
)


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
  return result;}


class Main extends React.Component {
  componentDidMount () {
    this.props.mutateInput(Shortid.generate(), '', false)
  }

  render () {
    return (
      <SafeAreaView style={styles.safearea}>
      <ScrollView contentContainerStyle = { styles.container }>
        <Text h4 style = { styles.title }>Participants</Text>
        {
          this.props.inputs.array.map(
            input => <TextInput
              key = { input.id.toString() }
              value = { input.id }
            />
          )
        }
        <Button
          buttonStyle = { styles.button }
          onPress = {
            () => {
              console.log('LENGTH: ' + this.props.inputs.array.length)
              this.props.inputs.array.map(
                input => console.log(input)
              )       
              this.props.navigation.navigate("Quiz", {
                title: "Questions",
                questions: getRandom(Question1,12),
                color: "#36b1f0" } )
            }
          }
          title = 'Suivant'
        />
      </ScrollView>
      </SafeAreaView>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main)
