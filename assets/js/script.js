// import json file
import json from "data/java_lecture.json" assert { type: "json" };

var html = `<div class="nav flex-column nav-pills me-3" id="v-pills-tab" role="tablist" aria-orientation="vertical" style="width:200px;">`;

// add left nav
for (const [i, chapter] of json.entries()) {
    let isActive = i == 0;
    html += `<button class="nav-link${isActive ? " active" : ""}" id="nav-${i}-tab" data-bs-toggle="tab" data-bs-target="#nav-${i}" type="button" role="tab" aria-controls="nav-${i}" aria-selected="${isActive ? "true" : "false"}">
    ${chapter["name"]}
    </button>`;
}
html += "</div>";
// close left nav

// add contents
html += `<div class="tab-content w-100" id="v-pills-tabContent">`;
for (const [sec_num, chapter] of json.entries()) {
    let isActive = sec_num == 0;
    html += `<div class="tab-pane fade${isActive ? " active show" : ""}" id="nav-${sec_num}" role="tabpanel" aria-labelledby="nav-${sec_num}-tab">`;

    for (const [lec_num, lecture] of chapter["lecture"].entries()) {
        html += `
        <div class="accordion accordion-flush" id="accordionFlushExample">
            <div class="accordion-item">
                <h2 class="accordion-header" id="flush-heading${lec_num}">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapse${lec_num}" aria-expanded="false" aria-controls="flush-collapse${lec_num}">
                        ${lecture["text"]}
                    </button>
                </h2>
                <div id="flush-collapse${lec_num}" class="accordion-collapse collapse" aria-labelledby="flush-heading${lec_num}" data-bs-parent="#accordionFlushExample">
                    <div class="accordion-body iframe_container">
                        <iframe src="${lecture["url"]}" allowfullscreen title="${lecture["text"]}"></iframe>
                    </div>
                </div>
            </div>
        </div>
        `;
    }
    // close tab
    html += "</div>";
}
html += "</div>";
// close contents

document.querySelector("#left_nav").innerHTML = html;