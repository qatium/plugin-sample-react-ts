import { PluginI, SDK } from "@qatium/plugin/engine";
import { MessageToEngine, MessageToUI } from '../communication/messages';

export class Engine implements PluginI<MessageToEngine> {
  selectedElement: ReturnType<SDK["map"]["getSelectedElement"]>;

  run(sdk: SDK) {
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

  onMessage(sdk: SDK, message: MessageToEngine) {
    if (message.event !== "close-valve") {
      return;
    }

    return sdk.network.setStatus(message.valveId, "CLOSED");
  }
}