"use client";
import { useWindows } from "@/context/windowContext";
import MacWindow from "@/components/shared/mac-window";

import HomeApp from "@/app/page";
// import Quiz from "@/app/(app)/(services)/world-quiz/quiz-content"
import Profile from "@/app/(app)/profile/page";
import Settings from "@/app/(app)/settings/page";
import WorldQuiz from "@/app/(app)/(applications)/world-quiz/page";
import WikiApp from "@/app/(app)/(applications)/wikiapp/page";
import SignIn from "@/app/(auth)/sign-in/sign-in-form";
import Synapse from "@/app/(applications)/synapse/index-synapse";
import Toodles from "@/app/(applications)/toodles/toodles-app";
import Focusy from "@/app/(applications)/focusy/focusy-app";

// id : component/page
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const registry: any = {
  home: HomeApp,
  quiz: WorldQuiz,
  profile: Profile,
  settings: Settings,
  wikiapp: WikiApp,
  signIn: SignIn,
  synapse: Synapse,
  toodles: Toodles,
  focusy: Focusy,
};

export default function WindowManager() {
  const { windows, focus } = useWindows();

  return (
    <>
      {windows.map((win) => {
        const App = registry[win.app];
        if (!App) return null;

        return (
          <MacWindow key={win.id} win={win} onFocus={() => focus(win.id)}>
            <App />
          </MacWindow>
        );
      })}
    </>
  );
}
