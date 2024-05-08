import { AssetTypes, onMessage } from '@qatium/plugin/ui';
import { useEffect, useState } from 'react';
import { MessageToUI, SelectedElement } from '../communication/messages';

export const useSelectedElement = () => {
  const [selectedElement, setSelectedElement] = useState<SelectedElement>()

  useEffect(() => {
    const { removeListener } = onMessage<MessageToUI>((msg) => {
      if (msg.event !== "selected-element") {
        return;
      }

      if (!msg.selectedElement) {
        return setSelectedElement(undefined);
      }

      if (msg.selectedElement?.type === AssetTypes.VALVE) {
        return setSelectedElement(msg.selectedElement)
      }
    })

    return removeListener
  }, [])

  return selectedElement;
}