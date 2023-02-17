import { useEffect, useState } from "react";
import axios from "axios";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

export const CryptoInfo = () => {
  const [info, setInfo] = useState(null);
  const renderTime = ({ remainingTime }) => {
    return (
      <div className="timer">
        <div className="value">{remainingTime}</div>
      </div>
    );
  };
  const getCryptoInfo = async () => {
    await axios
      .get("/cryptoinfo")
      .then((resp) => {
        setInfo(resp.data.allInfo);
        console.log(resp.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  useEffect(() => {
    getCryptoInfo();
  }, []);

  return (
    <>
      <div>
        <div className="flex flex-row justify-evenly md:justify-between m-3 md:mx-20 md:my-10 navbar">
          <h1 className="logo text-4xl">
            HODLINFO<span className="text-white text-base">.com</span>
          </h1>
          <div className="timer-wrapper">
            <CountdownCircleTimer
              isPlaying
              duration={60}
              colors={["#3DC6C1"]}
              size="40"
              strokeWidth="4"
              children={{ remainingTime: ({ remainingTime }) => remainingTime }}
              onComplete={() => {
                getCryptoInfo();
                return { shouldRepeat: true, delay: 2 };
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
      <div className="flex flex-col md:mx-20">
        <table className="my-5">
          <thead>
            <tr className="text-lg text-gray-400 font-bold">
              <th>#</th>
              <th>Name</th>
              <th>Last</th>
              <th>Buy/Sell Price</th>
              <th>Volume</th>
              <th>Base_Unit</th>
            </tr>
          </thead>
          <tbody>

          {info &&
            info.map((val, key) => {
              return (
                <tr key={key} className="text-lg text-white font-bold">
                  <td className="py-3">{key + 1}</td>
                  <td>{val.name}</td>
                  <td>{val.last}</td>
                  <td>
                    {val.buy}/{val.sell}
                  </td>
                  <td>{val.volume}</td>
                  <td>{val.base_unit}</td>
                </tr>
              );
            })}
            </tbody>
        </table>
      </div>
    </>
  );
};
