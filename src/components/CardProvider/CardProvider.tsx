import React from "react";
import { RANKS, SUITS, type CardType } from "../../models/card-models";

// Four hands, indexes 0 - 7
// Five board cards, index 8 - 12

type CardContextType = {
  deck: CardType[];
  setDeck: React.Dispatch<React.SetStateAction<CardType[]>>;
  shuffleDeck: () => void;
  handCards: CardType[][];
  communityCards: CardType[];
};
export const CardContext = React.createContext<CardContextType | undefined>(
  undefined
);

function CardProvider({ children }: { children: React.ReactNode }) {
  const FULL_DECK_OF_CARDS = React.useMemo(() => {
    return SUITS.flatMap((suit) => RANKS.map((rank) => ({ suit, rank })));
  }, [SUITS, RANKS]) as CardType[];

  const [deck, setDeck] = React.useState(FULL_DECK_OF_CARDS);
  const handCards = [
    [deck[0], deck[1]],
    [deck[2], deck[3]],
    [deck[4], deck[5]],
    [deck[6], deck[7]],
  ];
  const communityCards = [deck[8], deck[9], deck[10], deck[11], deck[12]];

  function shuffleDeck(): void {
    const deckCopy = [...deck];

    for (let i = deckCopy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deckCopy[i], deckCopy[j]] = [deckCopy[j], deckCopy[i]];
    }

    setDeck(deckCopy);
  }

  return (
    <CardContext.Provider
      value={{ deck, setDeck, shuffleDeck, handCards, communityCards }}>
      {children}
    </CardContext.Provider>
  );
}

export default CardProvider;
