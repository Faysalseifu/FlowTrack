import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, Modal } from 'react-native';
import { useTaskStore } from '../store/taskStore';
import { TaskPriority } from '../store/taskStore';

interface AddTaskModalProps {
  visible: boolean;
  onClose: () => void;
}

const AddTaskModal = ({ visible, onClose }: AddTaskModalProps) => {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState<TaskPriority>('medium');
  const addTask = useTaskStore((state) => state.addTask);

  const handleSave = () => {
    if (title.trim()) {
      addTask({ title, priority, completed: false });
      setTitle('');
      setPriority('medium');
      onClose();
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View className="flex-1 justify-center items-center bg-black/50">
        <View className="bg-white rounded-2xl p-6 w-11/12">
          <Text className="text-lg font-semibold text-gray-900 mb-4">Add New Task</Text>
          <TextInput
            className="bg-gray-100 rounded-lg px-4 py-3 mb-4"
            placeholder="Task Title"
            value={title}
            onChangeText={setTitle}
          />
          <View className="flex-row justify-around mb-6">
            <Pressable onPress={() => setPriority('low')} className={`px-4 py-2 rounded-lg ${priority === 'low' ? 'bg-blue-200' : 'bg-gray-200'}`}>
              <Text>Low</Text>
            </Pressable>
            <Pressable onPress={() => setPriority('medium')} className={`px-4 py-2 rounded-lg ${priority === 'medium' ? 'bg-yellow-200' : 'bg-gray-200'}`}>
              <Text>Medium</Text>
            </Pressable>
            <Pressable onPress={() => setPriority('high')} className={`px-4 py-2 rounded-lg ${priority === 'high' ? 'bg-red-200' : 'bg-gray-200'}`}>
              <Text>High</Text>
            </Pressable>
          </View>
          <View className="flex-row justify-end gap-3">
            <Pressable onPress={onClose} className="px-4 py-2 rounded-lg">
              <Text className="font-semibold text-gray-600">Cancel</Text>
            </Pressable>
            <Pressable onPress={handleSave} className="bg-primary px-4 py-2 rounded-lg">
              <Text className="font-semibold text-white">Save</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default AddTaskModal;
