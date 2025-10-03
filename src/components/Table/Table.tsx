import React from "react";
import { CardContext } from "../CardProvider/CardProvider";
import Card from "../Card/Card";

export default function Table() {
  const { shuffleDeck, handCards, communityCards } = React.useContext(
    CardContext
  ) ?? {
    shuffleDeck: () => {},
    handCards: [],
    communityCards: [],
  };

  React.useEffect(() => {
    shuffleDeck();
  }, []);

  return (
    <>
      <button onClick={() => shuffleDeck()}>SHUFFLE</button>
      {communityCards.map((card) => (
        <Card key={card.rank + card.suit} rank={card.rank} suit={card.suit} />
      ))}
      <h2>HANDS</h2>
      {handCards.map((hand) => (
        <div key={hand[0].rank + hand[0].suit}>
          <Card
            key={hand[0].rank + hand[0].suit}
            rank={hand[0].rank}
            suit={hand[0].suit}
          />
          <Card
            key={hand[1].rank + hand[1].suit}
            rank={hand[1].rank}
            suit={hand[1].suit}
          />
        </div>
      ))}
    </>
  );
}
