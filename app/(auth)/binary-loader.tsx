"use client";
import { useEffect, useState } from "react";
import styles from "./layout.module.css";

const TARGET = "RESTRICTED";
const TOTAL_TIME = 5000; // 5 sec
const STEP_TIME = TOTAL_TIME / TARGET.length;

export function BinaryLoader() {
  const chars = "01#$%@&*";
  const [step, setStep] = useState(0);
  const [text, setText] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      let out = "";
      for (let i = 0; i < TARGET.length; i++) {
        if (i < step) out += TARGET[i];
        else out += chars[Math.floor(Math.random() * chars.length)];
      }
      setText(out);

      if (step < TARGET.length) {
        setStep((s) => s + 1);
      }
    }, STEP_TIME);

    return () => clearInterval(interval);
  }, [step]);

  // Reset on hover
  const handleHover = () => setStep(0);

  return (
    <div
      className={`${styles.binaryLoader}`}
      onMouseEnter={handleHover}
      style={{ cursor: "pointer" }}
    >
      {text}
    </div>
  );
}
