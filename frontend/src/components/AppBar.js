import { CountdownCircleTimer } from "react-countdown-circle-timer";

const AppBar = (props) => {
  const renderTime = ({ remainingTime }) => {
    return (
      <div className="timer">
        <div className="value">{remainingTime}</div>
      </div>
    );
  };
  return (
    <div>
      <div className="flex flex-row justify-between m-3 md:mx-20 md:my-10 navbar">
        <h1 className="logo text-4xl">
          HODLINFO<span className="text-white text-base">.com</span>
        </h1>
        <div className="timer-wrapper">
          <CountdownCircleTimer
            isPlaying
            duration={5}
            colors={["#3DC6C1"]}
            size="40"
            strokeWidth="4"
            children={{ remainingTime: ({ remainingTime }) => remainingTime }}
            onComplete={() => {
              return { shouldRepeat: true, delay: 1 };
            }}
          >
            {renderTime}
          </CountdownCircleTimer>
        </div>
        <div className="text-white font-bold md:py-2 md:px-4 rounded telegram-btn hidden md:block">
          Connect Telegram
        </div>
      </div>
    </div>
  );
};

export default AppBar;
