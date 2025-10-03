import React from "react";
import { CardContext } from "../CardProvider/CardProvider";
import Card from "../Card/Card";

export default function Table() {
  const {
    shuffleDeck,
    hands,
    communityCards,
    getHandRankDescription,
    getWinningHandId,
  } = React.useContext(CardContext) ?? {
    shuffleDeck: () => {},
    hands: [],
    communityCards: [],
    getHandRankDescription: () => "",
    getWinningHandId: () => null,
  };

  React.useEffect(() => {
    shuffleDeck();
  }, []);

  function sumbmitGuess(handId: string) {
    const winningHandId = getWinningHandId();
    if (handId === winningHandId) {
      alert("You win!");
    } else {
      alert("You lose!");
    }
  }

  return (
    <>
      <button onClick={() => shuffleDeck()}>SHUFFLE</button>
      {communityCards.map((card) => (
        <Card key={card.rank + card.suit} rank={card.rank} suit={card.suit} />
      ))}
      <h2>HANDS</h2>
      {hands.map((hand) => (
        <button key={hand.id} onClick={() => sumbmitGuess(hand.id)}>
          <Card
            key={hand.cardsInHand[0].rank + hand.cardsInHand[0].suit}
            rank={hand.cardsInHand[0].rank}
            suit={hand.cardsInHand[0].suit}
          />
          <Card
            key={hand.cardsInHand[1].rank + hand.cardsInHand[1].suit}
            rank={hand.cardsInHand[1].rank}
            suit={hand.cardsInHand[1].suit}
          />
          <h2>{getHandRankDescription(hand)}</h2>
        </button>
      ))}
    </>
  );
}
