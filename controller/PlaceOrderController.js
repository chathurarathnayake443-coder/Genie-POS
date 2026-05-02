import {getCustomerData} from "../model/CustomerModel.js";


// order_db_array
let order_db_array = [];

// order_item_db_array
let order_item_db_array = [];

let customer_db_array = [
    { id: 1, name: "Chathura", phone: "0771234567", address: "Kadawatha" },
    { id: 2, name: "Kamal", phone: "0712345678", address: "Colombo" },
    { id: 3, name: "Nimal", phone: "0754567890", address: "Gampaha" },
];
$(document).ready(function () {
    loadCustomerTable();
});
// load customer table

const loadCustomerTable = () => {
    let customer_array = getCustomerData();
    $('#customer_tbody').empty();

    customer_db_array.map((item,index) => {
        let data = `${item.id},${item.name},${item.phone},${item.address}`;
        let newRow = `<tr data-index="${data}"><td>${item.id}</td><td>${item.name}</td><td>${item.phone}</td><td>${item.address}</td></tr>`;
        $('#customer_tbody').append(newRow);
    })
}

// increase / decrease buttons
// increase
$('.order_item_increase_btn').on('click', function () {
    let qtyInput = $(this).closest('.card').find('.order_qty_input');
    let currentVal = parseInt(qtyInput.val()) || 0;
    qtyInput.val(currentVal + 1);
})

// decrease
$('.order_item_decrease_btn').on('click', function () {
    let qtyInput = $(this).closest('.card').find('.order_qty_input');
    let currentVal = parseInt(qtyInput.val()) || 0;
    if (currentVal >= 1) qtyInput.val(currentVal - 1);
})

// reset
$('.order_item_reset_btn').on('click', function () {
    $(this).closest('.card').find('.order_qty_input').val(0);
})

// set customer name
$('#customer_tbody').on('click', 'tr',function () {
    let obj = customer_db_array[$(this).index()];
    $('#order_customer_name_input').val(obj.name);
})

