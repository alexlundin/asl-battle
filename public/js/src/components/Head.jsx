import React from 'react'
import { BsCalendar } from "react-icons/bs";

export const Head = ( {first, second, date} ) => {
    const newDate = new Date( date.split( ' ' )[0] )
    const options = {year: 'numeric', month: 'long', day: 'numeric'};
    return (
        <>
            <div className="battle-title-main">
                <div role="heading" className="block-battle battle-title p-name">
                    <div className="battle-title-side-a">
                        <div>{first}</div>
                    </div>
                    <div className="battle-title-vs">
                        <div className="battle-title-vs-text">vs</div>
                    </div>
                    <div className="battle-title-side-b">
                        <div>{second}</div>
                    </div>
                </div>
                <div className="post-actions-line">
                    <span
                        className="post-actions-line-item"><BsCalendar/>{newDate.toLocaleDateString( "en-US", options )}</span>
                </div>
            </div>
        </>
    )
}
