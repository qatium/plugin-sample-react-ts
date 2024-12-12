import { Plugin } from "@qatium/sdk/plugin";
import { ElementIdentifier, SDK } from "@qatium/sdk";
import { MessageToEngine, MessageToUI } from '../communication/messages';

export class MyPlugin implements Plugin {
  selectedElement: ReturnType<SDK["map"]["getSelectedElement"]>;

  onElementSelected(element?: ElementIdentifier) {
    this.selectedElement = element ? { ...element } : undefined;
    return sdk.ui.sendMessage<MessageToUI>({
      event: "selected-element",
      selectedElement: this.selectedElement
    })
  }

  onMessage(message: MessageToEngine) {
    if (message.event !== "close-valve") {
      return;
    }

    return sdk.network.setStatus(message.valveId, "CLOSED");
  }
}