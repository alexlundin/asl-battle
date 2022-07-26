import {Col, Form, Input, InputNumber, Modal, Row, Select, Switch} from 'antd';
import React, {FC, useEffect, useState} from 'react';
import {useFetchArgumentsQuery, useGetCommentQuery} from "../redux/api/battle";
import {CheckOutlined, CloseOutlined} from "@ant-design/icons";

interface CollectionCreateFormProps {
    open: boolean;
    onCreate: (values: any) => void;
    onCancel: () => void;
    id: string,
    commentId: string
}

const ModalFormComment: FC<CollectionCreateFormProps> = ({open, onCreate, onCancel, id, commentId,}) => {
    const [form] = Form.useForm();

    const {data: args = []} = useFetchArgumentsQuery(id)
    const {data} = useGetCommentQuery({id, commentId})
    useEffect(() => {
        form.setFieldsValue(data)
    }, [data])
    const validateMessages = {
        required: "${label} is required!",
    };
    const selectArguments = () => {
        if (args.length == 0) {
            return (<Select.Option disabled={true} value='none'>Arguments Not found</Select.Option>
            )
        } else {
            return args.map(item => {
                return (<Select.Option key={item.id} value={item.id}>{item.title}</Select.Option>)
            })
        }
    }

    return (
        <Modal
            open={open}
            title='Edit comment'
            okText='Update'
            cancelText="Cancel"
            forceRender={false}
            onCancel={onCancel}
            onOk={() => {
                form
                    .validateFields()
                    .then(values => {
                        form.resetFields();
                        onCreate(values);
                    })
                    .catch(info => {
                        console.log('Validate Failed:', info);
                    });
            }}
        >
            <Form
                form={form}
                layout="vertical"
                validateMessages={validateMessages}
                name='editComment'
            >

                <Form.Item hidden={true} name="id">
                    <Input/>
                </Form.Item>


                <Form.Item hidden={true} name="comment_battle_id" initialValue={id}>
                    <Input/>
                </Form.Item>

                <Form.Item name="comment_argument_id" label="Select Argument">
                    <Select placeholder="Select argument">
                        {selectArguments()}
                    </Select>
                </Form.Item>

                <Form.Item name="comment_author" label="Username">
                    <Input/>
                </Form.Item>
                <Row gutter={15}>
                    <Col span={12}>
                        <Form.Item label='Rating' name='comment_rating' initialValue={0}>
                            <InputNumber min={0}/>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="comment_moderate"
                            label="Public"
                            initialValue={true}
                            valuePropName="checked">
                            <Switch
                                checkedChildren={<CheckOutlined/>}
                                unCheckedChildren={<CloseOutlined/>}
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Form.Item name='comment_text' label='Comment text'>
                    <Input.TextArea rows={4}/>
                </Form.Item>

            </Form>
        </Modal>
    );
};

export default ModalFormComment;
