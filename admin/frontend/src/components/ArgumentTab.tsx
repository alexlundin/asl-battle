import {Button, Divider, message, Modal, Switch, Table} from 'antd';
import React, {useEffect, useState} from 'react';
import PageHeader from "./PageHeader";
import {ColumnsType} from "antd/es/table";
import {
    useAddArgumentMutation,
    useDeleteArgumentMutation,
    useEditArgumentMutation,
    useFetchArgumentsQuery
} from "../redux/api/battle";
import ModalFormArgument from './ModalFormArgument';
import {CheckOutlined, CloseOutlined, ExclamationCircleOutlined} from '@ant-design/icons';
import {IArgument} from '../types/types';

interface DataType {
    key: string
    id: string
    title: string
    battle_id: string
    argument: string
    text: string
    moderate: boolean
    actions: string
}

interface ArgumentProp {
    id: string;
}

interface DeleteProp {
    id_item: string;
    id: string;
}


const ArgumentTab = ({id = ''}: ArgumentProp) => {
    const {confirm} = Modal;

    const handleSwitchChange = (record: any, check: boolean) => {
        const vals = {
            id: record.id,
            id_item: record.battle_id,
            moderate: check
        }
        editArgument(vals)
    }

    const argumentsBattle: DataType[] = []
    const columns: ColumnsType<DataType> = [
        {
            title: 'ID',
            dataIndex: 'id',
            width: 10,
            sorter: (a, b) => parseInt(a.id) - parseInt(b.id),
            render: (id) => {
                return (<Button type="link" onClick={() => {
                    setOpen(true);
                    refetch()
                    setButtonText('Update')
                    setArgumentTitle('Edit argument')
                    setName('editArgument')
                    setArgumentID(id)
                }}>{id}</Button>)
            }
        },
        {
            title: 'Title',
            dataIndex: 'title',
            sorter: (a, b) => a.title.localeCompare(b.title),
            render: (title) => {
                const item = data.find(data => data.title === title)
                if (item) {
                    return (<Button
                            type="link"
                            onClick={() => {
                                setOpen(true);
                                setName('editArg')
                                setArgumentTitle('Edit argument')
                                setButtonText('Update')
                                setArgumentID(item['id'])
                            }}
                        >
                            {title}
                        </Button>
                    )
                }
            }
        },
        {
            title: 'Argument',
            dataIndex: 'argument',
            render: (argument) => {
                if (argument == 'first') {
                    return ('plus')
                } else {
                    return ('minus')
                }
            }
        },
        {
            title: 'Description',
            dataIndex: 'text',
        },
        {
            title: 'Public',
            dataIndex: 'moderate',
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
            render: (id) => {
                return (<>
                    <Button type="link" onClick={() => {
                        setOpen(true);
                        setName('editArg')
                        setButtonText('Update')
                        setArgumentID(id)
                    }}>Edit</Button>
                    <Divider type='vertical'/>
                    <Button
                        danger
                        type="link"
                        onClick={() => {
                            const item = data.filter((item) => item.id === id)[0].id_item
                            console.log(item)
                            showDeleteConfirm({id_item: item, id})
                        }}
                    >Delete</Button>
                </>)
            }
        },
    ];

    const [name, setName] = useState('')
    const [argumentId, setArgumentID] = useState('')
    const [argumentTitle, setArgumentTitle] = useState('Add a new argument')
    const [buttonText, setButtonText] = useState('Add')
    const [open, setOpen] = useState(false);

    const {data = [], refetch, isLoading} = useFetchArgumentsQuery(id, {
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })
    const [deleteArgument, {isSuccess: isDelete}] = useDeleteArgumentMutation()
    const [addArgument, {isSuccess, error}] = useAddArgumentMutation()
    const [editArgument, {isSuccess: isUpdate}] = useEditArgumentMutation()

    useEffect(() => {
        if (isSuccess) {
            message.success({
                content: 'Successfully add the new argument.', style: {
                    marginTop: '20px',
                },
            });
        }

        if (isUpdate && !isSuccess) {
            message.success({
                content: 'Successfully update the argument.', style: {
                    marginTop: '20px',
                },
            });
        }

        if (isDelete && !isSuccess && !isUpdate) {
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

    const showDeleteConfirm = ({id_item, id}: DeleteProp) => {
        confirm({
            title: 'Are you sure, You want to delete this argument?',
            icon: <ExclamationCircleOutlined/>,
            okText: 'Yes, delete',
            okType: 'danger',
            cancelText: 'Cancel',
            onOk() {
                deleteArgument({id_item, id})
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

    const onCreate = (values: IArgument) => {
        if (name === 'addArgument') {
            setButtonText('Add')
            setArgumentTitle('Add a new argument')
            addArgument(values)
        } else {
            editArgument(values)
            setButtonText('Update')
            setArgumentTitle('Edit argument')
        }
        setOpen(false)
    }

    if (data) {
        for (const item of data) {
            argumentsBattle.unshift({
                key: item.id,
                id: item.id,
                battle_id: item.id_item,
                title: item.title,
                argument: item.argument,
                text: item.text,
                moderate: Boolean(parseInt(item.moderate)),
                actions: item.id
            })
        }
    }

    return (
        <>
            <PageHeader text={<h1 className="wp-heading-inline" style={{fontSize: 18}}>Arguments</h1>}>
                <Button type="primary" onClick={() => {
                    setOpen(true);
                    refetch()
                    setName('addArgument')
                    setArgumentTitle('Add a new argument')
                    setButtonText('Add')
                }}>Add Argument</Button>
            </PageHeader>
            <Table bordered={true}
                   columns={columns}
                   dataSource={argumentsBattle}
                   loading={isLoading}
            />
            <ModalFormArgument
                open={open}
                onCreate={onCreate}
                id={id}
                argumentId={argumentId}
                textBtn={buttonText}
                name={name}
                argumentTitle={argumentTitle}
                onCancel={() => {
                    setOpen(false);
                }}
            />
        </>
    );
};

export default ArgumentTab;
