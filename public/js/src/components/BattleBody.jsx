import React from 'react';
import BattleStats from "./BattleStats";
import Argument from "./Argument";

const BattleBody = ( {first, second, arg} ) => {
    let publicItem = arg.filter( item => item.moderate === '1' );
    const listArg = publicItem.map( ( item ) => {
        return (
            <Argument item={item} key={item.id} first={first} second={second}/>
        )
    } )

    return (
        <>
            <div className="content">
                <div id="comments" className="post-comments">
                    {arg.length !== 0 && <BattleStats first={first} second={second} arg={arg}/>}
                    <div className="post-comments-list">
                        {listArg}
                    </div>
                </div>
            </div>
        </>
    );
};

export default BattleBody;
