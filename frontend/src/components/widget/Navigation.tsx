import React from "react"
import classNames from "classnames"
import { ButtonIcon } from "./Button"
import { useTranslation } from "react-i18next"

const Navigation: React.FC<React
  .HTMLAttributes<HTMLDivElement>> = (props) => {
    const [t] = useTranslation()

    return <div className={classNames("navigation", props.className)}>
      <div className="navigation-action-list">
        <ButtonIcon
          className="navigation-action-item"
          icon="ic-navigation-message-outline"
          ariaLabel={t("navigation_notification")} />
        <ButtonIcon
          className="navigation-action-item"
          icon="ic-navigation-user-outline"
          ariaLabel={t("navigation_personal")} />
        <ButtonIcon
          className="navigation-action-item"
          icon="ic-navigation-search-outline"
          ariaLabel={t("navigation_search")} />
      </div>
    </div>
  }

export default Navigation
