import * as React from 'react';
import Switch from '@mui/material/Switch';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { Link } from 'react-router-dom';

function SwitchBtn(){
    return(
        <FormControl component="fieldset">
        <FormGroup aria-label="position" row>
          <FormControlLabel
          sx={{color:'white'}}
            value="bottom"
            control={<Link to={"user/DashboardUser"}><Switch color="primary" checked='true'/></Link>}
            label="Admin"
            labelPlacement="bottom"
          />
        </FormGroup>
      </FormControl>
    )
}

export default SwitchBtn