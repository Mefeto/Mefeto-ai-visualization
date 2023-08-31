import { useMemo } from "react";
import { dataHandler } from "./lib/util/data-handler.ts";
import { dummy } from "./lib/data/dummy.ts";
import { ScatterPlot } from "./lib/component/scatter-plot.tsx";
import { Center } from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";

export default function App() {
  const data = useMemo(() => dataHandler(dummy), [dummy]);
  const { height, width } = useViewportSize();

  return (
    <Center h={height} w={width}>
      <ScatterPlot data={data} width={1200} height={700} />
    </Center>
  );
}
