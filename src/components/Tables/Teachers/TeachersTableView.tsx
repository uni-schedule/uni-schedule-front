import BaseTableView, { BaseTableViewProps } from "../Base/BaseTableView";
import { headers } from "./TeachersTableView.headers";
import { DomainTeacher } from "../../../api/client/api.ts";

function TeachersTableView({
  ...props
}: Omit<BaseTableViewProps<DomainTeacher>, "headers">) {
  return <BaseTableView {...props} headers={headers} />;
}

export default TeachersTableView;
