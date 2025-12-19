import React, { useMemo, useState } from 'react';
import { ScrollView, Text, View, Dimensions, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { PieChart } from 'react-native-chart-kit';
import { useTaskStore } from '../store/taskStore';
import { useRoutineStore } from '../store/routineStore';
import AddRoutineModal from '../components/AddRoutineModal';

const chartSize = Dimensions.get('window').width - 32;

const HomeScreen = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const tasks = useTaskStore((state) => state.tasks);
  const routines = useRoutineStore((state) => state.routines);
  const toggleRoutine = useRoutineStore((state) => state.toggleRoutine);

  const { completedCount, pendingCount, completionData } = useMemo(() => {
    const completed = tasks.filter((t) => t.completed).length;
    const pending = Math.max(tasks.length - completed, 0);
    const data = [
      {
        name: 'Completed',
        population: completed || 1,
        color: '#10b981',
        legendFontColor: '#374151',
        legendFontSize: 14,
      },
      {
        name: 'Pending',
        population: pending || 1,
        color: '#d1d5db',
        legendFontColor: '#374151',
        legendFontSize: 14,
      },
    ];

    return { completedCount: completed, pendingCount: pending, completionData: data };
  }, [tasks]);

  const todayRoutines = routines;

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1 px-4 pt-4" showsVerticalScrollIndicator={false}>
        <View className="mb-6">
          <Text className="text-sm text-gray-500">Good morning!</Text>
          <Text className="mt-1 text-2xl font-semibold text-gray-900">DailyFlow Dashboard</Text>
          <Text className="text-gray-500">Stay on track with your routines and tasks</Text>
        </View>

        <View className="mb-6 rounded-2xl bg-primary/10 p-4">
          <Text className="mb-3 text-lg font-semibold text-gray-900">Today's Routine</Text>
          <View className="gap-3">
            {todayRoutines.map((item) => (
              <Pressable
                key={item.id}
                className="flex-row items-center gap-3 rounded-xl bg-white/80 p-3"
                onPress={() => toggleRoutine(item.id)}
              >
                <View className="h-12 w-12 items-center justify-center rounded-full bg-primary/15">
                  <Text className="text-sm font-semibold text-primary-dark">{item.time}</Text>
                </View>
                <View className="flex-1">
                  <Text className="text-base font-semibold text-gray-900">{item.title}</Text>
                  <Text className="text-xs text-gray-500">{item.completed ? 'Done' : 'Upcoming'}</Text>
                </View>
                <MaterialIcons
                  name={item.completed ? 'check-circle' : 'radio-button-unchecked'}
                  size={24}
                  color={item.completed ? '#10b981' : '#d1d5db'}
                />
              </Pressable>
            ))}
          </View>
        </View>

        <View className="mb-6 rounded-2xl bg-white p-4 shadow-sm">
          <Text className="mb-3 text-lg font-semibold text-gray-900">Task Overview</Text>
          <PieChart
            data={completionData}
            width={chartSize}
            height={210}
            chartConfig={{
              color: (opacity = 1) => `rgba(16, 185, 129, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(55, 65, 81, ${opacity})`,
              backgroundColor: '#ffffff',
              backgroundGradientFrom: '#ffffff',
              backgroundGradientTo: '#ffffff',
            }}
            accessor="population"
            backgroundColor="transparent"
            paddingLeft="10"
            hasLegend
            center={[0, 0]}
          />
          <View className="mt-3 flex-row justify-between">
            <View>
              <Text className="text-sm text-gray-500">Completed</Text>
              <Text className="text-xl font-semibold text-gray-900">{completedCount}</Text>
            </View>
            <View>
              <Text className="text-sm text-gray-500">Pending</Text>
              <Text className="text-xl font-semibold text-gray-900">{pendingCount}</Text>
            </View>
            <View>
              <Text className="text-sm text-gray-500">Total</Text>
              <Text className="text-xl font-semibold text-gray-900">{tasks.length}</Text>
            </View>
          </View>
        </View>

        <View className="mb-10 flex-row gap-3">
          <View className="flex-1 rounded-2xl bg-primary p-4 shadow-sm">
            <Text className="text-sm text-white/80">Streak</Text>
            <Text className="mt-1 text-2xl font-semibold text-white">3 days</Text>
            <Text className="text-white/80">Keep it going!</Text>
          </View>
          <View className="flex-1 rounded-2xl bg-gray-900 p-4 shadow-sm">
            <Text className="text-sm text-white/80">Tasks today</Text>
            <Text className="mt-1 text-2xl font-semibold text-white">{completedCount}</Text>
            <Text className="text-white/80">Done so far</Text>
          </View>
        </View>
      </ScrollView>

      <Pressable
        className="absolute bottom-6 right-6 h-14 w-14 items-center justify-center rounded-full bg-primary shadow-lg shadow-primary/40"
        onPress={() => setModalVisible(true)}
        accessibilityLabel="Quick add"
      >
        <MaterialIcons name="add" size={28} color="#ffffff" />
      </Pressable>
      <AddRoutineModal visible={isModalVisible} onClose={() => setModalVisible(false)} />
    </SafeAreaView>
  );
};

export default HomeScreen;
