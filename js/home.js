const loadingSpinner = document.getElementById("loading-spinner");
let allIssues = [];


const manageSpinner = (status) => {
    if (status === true) {
        loadingSpinner.classList.remove("hidden");
        document.getElementById("card-container").classList.add("hidden");
    } else {
        loadingSpinner.classList.add("hidden");
        document.getElementById("card-container").classList.remove("hidden");
    }
}


const filterIssues = (status, btn) => {

    // remove active button
    manageSpinner(true)
    document.querySelectorAll(".filter-btn").forEach(button => {
        button.classList.remove("btn-primary");
        button.classList.add("btn-outline");
    })
    btn.classList.add("btn-primary")
    btn.classList.remove("btn-outline")

    if (status === 'all') {
        displayIssue(allIssues);
        return;
    }
    const filtered = allIssues.filter(issue => issue.status === status);
    setTimeout(() => {
        displayIssue(filtered);
    }, 300);
}




const loadIssues = () => {
    manageSpinner(true);
    fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
        .then(res => res.json())
        .then(data => {
            allIssues = data.data;
            displayIssue(allIssues);
        });
}


// {
//     "id": 1,
//     "title": "Fix navigation menu on mobile devices",
//     "description": "The navigation menu doesn't collapse properly on mobile devices. Need to fix the responsive behavior.",
//     "status": "open",
//     "labels": [
//         "bug",
//         "help wanted"
//     ],
//     "priority": "high",
//     "author": "john_doe",
//     "assignee": "jane_smith",
//     "createdAt": "2024-01-15T10:30:00Z",
//     "updatedAt": "2024-01-15T10:30:00Z"
// }




const displayIssue = (datas) => {
    const cardContainer = document.getElementById("card-container");
    cardContainer.innerHTML = "";

    // Issue Count 

    document.getElementById("issue-count").innerText = datas.length + " Issues";

    datas.forEach(data => {
        const card = document.createElement("div");
        card.className = `card card-body  shadow-sm bg-white space-y-4 border-t-3 ${data.status == "open" ? "border-green-500" : "border-[#A855F7]"}`;
        card.onclick = () => openIssueModal(`${data.id}`)
        card.innerHTML = `
            <div>
                                <div class="flex justify-between items-center">
                                    <img src="${data.status == 'open' ? './assets/Open-Status.png' :
                './assets/Close.png'}" alt="">
                                    <button class="btn btn-soft ${data.priority == 'medium' ? 'btn-warning' : data.priority == 'low' ? 'btn-soft text-[#9CA3AF]' : 'btn-error'} rounded-full"> ${data.priority.toUpperCase()} </button>
                                </div>
                            </div>
                            <div class="space-y-2">
                                <h3 class="text-[#1F2937] text-[14px] font-semibold"> ${data.title} </h3>
                                <p class="line-clamp-2 text-[#64748B] text-[12px]"> ${data.description} </p>

                                <div class="space-y-2">
                                    <div>
                                        ${data.labels.map(label => `
                                            <span class="btn btn-soft ${label == 'bug' ? 'btn-error' : label == 'enhancement' ? 'btn-success' : 'btn-warning'} rounded-full text-[12px] font-medium">
                                            <i class="fa-solid ${label == 'bug' ? 'fa-bug' : 'fa-life-ring'}"></i> ${label.toUpperCase()}
                                            </span>
                                        `).join("")}

                                       
                                    </div>
                                </div>
                            </div>
                            <hr class="text-[#E4E4E7]">
                            <div class="space-y-2">
                                <p class="text-[#64748B] text-[12px]">#1
                                    by ${data.assignee}</p>
                                <p class="text-[#64748B] text-[12px]"> ${data.updatedAt} </p>
                            </div>
            </div>
        `

        cardContainer.append(card);

    });
    manageSpinner(false)
}

const openIssueModal = async (issuesId) => {

    const modalContainer = document.getElementById("modal-container");
    modalContainer.innerHTML = '';

    const res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${issuesId}`)
    const data = await res.json();
    const cardDetails = data.data


    const cardModal = document.createElement("div");
    cardModal.innerHTML = `
        <dialog id="Issue_Details" class="modal">
                <div class="modal-box">
                    <div class="space-y-4">
                        <h3 class="text-2xl text-[#1F2937] font-bold">${cardDetails.title}</h3>
                        <ul class="flex gap-8 items-center list-disc">
                            <li class="btn text-white ${cardDetails.status == 'open' ? 'btn-success' : 'bg-[#A855F7]'} rounded-full"> ${cardDetails.status}</li>
                            <li class="text-[12px] text-[#64748B]">opened by ${cardDetails.assignee} </li>
                            <li class="text-[12px] text-[#64748B]">${cardDetails.createdAt}</li>
                        </ul>
                        <div>
                            <div>
                                        ${cardDetails.labels.map(label => `
                                            <span class="btn btn-soft ${label == 'bug' ? 'btn-error' : label == 'enhancement' ? 'btn-success' : 'btn-warning'} rounded-full text-[12px] font-medium">
                                            <i class="fa-solid ${label == 'bug' ? 'fa-bug' : 'fa-life-ring'}"></i> ${label.toUpperCase()}
                                            </span>
                                        `).join("")}

                                       
                                    </div>
                        </div>
                        <div class="flex justify-between items-center bg-[#F8FAFC] p-4">
                            <div class="items-start">
                                <h2 class="text-[#64748B] ">Assigne:</h2>
                                <h2 calss="font-semibold"> ${cardDetails.assignee} </h2>
                            </div>
                            <div>
                                <h2 class="text-[#64748B]">Priority:</h2>
                                <span class="btn ${cardDetails.priority == 'medium' ? 'btn-warning' : cardDetails.priority == 'low' ? 'btn-soft text-[#9CA3AF]' : 'btn-error'} text-white  rounded-full">${cardDetails.priority.toUpperCase()}</span>
                            </div>
                        </div>
                    </div>
                    <div class="modal-action">
                        <form method="dialog">
                            <!-- if there is a button in form, it will close the modal -->
                            <button class="btn">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
    
    
    `

    modalContainer.append(cardModal);


    Issue_Details.showModal();
}



document.getElementById("search-btn").addEventListener("click", () => {
    const input = document.getElementById("input-search");
    const inputValue = input.value.trim();
    console.log(inputValue);

    fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
        .then(res => res.json())
        .then(data => {
            const allDatas = data.data;
            const filterDatas = allDatas.filter((word) => word.title.toLowerCase().includes(inputValue));

            displayIssue(filterDatas)
        });
})




loadIssues()
