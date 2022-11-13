import {Button, Col, Divider, message, Modal, Row, Table} from 'antd';
import type {ColumnsType} from 'antd/es/table';
import React, {useEffect, useState} from 'react';
import PageHeader from "../components/PageHeader";
import {useNavigate} from "react-router-dom";
import {useDeleteBattleMutation, useFetchBattlesQuery} from "../redux/api/battle";
import {ExclamationCircleOutlined} from '@ant-design/icons';

interface DataType {
    key: string;
    id: string;
    title: string;
    rating: string;
    count_views: string
    actions: string;
}

const HomePage = () => {
    const navigate = useNavigate()
    const {data = [], error, isLoading} = useFetchBattlesQuery('')
    const [deleteBattle, {isSuccess}] = useDeleteBattleMutation()
    const {confirm} = Modal;
    const battles: DataType[] = [];
    const columns: ColumnsType<DataType> = [
        {
            title: 'ID',
            dataIndex: 'id',
            width: 10,
            sorter: (a, b) => parseInt(a.id) - parseInt(b.id),
            render: (id) => {
                return (<Button type="link" onClick={() => navigate(`/battle/${id}`)}>{id}</Button>)
            }
        },
        {
            title: 'Title',
            dataIndex: 'title',
            width: 500,
            sorter: (a, b) => a.title.localeCompare(b.title),
            render: (title) => {
                const item = data.find(data => data.title === title)
                if (item) {
                    return (<Button type="link" onClick={() => navigate(`/battle/${item['id']}`)}>{title}</Button>)
                }
            }
        },
        {
            title: 'Rating',
            dataIndex: 'rating',
            sorter: (a, b) => parseInt(a.rating) - parseInt(b.rating),
            width: 150
        },
        {
            title: 'Count views',
            dataIndex: 'count_views',
            sorter: (a, b) => parseInt(a.count_views) - parseInt(b.count_views),
            width: 150

        },
        {

            title: 'Actions',
            dataIndex: 'actions',
            width: 200,
            render: (id) => {
                return (<>
                    <Button type="link" onClick={() => navigate(`/battle/${id}`)}>Edit</Button>
                    <Divider type='vertical'/>
                    <Button
                        danger
                        type="link"
                        onClick={() => {
                            showDeleteConfirm(id)
                        }}
                    >Delete</Button>
                </>)
            }
        },
    ];

    useEffect(() => {
        if (isSuccess) {
            message.success({
                content: 'Successfully deleted the battle.', style: {
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

    const showDeleteConfirm = (id: string) => {
        confirm({
            title: 'Are you sure, You want to delete this battle?',
            icon: <ExclamationCircleOutlined/>,
            okText: 'Yes, delete',
            okType: 'danger',
            cancelText: 'Cancel',
            onOk() {
                deleteBattle(id)
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
    const deleteBattles = (values: React.Key[]) => {
        confirm({
            title: 'Are you sure, You want to delete this battles?',
            icon: <ExclamationCircleOutlined/>,
            okText: 'Yes, delete',
            okType: 'danger',
            cancelText: 'Cancel',
            onOk() {
                for (const id in values) {
                    deleteBattle(values[id])
                }
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

    if (data) {
        for (const item of data) {
            battles.unshift({
                key: item.id,
                id: item.id,
                title: item.title,
                rating: item.rating,
                count_views: item.count_views,
                actions: item.id
            })
        }
    }

    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        setSelectedRowKeys(newSelectedRowKeys);
    };
    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;

    return (
        <>
            <PageHeader text={<h1 className="wp-heading-inline">All Battles</h1>}>
                <Row gutter={10}>
                    <Col>
                        <Button type="primary" onClick={() => {
                            navigate('/add')
                        }}>Add Battle</Button>
                    </Col>
                    {hasSelected &&
                        <Col>
                            <Button type="primary" danger={true} onClick={() => {
                                deleteBattles(selectedRowKeys)
                            }}>Remove Battles</Button>
                        </Col>
                    }
                </Row>
            </PageHeader>
            <Table
                rowSelection={rowSelection}
                bordered={true}
                columns={columns}
                dataSource={battles}
                loading={isLoading}
            />
        </>
    );
};

export default HomePage;
