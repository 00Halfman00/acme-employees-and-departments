import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

const DepartmentList = (props) => {
    console.log('props ', props)
    return props.department
}

class Acme extends React.Component{
    constructor() {
        super()
        this.state = {
            departments: []
        }
        
    }
    async componentDidMount() {
        try {
            const res = await axios.get('api/departments');
            const departments = res.data;
            console.log('in DidMount ', departments)
            await this.setState({departments: departments});
        } catch(err) {
            console.log('not mounted')
        }
    }

    render() {
        return (
            <div>
                <ul>
                    <DepartmentList department={this.state.departments} />
                </ul>
            </div>
        )
    }

}

ReactDOM.render(<Acme />, document.getElementById('main'))