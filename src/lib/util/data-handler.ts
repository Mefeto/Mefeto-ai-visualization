export type DataHandlerReturnType = {
  x: number;
  y: number;
  id: string;
  group_id: string;
}[];
export const dataHandler = (
  dummy: { articlePosition: number[]; articleID: string; clusterID: string }[],
): DataHandlerReturnType => {
  return dummy.map((i) => {
    return {
      x: i.articlePosition[0],
      y: i.articlePosition[1],
      id: i.articleID,
      group_id: i.clusterID,
    };
  });
};
