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
                    <button class="btn"><i class="fa-solid fa-circle-info"></i></button>
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
        newbutton.innerHTML = ` <button onclick="getwords(${lesone.level_no})" class="btn btn-outline btn-primary"><i class="fa-solid fa-book-open"></i>lessone-${lesone.level_no}</button>`;
        lesson.appendChild(newbutton);
    })

}

getlabel();
