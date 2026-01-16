'use client'

import { capitalData } from "@/types";
import React, { useState, useTransition } from "react";
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

interface QuizProps {
  data: capitalData[];
  dataCount: number;
}

const QuizContent = ({ data, dataCount }: QuizProps) => {
  const [index, setIndex] = useState(Math.floor(Math.random() * dataCount));
  const [input, setInput] = useState('');
  const [isPending, startTransition] = useTransition();
  const [isCorrect, setIsCorrect] = useState(false);
  const [show, setShow] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const correct =
      input.trim().toLowerCase() === (data[index].country?.trim().toLowerCase() || '');
    
    setIsCorrect(correct);
    setShow(true);
    setInput('');

    startTransition(async () => {
      await delay(3000);
      setShow(false);
      setIsCorrect(false);
      setIndex(Math.floor(Math.random() * dataCount));
    });
  }

  return (
    <div className="h-full w-full flex items-center justify-center 
      bg-[#0f172a] 
      bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]">

      <div className="w-full max-w-md 
        bg-white/90 backdrop-blur-md 
        rounded-2xl shadow-xl p-6 space-y-4">

        <h2 className="text-xl font-semibold text-center text-gray-800">
          🌍 Capital Quiz
        </h2>

        <div className="bg-green-100 text-green-900 
          p-4 rounded-xl shadow-sm 
          text-center font-medium">
          {data[index].capital}
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">

          <Input
            placeholder="Type country name..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            autoFocus
            className="rounded-xl border-gray-300 
              focus:ring-2 focus:ring-green-500"
          />

          <Button
            type="submit"
            disabled={isPending}
            className="w-full rounded-xl 
              bg-green-500 hover:bg-green-600 
              text-white"
          >
            Check
          </Button>

          <div className="h-12">
            {show && (
              <div className="bg-gray-100 
                p-3 rounded-xl text-sm text-center">

                Answer:{" "}
                <strong className={isCorrect ? "text-green-600" : "text-red-500"}>
                  {isCorrect ? "Correct" : "Wrong"}
                </strong>
                <br />
                It&apos;s <strong>{data[index].country || "having no capital"}</strong>
              </div>
            )}
          </div>

        </form>
      </div>
    </div>
  )
}

export default QuizContent;
