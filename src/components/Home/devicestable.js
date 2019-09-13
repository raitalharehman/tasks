import React from 'react';
import MaterialTable from 'material-table';
import { Paper } from '@material-ui/core';
import { fbdb } from '../../'

export default class DeviceTable extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            columns: [
                { title: 'Name', field: 'name' },
                { title: 'Warranty', field: 'warranty', type: 'numeric' },
                { title: 'Expiry', field: 'expiry', type: 'numeric' },
                { title: 'Cost', field: 'cost', type: 'numeric' },
                {
                    title: 'Image', field: 'image',
                    render: rowData => <img src={rowData.image} alt="" style={{ width: 40, borderRadius: '50%' }} />
                },
            ],
            data: []
        }
    }
    componentDidMount() {
        fbdb.collection("devices")
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
            uid: 1568276657001
        };

        // adding data here
        fbdb.collection("devices")
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
        return (
            <MaterialTable
                title="Devices"
                columns={columns}
                data={data}
                components={{
                    Container: props => <Paper {...props} elevation={0} />
                }}
                editable={{
                    onRowAdd: newData =>
                        new Promise(resolve => {
                            setTimeout(() => {
                                resolve();
                                if (Object.keys(newData).length !== 0) {
                                    let dataToAdd = this.state.data;
                                    dataToAdd.push(newData);
                                    this.setState({ data, dataToAdd });
                                    this.addData()
                                }
                            }, 600);
                        }),
                    onRowUpdate: (newData, oldData) =>
                        new Promise(resolve => {
                            setTimeout(() => {
                                resolve();
                                if (Object.keys(newData).length !== 0) {
                                    let dataToEdit = this.state.data;
                                    dataToEdit[dataToEdit.indexOf(oldData)] = newData;
                                    this.setState({ data, dataToEdit });
                                    this.addData()
                                }
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
