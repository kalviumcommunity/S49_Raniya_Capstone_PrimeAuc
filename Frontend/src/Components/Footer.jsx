import React from 'react';
import logo from "../assets/images/logo.png";
import "../Styles/Footer.css";
import '@fortawesome/fontawesome-free/css/all.css';

const Footer = () => {
    return (
        <>
            <div className="Footer">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 col-lg-5 col-12 ft-1">
                            <img src={logo} alt="logo" className="logo small-logo" />
                            <p>Where Beauty meets the eyes of the beholder</p>
                            <div className="footer-icons">
                                <i className="fa-brands fa-facebook"></i>
                                <i className="fa-brands fa-twitter"></i>
                                <i className="fa-brands fa-instagram"></i>
                                <i className="fa-brands fa-linkedin-in"></i>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-3 col-12 ft-2">
                            <h5>Quick Links</h5>
                            <ul>
                                <li className="nav-item">
                                    <a className="" href="/help">Help</a>
                                </li>
                                <li className="nav-item">
                                    <a className="" href="/auctionitemlist">Auctions</a>
                                </li>
                                <li className="nav-item">
                                    <a className="" href="/sell">Sell</a>
                                </li>
                            </ul>
                        </div>
                        <div className="col-md-6 col-lg-4 col-12 ft-3">
                            <h5>Contact Us</h5>
                            <p><i className="fa-solid fa-phone-volume"></i> +91 7688974456</p>
                            <p><i className="fa-solid fa-envelope"></i> loxerauctions@gmail.com</p>
                            <p><i className="fa-solid fa-paper-plane"></i> Bangalore, India.</p>
                        </div>
                        <div className="col-12">
                            <div className="copyright">
                                &copy; 2024 E-Auctioning Platform. All rights reserved
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Footer;
