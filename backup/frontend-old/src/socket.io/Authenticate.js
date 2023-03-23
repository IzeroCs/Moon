import Event from "./Event"

export default function(socket, store) {
    socket.on(Event.Login, (res) => {
        console.log("Response: ", res)
    })

    setTimeout(() => {
        console.log("Login")
        store.commit("authenticate/updateAuthentic", true)

        setTimeout(() => {
            console.log("Relogin")
            // store.authenticate.commit()
        }, 3000)
    }, 5000)
}
