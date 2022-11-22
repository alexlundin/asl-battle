import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import axios from "axios";
import { BsCheck2Circle } from "react-icons/bs";

const FormComment = ( {battleId, argumentId} ) => {
    const {asl_rest_uri, nonce} = asl_battle
    const [ status, setStatus ] = useState( false )
    const {register, handleSubmit, errors} = useForm( {
        defaultValues: {
            comment_battle_id: battleId,
            comment_argument_id: argumentId,
            comment_rating: 0,
            comment_moderate: false,
            _wpnonce: nonce
        }
    } );
    const onSubmit = ( data ) => {
        axios.post( `${asl_rest_uri}asl-battle/v1/battles/${battleId}/comments/`, data ).then( function ( response ) {
            if (response.status !== 200) {
                throw new Error( 'Can\'t add comment. Server error.' );
            }

            setStatus( true )
        } )

    };
    if (errors) {
        console.log( errors );
    }
    if (!status) {
        return (
            <form onSubmit={handleSubmit( onSubmit )} className="block-battle">
                <div className="formItem">
                    <input type="hidden" {... register( "battleId" )} />
                    <input type="hidden" {... register( "argumentId" )} />
                    <input type="hidden" {... register( "_wpnonce" )} />
                    <input type="hidden" {... register( "comment_rating" )} />
                    <input type="hidden" {... register( "moderate" )} />
                    <label>Your name: </label>
                    <input
                        type="text"
                        {... register( "comment_author", {required: true, maxLength: 80} )}
                    />
                </div>
                <div className="formItem">
                    <label>Text comment:</label>
                    <textarea rows='4'
                              {... register( "comment_text", {required: true, maxLength: 100} )}
                    />
                </div>
                <input type="submit" value="Send" className="btn"/>
            </form>
        );
    } else {
        return (
            <div className="block-battle window-success">
                <BsCheck2Circle color="#0b9d4a" size="120px"/>
                <h3>Success!</h3>
                <p>Your comment will be added after verification.</p>
            </div>
        )
    }
};

export default FormComment;
