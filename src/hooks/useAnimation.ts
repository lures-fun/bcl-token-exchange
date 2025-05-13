import { useState, useEffect } from 'react';

interface AnimationConfig {
  leftDelay?: number;
  rightDelay?: number;
}

/**
 * アニメーション状態を管理するカスタムフック
 */
export const useAnimation = ({ leftDelay = 700, rightDelay = 1100 }: AnimationConfig = {}) => {
  const [mounted, setMounted] = useState(false);
  const [animateLeft, setAnimateLeft] = useState(false);
  const [animateRight, setAnimateRight] = useState(false);

  useEffect(() => {
    setMounted(true);

    const timerLeft = setTimeout(() => setAnimateLeft(true), leftDelay);
    const timerRight = setTimeout(() => setAnimateRight(true), rightDelay);

    return () => {
      // アンマウント時にタイマーをクリア
      clearTimeout(timerLeft);
      clearTimeout(timerRight);
    };
  }, [leftDelay, rightDelay]);

  return {
    mounted,
    animateLeft,
    animateRight,
  };
};
