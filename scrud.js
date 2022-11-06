// get all inputs
let price       = document.getElementById('price');
let taxes       = document.getElementById('taxes');
let ads         = document.getElementById('ads');
let discount    = document.getElementById('discount');
let title       = document.getElementById('title');
let total       = document.getElementById('total');
let count       = document.getElementById('count');
let category    = document.getElementById('category');
let submit      = document.getElementById('submit');
let mood        = "create"
let temp;
// summition total
function getTotal(){
    if(price.value !=""){
        let result = (+price.value + +ads.value + +taxes.value) - +discount.value;
        total.innerHTML = result;
        total.style.backgroundColor = "green"
    }
    else{
        total.innerHTML = "";
        total.style.backgroundColor= "red"
    }
}

//create products and save in local storage
let dataProdducts;
if(localStorage.product != null){
    dataProdducts = JSON.parse(localStorage.product)
}
else{
    dataProdducts = [];
}
submit.onclick = function(){
    let newProduct = {
        title:title.value,
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        count:count.value,
        category:category.value,
        total:total.innerHTML
    }
    if(mood === "create"){
        if(count.value > 1 ){
            for(let i=0; i<count.value; i++ ){
                dataProdducts.push(newProduct)
            }
        }else{
            dataProdducts.push(newProduct)
        }
    }else{
        dataProdducts[temp] = newProduct
        mood = 'create'
        count.style.display = "block"
        submit.innerHTML = "create"
    }

    localStorage.setItem("product",JSON.stringify(dataProdducts))

    clearDataFromInputs()
    showProducts()
}

//clear data from inputs
function clearDataFromInputs(){
        title.value = ''
        price.value =''
        taxes.value=''
        ads.value=''
        discount.value=''
        count.value=''
        category.value=''
        total.innerHTML=''
}

// show products
function showProducts(){
    let table = '';
    for(let i=0; i<dataProdducts.length; i++){
        table += `
            <tr>
                <td>${i}</td>
                <td>${dataProdducts[i].title}</td>
                <td>${dataProdducts[i].price}</td>
                <td>${dataProdducts[i].taxes}</td>
                <td>${dataProdducts[i].discount}</td>
                <td>${dataProdducts[i].ads}</td>
                <td>${dataProdducts[i].total}</td>
                <td>${dataProdducts[i].category}</td>
                <td><button onclick="updateProduct(${i})" id="update">update</button></td>
                <td><button onclick="deleteProduct(${i})" id="delete">delete</button></td>
            </tr>
        `
    }
    document.getElementById('tbody').innerHTML = table;
    let deleteAllBtn = document.getElementById('deleteAll')
    if(dataProdducts.length > 0){
        deleteAllBtn.innerHTML = `<button onclick="deleteAll()" id="delete">Delete All ( ${dataProdducts.length} )</button>`
    }else{
        deleteAllBtn.innerHTML = ''
    }
    getTotal()
}
showProducts()


// Delete Product One By One
function deleteProduct(i){
    dataProdducts.splice(i,1)
    localStorage.product = JSON.stringify(dataProdducts)
    showProducts()
}


// Delete All
function deleteAll(){
    if(confirm("Are You Sure ? ") === true){
        dataProdducts.splice(0)
        localStorage.clear()
        showProducts()
    }
}
function updateProduct(i){
    title.value     = dataProdducts[i].title;
    price.value     = dataProdducts[i].price;
    ads.value       = dataProdducts[i].ads;
    taxes.value     = dataProdducts[i].taxes;
    category.value  = dataProdducts[i].category;
    discount.value  = dataProdducts[i].discount;
    getTotal()
    temp = i
    submit.innerHTML = "Update"
    count.style.display = "none"
    mood = "update"
    scroll({
        top:0,
        behavior:"smooth"
    }   
    )
}


function searchAboutData(value){
    let search = document.getElementById("search")
    search.focus()
    search.placeholder = "search by title"
    let table = '';
    if(searchMood = "title"){
        for(let i=0; i<dataProdducts.length; i++){
            if(dataProdducts[i].title.includes(value)){
                table += `
                    <tr>
                        <td>${i}</td>
                        <td>${dataProdducts[i].title}</td>
                        <td>${dataProdducts[i].price}</td>
                        <td>${dataProdducts[i].taxes}</td>
                        <td>${dataProdducts[i].discount}</td>
                        <td>${dataProdducts[i].ads}</td>
                        <td>${dataProdducts[i].total}</td>
                        <td>${dataProdducts[i].category}</td>
                        <td><button onclick="updateProduct(${i})" id="update">update</button></td>
                        <td><button onclick="deleteProduct(${i})" id="delete">delete</button></td>
                    </tr>
                `
            }
        }
    }
    document.getElementById('tbody').innerHTML = table;
}

