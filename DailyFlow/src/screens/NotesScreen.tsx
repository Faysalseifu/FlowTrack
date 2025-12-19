import React, { useState } from 'react';
import { View, Text, FlatList, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNoteStore } from '../store/noteStore';
import AddNoteModal from '../components/AddNoteModal';
import { MaterialIcons } from '@expo/vector-icons';

const NotesScreen = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const notes = useNoteStore((state) => state.notes);
  const deleteNote = useNoteStore((state) => state.deleteNote);

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="flex-1 p-4">
        <Text className="text-2xl font-bold text-gray-900 mb-4">Notes</Text>
        <FlatList
          data={notes}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View className="bg-white p-4 rounded-lg mb-3 shadow-sm">
              <View className="flex-row justify-between items-start">
                <View className="flex-1">
                  <Text className="text-lg font-semibold text-gray-800">{item.title}</Text>
                  <Text className="text-sm text-gray-600 mt-1">{item.content}</Text>
                </View>
                <Pressable onPress={() => deleteNote(item.id)} className="ml-4">
                  <MaterialIcons name="delete-outline" size={24} color="#ef4444" />
                </Pressable>
              </View>
              <Text className="text-xs text-gray-400 mt-3">
                {new Date(item.createdAt).toLocaleString()}
              </Text>
            </View>
          )}
          ListEmptyComponent={
            <View className="flex-1 justify-center items-center mt-20">
              <Text className="text-gray-500">No notes yet. Add one!</Text>
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
      <AddNoteModal visible={isModalVisible} onClose={() => setModalVisible(false)} />
    </SafeAreaView>
  );
};

export default NotesScreen;
