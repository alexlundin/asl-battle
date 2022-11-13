import React from 'react';
import {useNavigate} from "react-router-dom";
import {Button, Result} from "antd";

const SettingsPage = () => {
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
    )
};

export default SettingsPage;
