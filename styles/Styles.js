/**
 * React Native StyleSheet for the project, Dynamic Text-Input for React Native.
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

import { StyleSheet } from 'react-native'

export const colors = {
  dark: 'steelblue',
  error: 'firebrick',
  light: 'aliceblue',
  transparent: 'transparent'
}

export const styles = StyleSheet.create(
  {
    button: {
      backgroundColor: colors.dark,
      margin: 5
    },
    container: {
      alignItems: 'center',
      justifyContent: 'center'
    },
    error: {
      color: colors.error,
      fontSize: 12
    },
    row: {
      color: "#fff",
      alignItems: 'center',
      flexDirection: 'row',
      width: '90%'
    },
    title: {
      margin: 5
    },
    transparent: {
      color: colors.transparent,
      fontSize: 12
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
    fontSize: 25,
    textAlign: "center",
    letterSpacing: -0.02,
    fontWeight: "600"
  },
  safearea: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: "#36B1F0",
  }
  }
)
