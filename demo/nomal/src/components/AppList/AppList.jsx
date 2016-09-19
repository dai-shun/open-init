/**
 * Created by daishun on 2016/9/19.
 */
import React from 'react';
import {Table } from 'antd';
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';
import {queryAppList} from '../../actions/action';



const columns = [{
    title: '应用ID',
    dataIndex: 'clientId',
    key: 'clientId'
}, {
    title: '应用名称',
    dataIndex: 'clientName',
    key: 'clientName'
}, {
    title: '开发者',
    dataIndex: 'developerName',
    key: 'developerName'
}, {
    title: '访问地址',
    dataIndex: 'clientUrl',
    key: 'clientUrl'
}, {
    title: 'code回调地址',
    dataIndex: 'redirectUrl',
    key: 'redirectUrl'
}, {
    title: '状态',
    dataIndex: 'clientStatus',
    key: 'clientStatus'
}];

class AppList extends React.Component {
    componentWillMount(){
        const {queryAppList} =this.props;
        queryAppList();
    }
    render(){
        return <Table columns={columns} dataSource={this.props.appList} size="middle" />
    }
}


function mapStateToProps(state) {
    return { appList: state.appList};
}
function buildActionDispatcher(dispatch) {
    return {
        queryAppList: bindActionCreators(queryAppList, dispatch)
    }
}
export default connect(mapStateToProps,buildActionDispatcher)(AppList);