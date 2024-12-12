import { sendMessage } from '@qatium/sdk/ui';
import './App.css';
import { useSelectedElement } from './useSelectedElement';
import { MessageToEngine } from '../communication/messages';

function App() {
  const selectedElement = useSelectedElement();

  const closeValve = (valveId: string) => {
    sendMessage<MessageToEngine>({
      event: "close-valve",
      valveId
    })
  }

  const content = selectedElement ?
    (
      <div>
        <p>
          <b>Valve selected</b>: {selectedElement.id}
        </p>
        <button onClick={() => closeValve(selectedElement.id)}>
          Close selected valve
        </button>
      </div>
    )
    : <p>First select a valve</p>

  return (
    <>
      {content}
    </>
  )
}

export default App
