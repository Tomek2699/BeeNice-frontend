import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

type MyComponentProps = {
    text: string,
    handleOnPress: () => void;
    otherStyles: string,
  };

const LinkButton = ({ text, handleOnPress, otherStyles }: MyComponentProps) => {
  return (
    <TouchableOpacity onPress={handleOnPress}>
      <Text className={`${otherStyles}`}>{text}</Text>
    </TouchableOpacity>
  );
};

export default LinkButton;