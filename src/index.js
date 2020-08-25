import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

const Workers = () => {};

const DepartmentList = (props) => {
  //console.log('props ', props)
  console.log('departments ', props.department);
  const departmentArr = props.department.map((depo) => (
    <div>
      <h4>{depo.name}</h4>
      <ul data-id={depo.id} key={depo.id}></ul>
    </div>
  ));
  return departmentArr;
};

class Acme extends React.Component {
  constructor() {
    super();
    this.state = {
      departments: [],
    };
  }
  async componentDidMount() {
    try {
      const res = await axios.get('api/departments');
      const departments = res.data;
      //console.log('in DidMount ', departments)
      await this.setState({ departments: departments });
    } catch (err) {
      console.log('not mounted');
    }
  }

  render() {
    return (
      <div>
        <DepartmentList department={this.state.departments} />
      </div>
    );
  }
}

ReactDOM.render(<Acme />, document.getElementById('root'));
//<DepartmentList department={this.state.departments} />
