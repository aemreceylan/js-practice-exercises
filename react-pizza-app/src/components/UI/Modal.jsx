import { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import "./modal.css";

Modal.propTypes = {
  closeFn: PropTypes.func,
  children: PropTypes.node,
  style: PropTypes.object,
};

export default function Modal({ children, closeFn, style }) {
  const modalRef = useRef();

  useEffect(() => {
    document.body.style.overflowY = "hidden";
    modalRef.current.focus();

    return () => (document.body.style.overflowY = "scroll");
  }, []);

  function handleOnKeyDown(e) {
    if (e.key == "Escape") {
      closeFn();
    }
  }

  function handleOnClick() {
    closeFn();
  }

  return (
    <>
      <div
        ref={modalRef}
        id="modal"
        onClick={handleOnClick}
        onKeyDown={handleOnKeyDown}
        tabIndex="0"
      >
        <div
          id="modal-ui-container"
          style={style}
          onClick={(e) => e.stopPropagation()}
        >
            <div id="modal-ui-close-button" onClick={handleOnClick}>X</div>
          {children}
        </div>
      </div>
    </>
  );
}
