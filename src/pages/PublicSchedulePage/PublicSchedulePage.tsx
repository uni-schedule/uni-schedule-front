import { useParams } from "@tanstack/react-router";
import { AxiosError } from "axios";
import dayjs from "dayjs";
import PublicLayout from "../../components/layouts/PublicLayout/PublicLayout";
import WeekContainer from "../../components/Schedule/Weeks/WeekContainer/WeekContainer";
import WeekViewList from "../../components/Schedule/Weeks/WeekViewList/WeekViewList";
import Loader from "../../components/UI/Loader/Loader";
import { useGetScheduleView } from "../../hooks/schedules/useGetScheduleView";
import style from "./PublicSchedulePage.module.css";

const PublicSchedulePage = () => {
  const params = useParams({ strict: false });
  const { data, isLoading, isError, error } = useGetScheduleView(
    params.scheduleSlug!,
  );
  const isEvenWeek = dayjs().isoWeek() % 2 === 0;

  if (isLoading) {
    return (
      <div className={style.loaderWrapper}>
        <Loader color="accent" className={style.loader} />
      </div>
    );
  }

  if (isError) {
    const err = error as AxiosError<{ error: string }>;

    if (err.response?.status === 404) {
      return (
        <div className={style.notfoundWrapper}>
          <img
            className={style.notfoundImg}
            src="/not-found.png"
            alt="Расписание не найдено"
          />
          <p className={style.notfoundText}>Расписание не найдено</p>
        </div>
      );
    }
  }

  return (
    <PublicLayout>
      <div className={style.container}>
        <div className="">
          <div className={style.titleBlock}>
            <h1 className={style.title}>
              Расписание{" "}
              <span className={style.titleAccent}>{data?.title}</span>
            </h1>
            <p>Вот бы отменили пары...</p>
          </div>
          <div
            className={[
              style.subtitleBlock,
              isEvenWeek ? style.evenWeek : style.oddWeek,
            ].join(" ")}
          >
            {isEvenWeek ? <span>Числитель</span> : <span>Знаменатель</span>}
          </div>
        </div>

        <WeekContainer>
          <WeekViewList classes={data?.entries} isEvenWeek={isEvenWeek} />
        </WeekContainer>
      </div>
    </PublicLayout>
  );
};

export default PublicSchedulePage;
