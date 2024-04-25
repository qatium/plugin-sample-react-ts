import { mockSDK, aValve } from "@qatium/sdk-testing-library";
import { Engine } from './engine';
import { Message } from './types';

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

      const engine = new Engine();
      const message: Message = {
        event: "close-valve",
        valveId: "V1"
      };
      engine.onMessage(sdk, message);
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