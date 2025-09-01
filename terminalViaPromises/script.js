//<h1 class="msg">hi this is a message</h1>

let msgBox = document.querySelector(".container")

function randNum() {
    return (Math.floor(Math.random() * 7) + 1) * 1000
}
/*
let p1 = new Promise((resolve, reject)=>{
    setTimeout(()=>{
        msgBox.insertAdjacentHTML("beforeend", `<h1 class="msg">>>>Initializing Hacking<span class="dots"></span></h1>`)
        resolve("Done promise 1")
    }, randNum())
})


p1.then((res)=>{
    console.log(res)
    return new Promise((resolve, reject)=>{
    setTimeout(()=>{
        msgBox.insertAdjacentHTML("beforeend", `<h1 class="msg">>>>Reading Your Files<span class="dots"></span></h1>`)
        resolve("Done promise 2")
    }, randNum())
})
}).then((res)=>{
    console.log(res)
    return new Promise((resolve, reject)=>{
    setTimeout(()=>{
        msgBox.insertAdjacentHTML("beforeend", `<h1 class="msg">>>>Password Files Detected<span class="dots"></span></h1>`)
        resolve("Done promise 3")
    }, randNum())
})
}).then((res)=>{
    console.log(res)
    return new Promise((resolve, reject)=>{
    setTimeout(()=>{
        msgBox.insertAdjacentHTML("beforeend", `<h1 class="msg">>>>Sending all passwords and personnel files to Server<span class="dots"></span></h1>`)
        resolve("Done promise 4")
    }, randNum())
})
}).then((res)=>{
    console.log(res)
    return new Promise((resolve, reject)=>{
    setTimeout(()=>{
        msgBox.insertAdjacentHTML("beforeend", `<h1 class="msg">>>>Cleaning Up<span class="dots"></span></h1>`)
        resolve("Done promise 5")
    }, randNum())
})
}).then((res)=>{
    console.log(res)
})
*/



// using async await fucntion

async function addele(text){
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            msgBox.insertAdjacentHTML("beforeend", `<h1 class="msg">>>>${text}<span class="dots"></span></h1>`)
            resolve("done")
        }, randNum())
    })
}

async function main() {
    await addele("Initializing Hacking")
    await addele("Reading Your Files")
    await addele("Password Files Detected")
    await addele("Sending all passwords and personnel files to Server")
    await addele("Cleaning Up")
}

main()



//using simple fucntion

// function addele(text, ) {
//     setTimeout(() => {
//         msgBox.insertAdjacentHTML("beforeend", `<h1 class="msg">>>>${text}<span class="dots"></span></h1>`)
//         resolve("done")
//     }, randNum())
// }


console.log("All promisese done")
