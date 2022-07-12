import { createContext, useContext, useState } from "react";

import { useLPContext } from "./lifepoint";

export const PLAYERS = { player1: "player1", player2: "player2" } as const;

export type PlayersUnion = keyof typeof PLAYERS;
export type Area = "up" | "middle" | "bottom";
export type HitItem = {
  area: Area | null;
  speed: number;
  damage: number;
};
export type Hit = Record<PlayersUnion, HitItem>;

export type HitContextType = {
  hit: Hit;
  handleUpdatePlayerHit: (player: PlayersUnion, hitValues: Partial<HitItem>) => void;
  handleResetHit: (player?: PlayersUnion) => void;
  handleSubmitPlayerHit: (player: PlayersUnion, damage: number) => void;
};

export const HitContext = createContext<HitContextType | null>(null);

const INITIAL_HIT: HitItem = {
  area: null,
  speed: 4,
  damage: 4,
};
const INITIAL_PLAYER_HIT: Hit = {
  player1: INITIAL_HIT,
  player2: INITIAL_HIT,
};

export const HitProvider = ({ children }: React.PropsWithChildren<{}>) => {
  const [hit, setHit] = useState<Hit>(INITIAL_PLAYER_HIT);
  const { setHistory } = useLPContext();

  const handleUpdatePlayerHit = (player: PlayersUnion, hitValues: Partial<HitItem>) => {
    
    setHit((prev) => ({ ...prev, [player]: { ...prev[player], ...hitValues } }));
  };
  const handleResetHit = (player?: PlayersUnion) => {
    if (player) {
      setHit((prev) => ({ ...prev, [player]: INITIAL_HIT }));
    } else {
      setHit(INITIAL_PLAYER_HIT);
    }
  };
  const handleSubmitPlayerHit = (player: PlayersUnion, damage: number) => {
    setHistory((prev) => {
      const lastItem = prev[prev.length - 1];
      const p = player === PLAYERS.player1 ? PLAYERS.player2 : PLAYERS.player1

      return [...prev, { ...lastItem, [p]: lastItem[p] - damage }];
    });
    setHit((prev) => ({ ...prev, [player]: INITIAL_HIT }));
  };

  return (
    <HitContext.Provider
      value={{
        hit,
        handleUpdatePlayerHit,
        handleResetHit,
        handleSubmitPlayerHit,
      }}
    >
      {children}
    </HitContext.Provider>
  );
};

export const useHitContext = () => {
  const context = useContext(HitContext);

  if (context === null) {
    throw new Error(
      "Hit state not found. Try wrapping a parent component with <HitProvider>."
    );
  }

  return context;
};
