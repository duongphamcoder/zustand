import { useEffect, useState } from "react";
import { create, createStore } from "zustand";
import { persist } from "zustand/middleware";
import { shallow } from "zustand/shallow";

type MyStore = {
  count1: number;
  count2: number;
  increase1: () => void;
  increase2: () => void;
};

const useMyStore = create(
  persist<MyStore>(
    (set) => {
      return {
        count1: 0,
        count2: 0,
        increase1: () =>
          set((state) => ({
            count1: state.count1 + 1,
          })),
        increase2: () =>
          set((state) => ({
            count2: state.count2 + 1,
          })),
      };
    },
    {
      name: "store",
    }
  )
);

const CountOne = () => {
  const { count1, increase1 } = useMyStore((state) => state, shallow);

  console.log("One re-render");

  return (
    <>
      <span>Count1: {count1}</span>
      <button onClick={increase1}>Increase</button>
    </>
  );
};

const CountTwo = () => {
  const { count2, increase2 } = useMyStore();

  console.log("Two re-render");

  return (
    <>
      <span>Count2: {count2}</span>
      <button onClick={increase2}>Increase</button>
    </>
  );
};

const App = () => {
  const [selectCount, setSelectedCount] = useState(true);

  return (
    <>
      <button
        onClick={() => {
          setSelectedCount(!selectCount);
        }}
      >
        {selectCount ? "1" : "2"}
      </button>

      {selectCount ? <CountOne /> : <CountTwo />}
    </>
  );
};

export default App;
