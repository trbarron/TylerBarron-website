export interface entry {
    name: string;
    filler: boolean;
    seed: number;
    division: string;
    wlrecord: string;
    id: string;
    color: string;
 }

 export interface user {
     id: number;
     selections: number[];
     totalSeed: string;
     entryName: string;
     visibleSelections: string;
     buyback: boolean;
     surv: string;
     hidden: string;
 }

 export interface team {
    id: string;
    color: string;
    results: string;
    name: string;

}