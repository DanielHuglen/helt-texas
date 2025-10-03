import type { CardRank, CardSuit } from "../../models/card-models";

type CardProps = {
  suit: CardSuit;
  rank: CardRank;
};

export default function Card({ suit = "hearts", rank = "ace" }: CardProps) {
  const imageUrl = `src/assets/card-images/${rank}_of_${suit}.svg`;
  const altImageText = `${rank} of ${suit}`;

  return <img src={imageUrl} alt={altImageText} />;
}
