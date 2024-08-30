import React, {useState, useRef} from 'react'
import {imageUpload} from '../../services/imageUpload'
const UploadFile = () => {
  const [avatarURL, setAvatarURL] = useState('');

  const fileUploadRef = useRef();

  const handleImageUpload = (event) => {
    event.preventDefault();
    fileUploadRef.current.click();
  }

  const uploadImageDisplay = async () => {
    try {
      setAvatarURL('');
      const uploadedFile = fileUploadRef.current.files[0];
      const formData = new FormData();

      formData.append("file", uploadedFile);
      
      // const cachedURL = URL.createObjectURL(uploadedFile);
      // setAvatarURL(cachedURL);

    //   const response = await fetch("https://api.escuelajs.co/api/v1/files/upload", {
        const response = await imageUpload(formData);

      if (response.status === 201) {
        const data = await response.json();
        setAvatarURL(data?.location);
      }

    } catch(error) {
      console.error(error);
      setAvatarURL('');
    }


  }

  return (
    <div className="relative h-96 w-96 m-8">
      <img 
        src={avatarURL}
        alt ="Avatar"
        className="h-96 w-96 rounded-full" />

      <form id="form" encType='multipart/form-data'>
        <button
          type='submit'
          onClick={handleImageUpload}
          className='flex-center absolute bottom-12 right-14 h-9 w-9 rounded-full'>
          <img
            src={''}
            alt="Edit"
            className='object-cover' />
        </button>
        <input 
          type="file"
          id="file"
          ref={fileUploadRef}
          onChange={uploadImageDisplay}
          hidden />
      </form>  
    </div>
  )
}

export default UploadFile;