import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, Modal } from 'react-native';
import { useNoteStore } from '../store/noteStore';

interface AddNoteModalProps {
  visible: boolean;
  onClose: () => void;
}

const AddNoteModal = ({ visible, onClose }: AddNoteModalProps) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const addNote = useNoteStore((state) => state.addNote);

  const handleSave = () => {
    if (title.trim()) {
      addNote({ title, content });
      setTitle('');
      setContent('');
      onClose();
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View className="flex-1 justify-center items-center bg-black/50">
        <View className="bg-white rounded-2xl p-6 w-11/12">
          <Text className="text-lg font-semibold text-gray-900 mb-4">Add New Note</Text>
          <TextInput
            className="bg-gray-100 rounded-lg px-4 py-3 mb-4"
            placeholder="Note Title"
            value={title}
            onChangeText={setTitle}
          />
          <TextInput
            className="bg-gray-100 rounded-lg px-4 py-3 mb-6 h-32"
            placeholder="Note Content"
            value={content}
            onChangeText={setContent}
            multiline
          />
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

export default AddNoteModal;
