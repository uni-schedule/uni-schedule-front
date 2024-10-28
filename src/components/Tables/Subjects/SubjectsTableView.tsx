import BaseTableView, { BaseTableViewProps } from "../Base/BaseTableView.tsx";
import { headers } from "./SubjectsTableView.headers.ts";
import { DomainSubject } from "../../../api/client/api.ts";

function SubjectsTableView({
  ...props
}: Omit<BaseTableViewProps<DomainSubject>, "headers">) {
  return <BaseTableView {...props} headers={headers} />;
}

export default SubjectsTableView;
