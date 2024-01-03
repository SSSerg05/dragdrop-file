import React, { useState } from "react";
import { DropArea } from "./DragDropFile.styled";


export const DragDropFile = () => {
  const [file, setFile] = useState(null)

  if (typeof file==='undefined') return

  const formData = new FormData();
  
  formData.append = ('file', file);
  formData.append('upload_preset', 'test-react-aploads');
  formData.append('api_key', import.meta.env.CLOUDINARY_API_KEY);

  const loadFile = async () => {
    //https://console.cloudinary.com/console/c-ee656a49da6365fc6aecb471d8d51d/media_library/folders/c61dc5dbb289613fdb5b69ee144be5f5bb?view_mode=mosaic
    const result = await fetch('https://api.cloudinary.com/v1_1/my-cloud-examples/image/upload', {
      method: "POST",
      body: formData
    })
    .then(r => r.json());

    console.log(result);
  }
  loadFile();

  return (
    <>
      <DropArea>
        Area for drop file 
        <button type="file">Choose File</button>
        <button type="submit">Submit</button>
      </DropArea>
    </>
  )

}

export default DragDropFile