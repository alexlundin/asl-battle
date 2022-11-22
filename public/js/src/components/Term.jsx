import React, { useEffect, useState } from 'react';
import Avatar from 'react-avatar';
import axios from "axios";

export const Term = ( {rating, text, name, date, id} ) => {
    const newDate = new Date( date.split( ' ' )[0] )
    const options = {year: 'numeric', month: 'long', day: 'numeric'};
    const {asl_rest_uri, nonce} = asl_battle
    const [ status, setStatus ] = useState( false );
    const [ countRating, setCountRating ] = useState( rating );

    useEffect( () => {
        return () => {
            for (let i = 0; i < localStorage.length; i++) {
                let key = localStorage.key( i );
                if (key === `${id}`) {
                    setStatus( true )
                }
            }
        };
    }, [] );

    const updRating = () => {
        const body = new FormData()
        body.append('id', id)
        body.append('rating',  parseInt( rating ) + 1)
        body.append('_wpnonce', nonce)

        axios.post( `${asl_rest_uri}asl-battle/v1/battles/${id}`, body ).then( function ( response ) {
            if (response.status !== 200) {
                throw new Error( 'Can\'t add poll. Server error.' );
            }
            setStatus( true )
            setCountRating( parseInt( rating ) + 1 )
            localStorage.setItem( `${id}`, true )
        } )
    }

    return (
        <>
            <div className="block-battle post post-layout-block post-type-battle">
                <div className="post-upvote">
                     <span className={`upvote ${status && 'upvote-disabled'}`} onClick={() => {
                         updRating()
                     }}>
                               {!status && <span>▲</span>}
                         {countRating}
                     </span>
                    <div className="clearfix20"></div>
                </div>
                <div className="text-body text-body-layout-notitle text-body-type-post e-content">
                    {text}
                </div>
                <div className="post-footer">
                    <div className="p-author">
                        <article className="user user-small">
                            <span className="user-avatar">
                                <span className="avatar">
                                      <Avatar name={name} size={42}  round={true} textSizeRatio={2}/>
                                </span>
                            </span>
                            <span className="user-info">
                                <span>
                                    <span className="user-name ">{name}</span>
                                </span>
                            </span>
                            <span className="user-footer">{newDate.toLocaleDateString( "en-US", options )}</span>
                        </article>
                    </div>
                </div>
            </div>
        </>
    )
}
