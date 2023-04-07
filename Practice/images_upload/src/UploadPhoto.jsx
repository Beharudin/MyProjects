import React, { useState } from "react";

function UploadPhoto() {
  const [images, setImages] = useState("");
  const handleImages = (e) => {
    // setImages(e.target.files[0]);
    console.log(e.target.files);
  };
  return (
    <div>
      <input type="file" name="file" onChange={handleImages} />
      <button>Submit</button>
    </div>
  );
}

export default UploadPhoto;
