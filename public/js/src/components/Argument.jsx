import React, { useState, useEffect } from 'react';
import Avatar from 'react-avatar';
import { BsFillReplyFill } from "react-icons/bs";
import axios from "axios";
import FormComment from "./FormComment";
import Comment from "./Comment";

const Argument = ( {item, first, second} ) => {

        let date = new Date( item.created_at.split( ' ' )[0] )
        const options = {year: 'numeric', month: 'long', day: 'numeric'};
        const [ visible, setVisible ] = useState( false )
        const [ countRating, setCountRating ] = useState( item.rating );
        const [ status, setStatus ] = useState( false );
        const {asl_rest_uri, nonce} = asl_battle
        const [ comments, setComments ] = useState( null )
        useEffect( () => {
            axios.get( `${asl_rest_uri}asl-battle/v1/battles/${item.id_item}/comments`, {} ).then( ( response ) => {
                setComments( response.data )
            } )

        }, [] );


        useEffect( () => {
            return () => {
                for (let i = 0; i < localStorage.length; i++) {
                    let key = localStorage.key( i );
                    if (key === `${item.id_item}-${item.id}`) {
                        setStatus( true )
                    }
                }
            };
        }, [] );

        const updRating = () => {
            const body = new FormData()
            body.append( 'id', item.id )
            body.append( 'id_item', item.id_item )
            body.append( 'rating', parseInt( item.rating ) + 1 )
            body.append( '_wpnonce', nonce )

            axios.post(
                `${asl_rest_uri}asl-battle/v1/battles/${item.id_item}/arguments/${item.id}`,
                body
            ).then( function ( response ) {
                if (response.status !== 200) {
                    throw new Error( 'Can\'t add poll. Server error.' );
                }
                setStatus( true )
                setCountRating( parseInt( item.rating ) + 1 )
                localStorage.setItem( `${item.id_item}-${item.id}`, true )
            } )
        }
        let publicComments = []
        if (comments) {
            publicComments = comments.filter( item => item.comment_moderate === '1' )
        }

        if (item.argument === 'second') {
            const secondComments = publicComments.filter( comment => comment.comment_argument_id === item.id )
            const lisSecondComment = secondComments.map( item => {
                return (
                    <Comment comment={item} key={item.id}/>
                )
            } )
            return (
                <div>
                    <div className="clearfix"></div>
                    <div className="battle-comment-prefix battle-comment-prefix-side-b">
                        for «{second}»
                    </div>
                    <div className="block-battle comment comment-type-battle comment-type-battle-side-b">
                        <div className="comment-header">
                            <div className="comment-title">{item.title}</div>
                            <div className="comment-type-battle-userinfo">
                            <span className="user user-tiny">
                            <span className="avatar user-avatar">
                                <Avatar name={item.username} size={20} round={true} textSizeRatio={2}/>
                            </span>
                                <span className="user-name ">{item.username}</span>
                            </span>
                                <span className="reply-date">
                                {date.toLocaleDateString( "en-US", options )}
                            </span>
                            </div>
                        </div>
                        <div className="comment-rating">
                            <span className={`upvote ${status && 'upvote-disabled'}`} onClick={() => {
                                updRating()
                            }}>
                               {!status && <span>▲</span>}
                                {countRating}
                            </span>
                        </div>
                        <div className="comment-body thread-collapse-toggle">
                            <div className="text-body text-body-type-comment">
                                {item.text}
                            </div>
                        </div>
                        <span className="comment-footer-button" onClick={() => {
                            setVisible( true )
                        }}>
                            <BsFillReplyFill/> reply
                        </span>
                    </div>
                    <div className="clearfix20"></div>
                    {visible &&
                        <FormComment argumentId={item.id} battleId={item.id_item}/>
                    }


                    {lisSecondComment}
                </div>
            )
        } else {
            const firstComments = publicComments.filter( comment => comment.comment_argument_id === item.id )
            const listFirstComment = firstComments.map( item => {
                return (
                    <Comment comment={item} key={item.id}/>
                )
            } )

            return (
                <div>
                    <div className="clearfix"></div>
                    <div className="battle-comment-prefix battle-comment-prefix-side-a">
                        for «{first}»
                    </div>
                    <div className="block-battle comment comment-type-battle comment-type-battle-side-a">
                        <div className="comment-header">
                            <div className="comment-title">{item.title}</div>
                            <div className="comment-type-battle-userinfo">
                                <span className="user user-tiny">
                            <span className="avatar user-avatar">
                               <Avatar name={item.username} size={20} round={true} textSizeRatio={2}/>
                            </span>
                                    <span className="user-name ">{item.username}</span>
                                </span>
                                <span className="reply-date">
                                    {date.toLocaleDateString( "en-US", options )}
                                </span>
                            </div>
                        </div>
                        <div className="comment-rating">
                            <span className={`upvote ${status && 'upvote-disabled'}`} onClick={() => {
                                updRating()
                            }}>
                                {!status && <span>▲</span>}
                                {countRating}
                            </span>
                        </div>
                        <div className="comment-body thread-collapse-toggle">
                            <div className="text-body text-body-type-comment">
                                {item.text}
                            </div>
                        </div>
                        <span className="comment-footer-button" onClick={() => {
                            setVisible( true )
                        }}>
                            <BsFillReplyFill/> reply
                        </span>
                    </div>
                    <div className="clearfix20"></div>
                    {visible &&
                        <FormComment argumentId={item.id} battleId={item.id_item}/>
                    }
                    {listFirstComment}
                </div>
            )
        }

    }
;

export default Argument;
