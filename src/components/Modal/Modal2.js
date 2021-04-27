import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import {BackspaceOutlined} from "@material-ui/icons"

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `10%`,
    left: `20%`,
   
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: "60%",
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    overflowY:"scroll"
  },
}));


export default function SimpleModal({id,open,handleClose,handleSubmit,Content,selectedUser,cancel}) {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);

  const body = (
    <div style={modalStyle} className={classes.paper}>
       <BackspaceOutlined className="needHover red" onClick={cancel} ></BackspaceOutlined>
        {Content}
      
    </div>
  );


console.log(selectedUser)
 
  return (
    <div>
 
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        style={{scrollBehavior:"auto"}}
      >
  {body}
      </Modal>
    </div>
  );
}