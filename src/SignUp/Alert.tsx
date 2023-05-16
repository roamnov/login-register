import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface Alert {
    open: true | false ;
    message: string;
    status:Boolean;
    setStatus: (value:any) => void | any | undefined;
}

export default function AlertDialogSlide(props: Alert ) {
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false)
    
    
    if(props.status === true){window.history.back();}
    
  };

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
       
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {props.message}
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
}
