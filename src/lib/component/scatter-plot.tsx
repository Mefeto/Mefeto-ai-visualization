import * as d3 from "d3";
import styles from "../../style/scatterplot.module.css";

import { AxisLeft } from "./axis-left.tsx";
import { AxisBottom } from "./axis-bottom.tsx";
import { DataHandlerReturnType } from "../util/data-handler.ts";
import { useDebouncedState } from "@mantine/hooks";

const MARGIN = { top: 30, right: 30, bottom: 50, left: 50 };

type AxisBasicProps = {
  data: DataHandlerReturnType;
  width: number;
  height: number;
};

export const ScatterPlot = ({ data, width, height }: AxisBasicProps) => {
  const boundsWidth = width - MARGIN.right - MARGIN.left;
  const boundsHeight = height - MARGIN.top - MARGIN.bottom;

  // const [hovered, setHovered] = useState<InteractionData | null>(null);
  const [hoveredGroup, setHoveredGroup] = useDebouncedState<string | null>(
    null,
    200,
  );

  // x축 영역과 y축 영역 계산
  const xScale = d3.scaleLinear().domain([-0.2, 1]).range([0, boundsWidth]);
  const yScale = d3.scaleLinear().domain([-0.1, 1.2]).range([boundsHeight, 0]);

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

  const circles = data.map((v, i) => {
    const className = // class if the circle depends on the hover state
      hoveredGroup && v.group_id !== hoveredGroup
        ? styles.scatterplotCircle + " " + styles.dimmed
        : styles.scatterplotCircle;
    return (
      <circle
        key={i}
        r={2}
        className={className}
        cx={xScale(v.x)}
        cy={yScale(v.y)}
        opacity={1}
        stroke={colorScale(v.group_id)}
        fill={colorScale(v.group_id)}
        fillOpacity={0.2}
        strokeWidth={1}
        onMouseEnter={() => {
          // setHovered({ xPos: xScale(v.x), yPos: yScale(v.y), name: v.id });
          setHoveredGroup(v.group_id);
        }}
        onMouseLeave={() => {
          // setHovered(null);
          setHoveredGroup(null);
        }}
      />
    );
  });

  return (
    <div style={{ position: "relative" }}>
      <svg width={width} height={height}>
        <g
          width={boundsWidth}
          height={boundsHeight}
          transform={`translate(${[MARGIN.left, MARGIN.top].join(",")})`}
          overflow={"visible"}
        >
          {/* y 축 */}
          <AxisLeft yScale={yScale} pixelsPerTick={40} />

          {/* x 축 */}
          <g transform={`translate(0, ${boundsHeight})`}>
            <AxisBottom xScale={xScale} pixelsPerTick={60} />
          </g>

          {/* 데이터들 */}
          {circles}
        </g>
      </svg>

      {/* Tooltip */}
      <div
        style={{
          width: boundsWidth,
          height: boundsHeight,
          position: "absolute",
          top: 0,
          left: 0,
          pointerEvents: "none",
          marginLeft: MARGIN.left,
          marginTop: MARGIN.top,
        }}
      >
        {/*<NodeTooltip interactionData={hovered} />*/}
      </div>
    </div>
  );
};
