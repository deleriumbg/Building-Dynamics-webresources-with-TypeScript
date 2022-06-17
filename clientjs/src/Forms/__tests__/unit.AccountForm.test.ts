import { AccountForm } from "../AccountForm";
import { XrmMockGenerator } from "xrm-mock";

describe("AccountForm.onload", () => {
  beforeEach(() => {
    XrmMockGenerator.initialise();
  });

  it("notifies invalid website addresses", () => {
    // Arrange
    const context = XrmMockGenerator.getEventContext();
    const websiteMock = XrmMockGenerator.Attribute.createString("websiteurl", "foobar");
    websiteMock.controls.itemCollection[0].setNotification = jest.fn();

    // Act
    AccountForm.onload(context);
    websiteMock.fireOnChange();

    // Assert
    expect(websiteMock.controls.itemCollection[0].setNotification).toBeCalled();
  });

  it("clears notification on valid website address", () => {
    // Arrange
    const context = XrmMockGenerator.getEventContext();
    const websiteMock = XrmMockGenerator.Attribute.createString("websiteurl", "foo");
    websiteMock.controls.itemCollection[0].setNotification = jest.fn();
    websiteMock.controls.itemCollection[0].clearNotification = jest.fn();

    // Act
    AccountForm.onload(context);
    websiteMock.fireOnChange();

    // Assert
    expect(websiteMock.controls.itemCollection[0].setNotification).toBeCalledWith(expect.any(String), "websiteurl");

    // Act
    websiteMock.value = "https://learn.develop1.net";
    websiteMock.fireOnChange();

    // Assert
    expect(websiteMock.controls.itemCollection[0].clearNotification).toBeCalledWith("websiteurl");
  });
});
