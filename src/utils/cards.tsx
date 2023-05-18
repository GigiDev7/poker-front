const generateCards = () => {
  const result = [];
  const cards = [
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "J",
    "Q",
    "K",
    "A",
  ];
  const suits = ["H", "D", "S", "C"];
  for (let i = 0; i < suits.length; i++) {
    for (let j = 0; j < cards.length; j++) {
      const card = `${cards[j]}${suits[i]}`;
      result.push(card);
    }
  }
  return result;
};

const chooseRandomCard = (cards: string[], usedCards: string[] = []) => {
  let filteredCards = [...cards];
  if (usedCards.length > 0) {
    filteredCards = filteredCards.filter((c) => !usedCards.includes(c));
  }
  const rand = Math.floor(Math.random() * filteredCards.length);
  return filteredCards[rand];
};

const cards = generateCards();

export default cards;
