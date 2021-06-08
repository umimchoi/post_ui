import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

const styles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  margin: {
    margin: theme.spacing.unit,
  },
  formRoot: {
    'label + &': {
      marginTop: theme.spacing.unit * 3,
    },
  },
  formInput: {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: 'white',
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
  formLabel: {
    fontSize: 18
  },
}));

function CustomizedInputs(props) {
  const classes = styles();

  return (
    <div className={classes.root}>
      <FormControl fullWidth className={classes.margin}>
        <InputLabel shrink className={classes.formLabel}>
          {props.label}
        </InputLabel>
        <InputBase
          classes={{
            root: classes.formRoot,
            input: classes.formInput,
          }}
          onChange={props.handleChange}
        />
      </FormControl>
    </div>
  );
}

export default CustomizedInputs;