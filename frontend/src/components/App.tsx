import React from "react"
import Navigation from "./widget/Navigation"
import DesktopGrid from "./app/DesktopGrid"
import FileStation from "./app/FileStation"
import "../sass/app.scss"

interface IAppState {
  windowWidth: number
  windowHeight: number
}

export default class App extends React.Component<{}, IAppState> {
  constructor(props: any) {
    super(props);
    this.state = {
      windowWidth: this.clientWidth(),
      windowHeight: this.clientHeight()
    }
  }

  clientWidth(): number { return document.documentElement.clientWidth }
  clientHeight(): number { return document.documentElement.clientHeight }

  dispatchDimensions(): void {
    this.setState({
      windowWidth: this.clientWidth(),
      windowHeight: this.clientHeight()
    })
  }

  componentDidMount(): void {
    window.addEventListener("resize", this
      .dispatchDimensions.bind(this));
  }

  componentWillUnmount(): void {
    window.removeEventListener("resize", this
      .dispatchDimensions);
  }

  render(): React.ReactNode {
    return <div
      className="bg-cover"
      style={{ height: this.state.windowHeight + "px" }}
    >
      <Navigation/>
      <div className="bg-overlay"></div>
      <div className="container-wrapper">
        <DesktopGrid/>
        <FileStation/>
      </div>
    </div>
  }
}
