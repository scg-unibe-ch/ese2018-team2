import * as React from "react";
import { shallow } from "enzyme";
import { OrganizationSelectComponent } from "./OrganizationSelect";

describe("Test OrganizationSelect", () => {
  it("should appear loading when loading is set", () => {
    const select = shallow(
      <OrganizationSelectComponent
        loading={true}
        data={undefined}
        handleChange={() => {}}
      />
    );
    expect(select).toMatchInlineSnapshot(`
<FormSelect
  as={[Function]}
  control={[Function]}
  loading={true}
  name="organization"
  onChange={[Function]}
  options={Array []}
  placeholder="Select organization"
/>
`);
  });
});
