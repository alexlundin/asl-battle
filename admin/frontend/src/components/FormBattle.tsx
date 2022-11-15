import React, {useEffect} from 'react';
import {Button, Col, Form, Input, InputNumber, Row, Spin} from "antd";
import {IBattle} from "../types/types";
import {useFetchBattleQuery} from "../redux/api/battle";

interface FormProps {
    name: string,
    onFinish: (data: IBattle) => void,
    textBtn: string,
    id?: string
}

const FormBattle = ({name, onFinish, textBtn, id = ''}: FormProps) => {
    const [form] = Form.useForm();
    const {data: battle, isLoading} = useFetchBattleQuery(id)
    const validateMessages = {
        required: "${label} is required!",
    };
    useEffect(() => {
        form.setFieldsValue(battle)
    }, [battle])


    return (
        <>
            <Spin spinning={isLoading}>
                <Form
                    name={name}
                    autoComplete="off"
                    form={form}
                    layout="vertical"
                    onFinish={onFinish}
                    validateMessages={validateMessages}
                >

                    <Form.Item
                        hidden={true}
                        name="id"
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        label="Title"
                        name="title"
                        rules={[{required: true}]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        label="Description"
                        name="content"
                        rules={[{required: true}]}
                    >
                        <Input.TextArea rows={4}/>
                    </Form.Item>
                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[{required: true}]}
                    >
                        <Input/>
                    </Form.Item>
                    <Row gutter={10}>
                        <Col span={12}>
                            <Form.Item
                                label="Plus Head"
                                name="first_argument_head"
                                rules={[{required: true}]}
                            >
                                <Input/>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="Minus Head"
                                name="second_argument_head"
                                rules={[{required: true}]}
                            >
                                <Input/>
                            </Form.Item>
                        </Col>
                    </Row>

                    <Form.Item
                        label="Rating"
                        name="rating"
                        initialValue={0}
                    >
                        <InputNumber min={0} style={{width: '100%'}}/>
                    </Form.Item>


                    <Form.Item>
                        <Button type="primary" htmlType="submit">{textBtn}</Button>
                    </Form.Item>
                </Form>
            </Spin>
        </>
    );
};

export default FormBattle;
