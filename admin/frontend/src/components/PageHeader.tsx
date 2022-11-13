import React, {ReactElement} from 'react';
import {Col, Row} from "antd";

interface PropsType {
    children?: ReactElement,
    text: ReactElement
}

const PageHeader = ({children, text}: PropsType) => {
    return (
        <>
            <Row>
                <Col span={12}>
                    {text}
                </Col>
                <Col span={12} style={{display:"flex", justifyContent: "end"}}>{children}</Col>
            </Row>
            <hr/>
        </>
    );
};

export default PageHeader;
