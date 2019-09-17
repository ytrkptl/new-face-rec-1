import React, { useState } from 'react';
import { CloudinaryContext, Transformation, Image } from 'cloudinary-react';
import './UploadToCloudinary.css';

const UploadToCloudinary = ({ changeImageUrl, client }) => {

  let [publicId, updatePublicId] = useState(``);
  let [heightToUse, updateHeightToUse] = useState(0);
  let [widthToUse, updateWidthToUse] = useState(0);
  let [url, updateUrl] = useState(``);
  let [format, updateFormat] = useState(``);
  
  const cloudinaryUploadFunc = () => {
    const widget = window.cloudinary.openUploadWidget({ 
      cloud_name: `${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}`,
      upload_preset: 'lq9g62yw'
    }, (error, result) => { 
      if(error) {
        console.log(error)
        return
      }
      console.log(result[0])
      let data = result[0];
      updatePublicId(data.public_id);
      updateFormat(data.format);
      updateUrl(data.url);
      let width = data.width;
      let height = data.height;
      updateHeightAndWidth(width, height)
    });
    widget.open();
  } 
  
  const updateHeightAndWidth = (width, height) => {
    let ww = window.innerWidth;
    if (height > width) {
      console.log('hey')
      // do following to check device's width to send apprpopriate and 
      // more dynamic parameters to FileStack
      ww > 650 ? updateWidthToUse(400)
      : updateWidthToUse(Math.round(ww * 0.90))
      ww > 650 ? updateHeightToUse(600)
      : updateHeightToUse(Math.round(widthToUse * 1.5))
    } else if (height < width) {
      // do following to check device's width to send apprpopriate and 
      // more dynamic parameters to FileStack
      ww > 650 ? updateWidthToUse(400)
      : updateWidthToUse(Math.round(ww * 0.90))
      ww > 650 ? updateHeightToUse(400)
      : updateHeightToUse(Math.round(widthToUse * 0.67))
    }  else {
      // do following to check device's width to send apprpopriate and 
      // more dynamic parameters to FileStack
      ww > 650 ? updateWidthToUse(600)
      : updateWidthToUse(Math.round(ww * 0.9))
      ww > 650 ? updateHeightToUse(600)
      : updateHeightToUse(Math.round(ww * 0.9))
    }
  }

  return (
    <div>
      <button className="fileUploadButton" onClick={()=>cloudinaryUploadFunc()}>Cloudinary Button</button>
      <div className="fileUploadDiv">
        <input 
          className="fileUploadInput"
          onChange={()=>cloudinaryUploadFunc()}
          type="file"
          name="image"
          multiple={false}
          accept="image"/>
        <span className="fileUploadSpan">Upload an image</span>
      </div> 
      {
        publicId!==`` &&
        <CloudinaryContext cloudName={`${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}`}>
          <Image publicId={publicId} type="fetch">
          <Transformation
            crop="scale"
            width="300"
            height="200"
            responsive_placeholder="blank"
          />
          </Image>
        </CloudinaryContext>
      }

      
    </div> 
  )
}

export default UploadToCloudinary;