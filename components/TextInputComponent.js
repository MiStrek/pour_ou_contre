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
    return !!time; // Plus concis que le if/else
  }

  render () {
    const length = this.props.inputs.array.length
    const valid = 'VALIDE'
    const invalid = 'Entrez un nom'
    
    const inputTextStyle = { color: '#FFFFFF', fontSize: 18 };
    const iconColor = '#FFFFFF';

    // On récupère les données de ce participant précis depuis Redux
    const currentInput = this.props.inputs.array.find(input => input.id === this.state.identifier);

    return (
      <View key={this.state.identifier} style={[styles.row, { width: '100%' }]}>
        <Input
          autoCorrect={false}
          

          value={currentInput ? currentInput.text : ''} 

          
          inputStyle={inputTextStyle}
          inputContainerStyle={{ borderBottomColor: '#FFFFFF' }}
          errorMessage={currentInput?.validity ? valid : invalid}
          errorStyle={currentInput?.validity ? styles.transparent : styles.error}
          
          onChangeText={text => {
            const isValid = this.validate(text)
            this.props.mutateInput(this.state.identifier, text, isValid)
          }}
          
          placeholder='Nom du participant'
          placeholderTextColor='rgba(255, 255, 255, 0.5)'
          
          rightIcon={
            <MaterialIcons
              color={iconColor}
              name={
                length > 1 && this.props.inputs.array[length - 1].id !== this.state.identifier 
                ? 'remove-circle' 
                : 'add-circle'
              }
              onPress={() => {
                if (length > 1 && this.props.inputs.array[length - 1].id !== this.state.identifier) {
                  this.props.removeInput(this.state.identifier)
                } else {
                  this.props.mutateInput(Shortid.generate(), '', false)
                }
              }}
              size={35}
            />
          }
        />
      </View>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TextInput)