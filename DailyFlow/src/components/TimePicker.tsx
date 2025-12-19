import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

interface TimePickerProps {
  time: string;
  onChange: (time: string) => void;
}

const TimePicker = ({ time, onChange }: TimePickerProps) => {
  const [hour, minute] = time.split(':').map(Number);

  const handleHourChange = (newHour: number) => {
    const normalizedHour = Math.max(0, Math.min(23, newHour));
    onChange(`${normalizedHour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`);
  };

  const handleMinuteChange = (newMinute: number) => {
    const normalizedMinute = Math.max(0, Math.min(59, newMinute));
    onChange(`${hour.toString().padStart(2, '0')}:${normalizedMinute.toString().padStart(2, '0')}`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.picker}>
        <Pressable onPress={() => handleHourChange(hour + 1)} style={styles.button}>
          <Text style={styles.buttonText}>+</Text>
        </Pressable>
        <Text style={styles.timeText}>{hour.toString().padStart(2, '0')}</Text>
        <Pressable onPress={() => handleHourChange(hour - 1)} style={styles.button}>
          <Text style={styles.buttonText}>-</Text>
        </Pressable>
      </View>
      <Text style={styles.separator}>:</Text>
      <View style={styles.picker}>
        <Pressable onPress={() => handleMinuteChange(minute + 5)} style={styles.button}>
          <Text style={styles.buttonText}>+</Text>
        </Pressable>
        <Text style={styles.timeText}>{minute.toString().padStart(2, '0')}</Text>
        <Pressable onPress={() => handleMinuteChange(minute - 5)} style={styles.button}>
          <Text style={styles.buttonText}>-</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
    padding: 12,
  },
  picker: {
    alignItems: 'center',
  },
  timeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 8,
    color: '#1f2937',
  },
  separator: {
    fontSize: 24,
    fontWeight: 'bold',
    marginHorizontal: 10,
    color: '#1f2937',
  },
  button: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#e5e7eb',
    borderRadius: 6,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4b5563',
  },
});

export default TimePicker;
