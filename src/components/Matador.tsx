import React, { useEffect, useRef, useState } from "react";
import { playApplauseSound } from "../utils/audioUtils";

interface MatadorProps {
  applause: number;
  setMatarodPosition: (
    position: number
  ) => React.Dispatch<React.SetStateAction<number>>;
  matadorPosition: number;
}

const Matador = ({
  applause,
  setMatarodPosition,
  matadorPosition,
}: MatadorProps) => {
  const previousApplause = useRef(0);
  const [forceRender, setForceRender] = useState(false);

  console.log("matador rerender");

  useEffect(() => {
    console.log(applause);
    playApplauseSound(applause);
    if (applause === 3 && previousApplause.current !== 3) {
      setForceRender(!forceRender);
    }
    previousApplause.current = applause;
  }, [applause]);

  useEffect(() => {
    const handleBullRun = (event: CustomEvent) => {
      const nextBullPosition = event.detail.position;

      if (nextBullPosition === matadorPosition) {
        let newMatadorPosition = Math.floor(Math.random() * 8);
        newMatadorPosition =
          newMatadorPosition !== nextBullPosition
            ? newMatadorPosition
            : Math.abs(newMatadorPosition - 1);

        console.log(
          `Matador is moving from ${matadorPosition} to ${newMatadorPosition}`
        );
        setMatarodPosition(newMatadorPosition);
      }
    };

    document.addEventListener("bullRun", handleBullRun as EventListener);

    return () => {
      document.removeEventListener("bullRun", handleBullRun as EventListener);
    };
  }, [matadorPosition, setMatarodPosition]);

  return (
    <img src="src/assets/picture/matador.png" alt="I'm a matador" width="200" />
  );
};

//Обмежуємо ререндер
export default React.memo(Matador, (prevProps, nextProps) => {
  if (prevProps.matadorPosition !== nextProps.matadorPosition) {
    return false;
  }
  return true;
});
