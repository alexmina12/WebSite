import React, { useContext, useEffect, useState } from "react";
import styles from "./Profile.module.css";
import AuthContext from "../../Context/AuthContext";
import ErrorPage from "../../routes/root";
import * as BiIcons from "react-icons/bi";
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
              <BiIcons.BiEdit className={styles.icon} onClick={handleEdit} />
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
                  <span className={styles.info}>{profileData.username}</span>
                </>
              )}
            </p>
          </div>
          <div className={styles.profileInfo}>
            <p>
              Email:
              <BiIcons.BiEdit className={styles.icon} onClick={handleEdit} />
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
                  <span className={styles.info}>{profileData.email}</span>
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
              <BiIcons.BiEdit className={styles.icon} onClick={handleEdit} />
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
                  <span className={styles.info}>{profileData.tara}</span>
                </>
              )}
            </p>
          </div>
          <div className={styles.profileInfo}>
            <p>
              Street:
              <BiIcons.BiEdit className={styles.icon} onClick={handleEdit} />
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
                  <span className={styles.info}>{profileData.strada}</span>
                </>
              )}
            </p>
          </div>
          <div className={styles.profileInfo}>
            <p>
              Number:
              <BiIcons.BiEdit className={styles.icon} onClick={handleEdit} />
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
                  <span className={styles.info}>{profileData.numar}</span>
                </>
              )}
            </p>
          </div>
          <div className={styles.profileInfo}>
            <p>
              Additional information:
              <BiIcons.BiEdit className={styles.icon} onClick={handleEdit} />
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
                  <span className={styles.info}>{profileData.suplimentar}</span>
                </>
              )}
            </p>
          </div>
        </div>
        <div className={styles.profileContainer2}>
          <h1 className={styles.heading}>Personal Data</h1>
          <div className={styles.profileInfo}>
            <p>
              First Name:
              <BiIcons.BiEdit className={styles.icon} onClick={handleEdit} />
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
                  <span className={styles.info}>{profileData.nume}</span>
                </>
              )}
            </p>
          </div>
          <div className={styles.profileInfo}>
            <p>
              Last Name:
              <BiIcons.BiEdit className={styles.icon} onClick={handleEdit} />
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
                  <span className={styles.info}>{profileData.prenume}</span>
                </>
              )}
            </p>
          </div>
          <div className={styles.profileInfo}>
            <p>
              Gender:
              <BiIcons.BiEdit className={styles.icon} onClick={handleEdit} />
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
                  <span className={styles.info}>{profileData.gen}</span>
                </>
              )}
            </p>
          </div>
          <div className={styles.profileInfo}>
            <p>
              Birthdate:
              <BiIcons.BiEdit className={styles.icon} onClick={handleEdit} />
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
                  <span className={styles.info}>
                    {profileData.data_nasterii}
                  </span>
                </>
              )}
            </p>
          </div>
        </div>
      </div>
      {isEditing && (
        <button onClick={handleSubmit} className={styles.submit}>
          Save Changes
        </button>
      )}
    </>
  );
}

export default Profile;
