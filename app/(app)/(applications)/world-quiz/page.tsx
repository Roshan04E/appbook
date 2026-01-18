"use client";

import { useEffect, useState } from "react";
// import { getCapitals } from "@/lib/server"; // your server function
import { capitalData } from "@/types";
import QuizContent from "./quiz-content";

const WorldQuiz = () => {
  // const [data, setData] = useState<capitalData[]>([]);
  // const [loading, setLoading] = useState(true);
  // useEffect(() => {
  //   getCapitals().then((res) => {
  //     setData(res.data);
  //     setLoading(false);
  //   }).catch(() => setLoading(false));
  // }, []);
  // if (loading) return <p className="text-center p-4">Loading quiz...</p>;
  // if (!data.length) return <p className="text-center p-4">No data found.</p>;
  // return <QuizContent data={data} dataCount={data.length} />;
};

export default WorldQuiz;
