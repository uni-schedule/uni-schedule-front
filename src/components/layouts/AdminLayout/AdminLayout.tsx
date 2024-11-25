import React, { useEffect, useMemo, useRef, useState } from "react";
import NavigationSidebar, {
  INavigationSidebarItem,
} from "../../UI/NavigationSidebar/NavigationSidebar";
import styles from "./AdminLayout.module.css";
import { useNavigate, useRouterState } from "@tanstack/react-router";
import { useAuth } from "../../../stores/authStore";
import { clearTokens } from "../../../stores/tokenStore";
import {
  FaArrowRightFromBracket,
  FaBookOpen,
  FaCalendar,
  FaChalkboardUser,
  FaCube,
  FaGear,
  FaPlus,
} from "react-icons/fa6";
import { LoginRoute } from "../../../routes/login";
import BasePanel from "../../UI/Panels/BasePanel/BasePanel";
import Select from "../../UI/Inputs/Select/Select";
import { useGetMySchedules } from "../../../hooks/schedules/useGetMySchedules";
import { useSchedule } from "../../../stores/scheduleStore";
import ScheduleModal, {
  ScheduleModalMethods,
} from "../../Modals/Schedules/ScheduleModal/ScheduleModal";
import { useCreateSchedule } from "../../../hooks/schedules/useCreateSchedule";
import {
  DomainSchedule,
  HandlerUpdateScheduleRequest,
} from "../../../api/client";
import Loader from "../../UI/Loader/Loader";

export const AdminLayout: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const navigate = useNavigate();
  const auth = useAuth();
  const router = useRouterState();
  const [globalLoading, setGlobalLoading] = useState(true);
  const scheduleModalRef = useRef<ScheduleModalMethods[]>([]);

  const {
    mutate,
    isLoading: isCreateLoading,
    isSuccess: isCreateSuccess,
  } = useCreateSchedule();

  const [isOpen, setIsOpen] = useState(false);
  const [editSchedule, setEditSchedule] = useState<DomainSchedule | null>(null);

  const initialValues = {
    slug: "",
    title: "",
  };

  const onSubmitCreate = (data) => {
    if (isCreateLoading) return;
    mutate({ ...data, schedule_id: currentSchedule?.id! });
  };
  const onCloseModal = () => {
    setIsOpen(false);
    setEditSchedule(null);
    scheduleModalRef.current.forEach((ref) => ref?.reset());
  };

  useEffect(() => {
    if (!isCreateSuccess) return;
    onCloseModal();
  }, [isCreateSuccess]);

  const { data, isSuccess } = useGetMySchedules(10);

  const sidebarItems: INavigationSidebarItem[] = useMemo(
    () => [
      {
        id: 1,
        text: "Расписание",
        icon: <FaCalendar className={styles.icon} />,
        pathname: "/manage/schedule",
      },
      {
        id: 3,
        text: "Предметы",
        icon: <FaCube className={styles.icon} />,
        pathname: "/manage/subjects",
      },
      {
        id: 4,
        text: "Преподаватели",
        icon: <FaChalkboardUser className={styles.icon} />,
        pathname: "/manage/teachers",
      },
      {
        id: 5,
        always: true,
        text: "Аккаунт",
        icon: <FaGear className={styles.icon} />,
        pathname: "/manage/settings",
      },
      {
        id: 6,
        always: true,
        text: "Выход",
        icon: <FaArrowRightFromBracket className={styles.icon} />,
        onClick: () => {
          clearTokens();
          auth.setAuthorized(false);
        },
      },
    ],
    [],
  );

  const selectedID =
    sidebarItems.find((el) => el.pathname === router.location.pathname)?.id ||
    null;

  useEffect(() => {
    if (!auth.isAuthorized) {
      navigate({ to: LoginRoute });
    }
  }, [auth.isAuthorized]);

  useEffect(() => {
    if (!isSuccess) return;

    setGlobalLoading(false);
    if (data?.data?.length) {
      setCurrentSchedule(data.data[0]);
    }
  }, [isSuccess]);

  const { currentSchedule, setCurrentSchedule } = useSchedule();

  const sidebarItemsFormatted = currentSchedule
    ? sidebarItems
    : sidebarItems.filter((el) => el.always);

  return (
    <>
      <ScheduleModal
        formRef={(ref) => (scheduleModalRef.current[0] = ref)}
        initialValues={initialValues}
        isOpen={isOpen}
        onClose={onCloseModal}
        onSubmit={onSubmitCreate}
        isLoading={isCreateLoading}
      />

      <div className={styles.adminLayout}>
        <BasePanel className={styles.navigationPanel}>
          {globalLoading ? (
            <div className={styles.loaderWrapper}>
              <Loader className={styles.loader} color="accent" />
            </div>
          ) : (
            <>
              <div className={styles.scheduleSelectWrapper}>
                <p className={styles.scheduleSelectTitle}>Текущее расписание</p>
                <div className={styles.scheduleCreateButtonWrapper}>
                  <button
                    className={styles.scheduleCreateButton}
                    onClick={() => setIsOpen(true)}
                  >
                    <FaPlus className={styles.scheduleCreateButtonIcon} />
                  </button>
                  <Select
                    items={data?.data?.length ? data.data : []}
                    selected={currentSchedule}
                    onChange={(item) => setCurrentSchedule(item)}
                    className={styles.scheduleSelect}
                    labelKey="title"
                    nullLabel="Выберите расписание"
                  />
                </div>
              </div>
              <NavigationSidebar
                items={sidebarItemsFormatted}
                selectedId={selectedID}
              />
            </>
          )}
        </BasePanel>

        <BasePanel className={styles.panel}>
          {globalLoading ? (
            <div className={styles.loaderWrapper}>
              <Loader className={styles.loader} color="accent" />
            </div>
          ) : currentSchedule ? (
            children
          ) : null}
        </BasePanel>
      </div>
    </>
  );
};
