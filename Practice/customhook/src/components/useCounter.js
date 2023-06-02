import { useState } from "react";

function useCounter(initialvalue = 0, value = 1) {
  const [count, setCount] = useState(initialvalue);

  const increment = () => {
    setCount(count + value);
  };
  const decrement = () => {
    setCount(count - value);
  };
  const reset = () => {
    setCount(initialvalue);
  };
  return [count, increment, decrement, reset]
}

export default useCounter;
