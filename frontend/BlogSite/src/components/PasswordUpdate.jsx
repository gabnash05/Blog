import { useEffect, useState } from "react"
import { FaTrash } from "react-icons/fa";
import axios from "axios";


//Hooks
import useAuthContext from "../hooks/useAuthContext";
import useUpdatePassword from "../hooks/useUpdatePassword";


export default function PasswordUpdate({ onClose }) {

  const { user, dispatch } = useAuthContext();
  const { updatePassword, verifyPassword, isLoading, isVerifyingPassword, isVerifiedPassword } = useUpdatePassword();
  const email = user.email;

  const [currentPassword, setCurrentPassword] = useState(null);
  const [newPassword, setNewPassword] = useState(null);
  const [error, setError] = useState(null);

  //Image Max File Size
  const MAX_FILE_SIZE_MB = 5;



  async function handleEditPassword(e) {
    e.preventDefault();

    await updatePassword(newPassword)
      .then(() => {
        onClose();
      })
      .catch((error) => {
        setError(error.message);
      })
  }

  async function handleCurrentPassword(e) {
    e.preventDefault();

    await verifyPassword(currentPassword);
  }


  return (
    <div>
      <div className="update-container">
        <form className='update-account-form'>
          <button className="close-form" onClick={() => onClose()}><FaTrash/></button>

          <h3>Update Password</h3>
          <br></br>

          <div>
            <label>Enter Current Password</label>
            <input 
              type="password"
              onChange={e => setCurrentPassword(e.target.value)}
              value={currentPassword}
            />
          </div>

          <div className="blogControls">
            <div></div>
            <button disabled={isLoading} onClick={handleCurrentPassword}>Verify Password</button>
          </div>

          {isVerifyingPassword && 
            <p className="loading-verifying-password">Verifying Password...</p>
          }
          
          {isVerifiedPassword &&
            <div>
              <label>Enter New Password</label>
              <input 
                type="password"
                onChange={e => setNewPassword(e.target.value)}
                value={newPassword}
                disabled={isVerifyingPassword}
              />
            </div>
          }
          
          {isVerifiedPassword &&
            <div className="blogControls">
              <div></div>
              <button disabled={isLoading} onClick={handleEditPassword}>Update Password</button>
            </div>
          }
          {error && <span className="blog-post-error">{error}</span>}
          <p>You will need to Login again after saving the changes</p>

        </form>
      </div>

    </div>
  )
}