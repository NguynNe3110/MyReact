import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { AppColors } from '../../../theme/colors'

const PracticeScreen = () => {
  return (
    <View>
      <Text>PracticeScreen</Text>
    </View>
  )
}

export default PracticeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: AppColors.background,
      },
      center: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 12,
      },
      loadingText: {
        color: '#64748B',
      },
      list: {
        padding: 16,
      },
})