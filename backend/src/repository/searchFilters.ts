export interface CreateRangeFilterResult {
  range: object;
}

export interface CreateMatchQueryResult {
  must: object;
}

export const createMatchQuery = (
  field: string,
  value: string
): CreateMatchQueryResult => ({
  must: [
    {
      match: {
        title: value
      }
    }
  ]
});

export const createRangeFilter = (
  field: string,
  min: number,
  max: number
): CreateRangeFilterResult | {} => {
  if (min != undefined && max != undefined) {
    return {
      range: {
        [field]: {
          gte: min,
          lte: max
        }
      }
    };
  }

  if (max) {
    return {
      range: {
        [field]: {
          lte: max
        }
      }
    };
  }

  if (min) {
    return {
      range: {
        [field]: {
          gte: min
        }
      }
    };
  }

  return {};
};

export const createQuery = (
  matchQuery: any,
  ranges: Array<CreateRangeFilterResult | {}>
) => {
  const filteredRanges = ranges.filter((e: any) => e.range);

  const filter =
    filteredRanges.length > 0 ? { filter: [...filteredRanges] } : {};

  return {
    query: {
      bool: {
        ...matchQuery,
        ...filter
      }
    }
  };
};
