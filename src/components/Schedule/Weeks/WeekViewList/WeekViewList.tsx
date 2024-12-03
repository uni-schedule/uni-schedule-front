import { FC, memo } from "react";
import { DomainClassView, DomainDay } from "../../../../api/client/api";
import { daysOfWeek } from "../../../../config/days";
import { GroupedClassesView } from "../../../../types/class.types";
import { EntryItem } from "../../Classes/EntryItem/EntryItem";
import WeekItem from "../WeekItem/WeekItem";

interface WeekViewListProps {
  classes?: GroupedClassesView;
  isEvenWeek?: boolean | null;
}

const WeekViewList: FC<WeekViewListProps> = memo(({ classes, isEvenWeek }) => {
  const tryFindEntry = (classes: DomainClassView[], isEven: boolean | null) =>
    classes.find((entry) => entry.even_week === isEven);

  if (!classes) {
    return <></>;
  }

  return Object.keys(daysOfWeek).map((key) => {
    const classDay = key as DomainDay;
    return (
      <WeekItem name={daysOfWeek[classDay]} key={classDay}>
        {Array(8)
          .fill(0)
          .map((_, index) => {
            const number = Number(index) + 1;
            const numberClasses = classes[classDay][number];
            if (!numberClasses) return;

            const singleClass = tryFindEntry(numberClasses, null);
            const evenClass = tryFindEntry(numberClasses, true);
            const oddClass = tryFindEntry(numberClasses, false);

            return (
              <EntryItem
                even={evenClass || singleClass}
                odd={oddClass}
                isEvenWeek={isEvenWeek}
                isAlternate={!singleClass}
                number={number}
                key={`${classDay}-${number}`}
              />
            );
          })}
      </WeekItem>
    );
  });
});

export default WeekViewList;
