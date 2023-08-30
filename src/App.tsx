import { useMemo, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./style/App.css";
import { dataHandler } from "./lib/util/data-handler.ts";
import { dummy } from "./lib/data/dummy.ts";
import { ScatterPlot } from "./lib/component/scatter-plot.tsx";

export default function App() {
  const data = useMemo(() => dataHandler(dummy), [dummy]);

  return (
    <>
      <ScatterPlot data={data} width={1200} height={700} />
    </>
  );
}
