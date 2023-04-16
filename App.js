import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Route from './route'
import { AuthProvider } from './context/AuthContext'
const App = () => {
  return (
    <AuthProvider>
      <Route/>
    </AuthProvider>
  )
}

export default App

const styles = StyleSheet.create({

})