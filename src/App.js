//import logo from './logo.svg';
import dollImage from './images/doll.jpeg';
import ghostImage from './images/ghost.jpg';
import hauntedHouseImage from './images/hauntedHouse.jpg';
import pumpkinImage from './images/pumpkin.jpg';
import scaryNightImage from './images/scaryNight.png';
import skullImage from './images/skull.jpg';
import magicBroomImage from './images/magicBroom.jpg';
import wolfImage from './images/wolf.jpeg';
import scaryForestImage from './images/scaryForest.jpg';
import witchImage from './images/witch.webp';
import { useEffect,useState } from 'react';
import './App.css';
import SingleCard from './components/SingleCard';
/* creting an array of cards outside components because they are constant and they'll never need to change so they don't need to be stored in any kind of component */
/* also  the cards array won't get recreated everytime the component is re-evaluated */
const cardImages=[    /*each card in this array is an object and it has only one property i.e. source property which is a path to a specific image*/
    { src: dollImage, matched:false },
    { src: ghostImage, matched:false},
    { src: hauntedHouseImage, matched:false },
    { src: pumpkinImage, matched:false },
    { src: scaryNightImage, matched:false },
    { src: skullImage, matched:false },
    { src: magicBroomImage, matched:false},
    { src: wolfImage, matched:false},
    { src: scaryForestImage, matched:false},
    { src: witchImage, matched:false}
]
function App() {
  const [cards,setCards]=useState([]);
  const [turns, setTurns]=useState(0); //number of turns user takes to complete,starts with 0
  const [choiceOne, setChoiceOne]= useState(null);
  const [choiceTwo, setChoiceTwo]=useState(null);

  /** this function will do 3 thuings
   *1. take these objects(6 cards) and duplicate(12 cards) them and put them all inside the array
   *2. randomise the order of the cards in the array using sort method
   *3. apply random id to each of these cards and later use this id for outputting them in grid
   */
  const shuffleCards=()=>{  
    const shuffledCards=[...cardImages, ...cardImages]  /**taking the cardImages array using spread syntax(...) and creating duplicate of the cardImages*/

    //sort for each item in this array if we return number less than 0 order of those two items stays the same, and if greater than 0 order of those two items is mixed up
    .sort(()=>Math.random() - 0.5)  //so that sometimes it produde a positive number and somthimes a negative number.Objects are all shuffled now
    .map((card)=>({...card, id:Math.random()}))  //(...card)means taking the previous properties i.e. src and adding a new property i.e. id

    setChoiceOne(null);
    setChoiceTwo(null);

    //after shuffling,update the state 
    setCards(shuffledCards);
    setTurns(0);
  }

//handle a choice,taking an argument that user has chosen
const handleChoice=(card)=>{
   choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
};

//compare selected cards
useEffect(()=>{
    if(choiceOne && choiceTwo){ //we only want to do comparison when we have choice one selected and choice two selected
        if(choiceOne.src===choiceTwo.src){ //if both cards have same images
          setCards(prevCards=>{
            return prevCards.map(card=>{       //we are returning here a new array of cards
              if(card.src===choiceOne.src){
                return {...card, matched: true};
              }else{
                return card;
              }
            })
          })
          resetTurn();
        }else{
          setTimeout(()=> resetTurn(), 1000);      //if cards do not match then wait for 1000mili second and again flip them back
        }
    }
},[choiceOne,choiceTwo]);

//reset the choices and increment the turn
const resetTurn=()=>{
  setChoiceOne(null);
  setChoiceTwo(null);
  setTurns(prevTurns=>prevTurns+1);

};

//to start a new game automatically
useEffect(()=>{
   shuffleCards();
},[]);


  return (  
    //every time user clicks on this new game we wil call the function shuffleCards(),it will shuffle the cards and set turns back to 0
    <div className='App'>
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>New Game</button> 

       <div className='card-grid'>
        {cards.map((card)=>(
          <SingleCard key={card.id} card={card} handleChoice={handleChoice} flipped={card===choiceOne || card===choiceTwo || card.matched} />
        ))}
       </div>
       <p>Turns: {turns}</p>
    </div>
  );
}

export default App;
