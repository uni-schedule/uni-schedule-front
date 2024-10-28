import BaseTableView, { BaseTableViewProps } from "../Base/BaseTableView.tsx";
import { headers } from "./ClassesTableView.headers.ts";
import { DomainClassView } from "../../../api/client/api.ts";

function ClassesTableView({
  ...props
}: Omit<BaseTableViewProps<DomainClassView>, "headers">) {
  return <BaseTableView {...props} headers={headers} />;
}

export default ClassesTableView;
