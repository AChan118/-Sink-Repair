import { fetchPlumbers, fetchRequests, fetchCompletions } from "./dataAccess.js"
import { SinkRepair } from "./SinkRepair.js"


const mainContainer = document.querySelector("#container")
// We are adding another .then because we are grabbing the requests then the plumber then the sink repair html
const render = () => {
    fetchRequests()
        .then(() => fetchPlumbers())
        .then(() => fetchCompletions())
        .then(
            () => {
                mainContainer.innerHTML = SinkRepair()
            }
        )


}
mainContainer.addEventListener(
    "stateChanged",
    customEvent => {
        render()
    }
)
render()




// const render = () => {
//     fetchRequests()
//     .then(() => fetchPlumbers())
//     .then(
//         () => {
//             mainContainer.innerHTML = SinkRepair()
//         }
//     )
// }