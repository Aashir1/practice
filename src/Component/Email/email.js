import React from 'react';
import TextField from 'material-ui/TextField';


const Email = (props) => {

    return (
        <div style={props.divStyle}>
            
            <TextField
                
                style={{width:"100%", }}
                id={props.id}
                label={props.LabelText}
                placeholder={props.placeholderText}
                type={props.type}
                // className={classes.textField}
                // underlineFocusStyle={{ borderBottom: '2px solid #ec543f' }}
                margin="normal"
                value={props.userInput}
                onChange={(e) => { props.onChange(e) }}
            />

        </div>
    )

}
export default Email;