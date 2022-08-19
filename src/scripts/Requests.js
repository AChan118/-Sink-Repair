import { getRequests, deleteRequest, getPlumbers, saveCompletions, getCompletions } from "./dataAccess.js"

const findCompletion = (request) => {
    const completions = getCompletions()
    let foundCompletion = completions.find(completion => { return parseInt(completion.requestId) === request.id })
    return foundCompletion
}
// Use .map() for converting objects to <li> elements
const plumberHtml = (request) => {
    const plumbers = getPlumbers()

    return `<select class="plumbers" id="plumbers">
    <option value="">Choose</option>
    ${plumbers.map(
        plumber => {
            return `<option value="${request.id}--${plumber.id}">${plumber.name}</option>`
        }
    ).join("")}
    </select>`
}


//generates the html for  the built requests section
export const requestHtml = (request) => {
    let foundCompletion = findCompletion(request)
    if (foundCompletion) {
        return `<li class="requestHtml">${request.description} 
                    <button class="request__delete"
                     id="request--${request.id}">
                    Delete
                    </button>
                
                </li>`
    } else {
        return`<li class="requestHtml">${request.description} 
            ${plumberHtml(request)} 
                <button class="request__delete"
                    id="request--${request.id}">
                        Delete
                </button>
                    
         </li>`
    }
}





const mainContainer = document.querySelector("#container")
mainContainer.addEventListener(
    "change",
    (event) => {
        if (event.target.id === "plumbers") {
            const [requestId, plumberId] = event.target.value.split("--")

            /*
                This object should have 3 properties
                   1. requestId
                   2. plumberId
                   3. date_created
            */
            const completion = {
                requestId: requestId,
                plumberId: plumberId,
                date_created: Date.now()
            }

            /*
                Invoke the function that performs the POST request
                to the `completions` resource for your API. Send the
                completion object as a parameter.
             */
            saveCompletions(completion)
        }
    }
)
mainContainer.addEventListener("click", click => {
    if (click.target.id.startsWith("request--")) {
        const [, requestId] = click.target.id.split("--")
        deleteRequest(parseInt(requestId))
    }
})


export const Requests = () => {
    const requests = getRequests()

    // Use .map() for converting objects to <li> elements

    let html = `
        <ul class="request__html">
            ${requests.map(requestHtml).join("")
        }
        </ul>
    `


    return html
}
