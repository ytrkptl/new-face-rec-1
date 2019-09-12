import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({ onInputChange, onButtonSubmit, changeImageUrl, client }) => {

  const options = {
    maxFiles: 1,
    uploadInBackground: false,
    onOpen: () => console.log('opened!'),
    onUploadDone: (res) => someFunction(res),
  };
  
  const someFunction = (someObject) => {
    if(someObject) {
      let HANDLE = someObject.filesUploaded[0].handle;
      fetch(`https://cdn.filestackcontent.com/imagesize/${HANDLE}`, {
        method: 'GET',
      })
        .then(resp => resp.json())
        .then(data => {
          let height = data.height;
          let width = data.width;
          if (height > width) {
            fetch(`https://cdn.filestackcontent.com/resize=height:600,width:400/${HANDLE}`, {
              method: 'GET',
            })
            .then(resp => {
              let url = resp.url;
              changeImageUrl(url);
            })
            .catch(err => console.log(err))
          } else if (height < width) {
            fetch(`https://cdn.filestackcontent.com/resize=height:400,width:600/${HANDLE}`, {
              method: 'GET',
            })
            .then(resp => {
              let url = resp.url;
              changeImageUrl(url);
            })
            .catch(err => console.log(err))
          } else {
            fetch(`https://cdn.filestackcontent.com/resize=height:400,width:400/${HANDLE}`, {
              method: 'GET',
            })
            .then(resp => {
              let url = resp.url;
              changeImageUrl(url);
            })
            .catch(err => console.log(err))
          }
        })
        .catch(err => console.log(err))
    }


    
  }

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
          <button
            className='detectButton'
            onClick={onButtonSubmit}>
            Detect
          </button>
          <span className="urlInputSpan">Or</span> 
          <button className="fileUploadButton" onClick={()=>client.picker(options).open()}>Upload an image</button>
        </div>
    </div>
  );
}

export default ImageLinkForm;