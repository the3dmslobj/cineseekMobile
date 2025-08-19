import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import {
  NativeSyntheticEvent,
  TextInput,
  TextInputSubmitEditingEventData,
  TouchableOpacity,
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
  resetSearch?: () => void;
};

const SearchBar = ({
  onPress,
  placeholder,
  value,
  onChangeText,
  onSubmitEditing,
  resetSearch,
}: PropsType) => {
  return (
    <View className="flex-row items-center bg-color1 rounded-xl px-4 py-3">
      <FontAwesome name="search" color="#e6e6e6" size={17} />
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
      {value && (
        <TouchableOpacity onPress={resetSearch}>
          <FontAwesome name="times-circle" color="#e6e6e6" size={25} />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default SearchBar;
