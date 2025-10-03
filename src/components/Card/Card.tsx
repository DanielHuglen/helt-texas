import type { CardRank, CardSuit } from "../../models/card-models";

type CardProps = {
  suit: CardSuit;
  rank: CardRank;
  isHidden?: boolean;
};

export default function Card({
  suit = "hearts",
  rank = "ace",
  isHidden = false,
}: CardProps) {
  const backImageUrl = `src/assets/card-images/back.svg`;
  let imageUrl = `src/assets/card-images/${rank}_of_${suit}.svg`;
  const altImageText = `${rank} of ${suit}`;

  return <img src={isHidden ? backImageUrl : imageUrl} alt={altImageText} />;
}
