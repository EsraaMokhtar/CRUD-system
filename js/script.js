
var nameInput = document.getElementById("productName");
var categoryInput = document.getElementById("productCategory");
var priceInput = document.getElementById("productPrice");
var descriptionInput = document.getElementById("productDescription");
var tbody = document.getElementById("tbody");
var searchInput = document.getElementById("searchInput");
var createbtn = document.getElementById("createbtn");
var addAlertName = document.querySelector('.add-alert-name');
var addAlertCategory = document.querySelector('.add-alert-category');
var addAlertPrice = document.querySelector('.add-alert-price');
var formAlert =  document.querySelector('.form-alert');


var localStorageData = localStorage.getItem("productList");

var listOfString = JSON.parse(localStorageData);

if(localStorageData == null){
    var productList = [];
}else{
    var productList =  listOfString ;
}

createbtn.onclick = addProduct;

function addProduct(){
    
    if(nameValidate()==true && categoryValidate()==true && isPriceFull()==true){
            
        var newPrice = Number( priceInput.value);

        var singleProduct = {
            productName : nameInput.value,
            productCategory : categoryInput.value,
            productPrice : newPrice,
            productDescription : descriptionInput.value
        };

        productList.push(singleProduct);

        var stringOfList = JSON.stringify(productList );

        localStorage.setItem('productList',stringOfList);

        displayProduct();

        clearProduct();

        formAlert.classList.add('d-none')
    }else{
        formAlert.classList.remove('d-none')
    }
}


displayProduct();

function clearProduct(){
    nameInput.value = " ";
    categoryInput.value = " ";
    priceInput.value = " ";
    descriptionInput.value = " ";

    createbtn.innerHTML ="Add Product";
}

function displayProduct(){
    var str = "";
    for( var i = 0 ; i < productList.length ; i++){
        str +=` 
        <tr>
            <td>${i}</td>
            <td>${productList[i].productName}</td>
            <td>${productList[i].productCategory }</td>
            <td>${productList[i].productPrice} LE</td>
            <td>${productList[i].productDescription }</td>
            <td>
                <button onclick="pullOfData(${i});" class="btn btn-outline-warning">update</button>
            </td>
            <td>
                <button onclick="deleteProduct(${i});" class="btn btn-outline-danger">delete</button>
            </td>
        </tr>`
        index = i;
    }
    tbody.innerHTML = str ;
}

function searchProduct(){

    var ResultString = "";
 
    for( var i = 0 ; i<productList.length ; i++){
        if(productList[i].productName.includes(searchInput.value)){
            ResultString +=` 
            <tr>
                <td>${i}</td>
                <td>${productList[i].productName}</td>
                <td>${productList[i].productCategory }</td>
                <td>${productList[i].productPrice} LE</td>
                <td>${productList[i].productDescription }</td>
                <td>
                    <button onclick="pullOfData(${i});" class="btn btn-outline-warning">update</button>
                </td>
                <td>
                     <button onclick="deleteProduct(${i});" class="btn btn-outline-danger">delete</button>
                </td>
            </tr>`
        }
}
    tbody.innerHTML = ResultString ;
}

function deleteProduct(index){
    // de telat msh sah alshan bteamel getaa men el array w ana aysa amsah
    // [].slice(index,index+1)
    var deleted = productList.splice(index,1);
    console.log(deleted);

    localStorage.setItem('productList', JSON.stringify(productList ));

    displayProduct();

}


function pullOfData(index){
    nameInput.value = productList[index].productName ;
    categoryInput.value = productList[index].productCategory;
    priceInput.value =  productList[index].productPrice;
    descriptionInput.value =  productList[index].productDescription;

    createbtn.innerHTML = "Updat Porduct";
  
    createbtn.onclick = function(){
      updateProduct(index);
    };

}

function updateProduct(index){
    productList.splice(index,1,
    {
        productName : nameInput.value,
        productCategory : categoryInput.value,
        productPrice : Number( priceInput.value),
        productDescription : descriptionInput.value
    });
            
    var stringOfList = JSON.stringify(productList );

    localStorage.setItem('productList',stringOfList);

    displayProduct();

    clearProduct();
}

function nameValidate(){
    var regEx = /^[A-Z][a-z0-9 ]{4,10}$/;

    var isMatch = regEx.test(nameInput.value);

     if(isMatch == true){
        nameInput.classList.remove('is-invalid');
        nameInput.classList.add('is-valid');
        addAlertName.classList.add('d-none');
        return true;
     }else{
        nameInput.classList.remove('is-valid');
        nameInput.classList.add('is-invalid');
        addAlertName.classList.remove('d-none');
        return false;
     }
}

// nameInput.addEventListener('keyup',nameValidate);
nameInput.addEventListener('blur',nameValidate);

// 
function categoryValidate(){
    var regEx = /[A-Za-z0-9 ]{4,10}$/;

    var isMatch = regEx.test(categoryInput.value);

     if(isMatch == true){
        categoryInput.classList.remove('is-invalid');
        categoryInput.classList.add('is-valid');
        addAlertCategory.classList.add('d-none');
        return true;
     }else{
        categoryInput.classList.remove('is-valid');
        categoryInput.classList.add('is-invalid');
        addAlertCategory.classList.remove('d-none');
        return false;
     }
}

categoryInput.addEventListener('blur',categoryValidate);

function isPriceFull(){
    if(priceInput.value!=""){
        priceInput.classList.remove('is-invalid');
        priceInput.classList.add('is-valid');
        addAlertPrice.classList.add('d-none');
        return true;
     }else{
        priceInput.classList.remove('is-valid');
        priceInput.classList.add('is-invalid');
        addAlertPrice.classList.remove('d-none');
        return false;
     }
}

priceInput.addEventListener('blur',isPriceFull);