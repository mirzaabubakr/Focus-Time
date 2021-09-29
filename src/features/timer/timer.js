import React, { useState } from 'react';
import { View, StyleSheet, Text, Vibration, Platform } from 'react-native';
import { colors } from '../../utiles/color';
import { spacing } from '../../utiles/sizes';
import { Countdown } from '../../Components/Countdown';
import { RoundedButton } from '../../Components/RoundedButton';
import { ProgressBar } from 'react-native-paper';
import { useKeepAwake } from 'expo-keep-awake';

import { Timing } from './timing';
const DEFULT_TIME = 0.1;
export const Timer = ({ focusSubject, onTimerEnd,clearSubject }) => {
  useKeepAwake();
  const [minutes, setMinutes] = useState(DEFULT_TIME);
  const [isStarted, setStarted] = useState(false);
  const [progress, setProgress] = useState(1);

  const onProgress = (progress) => {
    setProgress(progress);
  };

  const vibrate = () => {
    if (Platform.OS === 'ios') {
      const interval = setInterval(() => Vibration.vibrate, 1000);
      setTimeout(() => clearInterval(interval), 10000);
    } else {
      Vibration.vibrate(10000);
    }
  };

  const onEnd = () => {
    vibrate();
    setMinutes(DEFULT_TIME);
    setProgress(1);
    setStarted(false);
    onTimerEnd();
  };

  const changeTime = (min) => {
    setMinutes(min);
    setProgress(1);
    setStarted(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.countdown}>
        <Countdown
          minutes={minutes}
          isPaused={!isStarted}
          onProgress={onProgress}
          onEnd={onEnd}
        />
      </View>
      <View style={{ paddingTop: spacing.xxl }}>
        <Text style={styles.title}>Focusing On :</Text>
        <Text style={styles.task}>{focusSubject}</Text>
      </View>
      <View style={{ paddingTop: spacing.sm }}>
        <ProgressBar
          progress={progress}
          color="#5E84E2"
          style={{ height: 10 }}
        />
      </View>

      <View style={styles.buttonWrapper}>
        <Timing onChangeTime={changeTime} />
      </View>

      <View style={styles.buttonWrapper}>
        {isStarted ? (
          <RoundedButton title="Paused" onPress={() => setStarted(false)} />
        ) : (
          <RoundedButton title="Started" onPress={() => setStarted(true)} />
        )}
      </View>
      <View style={styles.clearSubject}>
        <RoundedButton title="-" size={50} onPress={() => clearSubject()} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    color: colors.white,
    textAlign: 'center',
  },
  task: {
    color: colors.white,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  countdown: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonWrapper: {
    flex: 1,
    flexDirection: 'row',
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  clearSubject: {
    paddingBottom: 25,
    paddingLeft: 25,
  },
});
