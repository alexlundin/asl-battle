import React, { useState, useEffect } from 'react';
import { PulseLoader } from 'react-spinners';
import { Head } from "./components/Head";
import { Term } from "./components/Term";
import axios from "axios";
import BattleBody from "./components/BattleBody";
import Form from "./components/Form";

const App = ( {id} ) => {
    const {asl_rest_uri} = asl_battle
    const [ battle, setBattle ] = useState( null )
    useEffect( () => {
        axios.get( `${asl_rest_uri}asl-battle/v1/battles/${id}`, {} ).then( ( response ) => {
            setBattle( response.data )
        } )

    }, [] );

    return (
        <>
            {battle !== null ?
                <>
                    <Head first={battle.first_argument_head} second={battle.second_argument_head} date={battle.date}/>
                    <Term rating={battle.rating} text={battle.content} name={battle.username} id={battle.id}
                          date={battle.date}/>
                    <BattleBody first={battle.first_argument_head} second={battle.second_argument_head}
                                arg={battle.arguments}/>
                    <Form battle={battle}/>
                </>
                :
                <div style={{width: '100%', textAlign: 'center'}}>
                    <PulseLoader color="#36d7b7"/>
                </div>
            }
        </>
    );
};

export default App;
