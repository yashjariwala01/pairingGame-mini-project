import React, { useState, useEffect } from 'react';
import './MemoryGame.css';

const MemoryGame = () => {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);

  // Initialize the game with cards
  useEffect(() => {
    const symbols = ['🍎', '🍌', '🥑', '🍒', '🍇', '🍓', '🍍', '🥝']; // Sample symbols
    const initialCards = [...symbols, ...symbols].sort(() => Math.random() - 0.5);
    setCards(initialCards);
  }, []);

  // Handle card click
  const handleCardClick = (index) => {
    if (flippedCards.length === 2) return;
    
    if (flippedCards.includes(index) || matchedCards.includes(index)) return;

    // Flip the card    
    const newFlippedCards = [...flippedCards, index];
    setFlippedCards(newFlippedCards);

    // Check for a match
    if (newFlippedCards.length === 2) {
      if (cards[newFlippedCards[0]] === cards[newFlippedCards[1]]) {
        setMatchedCards([...matchedCards, ...newFlippedCards]);
      }
      setTimeout(() => {
        setFlippedCards([]);
      }, 500);
    }
  };

  // Check if all cards are matched
  const allMatched = matchedCards.length === cards.length;

  return (
    <div className="flex flex-col items-center gap-4 pt-3 memory-game bg-gradient-to-r from-red-300 via-red-500 to-purple-400 h-[100vh]">
      <h1 className='font-bold text-5xl '>Finding Pairs Game</h1>
      <h2 className='italic font-semibold text-2xl'>Match Everyone out</h2>
      <div className={`card-grid border-8 border-green-200 rounded-xl border-black border-solid p-2 ${allMatched ? 'invisible absolute':''}`}>
        {cards.map((symbol, index) => <RenderCard key={index} index={index} symbol={symbol} flippedCards={flippedCards} matchedCards={matchedCards} handleCardClick={handleCardClick}/>)}
      </div>
      {allMatched && <div className="absolute border-b-4 border-t-4 right-0 left-0 top-[40vh] bg-blue-600 p-12 font-semibold text-2xl text-white">Congratulations! You've matched all the cards!</div>}
    </div>
  );
};

export default MemoryGame;

// Render the card
const RenderCard = ({index, symbol,flippedCards,matchedCards, handleCardClick}) => {

  const isFlipped = flippedCards.includes(index) || matchedCards.includes(index);

  return (
    <div
      key={index}
      className={`card bg-blue-400 ${isFlipped ? 'flipped' : ''}`}
      onClick={() => handleCardClick(index)}
    >
      {isFlipped ? symbol : ''}
    </div>
  );
};


