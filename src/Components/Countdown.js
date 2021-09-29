import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { fontSizes, spacing } from '../utiles/sizes';
import { colors } from '../utiles/color';

const minutesToMilies = (min) => min * 1000 * 60;
const formateTime = (time) => (time < 10 ? `0${time}` : time);

export const Countdown = ({ minutes = 0.1, isPaused, onProgress, onEnd }) => {
  const interval = React.useRef(null);
  const [milies, setMilies] = useState(null);

  const countDown = () => {
    setMilies((time) => {
      if (time === 0) {
        clearInterval(interval.current);

        return time;
      }

      const timeLeft = time - 1000;
      return timeLeft;
    });
  };

  useEffect(() => {
    setMilies(minutesToMilies(minutes));
  }, [minutes]);

  useEffect(() => {
    onProgress(milies / minutesToMilies(minutes));
    if (milies === 0) {
      onEnd();
    }
  }, [milies]);

  useEffect(() => {
    if (isPaused) {
      if (interval.current) clearInterval(interval.current);
      return;
    }
    interval.current = setInterval(countDown, 1000);
    return () => clearInterval(interval.current);
  }, [isPaused]);

  const minute = Math.floor(milies / 1000 / 60) % 60;
  const second = Math.floor(milies / 1000) % 60;

  return (
    <Text style={styles.text}>
      {formateTime(minute)} : {formateTime(second)}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: fontSizes.xxxl,
    fontWeight: 'bold',
    color: colors.white,
    padding: spacing.lg,
    backgroundColor: 'rgba(94,132,226,0.3))',
  },
});
