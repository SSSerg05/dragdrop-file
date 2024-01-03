import React, { useCallback, useState } from "react";
import { useDropzone} from 'react-dropzone';

import { DropArea } from "./DragDropFile.styled";


export const DragDropFile = () => {
  const onDrop = useCallback((acceptedFiles) => {
    const file = new FileReader;

    file.onload = function() {
      setPreview(file.result);
    }

    file.readAsDataURL(acceptedFiles[0])
  }, [])

  const { acceptedFiles, getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop
  });

  const [preview, setPreview] = useState(null);



  async function handleOnSubmit(e) {
    e.preventDefault();

    if ( typeof acceptedFiles[0] === 'undefined' ) return;

    const formData = new FormData();

    formData.append('file', acceptedFiles[0]);
    formData.append('upload_preset', '<Your Upload Preset>');
    formData.append('api_key', import.meta.env.VITE_CLOUDINARY_API_KEY);

    const results = await fetch('https://api.cloudinary.com/v1_1/<Your Cloud Name>/image/upload', {
      method: 'POST',
      body: formData
    }).then(r => r.json());

    console.log('results', results);
  }

  return (
    <>
      <DropArea>
        Area for drop file 

        <div >
              <input />
              {
                isDragActive ?
                  <p>Drop the files here ...</p> :
                  <p>Drag 'n' drop some files here, or click to select files</p>
              }
            </div>

          {preview && (
            <p className="mb-5">
              <img src={preview} alt="Upload preview" />
            </p>
          )}

        <button type="file">Choose File</button>
        <button type="submit">Submit</button>
      </DropArea>
    </>
  )

}

export default DragDropFile