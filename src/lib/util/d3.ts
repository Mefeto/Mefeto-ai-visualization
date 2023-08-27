import {extent, groups, randomNormal, scaleLinear, zoomIdentity} from "d3";

const random = randomNormal(0, 0.2);
const sqrt3 = Math.sqrt(3);
const data = ([] as number[][]).concat(
    Array.from({length: 300}, () => [random() + sqrt3, random() + 1, 0]),
    Array.from({length: 300}, () => [random() - sqrt3, random() + 1, 1]),
    Array.from({length: 300}, () => [random(), random() - 1, 2])
);

const width = window.innerWidth
const height = window.innerHeight

const k = height/width

const x = scaleLinear()
    .domain([-4.5, 4.5])
    .range([0, width]);

const y = scaleLinear()
    .domain([-4.5 * k, 4.5 * k])
    .range([height, 0])


const transform = [["Overview", zoomIdentity]].concat(groups(data, d => d[2]).map(([key, data]) => {
    const [x0, x1] = extent(data, d => d[0]).slice() as [number, number];
    const [y1, y0] = extent(data, d => d[1]).slice() as [number, number];
    const k = 0.9 * Math.min(width / (x1 - x0), height / (y1 - y0));
    const tx = (width - k * (x0 + x1)) / 2;
    const ty = (height - k * (y0 + y1)) / 2;
    return [`Cluster ${key}`, zoomIdentity.translate(tx, ty).scale(k)]
}))
