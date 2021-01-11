import SignaturePad from 'react-signature-canvas'
import Popup from 'reactjs-popup';
import React,{useState,useRef} from 'react'
import "../sigCanvas.css"


function Signature() {
  const[imageURL,setImageURL] = useState(null);

  const sigCanvas =useRef({});

  const clear = () => sigCanvas.current.clear();

  const save = () =>{
    console.log(sigCanvas.current.getTrimmedCanvas().toDataURL('img/png'))
  }
  return (
    <Popup 
    modal 
    trigger={<button>Click here!</button>}
    closeOnDocumentClick={false}
    >
    {close => (
      <div>
        <SignaturePad
          ref={sigCanvas}
          canvasProps={{
            className:"signatureCanvas"
      }}
    />
    <button onClick={save}>Save</button>
    <button onClick={clear}>Clear</button>
    <button onClick={close}>Close</button>
      </div>
    )}
    
    </Popup>
      
   
  );
}

export default Signature;