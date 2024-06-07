import { Plugin} from "@qatium/sdk/plugin";
import { SDK } from "@qatium/sdk";
import { MessageToEngine, MessageToUI } from '../communication/messages';

export class MyPlugin implements Plugin {
  selectedElement: ReturnType<SDK["map"]["getSelectedElement"]>;

  run() {
    const newSelectedElement = sdk.map.getSelectedElement()

    if (newSelectedElement?.id === this.selectedElement?.id) {
      return;
    }

    this.selectedElement = newSelectedElement;

    return sdk.ui.sendMessage<MessageToUI>({
      event: "selected-element",
      selectedElement: newSelectedElement
    })
  }

  onMessage(message: MessageToEngine) {
    if (message.event !== "close-valve") {
      return;
    }

    return sdk.network.setStatus(message.valveId, "CLOSED");
  }
}