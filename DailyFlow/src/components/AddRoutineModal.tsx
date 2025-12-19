import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, Modal } from 'react-native';
import { useRoutineStore } from '../store/routineStore';
import TimePicker from './TimePicker';

interface AddRoutineModalProps {
  visible: boolean;
  onClose: () => void;
}

const AddRoutineModal = ({ visible, onClose }: AddRoutineModalProps) => {
  const [title, setTitle] = useState('');
  const [time, setTime] = useState('08:00');
  const addRoutine = useRoutineStore((state) => state.addRoutine);

  const handleSave = () => {
    if (title.trim()) {
      addRoutine({ title, time, completed: false });
      setTitle('');
      onClose();
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View className="flex-1 justify-center items-center bg-black/50">
        <View className="bg-white rounded-2xl p-6 w-11/12">
          <Text className="text-lg font-semibold text-gray-900 mb-4">Add New Routine</Text>
          <TextInput
            className="bg-gray-100 rounded-lg px-4 py-3 mb-4"
            placeholder="Routine Title"
            value={title}
            onChangeText={setTitle}
          />
          <TimePicker time={time} onChange={setTime} />
          <View className="flex-row justify-end gap-3 mt-6">
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

export default AddRoutineModal;
