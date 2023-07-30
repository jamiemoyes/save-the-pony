/* eslint-disable @typescript-eslint/ban-ts-comment */
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import classNames from "./App.module.css";
import { CreateGameForm } from "./components/CreateGameForm/CreateGameForm";
import { useCallback, useState } from "react";
import { Game } from "./components/Game/Game";
import { Badge } from "./assets/icons";

const queryClient = new QueryClient();

function transitionIfSupported(callback: () => void) {
  // @ts-ignore
  if (document.startViewTransition) {
    // @ts-ignore
    document.startViewTransition(callback);
  } else {
    callback();
  }
}

function App() {
  const [matchId, setMatchId] = useState<string>();

  const onGameCreate = useCallback((createdMatchId: string) => {
    transitionIfSupported(() => {
      setMatchId(createdMatchId);
    });
  }, []);

  return (
    <div className={classNames.appContainer}>
      <QueryClientProvider client={queryClient}>
        <div className={classNames.title}>
          <Badge />
          <h1>Save the Pony</h1>
        </div>
        {matchId ? (
          <>
            <Game mazeId={matchId} restartGame={() => setMatchId(undefined)} />
            <p>{matchId}</p>
          </>
        ) : (
          <CreateGameForm onCreate={onGameCreate} />
        )}
      </QueryClientProvider>
    </div>
  );
}
export default App;
