import { icons } from "@/constants/icons";
import React from "react";
import { Image, TextInput, View } from "react-native";

type PropsType = {
  onPress?: () => void;
  placeholder: string;
  value?: string;
  onChangeText?: (text: string) => void;
};

const SearchBar = ({
  onPress,
  placeholder,
  value,
  onChangeText,
}: PropsType) => {
  return (
    <View className="flex-row items-center bg-color1 rounded-xl px-5 py-4">
      <Image
        source={icons.search}
        className="size-5"
        resizeMode="contain"
        tintColor="#e6e6e6"
      />
      <TextInput
        onPress={onPress}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor="#e6e6e6"
        className="flex-1 ml-3 text-white font-dm"
      />
    </View>
  );
};

export default SearchBar;
