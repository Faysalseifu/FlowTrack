import React, { useState } from 'react';
import { View, Text, FlatList, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoutineStore } from '../store/routineStore';
import AddRoutineModal from '../components/AddRoutineModal';
import { MaterialIcons } from '@expo/vector-icons';

const RoutinesScreen = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const routines = useRoutineStore((state) => state.routines);
  const toggleRoutine = useRoutineStore((state) => state.toggleRoutine);
  const deleteRoutine = useRoutineStore((state) => state.deleteRoutine);

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="flex-1 p-4">
        <Text className="text-2xl font-bold text-gray-900 mb-4">Routines</Text>
        <FlatList
          data={routines}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View className="flex-row items-center justify-between bg-white p-4 rounded-lg mb-3 shadow-sm">
              <Pressable onPress={() => toggleRoutine(item.id)} className="flex-row items-center flex-1">
                <MaterialIcons
                  name={item.completed ? 'check-circle' : 'radio-button-unchecked'}
                  size={24}
                  color={item.completed ? '#10b981' : '#d1d5db'}
                />
                <View className="ml-4">
                  <Text className="text-base font-semibold text-gray-800">{item.title}</Text>
                  <Text className="text-sm text-gray-500">{item.time}</Text>
                </View>
              </Pressable>
              <Pressable onPress={() => deleteRoutine(item.id)}>
                <MaterialIcons name="delete-outline" size={24} color="#ef4444" />
              </Pressable>
            </View>
          )}
          ListEmptyComponent={
            <View className="flex-1 justify-center items-center mt-20">
              <Text className="text-gray-500">No routines yet. Add one!</Text>
            </View>
          }
        />
      </View>
      <Pressable
        className="absolute bottom-6 right-6 h-14 w-14 items-center justify-center rounded-full bg-primary shadow-lg"
        onPress={() => setModalVisible(true)}
      >
        <MaterialIcons name="add" size={28} color="#ffffff" />
      </Pressable>
      <AddRoutineModal visible={isModalVisible} onClose={() => setModalVisible(false)} />
    </SafeAreaView>
  );
};

export default RoutinesScreen;
