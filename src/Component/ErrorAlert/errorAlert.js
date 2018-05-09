import React from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  withMobileDialog,
} from 'material-ui/Dialog';

class ErrorAlert extends React.Component {

  render() {
    const { fullScreen } = this.props;
    return (
      <div>
        <Dialog
          fullScreen={fullScreen}
          open={this.props.toggle}
          onClose={this.props.closeHandler}
        >
          <DialogTitle id="responsive-dialog-title">{"Error Occure"}</DialogTitle>
          <DialogContent>
            <DialogContentText>
                {this.props.errorText}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.props.closeHandler} color="primary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

ErrorAlert.propTypes = {
  fullScreen: PropTypes.bool.isRequired,
};

export default withMobileDialog()(ErrorAlert);