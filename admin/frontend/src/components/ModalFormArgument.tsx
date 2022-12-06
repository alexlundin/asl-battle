import {CheckOutlined, CloseOutlined} from '@ant-design/icons';
import {Col, Form, Input, InputNumber, Modal, Row, Select, Spin, Switch,} from 'antd';
import React, {FC, useEffect} from 'react';
import {useFetchArgumentQuery} from "../redux/api/battle";
import {IArgument} from '../types/types';

interface CollectionCreateFormProps {
    open: boolean;
    onCreate: (values: IArgument) => void;
    onCancel: () => void;
    id: string
    argumentId: string
    name: string,
    textBtn: string,
    argumentTitle: string

}

const ModalFormArgument: FC<CollectionCreateFormProps> = ({open, onCreate, onCancel, id, argumentId, name, textBtn,argumentTitle}) => {
    const [form] = Form.useForm();
    const {data, isLoading} = useFetchArgumentQuery({id, argumentId})
    useEffect(() => {
        form.setFieldsValue(data)
    }, [data])
    useEffect(() => {
        if (name == 'addArgument') {
            form.resetFields()
        }
    }, [name])
    const validateMessages = {
        required: "${label} is required!",
    };
    return (
        <Spin spinning={isLoading}>
            <Modal
                open={open}
                title={argumentTitle}
                okText={textBtn}
                cancelText="Cancel"
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
                    name={name}
                    validateMessages={validateMessages}
                >
                    {argumentId &&
                        <Form.Item hidden={true} name="id">
                            <Input/>
                        </Form.Item>
                    }

                    <Form.Item hidden={true} name="id_item" initialValue={id}>
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        name="argument"
                        label="Argument Column"
                        initialValue='first'
                    >
                        <Select>
                            <Select.Option value="first">Plus</Select.Option>
                            <Select.Option value="second">Minus</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="title"
                        label="Title"
                        rules={[{required: true}]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item name="text" label="Description" rules={[{required: true}]}>
                        <Input.TextArea rows={3}/>
                    </Form.Item>

                    <Form.Item
                        name="username"
                        label="Username"
                        rules={[{required: true}]}
                    >
                        <Input/>
                    </Form.Item>


                    <Row gutter={10}>
                        <Col span={12}>
                            <Form.Item
                                name="moderate"
                                label="Public"
                                initialValue={true}
                                valuePropName="checked"
                            >
                                <Switch
                                    checkedChildren={<CheckOutlined/>}
                                    unCheckedChildren={<CloseOutlined/>}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="rating"
                                label="Rating"
                                initialValue={0}
                            >
                                <InputNumber min={0} style={{width: '100%'}}/>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        </Spin>
    );
};

export default ModalFormArgument;
