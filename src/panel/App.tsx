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
      <button onClick={() => closeValve(selectedElement.id)}>
        Close selected valve
      </button>
    )
    : <p>First select a valve</p>

  return (
    <>
      <h1>Valve closer</h1>
      {content}
    </>
  )
}

export default App
