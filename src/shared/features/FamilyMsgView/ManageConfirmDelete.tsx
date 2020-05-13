import React from 'react';
import { Dialog, DialogContent, DialogContentText, Button, Container } from '@material-ui/core';
import Row from 'shared/components/Row/Row';
import Child from 'shared/components/Child/Child';
import WarningIcon from '@material-ui/icons/Warning';

interface IManageConfirmDelete {
  isOpen: boolean;
  onClose: () => void;
  deleteConfirmed: () => void;
}

const ManageConfirmDelete: React.FC<IManageConfirmDelete> = ({ isOpen, onClose, deleteConfirmed }) => { 

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <Container className="padDialog">
        <Row justify="center" alignItems="center">
          <Child>
            <WarningIcon color="error"/>&nbsp;
          </Child>

          <Child>
            <span className="boldText">Delete Post</span>
          </Child>
        </Row>
        <hr/>


      <DialogContent>
        <DialogContentText id="alert-dialog-description">
            <span><b>Warning! Are you sure you want to delete this post?</b></span>
          <br/><br/>
          <span>Please confirm your choice.</span>
        </DialogContentText>

        <Row alignItems="center" justify="space-around">
          {/* Delete account link */}
          <Child xs={12} sm={4}>
            <Button onClick={deleteConfirmed} variant="outlined" className="buttonDanger">
              Delete
            </Button>
          </Child>

          {/* Cancel */}
          <Child xs={12} sm={4}>
            <Button onClick={onClose} className="buttonSafe">
              Cancel
            </Button>
          </Child>
        </Row>

      </DialogContent>
    </Container>
  </Dialog>
  );
}

export default ManageConfirmDelete;
