import React from "react";
import WindowLayout from "../layout/WindowLayout";
import WindowContent from "../layout/WindowContent";
import IconFolder from "../../assets/icon/svg/icon-folder.svg"

export default class FileStation extends React.Component {
  render(): React.ReactNode {
    return <WindowLayout
      icon={ IconFolder }
      title="File Staion"
    >
      <WindowContent>jfdjfidj</WindowContent>
    </WindowLayout>
  }
}
