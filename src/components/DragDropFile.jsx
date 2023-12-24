import React, { useState } from "react";
import { DropArea } from "./DragDropFile.styled";


export const DragDropFile = () => {
  const [file, setFile] = useState(null)

  return (
    <>
      <DropArea>
        Area for drop file 
      </DropArea>
    </>
  )

}

export default DragDropFile