import React, { useState, useEffect } from 'react';
import "../Styles/Profile.css";
import axios from 'axios';

function ProfilePage() {
  const [userbid_no, setuserbid_no] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [activeTab, setActiveTab] = useState('profile'); // Added state for active tab

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.put('http://localhost:3000/updatePassword', {
        userbid_no,
        currentPassword,
        newPassword,
      });

      setMessage(response.data.message || response.data.error);
    } catch (error) {
      setMessage(error.response?.data?.error || 'An error occurred');
    }
  };

  useEffect(() => {
    const storeduserbid_no = localStorage.getItem('userId');
    if (storeduserbid_no) {
      setuserbid_no(storeduserbid_no);
    }
  }, []);

  return (
    <div style={{ display: "flex" }}>
      <div className="sidebar sidebar-dark border-end">
        <div className="sidebar-header border-bottom">
          <div className="sidebar-brand">Dashboard</div>
        </div>
        <ul className="sidebar-nav">
          <li className="nav-title">Profile</li>
          <li className={`nav-item ${activeTab === 'profile' ? 'active' : ''}`}>
            <a className={`nav-link ${activeTab === 'profile' ? 'active' : ''}`} href="#" onClick={() => setActiveTab('profile')}>
              User Details
            </a>
          </li>
          <li className={`nav-item ${activeTab === 'changePassword' ? 'active' : ''}`}>
            <a className={`nav-link ${activeTab === 'changePassword' ? 'active' : ''}`} href="#" onClick={() => setActiveTab('changePassword')}>
              Change Password
              <span className="badge bg-primary ms-auto">NEW</span>
            </a>
          </li>
          <li className="nav-title">Bids</li>
          <li className={`nav-item ${activeTab === 'participated' ? 'active' : ''}`}>
            <a className={`nav-link ${activeTab === 'participated' ? 'active' : ''}`} href="#" onClick={() => setActiveTab('participated')}>
              Participated
            </a>
          </li>
          <li className={`nav-item ${activeTab === 'won' ? 'active' : ''}`}>
            <a className={`nav-link ${activeTab === 'won' ? 'active' : ''}`} href="#" onClick={() => setActiveTab('won')}>
              Won
            </a>
          </li>
          <li className="nav-title">Listed</li>
          <li className={`nav-item ${activeTab === 'items' ? 'active' : ''}`}>
            <a className={`nav-link ${activeTab === 'items' ? 'active' : ''}`} href="#" onClick={() => setActiveTab('items')}>
              Items
            </a>
          </li>
          <li className="nav-item mt-5">
            <a className="nav-link" href="help">
              <i className="nav-icon cil-cloud-download"></i> How LOXERA Works
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="aboutus">
              <i className="nav-icon cil-layers"></i> About
              <strong>LOXERA</strong>
            </a>
          </li>
        </ul>
        <div className="sidebar-footer border-top d-flex">
          <button className="sidebar-toggler" type="button"></button>
        </div>
      </div>

      <div className="content">
        {activeTab === 'changePassword' && (
          <div id="updatePasswordDiv">
            <h2>Update Password</h2>
            <form id="updatePasswordForm" onSubmit={handleSubmit}>
              <label htmlFor="userbid_no">User ID:</label>
              <input
                type="text"
                id="userbid_no"
                name="userbid_no"
                value={userbid_no}
                onChange={(e) => setuserbid_no(e.target.value)}
                required
              /><br /><br />

              <label htmlFor="currentPassword">Current Password:</label>
              <input
                type="password"
                id="currentPassword"
                name="currentPassword"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
              /><br /><br />

              <label htmlFor="newPassword">New Password:</label>
              <input
                type="password"
                id="newPassword"
                name="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              /><br /><br />

              <button type="submit">Update Password</button>
            </form>
            <div id="message">{message}</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProfilePage;
