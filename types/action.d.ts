import { RaphaelPath } from "raphael";
import FlowChart from "./chart";
import { Position } from "./symbol/symbol";
export declare const drawPath: (chart: FlowChart, location: Position, points: Position[]) => RaphaelPath<"SVG" | "VML">;
export declare const drawLine: (chart: FlowChart, from: Position, to: Position[], text: string) => RaphaelPath<"SVG" | "VML">;
export interface LineIntersectionResult {
    x: number | null;
    y: number | null;
    onLine1: boolean;
    onLine2: boolean;
}
export declare const checkLineIntersection: (line1StartX: number, line1StartY: number, line1EndX: number, line1EndY: number, line2StartX: number, line2StartY: number, line2EndX: number, line2EndY: number) => LineIntersectionResult;
