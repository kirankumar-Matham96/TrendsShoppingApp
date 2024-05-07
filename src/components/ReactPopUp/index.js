import {AiOutlineClose} from 'react-icons/ai'
import './index.css'

const ReactPopUp = props => {
  const {children, onClosePopup} = props

  return (
    <div className="popup-container">
      <div className="popup-inner-container">
        <button
          type="button"
          onClick={onClosePopup}
          className="popup-close-button"
        >
          <AiOutlineClose className="popup-close-button-icon" title="close" />
        </button>
        {children}
      </div>
    </div>
  )
}

export default ReactPopUp
