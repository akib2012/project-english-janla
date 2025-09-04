const getlabel = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all") //it return promice and waiting for provide data
        .then(res => res.json())
        .then(datas => displayleson(datas.data))
}

const getwords = (id) => {
    const url = `https://openapi.programming-hero.com/api/level/${id}`;

    fetch(url)
        .then((response) => response.json())
        .then((data) => lebelwords(data.data))

}

const loadWordDetail = async(id) =>{
    const url = `https://openapi.programming-hero.com/api/word/${id}`;
    console.log(url);
    const res = await fetch(url);
    const detils = await res.json();
    displayloadWordDetail(detils.data);


}

const displayloadWordDetail = (word) => {
    const modalBox = document.getElementById("modal-box");
    modalBox.innerHTML = `
        <div id="detils_box" class="space-y-5 bg-white p-4 rounded-xl">
            <div>
                <h2 class="text-2xl font-bold">${word.word || "Eager"} 
                (<i class="fa-solid fa-microphone-lines"></i>: ${word.pronunciation || "ইগার"})</h2>
            </div>
            <div>
                <h3 class="font-bold">Meaning</h3>
                <p class="text-2xl">${word.meaning || "আগ্রহী"}</p>
            </div>
            <div>
                <h3 class="font-bold">Example</h3>
                <p class="text-2xl">${word.example || "The kids were eager to open their gifts."}</p>
            </div>
            <div>
                <h3 class="font-bold">সমার্থক শব্দ গুলো</h3>
                ${(word.synonyms && word.synonyms.length > 0) 
                    ? word.synonyms.map(s => `<span class="btn">${s}</span>`).join('')
                    : `<p class="text-gray-500">কোনো সমার্থক শব্দ নাই</p>`}
            </div>
            <div class="modal-action">
            <form method="dialog">
                <button class="btn">Close</button>
            </form>
            </div>
        </div>`;
    
    document.getElementById("my_modal").showModal();
};



const lebelwords = (words) => {
    // console.log(words);
    const worddiv = document.getElementById("words-continer");
    worddiv.innerHTML = "";

    if(words.length === 0){
        /* alert("no data found her please click next lessone"); /* it have any length or no one fine amy enlement in perticular lessone then it will be a length value  */ 
        worddiv.innerHTML = `<div class="text-center col-span-full bg-gray-100 my-[40px] py-[20px] rounded-2xl">
                <img src="./assets/alert-error.png" alt="" class="mx-auto">
                <p class="text-[#79716B] text-[14px]">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
                <h2 class="text-[35px] font-bold">নেক্সট Lesson এ যান</h2>
            </div>`
        return;
    }

    words.forEach(wordcard => {
        const newword_card = document.createElement("div");
        newword_card.innerHTML = `<div class="word-card  text-center bg-white p-2 ">
                <h2 class="text-[26px] font-bold">${wordcard.word ? wordcard.word : "শব্দ পাওয়া জায়নাই"}</h2>
                <p>Meaning /Pronounciation</p>
                <h2>"${wordcard.meaning ? wordcard.meaning : "পাওয়া জায়নাই"}/ ${wordcard.pronunciation ? wordcard.pronunciation : "পাওয়া জায়নাই}"}</h2>
                <div class="flex justify-between items-center">
                    <button onclick="loadWordDetail(${wordcard.id})" class="btn"><i class="fa-solid fa-circle-info"></i></button>
                    <button class="btn"><i class="fa-solid fa-volume-high"></i></button>
                </div>
            </div>`;
        worddiv.appendChild(newword_card);

    })

}

const displayleson = (lesones) => {
    const lesson = document.getElementById("leson-part");
    lesson.innerHTML = '';
    lesones.forEach(lesone => {


        const newbutton = document.createElement("button");
        newbutton.innerHTML = ` <button id="lesson-btn-${lesone.level_no}" onclick="getwords(${lesone.level_no})" class="btn btn-outline btn-primary"><i class="fa-solid fa-book-open"></i>lessone-${lesone.level_no}</button>`;
        lesson.appendChild(newbutton);
    })

}

getlabel();
