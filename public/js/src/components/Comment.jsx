import React, { useEffect, useState } from 'react';
import Avatar from "react-avatar";
import axios from "axios";

const Comment = ( {comment} ) => {
    const [ status, setStatus ] = useState( false );
    let date = new Date( comment.comment_date.split( ' ' )[0] )
    const options = {year: 'numeric', month: 'long', day: 'numeric'};
    const {asl_rest_uri, nonce} = asl_battle
    const [ countRating, setCountRating ] = useState( comment.comment_rating );


    useEffect( () => {
        return () => {
            for (let i = 0; i < localStorage.length; i++) {
                let key = localStorage.key( i );
                if (key === `${comment.id}-${comment.comment_argument_id}`) {
                    setStatus( true )
                }
            }
        };
    }, [] );

    const updRating = () => {
        const body = new FormData()
        body.append( 'comment_rating', parseInt( comment.comment_rating ) + 1 )
        body.append( '_wpnonce', nonce )

        axios.post(
            `${asl_rest_uri}asl-battle/v1/battles/${comment.comment_battle_id}/comments/${comment.id}`,
            body
        ).then( function ( response ) {
            setStatus( true )
            setCountRating( parseInt( comment.comment_rating ) + 1 )
            localStorage.setItem( `${comment.id}-${comment.comment_argument_id}`, true )
        } )
    }

    return (
        <div className="replies replies-indent-normal">
            <div className="reply">
                <div className="reply-header">
                    <span className="avatar reply-avatar">
                        <Avatar name={comment.comment_author} size={20} round={true} textSizeRatio={2}/>
                    </span>
                    <span className="comment-header-author-name">{comment.comment_author}</span>
                    <span className="reply-date"> {date.toLocaleDateString( "en-US", options )}</span>
                </div>
                <div className="reply-rating">
                    <span className={`upvote ${status && 'upvote-disabled'} upvote-type-inline`} onClick={() => {
                        updRating()
                    }}>{!status && <span>+</span>}{countRating}</span>
                </div>
                <div className="reply-body thread-collapse-toggle">
                    <div className="text-body text-body-type-comment">
                        {comment.comment_text}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Comment;
