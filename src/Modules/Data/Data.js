import React, { Component } from 'react';
import { Table, Radio, Input, Button } from 'antd';
import getData from '../../data/getData'
import 'antd/dist/antd.css';
import './Data.scss'
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';

class Data extends Component {
  state = {
    value: 1,
    ChinaData: null,
    GlobleData: null,
    searchText: '',
    searchedColumn: '',
  };
  async componentDidMount() {
    this.setState({ ChinaData: (await getData()).cityData.filter(e => e.date === '2020-04-19') });
    this.setState({ GlobleData: (await getData()).countryData.filter(e => e.date === '2020-04-19') });
  }
  async componentDidUpdate(prevPros) {
    if (this.props.date !== prevPros.date) {
      this.setState({ ChinaData: (await getData()).cityData.filter(e => e.date === this.props.date) });
      this.setState({ GlobleData: (await getData()).countryData.filter(e => e.date === this.props.date) });
    }
  }
  onChange = e => {
    this.setState({
      value: e.target.value,
    });
  };
  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Button
          type="primary"
          onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
          icon={<SearchOutlined />}
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
          Reset
        </Button>
      </div>
    ),
    filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    },
    render: text =>
      this.state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[this.state.searchText]}
          autoEscape
          textToHighlight={text.toString()}
        />
      ) : (
          text
        ),
  });
  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: '' });
  };
  render() {
    const columns = [
      {
        title: '地区',
        dataIndex: 'name',
        key: 'name',
        width: '24%',
        ...this.getColumnSearchProps('name'),
      },
      {
        title: '确诊',
        dataIndex: 'confirm',
        width: '19%',
        sorter: {
          compare: (a, b) => a.confirm - b.confirm,
          multiple: 1,
        },
        defaultSortOrder: 'descend'
      },
      {
        title: '治愈',
        dataIndex: 'cure',
        width: '19%',
        sorter: {
          compare: (a, b) => a.cure - b.cure,
          multiple: 2,
        },
      },
      {
        title: '死亡',
        dataIndex: 'death',
        width: '19%',
        sorter: {
          compare: (a, b) => a.death - b.death,
          multiple: 3,
        },
      },
      {
        title: '现有',
        dataIndex: 'current',
        width: '19%',
        sorter: {
          compare: (a, b) => a.current - b.current,
          multiple: 4,
        },
      },
    ];
    const { ChinaData, GlobleData, value } = this.state
    const data = [];
    if (value === 1 && ChinaData) {
      for (let i = 0; i < ChinaData.length; i++) {
        data.push({
          key: i,
          name: ChinaData[i].province,
          current: ChinaData[i].confirmed - ChinaData[i].cured - ChinaData[i].dead,
          confirm: ChinaData[i].confirmed,
          cure: ChinaData[i].cured,
          death: ChinaData[i].dead
        });
      }
    } else if (value === 2 && GlobleData) {
      for (let i = 0; i < GlobleData.length; i++) {
        data.push({
          key: i,
          name: GlobleData[i].country,
          current: GlobleData[i].confirmed - GlobleData[i].cured - GlobleData[i].dead,
          confirm: GlobleData[i].confirmed,
          cure: GlobleData[i].cured,
          death: GlobleData[i].dead
        });
      }
    }
    return (
      { data } && <div className="data-container">
        <div className="data-change">
          <span>数据：</span>
          <Radio.Group onChange={this.onChange} value={this.state.value}>
            <Radio value={1}>中国</Radio>
            <Radio value={2}>世界</Radio>
          </Radio.Group>
        </div>
        <Table
          columns={columns}
          dataSource={data}
          pagination={false}
          size={"small"}
          scroll={{ y: 160 }}
          rowClassName={() => 'trow'} />
      </div>
    )
  }
}
export default Data;