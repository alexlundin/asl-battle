import React, {useEffect, useState} from 'react';
import PageHeader from "./PageHeader";
import {Button, Divider, message, Modal, Table} from "antd";
import {ColumnsType} from "antd/es/table";
import {CheckOutlined, CloseOutlined, ExclamationCircleOutlined} from "@ant-design/icons";
import {
    useAddCommentMutation,
    useDeleteCommentMutation,
    useEditCommentMutation,
    useGetCommentsQuery
} from "../redux/api/battle";
import ModalFormComment from "./ModalFormComment";
import {IComment} from "../types/types";

interface DataType {
    key: string
    id: string
    text: string
    moderate: boolean
    actions: string
}

interface DeleteProp {
    battle_id: string;
    id: string;
}

interface CommentProp {
    id: string;
}

const CommentTab = ({id = ''}: CommentProp) => {
    const {confirm} = Modal;

    const commentsBattle: DataType[] = []
    const [name, setName] = useState('')
    const [commentId, setCommentId] = useState('')
    const [commentTitle, setCommentTitle] = useState('Ass a new comment')
    const [btnText, setBtnText] = useState('Add')
    const [open, setOpen] = useState(false)

    const {data = [], isLoading} = useGetCommentsQuery(id)
    const [deleteComment, {isSuccess: isDelete}] = useDeleteCommentMutation()
    const [addComment, {isSuccess, error}] = useAddCommentMutation()
    const [editComment, {isSuccess: isUpdate}] = useEditCommentMutation()

    const columns: ColumnsType<DataType> = [
        {
            title: 'ID',
            dataIndex: 'id',
            width: '3%',
            sorter: (a, b) => parseInt(a.id) - parseInt(b.id),
            render: (id) => {
                return (<Button type="link" onClick={() => {
                    setOpen(true);
                    setBtnText('Update')
                    setCommentTitle('Edit comment')
                    setName('editComment')
                    setCommentId(id)
                }}>{id}</Button>)
            }
        },
        {
            title: 'Text',
            dataIndex: 'text',
        },
        {
            title: 'Public',
            dataIndex: 'moderate',
            width: '10%',
            render: (moderate: boolean) => {
                if (moderate) {
                    return <CheckOutlined style={{color: 'green', fontSize: 16}}/>
                } else {
                    return <CloseOutlined style={{color: 'red', fontSize: 16}}/>
                }
            }
        },
        {

            title: 'Actions',
            dataIndex: 'actions',
            width: '20%',
            render: (id) => {
                return (<>
                    <Button type="link" onClick={() => {
                        setOpen(true);
                        setName('editArg')
                        setBtnText('Update')
                        setCommentId(id)
                    }}>Edit</Button>
                    <Divider type='vertical'/>
                    <Button
                        danger
                        type="link"
                        onClick={() => {
                            const item = data.filter((item: IComment) => item.id === id)[0].comment_battle_id
                            console.log(item)
                            showDeleteConfirm({battle_id: item, id})
                        }}
                    >Delete</Button>
                </>)
            }
        },
    ];



    useEffect(() => {
        if (isSuccess) {
            message.success({
                content: 'Successfully add the new comment.', style: {
                    marginTop: '20px',
                },
            });
        }

        if (isUpdate && !isSuccess) {
            message.success({
                content: 'Successfully update the comment.', style: {
                    marginTop: '20px',
                },
            });
        }

        if (isDelete && !isSuccess && !isUpdate) {
            message.success({
                content: 'Successfully delete the comment.', style: {
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
    }, [data])

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

    const onCreate = (values: any) => {
        if (name === 'addComment') {
            setBtnText('Add')
            setCommentTitle('Add a new comment')
            addComment(values)
        } else {
            editComment(values)
            setBtnText('Update')
            setCommentTitle('Edit comment')
        }
        setOpen(false)
    }

    if (data) {
        for (const item of data) {
            commentsBattle.unshift({
                key: item.id,
                id: item.id,
                text: item.comment_text,
                moderate: Boolean(parseInt(item.comment_moderate)),
                actions: item.id
            })
        }
    }

    return (
        <>
            <PageHeader text={<h1 className="wp-heading-inline" style={{fontSize: 18}}>Comments</h1>}>
                <Button type="primary" onClick={() => {
                    setOpen(true);
                    setName('addComment')
                    setCommentTitle('Add a new comment')
                    setBtnText('Add')
                }}>Add Comment</Button>
            </PageHeader>
            <ModalFormComment
                open={open}
                onCreate={onCreate}
                onCancel={() => {
                    setOpen(false)
                }}
                id={id}
                commentId={commentId}
                name={name}
                textBtn={btnText}
                commentTitle={commentTitle}
            />
            <Table bordered={true}
                   columns={columns}
                   dataSource={commentsBattle}
                   loading={isLoading}
            />
        </>
    );
};

export default CommentTab;
