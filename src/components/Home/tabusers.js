import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import UsersTable from './userstable';
import { fbdb } from '../../'


function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            <Box p={3}>{children}</Box>
        </Typography>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

const styles = {
    root: {
        flexGrow: 1,
        backgroundColor: "#fff",
        display: 'flex',
        height: 440,
    },
    tabs: {
        borderRight: `1px solid
        rgba(224, 224, 224, 1)`,
    },
};

class VerticalTabs extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            columns: [
                { title: 'First Name', field: 'fname' },
                { title: 'Last Name', field: 'lname' },
                { title: 'Device', field: 'availability', lookup: { "0": 'No Device' } }
            ],
            data: [],
            value: 0
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
        // console.log("refresh")
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
                this.refreshData()
            })
            .catch(error => {
                console.log(error.message, "Add Device failed")
                this.setState({ isSubmitting: false });
            });
    };
    handleUpdate = (key, value) => {
        this.setState({
            [key]: value
        })
    }

    handleChange = (event, newValue) => {
        this.setState({
            value: newValue
        })
    }
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <Tabs
                    orientation="vertical"
                    variant="scrollable"
                    value={this.state.value}
                    onChange={this.handleChange}
                    aria-label="Vertical tabs example"
                    className={classes.tabs}
                >
                    <Tab label="Available" {...a11yProps(0)} />
                    <Tab label="Taken" {...a11yProps(1)} />
                </Tabs>
                <TabPanel value={this.state.value} index={0}>
                    <UsersTable state={this.state} 
                    handleUpdate={this.handleUpdate.bind(this)}
                    refreshData={this.refreshData.bind(this)}
                    addData={this.addData.bind(this)} />
                </TabPanel>
                <TabPanel value={this.state.value} index={1}>
                    <UsersTable taken state={this.state} 
                    handleUpdate={this.handleUpdate.bind(this)}
                    refreshData={this.refreshData.bind(this)}
                    addData={this.addData.bind(this)} />
                </TabPanel>
            </div>
        );
    }
}
export default withStyles(styles)(VerticalTabs);
