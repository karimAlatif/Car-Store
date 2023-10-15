

export type CarState = "New" | "Used";
export type CarType = "Family" | "Fun" | "Small" | "Suv"; 
export type GearType = "Automatic" | "Manual";

export interface Car{
    id:string,
    name: string,
    type: CarType,
    state: CarState,
    gearType: CarType,
    size: number,
    price: number,
    range: number,
    imageSrc: string,
    createdAt:string,
    recommendationPresent:number,
}

export interface Filters {
    state: string[],
    gearType: string[],
    type: string[],
}

export type SortVals = "latest" | "earliest"