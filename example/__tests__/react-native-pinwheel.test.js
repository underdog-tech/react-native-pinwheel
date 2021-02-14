import React from "react";
import renderer from 'react-test-renderer';

import PinwheelLink from '@pinwheel/react-native-pinwheel';

var passedProps;

jest.mock('react-native-webview', () => {
  return {
    WebView: jest.fn().mockImplementation( 
      (props) => {
        passedProps = props;
        return <div>Piinwheel Link</div>;
      }
    ),
  }
});

const mockOnSuccess = jest.fn();
const mockOnExit = jest.fn();
const mockOnEvent = jest.fn();

describe("<PinwheelLink />", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  function renderPinwheelLink() {
    return renderer.create(
      <PinwheelLink
        linkToken={"link-token"}
        onSuccess={mockOnSuccess}
        onExit={mockOnExit}
        onEvent={mockOnEvent}
      />
    );
  }

  test("onSuccess is called", async () => {
    renderPinwheelLink();
      
    const result = {
      "accountId": "123",
      "job": "direct_deposit_switch",
      "params": {}
    };
    const eventData = {
      "nativeEvent": {
        "data": JSON.stringify({
          "type": "PINWHEEL_EVENT",
          "eventName": "success",
          "payload": result
        })
      }
    };

    passedProps.onMessage(eventData);
    expect(mockOnEvent.mock.calls.length).toBe(1);
    expect(mockOnSuccess.mock.calls.length).toBe(1);
    expect(mockOnExit.mock.calls.length).toBe(0);

    expect(mockOnSuccess.mock.calls[0][0]).toEqual(result);
  });

  test("onExit is called", async () => {
    renderPinwheelLink();
      
    const eventData = {
      "nativeEvent": {
        "data": JSON.stringify({
          "type": "PINWHEEL_EVENT",
          "eventName": "exit",
          "payload": {}
        })
      }
    };
    passedProps.onMessage(eventData);
    expect(mockOnEvent.mock.calls.length).toBe(1);
    expect(mockOnSuccess.mock.calls.length).toBe(0);
    expect(mockOnExit.mock.calls.length).toBe(1);

    expect(mockOnExit.mock.calls[0][0]).toEqual({});
  });

  test("onEvent is called", async () => {
    renderPinwheelLink();
      
    const eventData = {
      "nativeEvent": {
        "data": JSON.stringify({
          "type": "PINWHEEL_EVENT",
          "eventName": "Intro",
          "payload": {
            "job": "direct_deposit_switch"
          }
        })
      }
    };
    passedProps.onMessage(eventData);
    expect(mockOnEvent.mock.calls.length).toBe(1);
    expect(mockOnSuccess.mock.calls.length).toBe(0);
    expect(mockOnExit.mock.calls.length).toBe(0);

    expect(mockOnEvent.mock.calls[0][0]).toEqual("Intro");
  });
});
