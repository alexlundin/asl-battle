import React, {useEffect, useState} from 'react';
import PageHeader from "../components/PageHeader";
import {Badge, message, Tabs} from "antd";
import FormBattle from "../components/FormBattle";
import {IBattle} from "../types/types";
import {useFetchArgumentsQuery, useGetCommentsQuery, useUpdateBattleMutation} from "../redux/api/battle";
import {useParams} from 'react-router-dom';
import ArgumentTab from "../components/ArgumentTab";
import CommentTab from "../components/CommentTab";


const EditBattle = () => {
    const params = useParams()
    const id: string = params.id ? params.id : ''
    const [updateBattle, {data, isSuccess, isError, error}] = useUpdateBattleMutation()
    const {data: args} = useFetchArgumentsQuery(id)
    const {data: comments} = useGetCommentsQuery(id)
    const [count, setCount] = useState(0)
    const [countComment, setCountComment] = useState(0)

    useEffect(() => {
        if (args) {
            const moderItem = args.filter(item => parseInt(item.moderate) === 0)
            setCount(moderItem.length)
        }
    }, [args]);

    useEffect(() => {
        if (comments) {
            const moderItem = comments.filter(item => item.comment_moderate === "")

            setCountComment(moderItem.length)
        }
    }, [comments]);


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
            label: <Badge count={count} offset={[13, 7]}>Arguments</Badge>,
            key: 'arguments',
            forceRender: true,
            children: (<ArgumentTab id={id}/>)
        },
        {
            label: <Badge count={countComment} offset={[13, 7]}>Comments</Badge>,
            key: 'comments',
            forceRender: true,
            children: (<CommentTab id={id}/>),
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
