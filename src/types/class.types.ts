import { DomainClassView, DomainDay } from "../api/client";

export type TClassPosition = "even" | "odd";

export type TEvenWeekType = "odd" | "even" | "single";

export interface IClassSlot {
  day: DomainDay;
  number: number;
  isEven: boolean | null;
}

export type GroupedClassesView = Record<string, NumberGroupedClassesView>;

export type NumberGroupedClassesView = Record<number, DomainClassView[]>;
