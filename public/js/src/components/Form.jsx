import React, {useState} from 'react';
import { useForm } from "react-hook-form";
import { BsCheck2Circle } from 'react-icons/bs';
import axios from "axios";


const Form = ( {battle} ) => {
    const {asl_rest_uri, nonce} = asl_battle
    const [status, setStatus] = useState(false)
    const {register, handleSubmit, errors} = useForm( {
        defaultValues: {
            id_item: battle.id,
            rating: 0,
            moderate: false,
            _wpnonce: nonce
        }
    } );
    const onSubmit = ( data ) => {
        axios.post( `${asl_rest_uri}asl-battle/v1/battles/${battle.id}/arguments/`, data ).then( function ( response ) {
            if (response.status !== 200) {
                throw new Error( 'Can\'t add poll. Server error.' );
            }

            setStatus(true)
        } )

    };
    if (errors) {
        console.log( errors );
    }


    if (!status) {
        return (
            <form onSubmit={handleSubmit( onSubmit )} className="block-battle">
                <div className="formItem">
                    <input type="hidden" {... register( "id_item" )} />
                    <input type="hidden" {... register( "_wpnonce" )} />
                    <input type="hidden" {... register( "rating" )} />
                    <input type="hidden" {... register( "moderate" )} />
                    <label>Your name: </label>
                    <input
                        type="text"
                        {... register( "username", {required: true, maxLength: 80} )}
                    />
                </div>
                <div className="formItem">
                    <label>I am for:</label>
                    <select name="argument" {... register( "argument", {required: true} )}>


                        <option value="first">{battle.first_argument_head}</option>
                        <option value="second">{battle.second_argument_head}</option>
                    </select>
                </div>
                <div className="formItem">
                    <label>Briefly your argument:</label>
                    <input
                        type="text"
                        {... register( "title", {required: true, maxLength: 100} )}
                    />
                </div>
                <div className="formItem">
                    <label>Вetailed response:</label>
                    <textarea rows='4'
                              {... register( "text", {
                                  required: true,
                              } )}
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
                <p>Your argument will be added after verification.</p>
            </div>
        )
    }
};

export default Form;
