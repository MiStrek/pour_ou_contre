/**
 * Redux action-creators for the project, Dynamic Text-Input for React Native.
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

import * as ActionTypes from './ActionTypes'

/**
 * Mutate an input in the inputs array if it exists or add it if it does not
 * exist.
 * @param  {String}   id        Unique identifier for input.
 * @param  {String}   text      Text entered into input.
 * @param  {Boolean}  validity  Is the text valid?
 * @return {Array}              Array of input objects.
 */
export const mutateInput = (id, text, validity) => (dispatch, getState) => {
  try {
    const input = {
      id: id,
      text: text,
      validity: validity
    }

    const index = getState().inputs.array.findIndex(input => input.id === id)

    if (getState().inputs.array != null && index === -1) {
      dispatch(
        mutateInputs(
          [
            ...getState().inputs.array.filter(input => input.id !== id),
            input
          ]
        )
      )
    } else if (getState().inputs.array != null && index !== -1) {
      dispatch(
        mutateInputs(
          [
            ...getState().inputs.array.slice(0, index),
            input,
            ...getState().inputs.array.slice(index + 1)
          ]
        )
      )
    } else {
      if (getState().inputs.array == null) {
        throw new Error('Input array is null or undefined.')
      } else {
        throw new Error('Error encountered at line 35 of ActionCreators.js')
      }
    }
  } catch (error) {
    dispatch(mutateInputsRejectedAction(error))
  }
}

/**
 * add an score in the inputs array if it exists or add it if it does not
 * exist.
 * @param  {String}   id        Unique identifier for input.
 * @param  {String}   theme     Theme entered into input.
 * @param  {int}      score     Is the associated score.
 * @return {Array}              Array of input objects.
 */
 export const addInput = (id, theme, score) => (dispatch, getState) => {
  try {

    let param = theme

    const index = getState().inputs.array.findIndex(input => input.id === id)

    const new_score = (getState().inputs.array[index][param] + score) || score

    console.log('valeur: ' + getState().inputs.array[index][param])

    const input = {
      ...getState().inputs.array[index],
      [param]: new_score
    }

    

    if (getState().inputs.array != null && index === -1) {
      dispatch(
        mutateInputs(
          [
            ...getState().inputs.array.filter(input => input.id !== id),
            input
          ]
        )
      )
    } else if (getState().inputs.array != null && index !== -1) {
      dispatch(
        mutateInputs(
          [
            ...getState().inputs.array.slice(0, index),
            input,
            ...getState().inputs.array.slice(index + 1)
          ]
        )
      )
    } else {
      if (getState().inputs.array == null) {
        throw new Error('Input array is null or undefined.')
      } else {
        throw new Error('Error encountered at line 35 of ActionCreators.js')
      }
    }
  } catch (error) {
    dispatch(mutateInputsRejectedAction(error))
  }
}


/**
 * Remove an input in the inputs array.
 * @param  {String} id  Unique identifier for input.
 * @return {Array}      Array of input objects.
 */
export const removeInput = (id) => (dispatch, getState) => {
  try {
    dispatch(
      mutateInputs(getState().inputs.array.filter(input => input.id !== id))
    )
  } catch (error) {
    dispatch(mutateInputsRejectedAction(error))
  }
}

/**
 * Initiate an action to set the inputs array.
 * @param  {Array} inputs Array of input objects.
 */
export const mutateInputs = (inputs) => (
  {
    type: ActionTypes.MUTATE_INPUTS_FULFILLED,
    payload: inputs
  }
)

/**
 * Initiate an error indicating that mutation of the inputs array failed.
 * @param  {Error} error Error describing the input-mutation failure.
 */
export const mutateInputsRejectedAction = (error) => (
  {
    type: ActionTypes.MUTATE_INPUTS_REJECTED,
    payload: error
  }
)
