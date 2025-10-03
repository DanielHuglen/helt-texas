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
    revealHand,
    revealAllHands,
  } = React.useContext(CardContext) ?? {
    shuffleDeck: () => {},
    hands: [],
    communityCards: [],
    getHandRankDescription: () => "",
    getWinningHandId: () => null,
    revealHand: () => {},
    revealAllHands: () => {},
  };

  //   React.useEffect(() => {
  //   const intervalId = window.setInterval(() => {
  //     setCount((currentCount) => {
  //       return currentCount + 1;
  //     });
  //   }, 1000);

  //   return () => {
  //     window.clearInterval(intervalId);
  //   };
  //   // eslint-disable-next-line
  // }, []);

  const [secondCount, setSecondCount] = React.useState(0);
  const [intervalId, setIntervalId] = React.useState<number | null>(null);

  React.useEffect(() => {
    shuffleDeck();
  }, []);

  // When revealing all cards, start the game by starting the timer
  function startGame(): void {
    setSecondCount(0);
    revealAllHands && revealAllHands();
    setIntervalId(
      window.setInterval(() => {
        console.log("tick");

        setSecondCount((currentCount) => {
          return currentCount + 1;
        });
      }, 1000)
    );
  }

  function sumbmitGuess(handId: string) {
    if (intervalId) {
      window.clearInterval(intervalId);
      setIntervalId(null);
    }

    const winningHandId = getWinningHandId();
    if (handId === winningHandId) {
      alert("You win!");
    } else {
      alert("You lose!");
    }
  }

  return (
    <>
      <h2>{secondCount}</h2>
      <button onClick={() => shuffleDeck()}>SHUFFLE</button>
      {communityCards.map((card) => (
        <Card key={card.rank + card.suit} rank={card.rank} suit={card.suit} />
      ))}
      <h2>HANDS</h2>
      <button onClick={() => revealHand && revealHand(hands[0].id)}>
        REVEAL YOUR HAND
      </button>
      <button onClick={() => startGame()}>START GAME</button>
      {hands.map((hand) => (
        <button
          key={hand.id}
          onClick={() => sumbmitGuess(hand.id)}
          disabled={hand.isHidden || secondCount < 1}>
          <Card
            key={hand.cardsInHand[0].rank + hand.cardsInHand[0].suit}
            rank={hand.cardsInHand[0].rank}
            suit={hand.cardsInHand[0].suit}
            isHidden={hand.isHidden}
          />
          <Card
            key={hand.cardsInHand[1].rank + hand.cardsInHand[1].suit}
            rank={hand.cardsInHand[1].rank}
            suit={hand.cardsInHand[1].suit}
            isHidden={hand.isHidden}
          />
          <h2>{getHandRankDescription(hand)}</h2>
        </button>
      ))}
    </>
  );
}
