import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'

const HomeScreen = () => {
  const [count, setCount] = useState(0);


  return (
    <View style= {styles.screenContainer}>
      <View style = {styles.header}>
        <Text style = {styles.title}> Màn hình HomeScreen</Text>
        <Text style = {styles.subtitle}>File: src/screens/homescreen.tsx</Text> 
      </View>
        
      <View style = {styles.card}>
        <Text style = {styles.cardLabel}> Số lần bạn đã chạm: </Text>
        <Text style = {styles.counterText}>{count}</Text> 
      

      <TouchableOpacity 
        style = {styles.button}
        activeOpacity={0.7}
        onPress = {() => setCount(count + 1)}>
        <Text style={styles.buttonText}>Bấm để + 1</Text>
      </TouchableOpacity>

      {count > 0 && (
        <TouchableOpacity
          style= {styles.resetButton}
          onPress = {() => setCount(0)}>
            <Text style= {styles.resetButtonText}>đặt lại</Text>
        </TouchableOpacity>
      )}


      </View>

    </View>
  );
}

export default HomeScreen

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1, // chiem toan bo man hinh
    width: '100%',
    paddingHorizontal: 20, 
    justifyContent: 'center', // can giua theo chieu doc
    alignItems: 'center', // can giua theo chieu ngang
    backgroundColor: 'white',  // mau nen
  
  }, 
  header: {
    alignItems: 'center', // can giua theo chieu ngang
    marginBottom: 28, 
  }, 
  title: {
    fontSize: 24, 
    fontWeight: '700', 
    color: '#0f172a', 
    marginBottom: 6,
  }, 
  subtitle: {
    fontSize: 14, 
    color: '#64748b',
  } , 
  // Thẻ Card màu trắng
  card: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    // Đổ bóng trên iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    // Đổ bóng trên Android
    elevation: 3,
  },
  cardLabel: {
    fontSize: 15,
    color: '#475569',
    fontWeight: '500',
  },
  counterText: {
    fontSize: 48,
    fontWeight: '800',
    color: '#2563eb',          // Màu xanh dương chủ đạo
    marginVertical: 12,
  },
  // Nút bấm chính
  button: {
    backgroundColor: '#2563eb',
    width: '100%',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  // Nút phụ Đặt lại
  resetButton: {
    marginTop: 12,
    paddingVertical: 6,
  },
  resetButtonText: {
    color: '#ef4444',          // Màu đỏ
    fontSize: 14,
    fontWeight: '500',
  },
})