import { useEffect, useState } from "react";
import axios from "axios";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

export const CryptoInfo = () => {
  const [info, setInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
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
        setIsLoading(false);
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
          {info && (
            <div className="timer-wrapper">
              <CountdownCircleTimer
                isPlaying
                duration={60}
                colors={["#3DC6C1"]}
                size="40"
                strokeWidth="4"
                children={{
                  remainingTime: ({ remainingTime }) => remainingTime,
                }}
                onComplete={() => {
                  getCryptoInfo();
                  return { shouldRepeat: true, delay: 2 };
                }}
              >
                {renderTime}
              </CountdownCircleTimer>
            </div>
          )}
          <div className="text-white font-bold md:py-2 md:px-4 rounded telegram-btn hidden md:block">
            Connect Telegram
          </div>
        </div>
      </div>
      <div className="flex flex-col md:mx-20 outer-table">
        <table className="my-5">
          <thead>
            <tr className="text-lg text-gray-400 font-bold">
              <th>#</th>
              <th>Name</th>
              <th>Last (&#8377;)</th>
              <th>Buy/Sell Price (&#8377;)</th>
              <th>Volume</th>
              <th>Base_Unit</th>
            </tr>
          </thead>
          {isLoading && (
            <div class="text-center">
              <div role="status">
                <svg
                  aria-hidden="true"
                  class="inline w-10 h-10 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span class="sr-only">Loading...</span>
              </div>
            </div>
          )}

          <tbody>
            {info &&
              info.map((val, key) => {
                return (
                  <tr key={key} className="text-lg text-white font-bold">
                    <td className="py-3">{key + 1}</td>
                    <td>{val.name}</td>
                    <td> {val.last}</td>
                    <td>
                      {val.buy} / {val.sell}
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
