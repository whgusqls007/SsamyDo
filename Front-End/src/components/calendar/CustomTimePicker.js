const MILLISECONDS_PER_MINUTE = 60 * 1000;
const MILLISECONDS_PER_HOUR = 60 * 60 * 1000;
const MILLISECONDS_PER_DAY = 24 * MILLISECONDS_PER_HOUR;

const [timeValue, setTimeValue] = useState(Date.now() % MILLISECONDS_PER_DAY);
const [hour, min] = useMemo(() => {
  return [
    Math.floor(timeValue / MILLISECONDS_PER_HOUR),
    Math.floor((timeValue % MILLISECONDS_PER_HOUR) / MILLISECONDS_PER_MINUTE),
    Math.floor((timeValue % MILLISECONDS_PER_MINUTE) / 1000),
  ];
}, [timeValue]);
