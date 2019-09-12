import React from 'react';
import MaterialTable from 'material-table';
import { Paper } from '@material-ui/core';
import { fbdb } from '../../'

export default class UsersTable extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            columns: [
                { title: 'First Name', field: 'fname' },
                { title: 'Last Name', field: 'lname' },
                { title: 'Device', field: 'availability', lookup: { "0": 'No Device' } }
            ],
            data: [
                {
                    fname: 'F name',
                    lname: "l name",
                    availability: "0",
                },
                {
                    fname: 'F1 name',
                    lname: "l1 name",
                    availability: "1",
                },
            ],
        }
    }
    componentDidMount() {
        this.refreshData()
    }
    refreshData = () => {
        fbdb.collection("devices")
            .get()
            .then(querySnapshot => {
                const data = querySnapshot.docs.map(doc => doc.data());
                let temp = data[0]
                if (temp) {
                    const peopleArray = Object.keys(temp).map(i => temp[i])
                    peopleArray.pop();
                    let result = {
                        "0": 'No Device'
                    }
                    peopleArray.map((x, index) => 
                    result[++index] = x.name
                    );
                     
                    this.setState({
                        columns: [
                            { title: 'First Name', field: 'fname' },
                            { title: 'Last Name', field: 'lname' },
                            {
                                title: 'Device', field: 'availability',
                                lookup: result
                            }
                        ]
                    })
                }
            });
        fbdb.collection("users")
            .get()
            .then(querySnapshot => {
                const data = querySnapshot.docs.map(doc => doc.data());
                let temp = data[0]
                if (temp) {
                    const peopleArray = Object.keys(temp).map(i => temp[i])
                    peopleArray.pop();
                    this.setState({
                        data: peopleArray
                    })
                }
            });
    }
    addData = () => {
        const data = {
            ...this.state.data,
            uid: 1568276657002
        };

        // adding data here
        fbdb.collection("users")
            .doc(data.uid.toString())
            .set(data)
            .then(() => {
                console.log("done")
            })
            .catch(error => {
                console.log(error.message, "Add Device failed")
                this.setState({ isSubmitting: false });
            });
    };
    render() {
        const { columns, data } = this.state;
        let filteredData = null
        this.props.taken ? filteredData = data.filter(x => x.availability !== "0") : filteredData = data.filter(x => x.availability === "0");
        return (
            <MaterialTable
                title={this.props.taken ? "Taken Users" : "Available Users"}
                columns={columns}
                data={filteredData}
                options={{
                    search: false
                }}
                actions={[
                    {
                        icon: 'refresh',
                        tooltip: 'Refresh Data',
                        isFreeAction: true,
                        onClick: () => this.refreshData(),
                    }
                ]}
                components={{
                    Container: props => <Paper {...props} elevation={0} />
                }}
                editable={{
                    onRowAdd: newData =>
                        new Promise(resolve => {
                            setTimeout(() => {
                                resolve();
                                let dataToAdd = this.state.data;
                                dataToAdd.push(newData);
                                this.setState({ data, dataToAdd });
                                this.addData()
                            }, 600);
                        }),
                    onRowUpdate: (newData, oldData) =>
                        new Promise(resolve => {
                            setTimeout(() => {
                                resolve();
                                let dataToEdit = this.state.data;
                                dataToEdit[dataToEdit.indexOf(oldData)] = newData;
                                this.setState({ data, dataToEdit });
                                this.addData()
                            }, 600);
                        }),
                    onRowDelete: oldData =>
                        new Promise(resolve => {
                            setTimeout(() => {
                                resolve();
                                let dataToDelete = this.state.data;
                                dataToDelete.splice(dataToDelete.indexOf(oldData), 1);
                                this.setState({ data, dataToDelete });
                                this.addData()
                            }, 600);
                        }),
                }}
            />
        );
    }
}
