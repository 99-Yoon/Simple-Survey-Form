/**
 * 출처: https://github.com/jaredLunde/react-hook
 */
import { useRef, useEffect } from "react";

const useLatest = <T extends any>(current: T) => {
  const storedValue = useRef(current);
  useEffect(() => {
    storedValue.current = current;
  });
  return storedValue;
};

export default useLatest;
