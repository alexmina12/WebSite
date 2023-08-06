import React, { useContext, useEffect, useState } from "react";
import styles from "./Profile.module.css";
import AuthContext from "../../Context/AuthContext";
import ErrorPage from "../../routes/root";
import * as LuIcons from "react-icons/lu";
import axios from "axios";

function Profile() {
  const { isLoggedIn, user } = useContext(AuthContext);
  const [profileData, setProfileData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const userId = user.id;

  useEffect(() => {
    if (isLoggedIn && userId) {
      fetchProfileData(userId);
    }
  }, [isLoggedIn, userId]);

  const fetchProfileData = (userId) => {
    axios
      .get(`http://localhost:1024/profile/${userId}`)
      .then((response) => {
        if (response.data.success && response.data.data) {
          setProfileData(response.data.data);
          setFormData(response.data.data);
        } else {
          console.error("Datele utilizatorului nu au fost găsite.");
        }
      })
      .catch((error) => {
        console.error("Eroare la obținerea datelor de profil:", error);
      });
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfileData(formData);
    setIsEditing(false);
    console.log(userId);
    console.log(formData);
  };

  const updateProfileData = (data) => {
    axios
      .put(`http://localhost:1024/profile/${userId}`, data)
      .then((response) => {
        console.log("Datele au fost actualizate cu succes!");
        setProfileData(response.data.data);
      })
      .catch((error) => {
        console.error("Eroare la actualizarea datelor de profil:", error);
      });
  };

  if (!isLoggedIn || !user || !user.id) {
    return <ErrorPage />;
  }

  if (!profileData) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className={styles.profile}>
        <div className={styles.profileContainer1}>
          <h1 className={styles.heading}>User Profile</h1>
          <div className={styles.profileInfo}>
            <p>
              Username:
              <LuIcons.LuEdit className={styles.icon} onClick={handleEdit} />
              <br />
              {isEditing ? (
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                />
              ) : (
                <>
                  <br />
                  <span>{profileData.username}</span>
                </>
              )}
            </p>
          </div>
          <div className={styles.profileInfo}>
            <p>
              Email:
              <LuIcons.LuEdit className={styles.icon} onClick={handleEdit} />
              <br />
              {isEditing ? (
                <input
                  type="text"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              ) : (
                <>
                  <br />
                  <span>{profileData.email}</span>
                </>
              )}
            </p>
          </div>
        </div>
        <div className={styles.profileContainer2}>
          <h1 className={styles.heading}>User Profile</h1>
          <div className={styles.profileInfo}>
            <p>
              First Name:
              <LuIcons.LuEdit className={styles.icon} onClick={handleEdit} />
              <br />
              {isEditing ? (
                <input
                  type="text"
                  name="nume"
                  value={formData.nume}
                  onChange={handleChange}
                />
              ) : (
                <>
                  <br />
                  <span>{profileData.nume}</span>
                </>
              )}
            </p>
          </div>
          <div className={styles.profileInfo}>
            <p>
              Last Name:
              <LuIcons.LuEdit className={styles.icon} onClick={handleEdit} />
              <br />
              {isEditing ? (
                <input
                  type="text"
                  name="prenume"
                  value={formData.prenume}
                  onChange={handleChange}
                />
              ) : (
                <>
                  <br />
                  <span>{profileData.prenume}</span>
                </>
              )}
            </p>
          </div>
          <div className={styles.profileInfo}>
            <p>
              Gender:
              <LuIcons.LuEdit className={styles.icon} onClick={handleEdit} />
              <br />
              {isEditing ? (
                <input
                  type="text"
                  name="gen"
                  value={formData.gen}
                  onChange={handleChange}
                />
              ) : (
                <>
                  <br />
                  <span>{profileData.gen}</span>
                </>
              )}
            </p>
          </div>
          <div className={styles.profileInfo}>
            <p>
              Birthdate:
              <LuIcons.LuEdit className={styles.icon} onClick={handleEdit} />
              <br />
              {isEditing ? (
                <input
                  type="text"
                  name="data_nasterii"
                  value={formData.data_nasterii}
                  onChange={handleChange}
                />
              ) : (
                <>
                  <br />
                  <span>{profileData.data_nasterii}</span>
                </>
              )}
            </p>
          </div>
        </div>
        <div className={styles.profileContainer3}>
          <h1 className={styles.heading}>Billing Information</h1>
          <div className={styles.profileInfo}>
            <p>
              Country:
              <LuIcons.LuEdit className={styles.icon} onClick={handleEdit} />
              <br />
              {isEditing ? (
                <input
                  type="text"
                  name="tara"
                  value={formData.tara}
                  onChange={handleChange}
                />
              ) : (
                <>
                  <br />
                  <span>{profileData.tara}</span>
                </>
              )}
            </p>
          </div>
          <div className={styles.profileInfo}>
            <p>
              Street:
              <LuIcons.LuEdit className={styles.icon} onClick={handleEdit} />
              <br />
              {isEditing ? (
                <input
                  type="text"
                  name="strada"
                  value={formData.strada}
                  onChange={handleChange}
                />
              ) : (
                <>
                  <br />
                  <span>{profileData.strada}</span>
                </>
              )}
            </p>
          </div>
          <div className={styles.profileInfo}>
            <p>
              Number:
              <LuIcons.LuEdit className={styles.icon} onClick={handleEdit} />
              <br />
              {isEditing ? (
                <input
                  type="text"
                  name="numar"
                  value={formData.numar}
                  onChange={handleChange}
                />
              ) : (
                <>
                  <br />
                  <span>{profileData.numar}</span>
                </>
              )}
            </p>
          </div>
          <div className={styles.profileInfo}>
            <p>
              Additional information:
              <LuIcons.LuEdit className={styles.icon} onClick={handleEdit} />
              <br />
              {isEditing ? (
                <input
                  type="text"
                  name="suplimentar"
                  value={formData.suplimentar}
                  onChange={handleChange}
                />
              ) : (
                <>
                  <br />
                  <span>{profileData.suplimentar}</span>
                </>
              )}
            </p>
          </div>
        </div>
        {isEditing && <button onClick={handleSubmit}>Save Changes</button>}
      </div>
    </>
  );
}

export default Profile;
