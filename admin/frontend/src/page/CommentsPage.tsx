import React, {useState} from 'react';
import {Button, Divider, Table} from "antd";
import PageHeader from "../components/PageHeader";
import ModalFormComment from "../components/ModalFormComment";
import {ColumnsType} from "antd/es/table";
import {CheckOutlined, CloseOutlined} from "@ant-design/icons";

interface DataType {
    key: string
    id: string
    title: string
    argument: string
    text: string
    moderate: boolean
    actions: string
}

const CommentsPage = () => {
    const [open, setOpen] = useState(false);
    const [buttonText, setButtonText] = useState('Add')
    const [name, setName] = useState('')

    const columns: ColumnsType<DataType> = [
        {
        //     title: 'ID',
        //     dataIndex: 'id',
        //     width: 10,
        //     sorter: (a, b) => parseInt(a.id) - parseInt(b.id),
        //     render: (id) => {
        //         return (<Button type="link" onClick={() => {
        //             setOpen(true);
        //             refetch()
        //             setButtonText('Update')
        //             setArgumentTitle('Edit argument')
        //             setName('editArgument')
        //             setArgumentID(id)
        //         }}>{id}</Button>)
        //     }
        // },
        // {
        //     title: 'Title',
        //     dataIndex: 'title',
        //     sorter: (a, b) => a.title.localeCompare(b.title),
        //     render: (title) => {
        //         const item = data.find(data => data.title === title)
        //         if (item) {
        //             return (<Button
        //                     type="link"
        //                     onClick={() => {
        //                         setOpen(true);
        //                         setName('editArg')
        //                         setArgumentTitle('Edit argument')
        //                         setButtonText('Update')
        //                         setArgumentID(item['id'])
        //                     }}
        //                 >
        //                     {title}
        //                 </Button>
        //             )
        //         }
        //     }
        // },
        // {
        //     title: 'Argument',
        //     dataIndex: 'argument',
        //     render: (argument) => {
        //         if (argument == 'first') {
        //             return ('plus')
        //         } else {
        //             return ('minus')
        //         }
        //     }
        // },
        // {
        //     title: 'Description',
        //     dataIndex: 'text',
        // },
        // {
        //     title: 'Public',
        //     dataIndex: 'moderate',
        //     render: (moderate: boolean) => {
        //         if (moderate) {
        //             return <CheckOutlined style={{color: 'green', fontSize: 16}}/>
        //         } else {
        //             return <CloseOutlined style={{color: 'red', fontSize: 16}}/>
        //         }
        //     }
        // },
        // {
        //
        //     title: 'Actions',
        //     dataIndex: 'actions',
        //     width: 200,
        //     render: (id) => {
        //         return (<>
        //             <Button type="link" onClick={() => {
        //                 setOpen(true);
        //                 setName('editArg')
        //                 setButtonText('Update')
        //                 setArgumentID(id)
        //             }}>Edit</Button>
        //             <Divider type='vertical'/>
        //             <Button
        //                 danger
        //                 type="link"
        //                 onClick={() => {
        //                     const item = data.filter((item) => item.id === id)[0].id_item
        //                     console.log(item)
        //                     showDeleteConfirm({id_item: item, id})
        //                 }}
        //             >Delete</Button>
        //         </>)
        //     }
        },
    ];

    const onCreate = (values: any) => {
        console.log('Received values of form: ', values);
        setOpen(false);
    };

    return (
        <>
            <PageHeader text={<h1 className="wp-heading-inline">Comments</h1>}>
                <Button type='primary' onClick={() => setOpen(true)}>Add Comment</Button>
            </PageHeader>
            <Table bordered={true}
                   columns={columns}
                   // dataSource={argumentsBattle}
                   // loading={isLoading}
            />
            <ModalFormComment open={open}
                              onCreate={onCreate}
                              onCancel={() => {
                                  setOpen(false);
                              }}
                              commentId={''}
                              id={''}
                              name='addComment'
                              textBtn='Add Comment'
                              commentTitle='Add a new Comment'
            />
        </>
    );
};

export default CommentsPage;
