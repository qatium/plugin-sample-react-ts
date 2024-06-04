import { mockSDK, aValve } from "@qatium/sdk-testing-library";
import { MyPlugin } from './plugin';
import { MessageToEngine } from "../communication/messages";

describe("Engine", () => {
  describe("onMessage", () => {
    it("should close valve", () => {
      const sdk = mockSDK({
        network: [
          aValve({
            id: "V1",
            connections: []
          })
        ]
      });

      global.sdk = sdk;

      const engine = new MyPlugin();
      const message: MessageToEngine = {
        event: "close-valve",
        valveId: "V1"
      };
      engine.onMessage(message);
      expect(sdk.network.getValves((valve) => valve.id === "V1")).toEqual([
        expect.objectContaining({
          simulation: expect.objectContaining({
            status: "CLOSED"
          })
        })
      ]);
    });
  });
});