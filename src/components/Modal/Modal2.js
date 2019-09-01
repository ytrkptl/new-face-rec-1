// import React from 'react';
// import { withStyles } from '@material-ui/core/styles';
// import Button from '@material-ui/core/Button';
// import Dialog from '@material-ui/core/Dialog';
// import MuiDialogTitle from '@material-ui/core/DialogTitle';
// import MuiDialogContent from '@material-ui/core/DialogContent';
// import MuiDialogActions from '@material-ui/core/DialogActions';
// import IconButton from '@material-ui/core/IconButton';
// import CloseIcon from '@material-ui/icons/Close';
// import Typography from '@material-ui/core/Typography';
// import AvatarPicker from '../../components/Profile/AvatarPicker';

// const styles = theme => ({
//   root: {
//     margin: 0,
//     padding: theme.spacing(2),
//   },
//   closeButton: {
//     position: 'absolute',
//     right: theme.spacing(1),
//     top: theme.spacing(1),
//     color: theme.palette.grey[500],
//   },
// });

// const DialogTitle = withStyles(styles)(props => {
//   const { children, classes, onClose } = props;
//   return (
//     <MuiDialogTitle disableTypography className={classes.root}>
//       <Typography variant="h6">{children}</Typography>
//       {onClose ? (
//         <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
//           <CloseIcon />
//         </IconButton>
//       ) : null}
//     </MuiDialogTitle>
//   );
// });

// const DialogContent = withStyles(theme => ({
//   root: {
//     padding: theme.spacing(2),
//   },
// }))(MuiDialogContent);

// const DialogActions = withStyles(theme => ({
//   root: {
//     margin: 0,
//     padding: theme.spacing(1),
//   },
// }))(MuiDialogActions);

// export default function CustomizedDialogs({...props}) {
//   const [open, setOpen] = React.useState(false);

//   const handleClickOpen = () => {
//     setOpen(true);
//   };
//   const handleClose = () => {
//     setOpen(false);
//   };

//   return (
//     <div>
//       <Button variant="outlined" color="secondary" onClick={handleClickOpen}>
//         {props.buttonTitle}
//       </Button>
//       <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
//       <DialogTitle id="customized-dialog-title" onClose={handleClose}>
//         Modal title
//       </DialogTitle>
//       <DialogContent dividers>
//         <article className="br3 ba bg-white mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
//           <main className="pa4 black-80 w-80">
//             <div>
//               <img
//                 src="http://tachyons.io/img/logo.jpg"
//                 className="br-100 ba h3 w3 dib mr2" alt="avatar" />
//               <AvatarPicker />
//             </div>
//             <h4>{`Images Submitted: ${props.user.entries}`}</h4>
//             <p>{`Member since: ${new Date(props.user.joined).toLocaleDateString()}`}</p>
//             <hr/>
//             <label className="mt2 fw6" htmlFor="user-name">Name: </label>
//             <input
//               className="pa2 ba w-100"
//               placeholder={props.user.name}
//               type="text"
//               name="user-name"
//               id="name"
//             />
//             <label className="mt2 fw6" htmlFor="user-age">Age: </label>
//             <input
//               className="pa2 ba w-100"
//               placeholder={props.user.age}
//               type="text"
//               name="user-age"
//               id="age"
//             />
//             <label className="mt2 fw6" htmlFor="user-name">Pet: </label>
//             <input
//               className="pa2 ba w-100"
//               placeholder={props.user.pet}
//               type="text"
//               name="user-pet"
//               id="pet"
//             />
//             <div className="mt4" style={{display: 'flex', justifyContent: 'space-evenly'}}>
//               <button
//                 className="b pa2 grow pointer hover-white w-40 bg-light-blue b--black-20">
//                 Save
//               </button>
//               <button 
//                 className="b pa2 grow pointer hover-white w-40 bg-light-red b--black-20"
//                 onClick={props.toggleModal}
//               >
//                 Cancel
//               </button>
//             </div>
//           </main>
//           <div className="modal-close" onClick={props.toggleModal}>&times;</div>
//         </article>
//       </DialogContent>
//         <DialogActions>
//           <Button onClick={handleClose} color="primary">
//             Save changes
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </div>
//   );
// }
