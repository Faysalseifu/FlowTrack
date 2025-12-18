import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import HomeScreen from './src/screens/HomeScreen';

type TabParamList = {
  Home: undefined;
  Routines: undefined;
  Tasks: undefined;
  Notes: undefined;
  Settings: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#ffffff',
  },
};

const iconMap: Record<keyof TabParamList, keyof typeof MaterialIcons.glyphMap> = {
  Home: 'home',
  Routines: 'calendar-today',
  Tasks: 'check-circle',
  Notes: 'description',
  Settings: 'settings',
};

const PlaceholderScreen = ({ title }: { title: string }) => (
  <SafeAreaView className="flex-1 items-center justify-center bg-white">
    <View className="items-center gap-2">
      <View className="h-12 w-12 items-center justify-center rounded-full bg-primary/10">
        <MaterialIcons name="check-circle" size={28} color="#10b981" />
      </View>
      <Text className="text-xl font-semibold text-gray-900">{title}</Text>
      <Text className="text-gray-500">Coming soon</Text>
    </View>
  </SafeAreaView>
);

const RoutinesScreen = () => <PlaceholderScreen title="Routines" />;
const TasksScreen = () => <PlaceholderScreen title="Tasks" />;
const NotesScreen = () => <PlaceholderScreen title="Notes" />;
const SettingsScreen = () => <PlaceholderScreen title="Settings" />;

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer theme={navTheme}>
        <StatusBar style="dark" />
        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarActiveTintColor: '#10b981',
            tabBarInactiveTintColor: '#6b7280',
            tabBarLabelStyle: { fontSize: 12 },
            tabBarStyle: { height: 62, paddingBottom: 8, paddingTop: 6 },
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name={iconMap[route.name as keyof TabParamList]} size={size} color={color} />
            ),
          })}
        >
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Routines" component={RoutinesScreen} />
          <Tab.Screen name="Tasks" component={TasksScreen} />
          <Tab.Screen name="Notes" component={NotesScreen} />
          <Tab.Screen name="Settings" component={SettingsScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
