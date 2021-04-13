import React from 'react'
import { View, ImageBackground, StyleSheet, KeyboardAvoidingView } from 'react-native'
import { theme } from '../core/theme'
import Constants from "expo-constants"

const Background = ({ children }) => (
  <View style={styles.background}>
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      {children}
    </KeyboardAvoidingView>
  </View>
)

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    backgroundColor: theme.colors.surface,
    paddingTop: Constants.statusBarHeight + 20,
  },
  container: {
    flex: 1,
    width: '100%',
    alignSelf: 'center',
    //alignItems: 'center',
    // paddingLeft: 20,
    // paddingRight: 20
    // =justifyContent: 'center',
  }
})

export default Background
