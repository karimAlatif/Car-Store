import { Car } from "views/application/marketplace/definitions/types";

export interface AnalyticsData{
    energy: number,
    range: number,
    breakFluid: number,
    tireWear: number,
}

export interface DasboardData{
    analytics: AnalyticsData,
    badges: number,
    points: number,
    recommendedCars: Car[],
}