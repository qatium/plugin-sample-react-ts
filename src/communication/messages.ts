import { SDK, Valve } from '@qatium/sdk'

export type SelectedElement = ReturnType<SDK["map"]["getSelectedElement"]>

export type MessageToEngine = {
  event: "close-valve",
  valveId: Valve["id"]
}

export type MessageToUI = {
  event: "selected-element",
  selectedElement: SelectedElement
}