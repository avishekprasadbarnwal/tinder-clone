import { SwipeableDrawer } from '@material-ui/core';
import React, {useState, useEffect} from 'react';
import TinderCard from "react-tinder-card";
import "./TinderCards.css";
import axios from './axios';

function TinderCards() {

    // declaration of state to manage react state
    const [people, setPeople] = useState([]);

    // declaring useEffect hook to perform some action
    // that our component needs to do after rendering
    useEffect(() => {
        async function fetchData(){
            const req = await axios.get('/tinder/card')
            
            setPeople(req.data);
        
        }
        fetchData();
        
    }, []);

    console.log(people)

    // Creating function for swiped response
    const swiped = (direction, nameToDelete) => {
        console.log("removing: " + nameToDelete);
        
    };

    // Creating function that will listen to the outOfFrame function
    const outOfFrame = (name) => {
        console.log(name + " left the screen!");
    };

    return (
        <div className="tinderCards">

            <div className="tinderCards__cardContainer">
                {people.map((person) => ( 
                        <TinderCard
                            className="swipe"
                            key={person.name}
                            preventSwipe={["up", "down"]}
                            onSwipe={(dir) => swiped(dir, person.name)}
                            onCardLeftScreen={() => outOfFrame(person.name)}
                        >
                            <div 
                                style={{ backgroundImage: `url(${person.imgUrl})` }}
                                className="card"
                            >
                                <h3>{person.name}</h3>
                            </div>
                        </TinderCard>
                                                 
                ))}
            </div>

            
        </div>
    )
}

export default TinderCards
