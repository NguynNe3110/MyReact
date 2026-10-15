import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from 'react-native';
import React from 'react';

type TextFieldProps = TextInputProps & {
  label?: string;
  error?: string;
};

const AppTextField = ({ label, error, style, ...inputProps }: TextFieldProps) => {
  return (
    <View style={styles.container}>
      {label ? <Text style={styles.label}> {label} </Text> : null}
      <TextInput
        placeholderTextColor="#888"
        {...inputProps}
        style={[styles.input, error ? styles.inputError : null, style]}
      />

      {error ? <Text style={styles.error}> {error} </Text> : null}
    </View>
  );
};

export default AppTextField;

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    marginBottom: 6,
    fontSize: 14,
    fontWeight: '600',
    color: '#222',
  },
  input: {
    minHeight: 48,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    color: '#222',
    backgroundColor: '#fff',
  },
  inputError: {
    borderColor: '#d32f2f',
  },
  error: {
    marginTop: 4,
    fontSize: 12,
    color: '#d32f2f',
  },
});
