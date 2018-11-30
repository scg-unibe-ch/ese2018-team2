import { createRangeFilter } from "./searchFilters";

describe("Test search filters", () => {
  it("Should create correct range filter for min and max field", () => {
    const result = createRangeFilter("salary", 0, 10);
    expect(result).toMatchSnapshot();
  });

  it("Should just create a filter for max when max is provided", () => {
    // Test with undefined
    const result1 = createRangeFilter("salary", undefined, 10);
    expect(result1).toMatchSnapshot();

    // Test with null
    const result2 = createRangeFilter("salary", null, 10);
    expect(result2).toMatchSnapshot();

    expect(result1).toMatchObject(result2);
  });

  it("Should just create a filter for min when min is provided", () => {
    // Test with undefined
    const result1 = createRangeFilter("salary", 2, undefined);
    expect(result1).toMatchSnapshot();

    // Test with null
    const result2 = createRangeFilter("salary", 2, null);
    expect(result2).toMatchSnapshot();

    expect(result1).toMatchObject(result2);
  });
});
