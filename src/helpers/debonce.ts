const debounce = <TArgs extends unknown[]>(
  fn: (...args: TArgs) => void,
  delay = 300,
) => {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;

  return (...args: TArgs) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
};

const throttle = <TArgs extends unknown[]>(
  fn: (...args: TArgs) => void,
  delay = 300,
) => {
  let lastCall = 0;

  return (...args: TArgs) => {
    const now = Date.now();

    if (now - lastCall >= delay) {
      lastCall = now;
      fn(...args);
    }
  };
};

export const Debounce = {
  debounce,
  throttle,
};
