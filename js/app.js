if (localStorage.getItem("products")) {
    var products = JSON.parse(localStorage.getItem("products"));
    show(products);
} else {
    var products = [];
}

function valName(name) {
    return document.getElementById(`${name}`).value.match(/^[A-Z][\sA-z]{1,120}$/g) 
}

function valDesc(name) {
    return document.getElementById(`${name}`).value.match(/^[A-z][A-z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/g) 

}

function valPrice(name) {
    return document.getElementById(`${name}`).value.match(/^[0-9.]{1,8}$/g) 
}

function valQuantity(name) {
    return document.getElementById(`${name}`).value.match(/^[0-9]{1,7}$/g) 
}

function store() {
    if (valName("productName") && valDesc("productDescription") && valQuantity("productQuantity") && valPrice("productPrice")) {
        var newProduct = {
            name: document.getElementById("productName").value,
            quantity: document.getElementById("productQuantity").value,
            price: document.getElementById("productPrice").value,
            description: document.getElementById("productDescription").value
        }

        products.push(newProduct);
        localStorage.setItem("products", JSON.stringify(products));
        show(products);
        clear();
    } else {
        document.getElementById('alert').className = 'alert alert-danger';
        document.getElementById('alert').innerText = 'Please enter a valid Data';
    }
}

function show(obj) {
    var records = ``;

    for (let index = 0; index <= obj.length - 1; index++) {
        records += `
        <tr><!-- id="product-${index}"-->
            <td>${index}</td>
            <td>${obj[index].name}</td>
            <td>${obj[index].quantity}</td>
            <td>${obj[index].price}</td>
            <td>${obj[index].description}</td>
            <td><button type="button" onclick="edit(${index});" class="btn btn-info">Edit</button></td>
            <td><button type="button" onclick="destroy(${index});" class="btn btn-danger">Delete</button></td>
        </tr>
        `;
    }

    document.getElementById('productsTable').innerHTML = records;
    records = ``;
}

function edit(index) {

    document.getElementById(`product-${index}`).innerHTML = `
        <td>${index}</td>
        <td><input type="text" id="productNameUpdate" class="form-control" maxlength="120" value="${products[index].name}"></td>
        <td><input type="number" id="productQuantityUpdate" class="form-control" value="${products[index].quantity}"></td>
        <td><input type="number" id="productPriceUpdate" class="form-control" value="${products[index].price}"></td>
        <td><textarea class="form-control" id="productDescriptionUpdate" rows="1" maxlength="255">${products[index].description}</textarea></td>
        <td><button type="button" onclick="update(${index});" class="btn btn-warning">Save</button></td>
        <td><button type="button" onclick="show();" class="btn btn-secondary">Cancel</button></td>
    `;
}

function update(index) {
    if (valName("productNameUpdate") && valDesc("productDescriptionUpdate") && valNumber("productQuantityUpdate") && valNumber("productPriceUpdate")) {
        var updatedProduct = {
            name: document.getElementById("productNameUpdate").value,
            quantity: document.getElementById("productQuantityUpdate").value,
            price: document.getElementById("productPriceUpdate").value,
            description: document.getElementById("productDescriptionUpdate").value
        };
        products[index] = updatedProduct;
        localStorage.setItem("products", JSON.stringify(products));
        show(products);
    } else {
        document.getElementById('alert').className('alert alert-danger');
        document.getElementById('alert').innerText('Please enter a valid Data');
    }
}

function destroy(index) {
    products.splice(index, 1);
    localStorage.setItem("products", JSON.stringify(products));
    show(products);
}

function clear() {
    document.getElementById("productName").value = "";
    document.getElementById("productQuantity").value = "";
    document.getElementById("productPrice").value = "";
    document.getElementById("productDescription").value = "";
}

function search(q) {
    var res = [];
    for (let index = 0; index < products.length; index++) {
        if (products[index].name.toLowerCase().includes(q.toLowerCase())) {
            res.push(products[index]);
        }
    }
    show(res);
}