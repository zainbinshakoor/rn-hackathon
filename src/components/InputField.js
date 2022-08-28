import React from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';

export default function InputField({
  label,
  icon,
  labelValue,
  inputType,
  keyboardType,
  fieldButtonLabel,
  fieldButtonFunction,
  ...rest
}) {
  return (
    <View
      style={{
        flexDirection: 'row',
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        paddingBottom: 8,
        marginBottom: 25,
      }}>
      {icon}
      {inputType == 'password' ? (
        <TextInput
          value={labelValue}
          placeholder={label}
          keyboardType={keyboardType}
          style={{ flex: 1, paddingVertical: 0 }}
          secureTextEntry={true}
          {...rest}
        />
      ) : (
        <TextInput
          value={labelValue}
          placeholder={label}
          keyboardType={keyboardType}
          style={{ flex: 1, paddingVertical: 0 }}
          secureTextEntry={false}

          {...rest}
        />
      )}
      <TouchableOpacity onPress={fieldButtonFunction}>
        <Text style={{ color: '#AD40AF', fontWeight: '700' }}>{fieldButtonLabel}</Text>
      </TouchableOpacity>
    </View>
  );
}