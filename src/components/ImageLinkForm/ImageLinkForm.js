import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({ onInputChange, onButtonSubmit }) => {
  // plans to implement upload image in future

  // let imgRef = React.createRef();
  // let canvasRef = React.createRef();
  // let [selectedFile, fileSelectedHandler] = React.useState('');
 
  
  // const createUrl = (event) => {
  //   fileSelectedHandler(selectedFile = event.target.files[0])
  //   let objectURL = URL.createObjectURL(selectedFile);
  //   imgRef.current.src = objectURL; 
  // }
  
  return (
    <div className="padded">
      <p className="textAboveForm">
        {'This Magic Brain will detect faces in your pictures. Give it a try.'}
      </p>
        <div className='form centerItHorizontally flexed'>
          <input 
            className='urlInput' 
            type='text' 
            placeholder="Paste image url(link) here"
            onChange={onInputChange}/>
         {/*
           plans to implement upload button in future.
          <span className="urlInputSpan">Or</span>
          <div className="fileUploadDiv">
            <input 
              className="fileUploadInput"
              onChange={(event)=>createUrl(event)}
              type="file"
              name="image"
              multiple={false}
              accept="image/*"/>
            <span className="fileUploadSpan">Upload an image</span>
          </div>
        */}
          <button
            className='detectButton'
            onClick={onButtonSubmit}>
            Detect
          </button>
        </div>
        {/*
          <canvas
           ref={canvasRef}
            />
          <img 
            ref={imgRef}
            id="hmm"
            src='' 
            width="400"
            height="auto" 
            alt="" />
        */}
    </div>
  );
}

export default ImageLinkForm;