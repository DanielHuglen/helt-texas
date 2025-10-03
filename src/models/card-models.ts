export type CardSuit = "clubs" | "diamonds" | "hearts" | "spades";
export type CardRank =
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9"
  | "10"
  | "jack"
  | "queen"
  | "king"
  | "ace";
export type CardType = { suit: CardSuit; rank: CardRank };

export const SUITS = ["hearts", "diamonds", "clubs", "spades"] as CardSuit[];
export const RANKS = [
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "jack",
  "queen",
  "king",
  "ace",
] as CardRank[];

export type Hand = {
  id: string;
  cardsInHand: [CardType, CardType];
  bestCombination?: string;
  isHidden?: boolean;
};

export function toPheCardString(card: CardType): string {
  const rankMap: Record<CardRank, string> = {
    "2": "2",
    "3": "3",
    "4": "4",
    "5": "5",
    "6": "6",
    "7": "7",
    "8": "8",
    "9": "9",
    "10": "T",
    jack: "J",
    queen: "Q",
    king: "K",
    ace: "A",
  };
  const suitMap: Record<CardSuit, string> = {
    clubs: "c",
    diamonds: "d",
    hearts: "h",
    spades: "s",
  };
  return rankMap[card.rank] + suitMap[card.suit];
}
