import React, {useEffect} from 'react';
import PageHeader from "../components/PageHeader";
import {message, Tabs} from "antd";
import FormBattle from "../components/FormBattle";
import {IBattle} from "../types/types";
import {useUpdateBattleMutation} from "../redux/api/battle";
import {useParams} from 'react-router-dom';
import ArgumentTab from "../components/ArgumentTab";


const EditBattle = () => {
    const params = useParams()
    const id: string = params.id ? params.id : ''
    const [updateBattle, {data, isSuccess, isError, error}] = useUpdateBattleMutation()
    const onFinish = (values: IBattle) => {
        updateBattle(values)
    }
    const items = [
        {
            label: 'Main info',
            forceRender: true,
            key: 'main',
            children: (<FormBattle name="edit" onFinish={onFinish} textBtn="Update" id={id}/>)
        },
        {
            label: 'Arguments',
            key: 'arguments',
            forceRender: true,
            children: (<ArgumentTab id={id}/>)
        }
    ];

    useEffect(() => {
        if (isSuccess) {
            message.success({
                content: 'Successfully update the battle.', style: {
                    marginTop: '20px',
                },
            });
        }
        if (isError) {
            message.error({
                content: {error}, style: {
                    marginTop: '20px',
                },
            });
        }
    }, [data]);

    return (
        <>
            <PageHeader text={<h1 className="wp-heading-inline">Edit Battle</h1>}/>
            <Tabs items={items} animated={true}/>
        </>
    );
};

export default EditBattle;
