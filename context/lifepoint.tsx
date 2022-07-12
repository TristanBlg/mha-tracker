import { createContext, useContext, useState } from "react";

export const PLAYERS = { player1: "player1", player2: "player2" } as const;
export type PlayersUnion = keyof typeof PLAYERS;
export type HistoryItem = Record<PlayersUnion, number>;
export type History = HistoryItem[];
export type LPContextType = {
  history: History;
  setHistory: React.Dispatch<React.SetStateAction<History>>;
  handleUndo: () => void;
  handleReset: () => void;
};
export const LPContext = createContext<LPContextType | null>(null);

const INITIAL_HISTORY: History = [{ player1: 25, player2: 25 }];

export const LPProvider = ({ children }: React.PropsWithChildren<{}>) => {
  const [history, setHistory] = useState(INITIAL_HISTORY);

  const handleUndo = () => {
    setHistory((prev) => {
      if (prev.length === 1) return prev;
      if (prev.length <= 0) return INITIAL_HISTORY;

      const oldHistory = [...prev];
      oldHistory.pop();
      return oldHistory;
    });
  };
  const handleReset = () => {
    setHistory(INITIAL_HISTORY);
  };

  return (
    <LPContext.Provider value={{ history, setHistory, handleUndo, handleReset }}>
      {children}
    </LPContext.Provider>
  );
};

export const useLPContext = () => {
  const context = useContext(LPContext);

  if (context === null) {
    throw new Error(
      "LP state not found. Try wrapping a parent component with <LPProvider>."
    );
  }

  return context;
};
