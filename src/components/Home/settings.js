import React from 'react';
import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import { UserContext } from '../ContextProvider/context';

export default function FormControlLabelPosition() {
    return (
        <FormControl component="fieldset">
            <FormGroup aria-label="position" row>
                <UserContext.Consumer>
                    {
                        ({ settings, updateSettings }) => (
                            <FormControlLabel
                                value="top"
                                control={<Switch color="primary" onChange={updateSettings} checked={settings} />}
                                label="Nav View"
                                labelPlacement="top"
                            />
                        )
                    }
                </UserContext.Consumer>
            </FormGroup>
        </FormControl>
    );
}
