import { describe, expect, it } from "vitest";

import { mount } from "@vue/test-utils";

const Component = {
  template: "<ButtonSmall text='Button' />",
};

describe("HelloWorld", () => {
  it("renders properly", () => {
    const wrapper = mount(Component);
    expect(wrapper.text()).toContain("Button");
  });
});
