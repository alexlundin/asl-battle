import { registerBlockType } from '@wordpress/blocks';
import { useEffect, useState } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';
import { useBlockProps } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import { Card, CardHeader, FlexBlock, SelectControl, } from '@wordpress/components';

registerBlockType(
    'asl/asl-battle', {
        apiVersion: 2,
        title: 'WP Battle',
        category: 'text',
        icon: 'format-chat',
        attributes: {
            battleId: {
                type: 'string'
            }
        },
        edit: ( {attributes, setAttributes} ) => {
            const {battleId} = attributes
            const [ battleData, setBattleData ] = useState( null )
            let battles = [ {label: __( 'No Battles found. Please add a battle first', 'asl-battles' )} ]
            useEffect(() => {
                apiFetch( {path: '/asl-battle/v1/battles'} ).then( ( posts ) => {
                    if (posts.length !== 0) {
                        setAttributes( {battleId: posts[0]['id']} )
                    } else {
                        setAttributes( {battleId: undefined} )
                    }
                    setBattleData( posts )
                } )
            }, [])
            if (battleData) {
                battles = []
                for (const post of battleData) {
                    battles.push( {
                        label: post['title'], value: post['id']
                    } )
                }

                if (battleData.length === 0) {
                    battles.push( {
                        label: __( 'No Battles found. Please add a battle first', 'asl-battles' )
                    } )
                }
            }

            const blockProps = useBlockProps( {
                className: 'asl-battle-block',
            } );

            return (
                <div {...blockProps}>
                    <Card>
                        <CardHeader isShady={true} size='large'>
                            <FlexBlock>
                                <SelectControl
                                    label={__( 'Select a battle', 'asl-battles' )}
                                    value={battleId}
                                    options={battles}
                                    onChange={( newId ) => setAttributes( {battleId: newId} )}
                                />
                            </FlexBlock>
                        </CardHeader>
                    </Card>
                </div>
            )
        }
    }
)
