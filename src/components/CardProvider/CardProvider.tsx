import React from "react";
import {
  RANKS,
  SUITS,
  toPheCardString,
  type Hand,
  type CardType,
} from "../../models/card-models";
import { evaluateCards, rankDescription, handRank } from "phe";

type CardContextType = {
  deck: CardType[];
  setDeck: React.Dispatch<React.SetStateAction<CardType[]>>;
  shuffleDeck: () => void;
  hands: Hand[];
  communityCards: CardType[];
  getHandRankDescription: (hand: Hand) => string;
  getWinningHandId: () => string;
  revealHand?: (handId: string) => void;
  revealAllHands?: () => void;
};
export const CardContext = React.createContext<CardContextType | undefined>(
  undefined
);

function CardProvider({ children }: { children: React.ReactNode }) {
  const FULL_DECK_OF_CARDS = React.useMemo(() => {
    return SUITS.flatMap((suit) => RANKS.map((rank) => ({ suit, rank })));
  }, [SUITS, RANKS]) as CardType[];

  const [deck, setDeck] = React.useState(FULL_DECK_OF_CARDS);
  const communityCards = [deck[8], deck[9], deck[10], deck[11], deck[12]];
  const [hands, setHands] = React.useState<Hand[]>(createDefaultHands());

  React.useEffect(() => {
    setHands(createDefaultHands());
  }, [deck]);

  function shuffleDeck(): void {
    const deckCopy = [...deck];

    for (let i = deckCopy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deckCopy[i], deckCopy[j]] = [deckCopy[j], deckCopy[i]];
    }

    setDeck(deckCopy);
  }

  function createDefaultHands(): Hand[] {
    return [
      createHand(deck[0], deck[1]),
      createHand(deck[2], deck[3]),
      createHand(deck[4], deck[5]),
      createHand(deck[6], deck[7]),
    ];
  }

  function createHand(card1: CardType, card2: CardType): Hand {
    const handId = card1.rank.toString() + card1.suit.toString();

    return {
      id: handId,
      cardsInHand: [card1, card2],
      bestCombination: getHandRankDescription({
        id: handId,
        cardsInHand: [card1, card2],
      }),
      isHidden: true,
    };
  }

  function getHandRankDescription(hand: Hand): string {
    const allCards = [...communityCards, ...hand.cardsInHand].map(
      toPheCardString
    );
    const evaluation = evaluateCards(allCards);
    const rank = handRank(evaluation);
    return rankDescription[rank];
  }

  function getWinningHandId(): string {
    const handValues = hands.map((hand) => {
      const allCards = [...communityCards, ...hand.cardsInHand].map(
        toPheCardString
      );
      const evaluation = evaluateCards(allCards);
      return { hand, value: evaluation.value };
    });

    const winning = handValues.reduce((best, current) =>
      current.value < best.value ? current : best
    );

    return winning.hand.id;
  }

  function revealHand(handId: string) {
    setHands((prevHands) => {
      return prevHands.map((hand) =>
        hand.id === handId ? { ...hand, isHidden: false } : hand
      );
    });
  }

  function revealAllHands() {
    setHands((prevHands) => {
      return prevHands.map((hand) => ({ ...hand, isHidden: false }));
    });
  }

  return (
    <CardContext.Provider
      value={{
        deck,
        setDeck,
        shuffleDeck,
        hands,
        communityCards,
        getHandRankDescription,
        getWinningHandId,
        revealHand,
        revealAllHands,
      }}>
      {children}
    </CardContext.Provider>
  );
}

export default CardProvider;
