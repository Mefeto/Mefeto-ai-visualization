import * as d3 from "d3";
import { DataHandlerReturnType } from "../util/data-handler.ts";
import { ElementRef, useLayoutEffect, useRef, useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import { DrawerContent } from "./drawer-content.tsx";
import { ArrayElement } from "../types/data-type.ts";

const MARGIN = { top: 30, right: 30, bottom: 50, left: 50 };

type AxisBasicProps = {
  data: DataHandlerReturnType;
  width: number;
  height: number;
};

export const ScatterPlot = ({ data, width, height }: AxisBasicProps) => {
  const boundsWidth = width - MARGIN.right - MARGIN.left;
  const boundsHeight = height - MARGIN.top - MARGIN.bottom;

  const [opened, { open, close }] = useDisclosure(false);
  const [clickedNode, setClickedNode] = useState<
    ArrayElement<DataHandlerReturnType> | null | undefined
  >(null);

  const svgRef = useRef<ElementRef<"svg">>(null);

  useLayoutEffect(() => {
    // x축 영역과 y축 영역 계산
    const xScale = d3.scaleLinear().domain([-0.2, 1]).range([0, boundsWidth]);
    const yScale = d3
      .scaleLinear()
      .domain([-0.1, 1.2])
      .range([boundsHeight, 0]);
    const k = height / width;

    // xAxis , yAxis
    const xAxis = (g, x) =>
      g
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisTop(x).ticks(12))
        .call((g) => g.select(".domain").attr("display", "none"));

    const yAxis = (g, y) =>
      g
        .call(d3.axisRight(y).ticks(12 * k))
        .call((g) => g.select(".domain").attr("display", "none"));

    const grid = (g, x, y) =>
      g
        .attr("stroke", "currentColor")
        .attr("stroke-opacity", 0.1)
        .call((g) =>
          g
            .selectAll(".x")
            .data(x.ticks(12))
            .join(
              (enter) =>
                enter.append("line").attr("class", "x").attr("y2", height),
              (update) => update,
              (exit) => exit.remove(),
            )
            .attr("x1", (d) => 0.5 + x(d))
            .attr("x2", (d) => 0.5 + x(d)),
        )
        .call((g) =>
          g
            .selectAll(".y")
            .data(y.ticks(12 * k))
            .join(
              (enter) =>
                enter.append("line").attr("class", "y").attr("x2", width),
              (update) => update,
              (exit) => exit.remove(),
            )
            .attr("y1", (d) => 0.5 + y(d))
            .attr("y2", (d) => 0.5 + y(d)),
        );

    // zoomable 하도록
    function zoomed({ transform }) {
      const zx = transform.rescaleX(xScale).interpolate(d3.interpolateRound);
      const zy = transform.rescaleY(yScale).interpolate(d3.interpolateRound);
      gCircles
        .attr("transform", transform)
        .selectAll("circle")
        .data(data)
        .attr("stroke-width", 0.2 / Math.sqrt(transform.k))
        .attr("r", 3 / Math.sqrt(transform.k));
      gx.call(xAxis, zx);
      gy.call(yAxis, zy);
      gGrid.call(grid, zx, zy);
    }
    const zoom = d3.zoom().scaleExtent([0.5, 1000]).on("zoom", zoomed);

    const svg = d3.select(svgRef.current);

    // grid
    const gGrid = svg.append("g");

    // dots
    const gCircles = svg
      .append("g")
      .attr("fill", "none")
      .attr("stroke-linecap", "round");

    gCircles
      .selectAll("circle")
      .data(data)
      .join("circle")
      .attr("cx", (d) => xScale(d.x))
      .attr("cy", (d) => yScale(d.y))
      .attr("r", 2) // radius of the circle
      .attr("stroke", (d) => colorScale(d.group_id))
      .attr("fill", (d) => colorScale(d.group_id))
      .attr("fill-opacity", 0.2)
      .attr("stroke-width", 1)
      .on("click", (_, d) => {
        console.log("Circle clicked", d);
        setClickedNode(d);
        open();
      })
      .style("cursor", "pointer");

    // grix x and y coordinates
    const gx = svg.append("g");
    const gy = svg.append("g");

    svg.call(zoom as any).call(zoom.transform as any, d3.zoomIdentity);
    return () => {
      svg.selectAll("*").remove();
    };
  }, [width, height, data]);

  // cluster 끼리 색 다르도록
  const allGroups = data.map((v) => String(v.group_id));
  const colorScale = d3
    .scaleOrdinal<string>()
    .domain(allGroups)
    .range([
      "#e0ac2b",
      "#e85252",
      "#6689c6",
      "#9a6fb0",
      "#a53253",
      "#4caf50",
      "#607d8b",
      "#795548",
    ]);

  return (
    <>
      <div style={{ position: "relative" }}>
        <svg width={width} height={height} ref={svgRef}></svg>
        <DrawerContent
          clickedNode={clickedNode}
          opened={opened}
          close={close}
        />
      </div>
    </>
  );
};
