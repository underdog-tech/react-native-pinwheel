/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text, TextInput, View, useWindowDimensions} from 'react-native';

type Props = {
  label: string;
  value: string;
  onChange: (text: string) => void;
};

const FieldView: React.FC<Props> = ({label, value, onChange}) => {
  const windowWidth = useWindowDimensions().width;
  return (
    <View style={{marginBottom: 8, width: windowWidth - 24}}>
      <Text style={{fontWeight: 'bold'}}>{label}</Text>
      <View style={{borderBottomWidth: 2}}>
        <TextInput
          onChangeText={text => onChange(text)}
          value={value}
        />
      </View>
    </View>
  );
};

export default FieldView;
