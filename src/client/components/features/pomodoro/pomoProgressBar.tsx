import React, { useEffect } from "react";
import { usePomoStore } from "../../../store/usePomoStore";
import { cn, formatTime } from "@/src/shared/utils/utils";
import { useTimer } from "react-timer-hook";

const PomodoroProgress = ({
  size = 520, // SVG width/height
  strokeWidth = 25, // Progress bar thickness
}) => {
  const {
    pomoSession,
    endFocusSession,
    updateRemainingTime,
    completePomoSession,
    updateCurrentCycle,
    endBreakDuration,
    startFocus,
  } = usePomoStore();

  const handleExpire = () => {
    if (
      pomoSession.isStarted &&
      pomoSession.currentCycle === pomoSession.cyclesNumber
    ) {
      completePomoSession();
    } else if (pomoSession.isStarted && pomoSession.isFocus) {
      endFocusSession();
    } else if (pomoSession.isStarted && pomoSession.isBreak) {
      endBreakDuration();
      updateRemainingTime(pomoSession.focusDuration);
    } else if (
      pomoSession.isStarted &&
      pomoSession.currentCycle < pomoSession.cyclesNumber
    ) {
      updateRemainingTime(pomoSession.focusDuration);
      startFocus();
    }
  };

  const timer = useTimer({
    expiryTimestamp: new Date(),
    onExpire: handleExpire,
    autoStart: false,
  });
  //! for debugging purposes
  useEffect(() => {
    if ((pomoSession.isBreak || pomoSession.isFocus) && pomoSession.skipCounting) {
      const expiryTime = new Date();
      expiryTime.setSeconds(expiryTime.getSeconds() + 2);
      timer.restart(expiryTime);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pomoSession.skipCounting]);

  useEffect(() => {
    // Extract boolean properties
    const booleanProperties = Object.entries(pomoSession)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .filter(([key, value]) => typeof value === "boolean")
      .reduce((acc: { [key: string]: boolean }, [key, value]) => {
        acc[key] = value;
        return acc;
      }, {});

    // Log the rest of the pomoSession object (excluding boolean properties)
    const nonBooleanProperties = Object.entries(pomoSession)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .filter(([key, value]) => typeof value !== "boolean")
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .reduce((acc: { [key: string]: any }, [key, value]) => {
        acc[key] = value;
        return acc;
      }, {});

    console.log(
      "Non-Boolean Properties:",
      JSON.stringify(nonBooleanProperties, null, 2),
    );
    console.log(
      "Boolean Properties:",
      JSON.stringify(booleanProperties, null, 2),
    );
  }, [pomoSession]);

  useEffect(() => {
    if (
      pomoSession.isFocus &&
      pomoSession.currentCycle < pomoSession.cyclesNumber
    ) {
      const expiryTime = new Date();
      const durationInSeconds = pomoSession.focusDuration;
      expiryTime.setSeconds(expiryTime.getSeconds() + durationInSeconds);
      timer.restart(expiryTime);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pomoSession.isStarted, pomoSession.isFocus]);

  useEffect(() => {
    if (pomoSession.isStarted && pomoSession.isPaused) {
      timer.pause();
    }
    if (pomoSession.isStarted && !pomoSession.isPaused) {
      timer.resume();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pomoSession.isPaused]);

  // Modified useEffect for break duration
  useEffect(() => {
    if (pomoSession.isFocusComplete) {
      // Immediately pause the timer
      timer.pause();
      updateCurrentCycle();
    }
    if (pomoSession.isBreak && !pomoSession.isBreakComplete) {
      // Set the timer to display break duration
      const expiryTime = new Date();
      expiryTime.setSeconds(
        expiryTime.getSeconds() + pomoSession.breakDuration,
      );
      timer.restart(expiryTime);
      // Reset the remaining time in the store
      updateRemainingTime(pomoSession.breakDuration);
    }
    if (
      pomoSession.isStarted &&
      !pomoSession.isFocusComplete &&
      !pomoSession.isBreak
    ) {
      // Set the timer to display focus duration
      const expiryTime = new Date();
      expiryTime.setSeconds(
        expiryTime.getSeconds() + pomoSession.focusDuration,
      );
      timer.restart(expiryTime);
      // Reset the remaining time in the store
      updateRemainingTime(pomoSession.focusDuration);
    }
    if (
      pomoSession.isStarted &&
      pomoSession.isBreakComplete &&
      !pomoSession.isBreak
    ) {
      // Set the timer to display focus duration

      timer.pause();

      // Reset the remaining time in the store
      updateRemainingTime(pomoSession.focusDuration);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    pomoSession.isFocusComplete,
    pomoSession.breakDuration,
    pomoSession.isBreakComplete,
  ]);

  const center = size / 2;
  const radius = size / 2 - strokeWidth * 2;
  const circumference = 2 * Math.PI * radius;

  let remainingTime: number;
  const getProgress = (): number => {
    const totalDuration = pomoSession.remainingTime;
    remainingTime = timer.minutes * 60 + timer.seconds;
    const progress = (remainingTime / totalDuration) * 100;
    return circumference - (progress / 100) * circumference;
  };

  return (
    <div className="absolute flex items-center justify-center transition-all duration-1000 ease-custom-ease">
      <svg
        style={{
          width: size,
          height: size,
          transform: "rotate(-90deg)",
        }}
        viewBox={`0 0 ${size} ${size}`}
      >
        <defs>
          {/* Define the gradient */}
          <linearGradient id="progressGradient" gradientTransform="rotate(0)">
            <stop offset="0%" stopColor="#cc6e28" /> {/* Light salmon */}
            <stop offset="100%" stopColor="#ff8932" /> {/* Tomato red */}
          </linearGradient>

          {/* Glow filter */}
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite
              in="blur"
              in2="SourceGraphic"
              operator="over"
              result="glow"
            />
            <feFlood floodColor="#FF6347" floodOpacity="0.5" />
            <feComposite in2="glow" operator="in" />
            <feBlend in="SourceGraphic" mode="screen" />
          </filter>
        </defs>

        {/* Progress circle with gradient */}
        <circle
          className={cn(
            "opacity-0 duration-1000 ease-custom-ease",
            pomoSession.isStarted && "opacity-100",
            pomoSession.isPaused && "opacity-80",
            (pomoSession.isFocusComplete || pomoSession.isBreakComplete) &&
              "opacity-0",
          )}
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={getProgress()}
          style={{ stroke: "url(#progressGradient)", filter: "url(#glow)" }}
        />
      </svg>
      {/* Timer text */}
      <h1
        className={cn(
          "absolute translate-y-0 max-sm:-translate-y-20 max-sm:scale-90 select-none bg-gradient-to-b from-custom-white-200 to-custom-white-600 bg-clip-text text-9xl font-bold text-transparent opacity-100 transition-all duration-1000 ease-custom-ease",
          pomoSession.isStarted && "max-sm:translate-y-0",
          (pomoSession.isFocusComplete || pomoSession.isCompleted)&& "-translate-y-96 opacity-0",
        )}
      >
        {pomoSession.isStarted
          ? formatTime(timer.minutes * 60 + timer.seconds)
          : formatTime(pomoSession.focusDuration)}
      </h1>
      {/* focus complete text */}
      <h1
        className={cn(
          "absolute translate-y-96 select-none bg-gradient-to-b from-custom-white-200 to-custom-white-600 bg-clip-text text-center text-7xl font-extrabold capitalize text-transparent opacity-0 transition-all duration-1000 ease-custom-ease",
          pomoSession.isFocusComplete && "-translate-y-10 opacity-100",
        )}
      >
        focus
        <br />
        complete
      </h1>
    </div>
  );
};

export default PomodoroProgress;
