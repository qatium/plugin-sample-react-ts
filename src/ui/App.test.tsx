import { act, render, screen } from "@testing-library/react";
import App from "./App";
import { AssetTypes } from "@qatium/plugin/ui";


describe("UI", () => {
  it("on selected element", () => {
    render(<App />);

    expect(screen.getByText("First select a valve")).toBeInTheDocument();

    act(() =>
      window.dispatchEvent(
        new MessageEvent("message", {
          data: {
            source: "qatium",
            type: "message",
            payload: {
              event: "selected-element",
              selectedElement: {
                id: "V1",
                type: AssetTypes.VALVE
              }
            }
          }
        })
      )
    );

    expect(screen.getByText("Close selected valve")).toBeInTheDocument();
  })
})