import React from "react";
import { DomainSchedule } from "../api/client/api.ts";

export interface ScheduleContextType {
  currentSchedule: DomainSchedule | null;
  setCurrentSchedule: (value: DomainSchedule | null) => void;
}

export const useSchedule = () => React.useContext(ScheduleContext);

export const ScheduleContext = React.createContext<ScheduleContextType>(null!);

export const ScheduleProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [currentSchedule, setCurrentSchedule] =
    React.useState<DomainSchedule | null>(null);

  return (
    <ScheduleContext.Provider value={{ currentSchedule, setCurrentSchedule }}>
      {children}
    </ScheduleContext.Provider>
  );
};
