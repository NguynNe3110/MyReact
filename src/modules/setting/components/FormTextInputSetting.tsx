import { StyleSheet, View } from 'react-native';
import React from 'react';
import AppTextField from '../../../components/AppTextField';
import type { Profile } from '../../home/types';

type Props = {
  value: Profile;
  onChange: (profile: Profile) => void;
};

// Form nhận dữ liệu và báo thay đổi cho màn hình cha qua props.
const FormTextInputSetting = ({ value, onChange }: Props) => {
  return (
    <View style={styles.container}>
      <AppTextField
        label="Họ và tên"
        accessibilityLabel="Họ và tên"
        placeholder="Họ và tên"
        value={value.name}
        onChangeText={name => onChange({ ...value, name })}
        autoCapitalize="words"
      />

      <AppTextField
        label="Email"
        accessibilityLabel="Email"
        placeholder="Email"
        value={value.email}
        onChangeText={email => onChange({ ...value, email })}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />

      <AppTextField
        label="Số điện thoại"
        accessibilityLabel="Số điện thoại"
        placeholder="Số điện thoại"
        value={value.phone}
        onChangeText={phone => onChange({ ...value, phone })}
        keyboardType="phone-pad"
      />
    </View>
  );
};

export default FormTextInputSetting;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
  },
});
