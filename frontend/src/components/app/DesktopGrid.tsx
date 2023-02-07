import React from "react"
import classNames from "classnames"
import IconFolder from "../../assets/icon/svg/icon-folder.svg"
import IconSetting from "../../assets/icon/svg/icon-setting.svg"
import IconAbout from "../../assets/icon/svg/icon-about.svg"

const DesktopGrid: React.FC<React.HTMLAttributes<HTMLUListElement>> =
  (props) => {
    return <ul className={classNames("desktop-grid", props.className)}>
      <li className="desktop-grid-item" data-item="file-station">
        <img src={IconFolder} className="desktop-grid-icon" alt="Folder" />
        <p className="desktop-grid-label">File Station</p>
      </li>
      <li className="desktop-grid-item" data-item="setting">
        <img src={IconSetting} className="desktop-grid-icon" alt="Setting" />
        <p className="desktop-grid-label">Setting</p>
      </li>
      <li className="desktop-grid-item" data-item="about">
        <img src={IconAbout} className="desktop-grid-icon" alt="About" />
        <p className="desktop-grid-label">About</p>
      </li>
    </ul>
  }

export default DesktopGrid
