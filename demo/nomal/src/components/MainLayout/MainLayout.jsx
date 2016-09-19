/**
 * Created by daishun on 2016/9/19.
 */
import React from 'react';
import {Row,Col} from 'antd';
import Routes from '../../routes/Routes';
import LeftPanel from '../Panel/LeftPanel';

const MainLayout = () =>
        <div>
            <Row gutter={16}style={{borderBottom:' 1px solid #ccc',padding: '10px 0 10px 10px'}}>
                <Col  span={24}>
                    <span  style={{fontSize:'16px',marin:'20px 0 0 20px'}} >ReactDemo</span>
                </Col>
            </Row>
            <Row className='pageWrapper'>
                <Col span={4} className='left'>
                    <LeftPanel />
                </Col>
                <Col span={20}>
                    <Routes />
                </Col>
            </Row>
        </div>


export default MainLayout;