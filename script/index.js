const getlabel = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all") //it return promice and waiting for provide data
    .then(res => res.json())
    .then(datas => displayleson(datas.data))
}


const displayleson = (lesones) => {
    const lesson = document.getElementById("leson-part");
    lesson.innerHTML = '';
    lesones.forEach(lesone => {
        const newbutton = document.createElement("button");
        newbutton.innerHTML = ` <button class="btn btn-outline btn-primary"><i class="fa-solid fa-book-open"></i>lessone-${lesone.level_no}</button>`;
    lesson.appendChild(newbutton);
    })

}

getlabel();