/**
 * Text-input component for the project, Dynamic Text-Input for React Native,
 * that presents the text-input with an add or remove icon in the right-hand
 * side and validation of the text.
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
import { View } from 'react-native'
import { Input } from 'react-native-elements'
import { connect } from 'react-redux'
import { MaterialIcons } from '@expo/vector-icons'
import * as Shortid from 'shortid'
import { mutateInput, removeInput } from '../redux/ActionCreators'
import { colors, styles } from '../styles/Styles'

const mapStateToProps = state => {
  return {
    inputs: state.inputs
  }
}

const mapDispatchToProps = (dispatch) => (
  {
    mutateInput: (identifier, text, validity) => dispatch(
      mutateInput(identifier, text, validity)
    ),
    removeInput: (identifier) => dispatch(
      removeInput(identifier)
    )
  }
)

class TextInput extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      identifier: this.props.value
    }
  }

  validate (time) {
    if (!time) {
      return false
    } else {
      return true
    }
  }

  render () {
    const length = this.props.inputs.array.length
    const valid = 'VALIDE'
    const invalid = 'Entrez un nom'

    if (
      length > 1 &&
      this.props.inputs.array[length - 1].id === this.state.identifier
    ) {
      return (
        <View key = { this.state.identifier } style = { styles.row }>
          <Input
            autoCorrect = { false }
            errorMessage = {
              this.props.inputs.array.filter(
                input => input.id === this.state.identifier
              )[0].validity
                ? valid
                : invalid
            }
            errorStyle = {
              this.props.inputs.array.filter(
                input => input.id === this.state.identifier
              )[0].validity
                ? styles.transparent
                : styles.error
            }
            onChangeText = {
              text => {
                const isValid = this.validate(text)
                this.props.mutateInput(this.state.identifier, text, isValid)

              }
            }
            placeholder = 'Nom'
            placeholderTextColor='rgba(255, 255, 255, 0.5)'
            rightIcon = {
              <MaterialIcons
                color = { colors.dark }
                name = 'add-circle'
                onPress = {
                  () => this.props.mutateInput(Shortid.generate(), '', false)
                }
                size = { 30 }
              />
            }
          />
        </View>
      )
    } else if (length > 1) {
      return (
        <View key = { this.state.identifier } style = { styles.row }>
          <Input
            autoCorrect = { false }
            errorMessage = {
              this.props.inputs.array.filter(
                input => input.id === this.state.identifier
              )[0].validity
                ? valid
                : invalid
            }
            errorStyle = {
              this.props.inputs.array.filter(
                input => input.id === this.state.identifier
              )[0].validity
                ? styles.transparent
                : styles.error
            }
            onChangeText = {
              text => {
                const isValid = this.validate(text)
                this.props.mutateInput(this.state.identifier, text, isValid)

              }
            }
            placeholder = 'Nom'
            placeholderTextColor='rgba(255, 255, 255, 0.5)'
            rightIcon = {
              <MaterialIcons
                color = { colors.dark }
                name = 'remove-circle'
                onPress = {
                  () => this.props.removeInput(this.state.identifier)
                }
                size = { 30 }
              />
            }
          />
        </View>
      )
    } else {
      return (
        <View key = { this.state.identifier } style = { styles.row }>
          <Input
            autoCorrect = { false }
            errorMessage = {
              this.props.inputs.array.filter(
                input => input.id === this.state.identifier
              )[0].validity
                ? valid
                : invalid
            }
            errorStyle = {
              this.props.inputs.array.filter(
                input => input.id === this.state.identifier
              )[0].validity
                ? styles.transparent
                : styles.error
            }
            onChangeText = {
              text => {
                const isValid = this.validate(text)
                this.props.mutateInput(this.state.identifier, text, isValid)

              }
            }
            placeholder = 'Nom'
            placeholderTextColor='rgba(255, 255, 255, 0.5)'
            rightIcon = {
              <MaterialIcons
                color = { colors.dark }
                name = 'add-circle'
                onPress = {
                  () => this.props.mutateInput(Shortid.generate(), '', false)
                }
                size = { 30 }
              />
            }
          />
        </View>
      )
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TextInput)
