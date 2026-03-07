

const loadIssues = () => {
    fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
        .then(res => res.json())
        .then(data => displayIssue(data.data))
}

const displayIssue = (datas) => {
    const cardContainer = document.getElementById("card-container");
    cardContainer.innerHTML = "";
    datas.forEach(data => {
        const card = document.createElement("div");
        card.className = "card card-body  shadow-sm bg-white space-y-4";
        card.innerHTML = `
            <div>
                                <div class="flex justify-between items-center">
                                    <img src="./assets/Open-Status.png" alt="">
                                    <button class="btn btn-soft btn-error rounded-full">high</button>
                                </div>
                            </div>
                            <div class="space-y-2">
                                <h3 class="text-[#1F2937] text-[14px] font-semibold">Fix navigation menu on mobile
                                    devices</h3>
                                <p class="line-clamp-2 text-[#64748B] text-[12px]">The navigation menu doesn't collapse
                                    properly on mobile devices. Need to fix the
                                    responsive behavior.</p>

                                <div>
                                    <span class="btn btn-soft btn-error rounded-full text-[12px] font-medium"><i
                                            class="fa-solid fa-bug"></i> BUG</span>
                                    <span class="btn btn-soft btn-warning rounded-full text-[12px] font-medium"><i
                                            class="fa-regular fa-life-ring"></i> Help Wanted</span>
                                </div>
                            </div>
                            <hr class="text-[#E4E4E7]">
                            <div class="space-y-2">
                                <p class="text-[#64748B] text-[12px]">#1
                                    by john_doe</p>
                                <p class="text-[#64748B] text-[12px]">1/15/2024</p>
                            </div>
        
        `

        cardContainer.append(card);
    });
}


loadIssues()
