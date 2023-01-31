import SocketConnect from "@/socket.io/Connect"
import DesktopGrid from "@/components/DesktopGrid"
import Navigation from "@/components/Navigation"
import FileStation from "@/components/FileStation"

const socket = SocketConnect().socket
const clientWidth = () => document.documentElement.clientWidth
const clientHeight = () => document.documentElement.clientHeight

export default {
    name: "App",

    components: {
        DesktopGrid, Navigation, FileStation
    },

    data: () => {
        return {
            windowWidth: clientWidth(),
            windowHeight: clientHeight(),
            socket
        }
    },

    methods: {
        dispatchDimensions() {
            this.windowWidth = clientWidth();
            this.windowHeight = clientHeight();
        }
    },

    mounted() {
        window.addEventListener("resize", this.dispatchDimensions)
    },

    unmounted() {
        window.removeEventListener("resize", this.dispatchDimensions);
    },
}
