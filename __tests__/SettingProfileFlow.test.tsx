import React from 'react';
import ReactTestRenderer, { act } from 'react-test-renderer';
import { TextInput } from 'react-native';
import ItemList from '../src/components/ItemList';
import { RouteName } from '../src/config/navigation';
import type { Profile } from '../src/modules/user/types';
import InfoSelfScreen from '../src/modules/infoself/screens/InfoSelfScreen';
import SettingScreen from '../src/modules/setting/screens/SettingScreen';

const mockNavigate = jest.fn();
const mockRoute = {
  params: { profile: { name: '', email: '', phone: '' } as Profile },
};

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({ navigate: mockNavigate }),
  useRoute: () => mockRoute,
}));

jest.mock('react-native-safe-area-context', () => ({
  SafeAreaView: require('react-native').View,
}));

jest.mock('../src/assets/icons', () => ({
  IcChevronRight: () => null,
  IcUser: () => null,
}));

test('passes entered profile to InfoSelf and fills its editable fields', async () => {
  let setting!: ReactTestRenderer.ReactTestRenderer;
  let infoSelf!: ReactTestRenderer.ReactTestRenderer;
  const profile: Profile = {
    name: 'Nguyễn Văn An',
    email: 'an@example.com',
    phone: '0901234567',
  };

  await act(() => {
    setting = ReactTestRenderer.create(<SettingScreen />);
  });
  expect(mockNavigate).not.toHaveBeenCalled();

  // Enter each field separately, as the user would, preserving previous fields.
  for (const [index, value] of Object.values(profile).entries()) {
    await act(() => {
      setting.root.findAllByType(TextInput)[index].props.onChangeText(value);
    });
  }

  await act(() => {
    setting.root.findByType(ItemList).props.onPress();
  });
  expect(mockNavigate).toHaveBeenCalledTimes(1);
  expect(mockNavigate).toHaveBeenLastCalledWith(RouteName.InfoSelf, {
    profile,
  });

  mockRoute.params = mockNavigate.mock.calls[0][1];
  await act(() => {
    infoSelf = ReactTestRenderer.create(<InfoSelfScreen />);
  });
  expect(
    infoSelf.root.findAllByType(TextInput).map(input => input.props.value),
  ).toEqual([profile.name, profile.email, profile.phone]);

  await act(() => {
    infoSelf.root
      .findAllByType(TextInput)[0]
      .props.onChangeText('Tên đang sửa');
  });
  expect(infoSelf.root.findAllByType(TextInput)[0].props.value).toBe(
    'Tên đang sửa',
  );
  expect(setting.root.findAllByType(TextInput)[0].props.value).toBe(
    profile.name,
  );

  // Returning to Setting, changing a value, and reopening sends fresh data.
  await act(() => {
    infoSelf.unmount();
    setting.root
      .findAllByType(TextInput)[0]
      .props.onChangeText('Nguyễn Văn Bình');
  });
  await act(() => {
    setting.root.findByType(ItemList).props.onPress();
  });
  expect(mockNavigate).toHaveBeenLastCalledWith(RouteName.InfoSelf, {
    profile: { ...profile, name: 'Nguyễn Văn Bình' },
  });
  mockRoute.params = mockNavigate.mock.calls[1][1];
  await act(() => {
    infoSelf = ReactTestRenderer.create(<InfoSelfScreen />);
  });
  expect(infoSelf.root.findAllByType(TextInput)[0].props.value).toBe(
    'Nguyễn Văn Bình',
  );

  await act(() => {
    setting.unmount();
    infoSelf.unmount();
  });
});
