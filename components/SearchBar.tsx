import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import {
  NativeSyntheticEvent,
  TextInput,
  TextInputSubmitEditingEventData,
  View,
} from "react-native";

type PropsType = {
  onPress?: () => void;
  placeholder: string;
  value?: string;
  onChangeText?: (text: string) => void;
  onSubmitEditing?: (
    e: NativeSyntheticEvent<TextInputSubmitEditingEventData>
  ) => void;
};

const SearchBar = ({
  onPress,
  placeholder,
  value,
  onChangeText,
  onSubmitEditing,
}: PropsType) => {
  return (
    <View className="flex-row items-center bg-color1 rounded-xl px-4 py-3">
      <FontAwesome name="search" color="#e6e6e6" size={15} />
      <TextInput
        onPress={onPress}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        onSubmitEditing={onSubmitEditing}
        placeholderTextColor="#e6e6e6"
        className={`flex-1 ml-3 text-white font-dmBold text-lg ${
          value !== "" && "mb-2"
        } items-center justify-center tracking-wide`}
        selectionColor="#e6e6e6"
      />
    </View>
  );
};

export default SearchBar;
