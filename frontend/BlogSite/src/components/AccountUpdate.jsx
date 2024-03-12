import { useEffect, useState } from "react"
import { FaTrash } from "react-icons/fa";
import axios from "axios";


//Hooks
import useAuthContext from "../hooks/useAuthContext";
import useUpdateAccount from "../hooks/useUpdateAccount";


export default function AccountUpdate({ onClose }) {

  const { user, dispatch } = useAuthContext();
  const { updateAccount, isLoading } = useUpdateAccount();
  const email = user.email;

  const [userName, setUserName] = useState(user.userName);
  const [blogDesc, setBlogDesc] = useState(user.blogDesc);
  const [profilePic, setProfilePic] = useState(user.profilePic);
  const [selectedImage, setSelectedImage] = useState(user.profilePic);
  const [error, setError] = useState(null);

  //Image Max File Size
  const MAX_FILE_SIZE_MB = 5;



  async function handleEditAccount(e) {
    e.preventDefault();

    const data = {userName, email, blogDesc};

    //append all data to a formData
    const update = new FormData();
    update.append('profilePic', profilePic);
    update.append('data', JSON.stringify(data));

    await updateAccount(update)
      .then(() => {
        onClose();
      })
      .catch((error) => {
        setError(error.message);
      })
  }


  //Image upload
  async function handleImageUpload(e) {
    
    const file = e.target.files[0];
    setSelectedImage(file);
    
    try {

      const fileSizeInMB = file.size / (1024 * 1024);
      if (fileSizeInMB > MAX_FILE_SIZE_MB) {
        setError(`File size should not exceed ${MAX_FILE_SIZE_MB} MB`);
        setSelectedImage(null);
      } 
      else {
        setError(null);
        setProfilePic(file);
      }
    }
    catch (error) {
      console.error(error);
    }
  }


  return (
    <div>
      <div className="update-container">
        <form className='update-account-form' onSubmit={handleEditAccount}>
          <button className="close-form" onClick={() => onClose()}><FaTrash/></button>

          <h3>Update Account</h3>
          <br></br>

          <div>
            <label>Username</label>
            <input 
              type="text"
              onChange={e => setUserName(e.target.value)}
              value={userName}
            />
          </div>

          <div>
            <label>Profile Picture</label>
            <label htmlFor="file" className="custom-upload-btn">Upload Image</label>

            <input
              className="img-input"
              type="file"
              id="file"
              accept=".jpeg, .png, .jpg"
              onChange={handleImageUpload}
            />
            <div></div>

            {selectedImage && <span className="file-label">{selectedImage.name}</span>}
          </div>
          
          <div>
            <label>Blog Description</label>
            <input 
              type="text"
              onChange={e => setBlogDesc(e.target.value)}
              value={blogDesc}
            />
          </div>
          
          <div className="blogControls">
            <div></div>
            <button disabled={isLoading}>Save Changes</button>
          </div>

          {error && <span className="blog-post-error">{error}</span>}
          <p>You will need to Login again after saving the changes</p>

        </form>
      </div>

    </div>
  )
}