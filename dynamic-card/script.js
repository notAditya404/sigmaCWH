function genrateCard(title = "Installing VS Code & How Websites Work | Sigma Web Development Course-Tutorial #1", 
                    cName = "CodeWithHarry", 
                    views = 727000, 
                    monthsOld = "July", 
                    duration = "31:20", 
                    thumbnail = "thumbnail.jpg"
){
    
    //CARD Element
    let card = document.createElement("div")
    card.className = "card"


    // IMG section
    let imgSec = document.createElement("div")
    imgSec.className = "img-sec"
    
    let img = document.createElement("div")
    img.classList.add("thumbnail")
    img.style.backgroundImage = `url(${thumbnail})`
    
    let p = document.createElement("p")
    p.className = "timestamp"
    p.textContent = duration
    
    imgSec.append(img)
    imgSec.append(p)


    // TEXT section
    let textSec = document.createElement("div")
    textSec.className = "text-sec"
    
    let heading = document.createElement("h2")
    heading.textContent = title
    heading.classList.add("heading")

    let metadata = document.createElement("div")
    metadata.classList.add("metadata")
    let p1 = document.createElement("p")
    p1.textContent = `${cName}`
    
    let p2 = document.createElement("p")
    p2.textContent = `${formatViews(views)} views`
    
    let p3 = document.createElement("p")
    p3.textContent = monthsOld

    metadata.append(p1, p2, p3)
    textSec.append(heading, metadata)
    p1.insertAdjacentHTML("afterend", "<b>&middot;</b>")
    p2.insertAdjacentHTML("afterend", "<b>&middot;</b>")
    
    
    // Appending CARD
    card.append(imgSec, textSec)
    document.querySelector(".container").append(card)

}


function formatViews(num)
{
    if(num<=999)
    {
        return `${num}`
    }
    else if(num>999 && num<=999999)
    {
        return `${num/1000}K`
    }
    else{
        return `${num/1000000}M`
    }
}

