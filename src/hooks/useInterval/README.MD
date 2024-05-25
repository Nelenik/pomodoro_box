# API useInterval hook

```javascript
  useInterval(callback: () => void, delay: number | null, type: IntervalType = "default")
```

### Аргументы
- callback: Функция, которая будет выполняться через заданный интервал времени.
- delay: Задержка в миллисекундах между вызовами callback. Если null, то интервал не устанавливается.
- type: Тип интервала. Допустимые значения:
    * "default": Интервал выполняется в основном потоке (browser interval).
    * "worker": Интервал выполняется с использованием веб-воркера (worker interval). Используйте этот тип для выполнения долгих задач, чтобы избежать блокировки основного потока.

### Возвращаемое значение
Хук не возвращает значения.

### Остановка таймера
Для остановки таймера передайте null в аргумент delay.

```javascript
  useInterval(() => {
    console.log("This will not run because delay is null");
  }, null, "default");
```

## Вспомогательные хуки
`useBrowserInterval`
Этот хук устанавливает интервал в основном потоке. Используется внутри useInterval.

```javascript
  useBrowserInterval(callback: () => void, delay: number | null, active: boolean)
```
`useWorkerInterval`
Этот хук использует веб-воркер для выполнения функции через заданные интервалы времени. Используется внутри useInterval.

```javascript
  useWorkerInterval(callback: () => void, delay: number | null, active: boolean)
```

## Пример: таймер с использованием useInterval

```javascript
  const useTimerTick = (initValue: number) => {
    const [timerValue, setTimerValue] = useState(initValue);

    const [isRunning, setIsRunning] = useState(false);
    //delay зависит от состояния isRunning
    const delay = isRunning ? 1000 : null;

    const tickFunc = () => {
      setTimerValue((prev) => prev - 1);
    };

  //здесь испольузется интервал с web worker. если нужен обычный, то опускаем 3 аргумент, или передаем "default"
    useInterval(tickFunc, delay, "worker");

    useEffect(() => {
      if (timerValue < 0) {
        setTimerValue(0);
        setIsRunning(false);
      }
    }, [timerValue]);

    const startTimer = useCallback(() => {
      setIsRunning(true);
    }, []);

    const pauseTimer = useCallback(() => {
      setIsRunning(false);
    }, []);

    const resetTimer = useCallback(
      (valueInSec: number = initValue) => {
        setTimerValue(valueInSec);
      },
      [initValue]
    );

    return {
      isFinished: timerValue < 0,
      timeString: getTimerTimeString(timerValue),
      startTimer,
      pauseTimer,
      resetTimer,
    };
  };
```