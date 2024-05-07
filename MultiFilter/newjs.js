const tableBody = document.querySelector("#table_body")

const cityEle = document.querySelector("#city")
const categoryEle = document.querySelector("#category")
const typeEle = document.querySelector("#type")
const activeEle = document.querySelector("#active")



let dataArr = [
    {
        name: "Rakesh",
        city: "surat",
        category: "one",
        type: "B",
        active: "false"

    },
    {
        name: "Rakesh",
        city: "surat",
        category: "one",
        type: "B",
        active: "false"

    },
    {
        name: "gg",
        city: "surat",
        category: "one",
        type: "B",
        active: "false"

    },
    {
        name: "Raj",
        city: "mumbai",
        category: "two",
        type: "A",
        active: "false"

    },
    {
        name: "Divya",
        city: "udhna",
        category: "two",
        type: "B",
        active: "true"

    },
    {
        name: "ravi",
        city: "amroli",
        category: "one",
        type: "A",
        active: "true"

    },
    {
        name: "ram",
        city: "surat",
        category: "two",
        type: "A",
        active: "true"

    },
    {
        name: "mm",
        city: "amroli",
        category: "one",
        type: "A",
        active: "true",
        power: "300"

    },
];



showResult()

function showResult(myArray = dataArr) {
    let tableData = myArray.map((ele, i) => {
        return `<tr>
            <td>${i + 1}</td>
            <td>${ele.name}</td>
            <td>${ele.city}</td>
            <td>${ele.category}</td>
            <td>${ele.type}</td>
            <td>${ele.active}</td>
        </tr>`
    })

    tableBody.innerHTML = tableData.join("")
}





mapCategory()
function mapCategory() {
    let cityList = [...new Set(dataArr.map(cur => cur.city))]
    let categoryList = [...new Set(dataArr.map(cur => cur.category))]
    let typeList = [...new Set(dataArr.map(cur => cur.type))]
    let activeList = [...new Set(dataArr.map(cur => cur.active))]


    function filterButton(catList) {
        return catList.map((cur) => {
            return `<div class="form-check form-switch">
        <input class="form-check-input" type="checkbox" role="switch" 
        value=${cur}>
        <label class="form-check-label" for="flexSwitchCheckDefault">${cur}</label>
        </div>`
        }).join('')
    }


    cityEle.innerHTML = filterButton(cityList)

    categoryEle.innerHTML = filterButton(categoryList)

    typeEle.innerHTML = filterButton(typeList)

    activeEle.innerHTML = filterButton(activeList)

}


let searchFilterArr = dataArr
function searchFilter(e) {
    let value = e.target.value.toLowerCase().trim()


    searchFilterArr = dataArr.filter((cur) => {
        return cur.name.toLowerCase().startsWith(value)
    })
    showResult(searchFilterArr)
}



document.querySelectorAll("input").forEach((ele) => {
    if (ele.type == "checkbox") {
        ele.addEventListener("change", (e) => cheackBoxfilter(e))
    }

    else {
        ele.addEventListener("keyup", (e) => {
            searchFilter(e)
            cheackBoxfilter()
        })
    }
})

function cheackBoxfilter() {


    let cityArr = []
    let categoryArr = []
    let typeArr = []
    let activeArr = []
    document.querySelectorAll("input[type=checkbox]").forEach((cur) => {
        if (cur.checked) {
            if (cur.closest(".upper").id == "city") {
                cityArr.push(cur)
            }
            else if (cur.closest(".upper").id == "category") {
                categoryArr.push(cur)
            }
            else if (cur.closest(".upper").id == "type") {
                typeArr.push(cur)
            }
            else if (cur.closest(".upper").id == "active") {
                activeArr.push(cur)
            }
        }
    })

    let pointer = 0
    document.querySelectorAll("input[type=checkbox]").forEach(ele => ele.checked && pointer++)
    if (!pointer) {
        showResult(searchFilterArr)
    }
    else {

        let cityFiltered = filterTypeArrays(cityArr).length == 0 ? searchFilterArr : [...filterTypeArrays(cityArr)]

        let categoryFiltered = filterTypeArrays(categoryArr).length == 0 ? searchFilterArr : [...filterTypeArrays(categoryArr)]

        let typeFiltered = filterTypeArrays(typeArr).length == 0 ? searchFilterArr : [...filterTypeArrays(typeArr)]

        let activeFiltered = filterTypeArrays(activeArr).length == 0 ? searchFilterArr : [...filterTypeArrays(activeArr)]




        let finalArr1 = filterTwoArrays(cityFiltered, categoryFiltered)
        let finalArr2 = filterTwoArrays(typeFiltered, activeFiltered)

        let finalArr = filterTwoArrays(finalArr1, finalArr2)

        let grandFinal = filterTwoArrays(searchFilterArr, finalArr)




        let unique = []

        const uniqueGrandFinal = grandFinal.filter((cur) => {
            const copyEnt = unique.includes(cur.name)

            if (!copyEnt) {
                unique.push(cur.name)
                return cur
            }

        })
        showResult(uniqueGrandFinal)

    }
}



function filterTwoArrays(arr1, arr2) {
    let opArr = []
    arr1.forEach((cur) => {
        opArr.push(...arr2.filter((ele) => {
            if (ele.name == cur.name && ele.category == cur.category && ele.type == cur.type && ele.active == cur.active) {
                return ele
            }
        }))
    })
    return opArr
}


function filterTypeArrays(arr) {
    let newArr = []
    // pattern 
    arr.forEach((cur) => {
        const keyVAl = cur.closest(".upper").id
        const val = cur.value.toLowerCase()
        let resArray = dataArr.filter((curEle => {
            if (curEle[keyVAl].toLowerCase() == val) {
                return curEle
            }
        }))
        newArr.push(...resArray)
    })

    return newArr
}