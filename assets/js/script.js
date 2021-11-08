// cookie
function setCookie(key, value, exdays) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + exdays);
    var expires = (exdays == null) ? "" : `; expires=${exdate.toUTCString()}`
    var cookie = `${key}=${escape(value)}${expires}`
    document.cookie = cookie;
 }
 
 function getCookie(key) {
     const value = `; ${document.cookie}`;
     const parts = value.split(`; ${key}=`);
     if (parts.length === 2) return parts.pop().split(';').shift();
 }

 function setHTML() {
    // import json file
    import json from "../../data/java_lecture.json" assert { type: "json" };

    var htmlText = `<div class="nav flex-column nav-pills me-3" id="v-pills-tab" role="tablist" aria-orientation="vertical" style="width:120px;">`;

    // add left nav
    for (const [i, chapter] of json.entries()) {
        let isActive = i == 0;
        htmlText += `<button class="nav-link${isActive ? " active" : ""}" id="nav-${i}-tab" data-bs-toggle="tab" data-bs-target="#nav-${i}" type="button" role="tab" aria-controls="nav-${i}" aria-selected="${isActive ? "true" : "false"}">
        ${chapter["name"]}
        </button>`;
    }
    htmlText += "</div>";
    // close left nav

    // add contents
    htmlText += `<div class="tab-content contentView" id="v-pills-tabContent">`;
    for (const [sec_num, chapter] of json.entries()) {
        let isActive = sec_num == 0;
        htmlText += `<div class="tab-pane fade${isActive ? " active show" : ""}" id="nav-${sec_num}" role="tabpanel" aria-labelledby="nav-${sec_num}-tab">`;
        htmlText += `<div class="accordion accordion-flush" id="accordionFlushExample${sec_num}">`
        for (const [lec_num, lecture] of chapter["lecture"].entries()) {
            htmlText += `
                <div class="accordion-item">
                    <h2 class="accordion-header" id="flush-heading${sec_num}_${lec_num}">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapse${sec_num}_${lec_num}" aria-expanded="false" aria-controls="flush-collapse${sec_num}_${lec_num}">
                            ${lecture["text"]} (${lecture["time"]})
                        </button>
                    </h2>
                    <div id="flush-collapse${sec_num}_${lec_num}" class="accordion-collapse collapse" aria-labelledby="flush-heading${sec_num}_${lec_num}" data-bs-parent="#accordionFlushExample${sec_num}">
                        <div class="accordion-body iframe_container">
                            <iframe src="${lecture["url"]}" allowfullscreen title="${lecture["text"]} (${lecture["time"]})"></iframe>
                        </div>
                    </div>
                </div>
            `;
        }
        // close tab
        htmlText += "</div>";
        htmlText += "</div>";
    }
    htmlText += "</div>";
    // close contents

    document.querySelector("#left_nav").innerHTML = htmlText;

 }



 // run
 setHTML();