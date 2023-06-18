const Modal = (props) => {
  const content = props.content;
  const stopPropagation = (event) => event.stopPropagation();
  const closeButton = () => {
    props.closeModal()
    if(content.callBack) content.callBack();
  }

  if (content.display)
    return (
      <div className="modal-blur" onClick={props.closeModal}>
        <button onClick={closeButton} className="remove-btn">X</button>
        <div onClick={stopPropagation} className="modal-content">
          <h1>{content.message}</h1>
        </div>
      </div>
    );

  return <></>;
};

export default Modal;
