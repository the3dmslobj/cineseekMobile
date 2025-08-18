import { FontAwesome } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

const TabIcon = ({ focused, icon, title }: any) => {
  return focused ? (
    <View className="items-center justify-center w-[113px] mt-5 h-12 bg-color5 rounded-lg">
      <Text className="text-color4 tracking-wide font-semibold">{title}</Text>
    </View>
  ) : (
    <View className="items-center justify-center w-[80px] mt-5 h-12 bg-color1 rounded-xl">
      <FontAwesome name={icon} color="#ffffff" size={16} />
    </View>
  );
};

const _layout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarItemStyle: {
          justifyContent: "center",
          alignItems: "center",
          paddingVertical: 0,
        },
        tabBarStyle: {
          backgroundColor: "#1f1f1f",
          borderRadius: 12,
          marginHorizontal: 30,
          marginBottom: 32,
          height: 56,
          position: "absolute",
          borderColor: "#1f1f1f",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          title: "Home",
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon="home" title="Home" />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          headerShown: false,
          title: "Search",
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon="search" title="Search" />
          ),
        }}
      />
      <Tabs.Screen
        name="saved"
        options={{
          headerShown: false,
          title: "Saved",
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon="bookmark" title="Saved" />
          ),
        }}
      />
    </Tabs>
  );
};

export default _layout;
