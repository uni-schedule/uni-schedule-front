import { Link } from "@tanstack/react-router";
import { FaRegMoon, FaRegSun, FaUser } from "react-icons/fa6";
import { LoginRoute } from "../../../routes/login";
import { ManageRoute } from "../../../routes/manage/_adminLayout/index";
import { useAuth } from "../../../stores/authStore";
import styles from "./PublicLayout.module.css";

const PublicLayout = ({ children }: { children: React.ReactNode }) => {
  const { isAuthorized } = useAuth();

  const handleThemeChange = () => {
    if (document.body.getAttribute("data-theme") === "dark") {
      document.body.setAttribute("data-theme", "light");
      return;
    }
    document.body.setAttribute("data-theme", "dark");
  };

  return (
    <div className={styles.layoutWrapper}>
      <div className={styles.navbar}>
        <button
          type="button"
          className={styles.themeSwither}
          onClick={handleThemeChange}
        >
          <FaRegMoon
            className={[styles.themeIcon, styles.themeDark].join(" ")}
          />
          <FaRegSun
            className={[styles.themeIcon, styles.themeLight].join(" ")}
          />
        </button>
        {isAuthorized ? (
          <Link to={ManageRoute}>
            <div className={styles.loginButton}>
              <FaUser />
              Админка
            </div>
          </Link>
        ) : (
          <Link to={LoginRoute}>
            <div className={styles.loginButton}>
              <FaUser />
              Войти
            </div>
          </Link>
        )}
      </div>
      <div className={styles.children}>{children}</div>
    </div>
  );
};

export default PublicLayout;
