import { Client } from "elasticsearch";
import bodybuilder from "bodybuilder";

export interface SearchInput {
  search?: string;
  minSalary?: number;
  maxSalary?: number;
}

export interface SearchNode {
  id: string;
  _type: string;
}

export interface SearchBucket {
  id: string;
  key: string;
  count: number;
}

export interface SearchAggregation {
  id: string;
  value: string;
}

export interface SearchResult {
  nodes: SearchNode[];
  buckets: SearchBucket[];
  aggregations: SearchAggregation[];
}

export const _search = async (
  client: Client,
  input: SearchInput,
  exclude?: string[]
): Promise<SearchResult> => {
  let builder = bodybuilder();

  if (input.search) {
    builder = builder.query("match", "title", {
      query: input.search,
      fuzziness: 6
    });
  }

  if (input.maxSalary!! || input.minSalary!!) {
    if (input.maxSalary!! && input.minSalary!!) {
      builder = builder.addQuery("range", "salary", {
        gte: input.minSalary,
        lte: input.maxSalary
      });
    } else if (input.minSalary!!) {
      builder = builder.addQuery("range", "salary", {
        gte: input.minSalary
      });
    } else if (input.maxSalary!!) {
      builder = builder.addQuery("range", "salary", {
        lte: input.maxSalary
      });
    }
  }

  builder = builder.size(30);

  builder = builder.aggregation(
    "terms",
    "skills.keyword",
    {
      order: {
        _key: "asc"
      }
    },
    "skills"
  );

  builder = builder.aggregation("min", "salary", "minSalary");

  builder = builder.aggregation("max", "salary", "maxSalary");

  if (exclude) {
    builder = builder.notFilter("ids", {
      values: [...exclude]
    });
  }

  console.log(builder.build());

  const result = await client.search({
    body: builder.build()
  });

  const nodes = result.hits.hits.map(e => ({ id: e._id, _type: e._type }));

  const buckets = result.aggregations["skills"].buckets.map((e: any) => ({
    _type: "Skill",
    key: e.key,
    count: e.doc_count
  }));

  const aggregations = [
    {
      id: "minSalary",
      value: result.aggregations.minSalary.value
    },
    {
      id: "maxSalary",
      value: result.aggregations.maxSalary.value
    }
  ];

  return {
    nodes,
    buckets,
    aggregations
  };
};
