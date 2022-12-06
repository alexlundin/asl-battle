import React, {useEffect, useState} from 'react';
import PageHeader from "../components/PageHeader";
import {Button, Divider, message, Modal, Switch, Table} from "antd";
import {ColumnsType} from "antd/es/table";
import {CheckOutlined, CloseOutlined, ExclamationCircleOutlined} from "@ant-design/icons";
import {useDeleteCommentMutation, useEditCommentMutation, useFetchBattlesQuery} from "../redux/api/battle";
import ModalFormComment from "../components/ModalFormComment";

interface DataType {
    key: string
    id: string
    battle_name: string
    id_battle: string
    argument: object
    text: string
    username: string
    moderate: boolean
    actions: string
}

interface DeleteProp {
    battle_id: string;
    id: string;
}

const CommentsPage = () => {
    const {confirm} = Modal;

    const {data = [], refetch, isLoading, error} = useFetchBattlesQuery('', {
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })
    const [editComment, {isSuccess}] = useEditCommentMutation()
    const [deleteComment, {isSuccess: isDelete}] = useDeleteCommentMutation()
    const commentsBattle: DataType[] = []
    const showDeleteConfirm = ({battle_id, id}: DeleteProp) => {
        confirm({
            title: 'Are you sure, You want to delete this comment?',
            icon: <ExclamationCircleOutlined/>,
            okText: 'Yes, delete',
            okType: 'danger',
            cancelText: 'Cancel',
            onOk() {
                deleteComment({battle_id, id})
            },
            onCancel() {
                message.info({
                    content: 'Delete canceled', style: {
                        marginTop: '20px',
                    },
                });
            },
        });
    };

    useEffect(() => {
        if (isSuccess) {
            message.success({
                content: 'Successfully update comment.', style: {
                    marginTop: '20px',
                },
            });
        }

        if (isDelete && !isSuccess) {
            message.success({
                content: 'Successfully delete the argument.', style: {
                    marginTop: '20px',
                },
            });
        }

        if (error) {
            message.error({
                content: {error}, style: {
                    marginTop: '20px',
                },
            });
        }
    }, [data]);

    if (data) {
        for (const item of data) {
            for (const comment of item.comments) {
                commentsBattle.unshift({
                    key: comment.id,
                    battle_name: item.title,
                    username: comment.comment_author,
                    id_battle: comment.comment_battle_id,
                    id: comment.id,
                    text: comment.comment_text,
                    argument: item.arguments.filter(item => item.id === comment.comment_argument_id)[0],
                    moderate: Boolean(parseInt(comment.comment_moderate)),
                    actions: comment.id
                })
            }
        }
    }

    const handleSwitchChange = (record: any, check: boolean) => {
        const vals = {
            id: record.id,
            comment_battle_id: record.id_battle,
            comment_moderate: check
        }
        editComment(vals)
        refetch()
    }


    const columns: ColumnsType<DataType> = [
        {
            title: 'ID',
            dataIndex: 'id',
            width: "3%",
            sorter: (a, b) => parseInt(a.id) - parseInt(b.id),
            render: (id, record) => {
                return (<Button type="link" onClick={() => {
                    setOpen(true);
                    setCommentID(id)
                    setBattleID(record.id_battle)
                }}>{id}</Button>)
            }
        },
        {
            title: 'Battle name',
            dataIndex: 'battle_name',
            width: '20%'
        },
        {
            title: 'Argument',
            dataIndex: 'argument',
            render: (argument) => {
                return argument.title
            }
        },
        {
            title: 'Text',
            dataIndex: 'text',
        },
        {
            title: 'Author name',
            dataIndex: 'username',
            width: '10%'
        },
        {
            title: 'Public',
            dataIndex: 'moderate',
            width: '5%',
            render: (e, record) => {
                return (
                    <Switch
                        checkedChildren={<CheckOutlined/>}
                        unCheckedChildren={<CloseOutlined/>}
                        onChange={(checked) => {
                            handleSwitchChange(record, checked)
                        }}
                        defaultChecked={e}
                        checked={e}
                    />
                )
            }
        },
        {

            title: 'Actions',
            dataIndex: 'actions',
            width: 200,
            render: (id, record) => {
                return (<>
                    <Button type="link" onClick={() => {
                        setOpen(true);
                        setCommentID(record.id)
                        setBattleID(record.id_battle)
                    }}>Edit</Button>
                    <Divider type='vertical'/>
                    <Button
                        danger
                        type="link"
                        onClick={() => {
                            showDeleteConfirm({battle_id: record.id_battle, id: record.id})
                        }}
                    >Delete</Button>
                </>)
            }
        },
    ];

    const [open, setOpen] = useState(false)
    const [battleId, setBattleID] = useState('')
    const [commentId, setCommentID] = useState('')


    const onCreate = (values: any) => {
        editComment(values)
        refetch()
        setOpen(false)
    }



    return (
        <>
            <PageHeader text={<h1 className="wp-heading-inline" style={{fontSize: 18}}>Comments</h1>}/>
            {/*<ModalFormComment*/}
            {/*    open={open}*/}
            {/*    onCreate={onCreate}*/}
            {/*    onCancel={() => {*/}
            {/*        setOpen(false);*/}
            {/*    }}*/}
            {/*    id={battleId}*/}
            {/*    commentId={commentId}/>*/}
            <Table bordered={true}
                   columns={columns}
                   dataSource={commentsBattle}
                   loading={isLoading}
            />

        </>
    );
};

export default CommentsPage;
