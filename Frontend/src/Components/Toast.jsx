import React, { useState, useEffect, useRef } from 'react';
import { CToast, CToastHeader, CToastBody, CToaster } from '@coreui/react';

const ToastComponent = ({ bidAmount }) => {
  const [toasts, setToasts] = useState([]);
  const toasterRef = useRef();

  useEffect(() => {
    if (bidAmount) {
      showToast(bidAmount);
    }
  }, [bidAmount]);

  const showToast = (bidAmount) => {
    const exampleToast = (
      <CToast animation={false} autohide={false} visible={true}>
        <CToastHeader closeButton>
          <svg
            className="rounded me-2"
            width="20"
            height="20"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMidYMid slice"
            focusable="false"
            role="img"
          >
            <rect width="10" height="10" fill="#007aff"></rect>
          </svg>
          <div className="fw-bold me-auto">Bid Placed</div>
        </CToastHeader>
        <CToastBody>A Bid of ₹{bidAmount} has been placed by user biduser1234.</CToastBody>
      </CToast>
    );
    setToasts([...toasts, exampleToast]);
  };

  return (
    <CToaster className="p-3" placement="top-end" ref={toasterRef}>
      {toasts.map((toast, index) => (
        <div key={index}>{toast}</div>
      ))}
    </CToaster>
  );
};

export default ToastComponent;
