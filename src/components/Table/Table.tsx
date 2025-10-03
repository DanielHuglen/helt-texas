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

  const [secondCount, setSecondCount] = React.useState(0);
  const [intervalId, setIntervalId] = React.useState<number | null>(null);
  const [hasWon, setHasWon] = React.useState<boolean | null>(null);
  const [selectedHandId, setSelectedHandId] = React.useState<string | null>(
    null
  );

  React.useEffect(() => {
    shuffleDeck();
  }, []);

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

  function resetGame(): void {
    if (intervalId) {
      window.clearInterval(intervalId);
      setIntervalId(null);
    }
    setHasWon(null);
    shuffleDeck();
    setSecondCount(0);
  }

  function sumbmitGuess(handId: string) {
    if (intervalId) {
      window.clearInterval(intervalId);
      setIntervalId(null);
    }

    setSelectedHandId(handId);

    const winningHandId = getWinningHandId();
    if (handId === winningHandId) {
      setHasWon(true);
    } else {
      setHasWon(false);
    }
  }

  function getHandButtonClass(
    hasWon: boolean | null,
    winningHandId: string | null,
    handId: string
  ) {
    const classes = [];

    if (hasWon !== null) {
      classes.push(winningHandId === handId ? "has-won" : "has-lost");
    }

    if (selectedHandId === handId) {
      classes.push("selected");
    }
    return classes.join(" ");
  }

  return (
    <>
      <button onClick={() => resetGame()} className="shuffle-button">
        RESET
        {hasWon}
      </button>
      <div className="community-cards">
        {communityCards.map((card) => (
          <Card key={card.rank + card.suit} rank={card.rank} suit={card.suit} />
        ))}
      </div>
      <div className="hands-container">
        {hands.map((hand) => (
          <button
            key={hand.id}
            onClick={() => sumbmitGuess(hand.id)}
            disabled={hasWon !== null || hand.isHidden || secondCount < 1}
            className={getHandButtonClass(hasWon, getWinningHandId(), hand.id)}>
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
            {hasWon !== null && <h2>{getHandRankDescription(hand)}</h2>}
          </button>
        ))}
      </div>
      <div className="game-controls">
        {hands[0].isHidden && (
          <button onClick={() => revealHand && revealHand(hands[0].id)}>
            REVEAL YOUR HAND
          </button>
        )}
        {!intervalId && hasWon === null && (
          <button onClick={() => startGame()}>START GAME</button>
        )}
      </div>
      <h2 className="second-counter">{secondCount}&nbsp;seconds</h2>
    </>
  );
}
