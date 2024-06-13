import React from 'react';
//import './Profile.css'; // Create this file for custom styling if needed

function Profile() {
  const user = {
    fname: 'John',
    lname: 'Doe',
    roll: '12345',
    mob_no: '9876543210',
    department: 'Computer Science',
    year_of_study: '3rd'
  };

  return (
    <div className="profile-container">
      <fieldset className="profile-fieldset">
        <legend>Personal Info</legend>
        <div className="profile-content">
          <div className="profile-info">
            <h3>{`${user.fname} ${user.lname}`}</h3>
            <h5>Student</h5>
            <ul className="profile-address">
              <li>
                <span className="profile-label">Roll No: </span>
                <span>{user.roll}</span>
              </li>
              <li>
                <span className="profile-label">Phone: </span>
                <span>{user.mob_no}</span>
              </li>
              <li>
                <span className="profile-label">Dept: </span>
                <span>{user.department}</span>
              </li>
              <li>
                <span className="profile-label">Year of Study: </span>
                <span>{user.year_of_study}</span>
              </li>
            </ul>
          </div>
        </div>
      </fieldset>
    </div>
  );
}

export default Profile;
