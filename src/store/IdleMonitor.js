import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { useAuth } from './auth'; 
import './idle-monitor.css'; 

function IdleMonitor() {
  const { LogoutUser } = useAuth(); 
  const [idleModal, setIdleModal] = useState(false);
  const idleTimeout = 1000 * 60 * 5;  // 5 minutes
  const idleLogout = 1000 * 60 * 10; // 10 minutes
  const idleEventRef = useRef(null);
  const idleLogoutEventRef = useRef(null);

  const sessionTimeout = useCallback(() => {
    if (idleEventRef.current) clearTimeout(idleEventRef.current);
    if (idleLogoutEventRef.current) clearTimeout(idleLogoutEventRef.current);
  
    idleEventRef.current = setTimeout(() => setIdleModal(true), idleTimeout);
    idleLogoutEventRef.current = setTimeout(() => LogoutUser(), idleLogout);
  }, [LogoutUser, idleTimeout, idleLogout]);

  const extendSession = () => {
    clearTimeout(idleEventRef.current);
    setIdleModal(false);
    sessionTimeout(); // Restart idle timeout
  }

  useEffect(() => {
    const events = ['mousemove', 'click', 'keypress'];

    const handleEvents = () => {
      clearTimeout(idleEventRef.current);
      setIdleModal(false);
      sessionTimeout(); // Restart idle timeout
    };

    for (let e of events) {
      window.addEventListener(e, handleEvents);
    }

    return () => {
      for (let e of events) {
        window.removeEventListener(e, handleEvents);
      }
    }
  }, [sessionTimeout]);

  return (
    <Modal isOpen={idleModal} toggle={() => setIdleModal(false)} className="idle-modal">
      <ModalHeader toggle={() => setIdleModal(false)} className="idle-modal-header">
        Session Expire Warning
      </ModalHeader>
      <ModalBody className="idle-modal-body">
        Your session will expire in {idleLogout / 60 / 1000} minutes. Do you want to extend the session?
      </ModalBody>
      <ModalFooter className="idle-modal-footer">
        <button className="btn btn-info" onClick={() => LogoutUser()}>Logout</button>
        <button className="btn btn-success" onClick={() => extendSession()}>Extend Session</button>
      </ModalFooter>
    </Modal>
  );
}

export default IdleMonitor;
