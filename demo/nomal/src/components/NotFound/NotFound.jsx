/**
 * Created by daishun on 2016/9/19.
 */
import React from 'react';
import {Row} from 'antd';
class NotFound extends React.Component {
    render() {
        return (
            <Row style={{margin:'100px 0 0 300px'}}>
                <span style={{fontSize:'50px'}}>404 not found</span>
            </Row>
        );
    }
}
export default NotFound;