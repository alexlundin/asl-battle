import React, {useEffect} from 'react';
import PageHeader from '../components/PageHeader';
import {message} from "antd";
import {useCreateBattleMutation} from "../redux/api/battle";
import {IBattle} from "../types/types";
import {useNavigate} from "react-router-dom";
import FormBattle from "../components/FormBattle";

const AddBattle = () => {

    const navigate = useNavigate()
    const [createBattle, {isSuccess, error, isError, data}] = useCreateBattleMutation()

    useEffect(() => {
        if (isSuccess) {
            message.success({
                content: 'Successfully add the battle.', style: {
                    marginTop: '20px',
                },
            });
            navigate('/')
        }
        if (isError) {
            message.error({
                content: {error}, style: {
                    marginTop: '20px',
                },
            });
        }
    }, [data]);

    const onFinish = (values: IBattle) => {
        createBattle(values)
    };

    return (
        <>
            <PageHeader text={<h1 className="wp-heading-inline">Add New Battle</h1>}></PageHeader>
            <FormBattle name="add" onFinish={onFinish} textBtn="Add"/>
        </>
    );
};

export default AddBattle;
