import { Client } from "elasticsearch";
import bodybuilder from "bodybuilder";

export interface SearchInput {
  search?: string;
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

export interface SearchResult {
  nodes: SearchNode[];
  buckets: SearchBucket[];
}

export const _search = async (client: Client, input: SearchInput): Promise<SearchResult> => {
  let builder = bodybuilder();

  if (input.search) {
    builder = builder.query("match", "title", {
      query: input.search,
      fuzziness: 6
    });
  }

  builder = builder.size(30);

  builder = builder.aggregation("terms", "skills.keyword", {
    order: {
      _key: "asc"
    }
  }, "skills");

  const result = await client.search({
    body: builder.build()
  });

  const nodes = result.hits.hits.map(e => ({ id: e._id, _type: e._type }));

  const buckets = result.aggregations["skills"].buckets.map((e: any) => ({
    _type: "Skill",
    key: e.key,
    count: e.doc_count
  }));

  return {
    nodes,
    buckets
  }
};
