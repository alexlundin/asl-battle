import React from 'react';

const BattleStats = ({first, second, arg}) => {
    let firstPluses = 0
    let secondPluses = 0
    let firstArguments = 0
    let secondArguments = 0
    let firstPercent = 0
    let secondPercent = 0


    arg.map(item => {
        if (item.argument === 'first' && item.moderate == '1') {
            firstArguments++
            firstPluses += parseInt(item.rating)
        } else if (item.argument === 'second' && item.moderate == '1') {
            secondArguments++
            secondPluses += parseInt(item.rating)
        }
    })
    const part = 100 / (firstArguments + secondArguments)
    firstPercent = part * firstArguments * 100
    secondPercent = part * secondArguments * 100

    return (
        <div className="battle-stats">
            <div className="battle-stats-arguments battle-side-a-color"><strong>{firstArguments} argument and {firstPluses} pluses</strong><br/>
                <small>for «{first}»</small></div>
            <div className="battle-stats-graph">
                <div className="battle-side-a-background" style={{width: `${firstPercent}%`}}></div>
                <div className="battle-side-b-background" style={{width: `${secondPercent}%`}}></div>
            </div>
            <div className="battle-stats-arguments battle-side-b-color" style={{textAlign:'right'}}><strong>
                {secondArguments} argument and {secondPluses} pluses</strong><br/> <small>for «{second}»</small></div>
        </div>
    );
};

export default BattleStats;
