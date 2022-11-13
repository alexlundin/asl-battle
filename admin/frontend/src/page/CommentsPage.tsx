import React from 'react';
import {Button, Result} from "antd";
import {useNavigate} from "react-router-dom";


const CommentsPage = () => {
    const navigate = useNavigate()
    return (
        <Result
            title="Coming soon"
            extra={
                <Button type="primary" onClick={() => {navigate('/')}}>
                    Go Dashboard
                </Button>
            }
        />
    );
};

export default CommentsPage;
