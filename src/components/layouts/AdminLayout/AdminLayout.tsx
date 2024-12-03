import { useNavigate, useRouterState } from "@tanstack/react-router";
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  FaArrowRightFromBracket,
  FaBars,
  FaCalendar,
  FaChalkboardUser,
  FaCube,
  FaPlus,
} from "react-icons/fa6";
import { DomainSchedule } from "../../../api/client";
import { useCreateSchedule } from "../../../hooks/schedules/useCreateSchedule";
import { useGetMySchedules } from "../../../hooks/schedules/useGetMySchedules";
import { LoginRoute } from "../../../routes/login";
import { useAuth } from "../../../stores/authStore";
import { useSchedule } from "../../../stores/scheduleStore";
import { clearTokens } from "../../../stores/tokenStore";
import ScheduleModal, {
  ScheduleModalMethods,
} from "../../Modals/Schedules/ScheduleModal/ScheduleModal";
import Select from "../../UI/Inputs/Select/Select";
import Loader from "../../UI/Loader/Loader";
import NavigationSidebar, {
  INavigationSidebarItem,
} from "../../UI/NavigationSidebar/NavigationSidebar";
import styles from "./AdminLayout.module.css";

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
  const [_, setEditSchedule] = useState<DomainSchedule | null>(null);

  const initialValues = {
    slug: "",
    title: "",
  };

  const onSubmitCreate = (data) => {
    if (isCreateLoading) return;
    mutate({ ...data });
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

  const handleOpenMenu = () => {
    const nav = document.getElementById("navpanel");
    if (!nav) return;

    const isShow = nav.getAttribute("data-show") === "1";
    if (isShow) {
      nav.setAttribute("data-show", "0");
      return;
    }
    nav.setAttribute("data-show", "1");
  };

  const handleSidebarClick = () => {
    document.getElementById("navpanel")?.setAttribute("data-show", "0");
  };

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
        <div className={styles.navigationPanel} data-show="0" id="navpanel">
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
                  <button
                    className={[
                      styles.scheduleCreateButton,
                      styles.scheduleMenuButton,
                    ].join(" ")}
                    onClick={handleOpenMenu}
                  >
                    <FaBars className={styles.scheduleCreateButtonIcon} />
                  </button>
                </div>
              </div>
              <NavigationSidebar
                items={sidebarItemsFormatted}
                selectedId={selectedID}
                onClick={handleSidebarClick}
              />
            </>
          )}
        </div>

        <div className={styles.panelWrapper}>
          {globalLoading ? (
            <div className={styles.loaderWrapper}>
              <Loader className={styles.loader} color="accent" />
            </div>
          ) : currentSchedule ? (
            children
          ) : null}
        </div>
      </div>
    </>
  );
};
