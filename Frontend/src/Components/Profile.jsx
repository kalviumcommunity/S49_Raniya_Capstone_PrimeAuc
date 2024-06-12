import React, { useState } from 'react';
import "../Styles/Profile.css";

function ProfilePage() {


  return (
    <div class="sidebar sidebar-dark border-end">
  <div class="sidebar-header border-bottom">
    <div class="sidebar-brand">Dashboard</div>
  </div>
  <ul class="sidebar-nav">
    <li class="nav-title">Profile</li>
    <li class="nav-item">
      <a class="nav-link active" href="#">
         User Details
      </a>
    </li>
    <li class="nav-item">
      <a class="nav-link" href="#">
         With badge
        <span class="badge bg-primary ms-auto">NEW</span>
      </a>
    </li>

    <li class="nav-title">Bids </li>
    <li class="nav-item">
      <a class="nav-link " href="#">
         Participated 
      </a>
    </li>

    <li class="nav-item">
      <a class="nav-link " href="#">
        Won
      </a>
    </li>


    <li class="nav-title">Listed</li>
    <li class="nav-item">
      <a class="nav-link " href="#">
        Items
      </a>
    </li>
   
    <li class="nav-item mt-5">
      <a class="nav-link" href="help">
        <i class="nav-icon cil-cloud-download"></i> How LOXERA Works</a>
    </li>
    <li class="nav-item">
      <a class="nav-link" href="aboutus">
        <i class="nav-icon cil-layers"></i> About
        <strong>LOXERA</strong>
      </a>
    </li>
  </ul>
  <div class="sidebar-footer border-top d-flex">
    <button class="sidebar-toggler" type="button"></button>
  </div>
</div>
  );
}

export default ProfilePage;
