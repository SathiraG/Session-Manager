
let myLeads = []
const inputEl = document.getElementById("input-el")
const saveBtn = document.getElementById("save-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
const leadsFromLocalStorage = JSON.parse( localStorage.getItem("myLeads") )
const tabBtn = document.getElementById("tab-btn")

if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage
    render(myLeads)
}


tabBtn.addEventListener("click", function(){  
    
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads) )
        render(myLeads)
        console.log("test")
    })
})

function render(leads) {
    let listItems = ""
    for (let i = 0; i < leads.length; i++) {
        listItems += `
            <li>
                <a target='_blank' href='${leads[i]}'>
                    ${leads[i]}
                </a>
            </li>
        `
    }
    ulEl.innerHTML = listItems
}

// function openTabs() {
//   for (let i = 0; i < websiteLinks.length; i++) {
//     window.open(websiteLinks[i], '_blank');
//   }
// }


deleteBtn.addEventListener("dblclick", function() {
    localStorage.clear()
    myLeads = []
    render(myLeads)
})



let testArray = []
saveBtn.addEventListener("click", function() {

    chrome.tabs.query({}, function(tabs) {
        tabs.forEach(function(tab) {
        testArray.push(tab.url)

        const date = new Date();

        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let seconds = date.getSeconds();
        let arrayName = (`${year}.${month}.${day} \| ${hours}:${minutes}:${seconds}`)
        // localStorage.setItem(arrayName, JSON.stringify(testArray))
        localStorage.setItem(arrayName, JSON.stringify(testArray))
        let arrayList = []
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            const value = localStorage.getItem(key);
            console.log(`${key}: ${value}`);
            arrayList.push(key)
        }
        render(arrayList)
        })
      })
})



//   chrome.tabs.query({}, function(tabs) {
//     tabs.forEach(function(tab) {
//       return tab.url
//       let testArray = [tab.url]
//       console.log(testArray)
//     });
//   });
  

// function openTabs() {
//   for (let i = 0; i < websiteLinks.length; i++) {
//     window.open(websiteLinks[i], '_blank');
//   }
// }
