import React from 'react';
import './SingleCard.css'
import cover from '../images/cover.jpg';
export default function SingleCard({card, handleChoice,flipped}){

const handleClick=()=>{
    if(!flipped){
        handleChoice(card);    /**if it is not disabled then we can make a choice */
    }
  
};

    return (
        <div className='card'>
            <div className={flipped ? "flipped" : ""}> 
              <img className='front' src={card.src} alt='card front'/>
              <img className='back' src={cover} onClick={handleClick} alt='card back'/>
            </div>
          </div>
          
    );
}