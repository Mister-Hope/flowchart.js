import { RaphaelPath } from "raphael";
import FlowChart from "./chart";
import { Position } from "./symbol/util";
export declare const drawPath: (chart: FlowChart, location: Position, points: Position[]) => RaphaelPath<"SVG" | "VML">;
export declare const drawLine: (chart: FlowChart, from: Position, to: Position[], text: any) => RaphaelPath<"SVG" | "VML">;
export interface LineIntersectionResult {
    x: number;
    y: number;
    onLine1: false;
    onLine2: false;
}
export declare const checkLineIntersection: (line1StartX: number, line1StartY: number, line1EndX: number, line1EndY: number, line2StartX: number, line2StartY: number, line2EndX: number, line2EndY: number) => LineIntersectionResult;
