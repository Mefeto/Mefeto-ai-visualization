export interface VectorDataType {
  articlePosition: number[];
  articleID: string;
  clusterID: string;
}

export interface ArticleType {
  articleID: string;
  articleDate: Date;
  articlePopularity: number;
  articleProvider: string;
  articleTitle: string;
  articleContent: string;
  articleProblem: string;
  articleCause: string;
  articleSolution: string;
}

export interface ClusterType {
  timeframeID: number;
  clusterID: number;
  clusterWrap: [number, number][];
  clusterCenter: [number, number];
  clusterTitle: string;
  clusterProblem: string;
  clusterCause: string;
  clusterSolution: string;
}

export type ArrayElement<ArrayType extends readonly unknown[]> =
  ArrayType extends readonly (infer ElementType)[] ? ElementType : never;
