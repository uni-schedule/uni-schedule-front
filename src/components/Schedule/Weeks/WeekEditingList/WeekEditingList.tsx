import { FC, memo } from "react";
import { DomainClassView, DomainDay } from "../../../../api/client/api";
import { daysOfWeek } from "../../../../config/days";
import { GroupedClassesView } from "../../../../types/class.types";
import { EntryItem } from "../../Classes/EntryItem/EntryItem";
import WeekItem from "../WeekItem/WeekItem";

interface WeekEditingListProps {
  classes?: GroupedClassesView;
  onAddClass?: (day: DomainDay, number: number, isEven: boolean | null) => void;
  onUpdateClass?: (updateClass: DomainClassView) => void;
}

const WeekEditingList: FC<WeekEditingListProps> = memo(
  ({ classes, onAddClass, onUpdateClass }) => {
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

              if (!numberClasses) {
                return (
                  <EntryItem
                    isAlternate={true}
                    number={number}
                    onCreate={(number, isEven) =>
                      onAddClass && onAddClass(classDay, number, isEven)
                    }
                    key={`${classDay}-${number}`}
                  />
                );
              }

              const singleClass = tryFindEntry(numberClasses, null);
              const evenClass = tryFindEntry(numberClasses, true);
              const oddClass = tryFindEntry(numberClasses, false);

              return (
                <EntryItem
                  even={evenClass || singleClass}
                  odd={oddClass}
                  isAlternate={!singleClass}
                  number={number}
                  onCreate={(number, isEven) =>
                    onAddClass && onAddClass(classDay, number, isEven)
                  }
                  onUpdate={(updateClass) =>
                    onUpdateClass && onUpdateClass(updateClass)
                  }
                  key={`${classDay}-${number}`}
                />
              );
            })}
        </WeekItem>
      );
    });
  },
);

export default WeekEditingList;
