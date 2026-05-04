import {getCustomerData} from "../model/CustomerModel.js";
import {getItemData} from "../model/ItemModel.js";

// order_db_array
let order_db_array = [];

// order_item_db_array
let order_item_db_array = [];

const loadOrderPage = () => {
    loadCustomerTable();
    loadItemCards();
}

const loadCustomerTable = () => {
    let customer_array = getCustomerData();
    $('#order_customer_tbody').empty();

    customer_array.map((item) => {
        let newRow = `<tr><td>${item.id}</td><td>${item.name}</td><td>${item.phone}</td><td>${item.address}</td></tr>`;
        $('#order_customer_tbody').append(newRow);
    })
}

const loadItemCards = () => {
    let item_array = getItemData();
    $('#order_card_cont').empty();

    item_array.map((item) => {
        let newOrderItemCard = `<div class="card" style="width: 18rem;" data-id="${item.id}" data-price="${item.price}">
                    <div class="position-relative left-0 mb-3 mx-auto text-white fw-bold text-center id-div">${item.id}</div>
                    <img src="${item.image}" class="card-img-top mt-3" alt="...">
                    <div class="card-body text-center">
                        <h3 class="card-title mt-3 mx-auto item-name">${item.name}</h3>
                        <h5 class="card-title mt-3 mx-auto item-price">LKR. ${item.price} /=</h5>
                        <a href="#" class="btn btn-success mt-3 mx-auto rounded-5">${item.qty} In Stock</a>
                    </div>
                    <div class="row d-flex justify-content-around">
                        <div class="col d-flex justify-content-around">
                            <div class="col-lg-5 mb-3 input-group align-items-center">
                                <label for="order_qty_input" class="d-inline form-label me-2 order_qty_input">Qty</label>
                                <input type="number" class="d-inline form-control me-4 order_qty_input" id="order_qty_input">
                                <button type="button" class="btn btn-outline-dark rounded ps-3 pe-3 me-2 order_item_increase_btn">+</button>
                                <button type="button" class="btn btn-outline-dark rounded ps-3 pe-3 order_item_decrease_btn">-</button>
                            </div>
                        </div>
                        <div class="mb-3 d-flex justify-content-center">
                            <button type="button" class="btn btn-primary rounded ps-3 pe-3 ms-2 order_item_add_btn">Add</button>
                            <button type="button" class="btn btn-warning rounded ps-3 pe-3 ms-2 order_item_reset_btn">Reset</button>
                        </div>
                    </div>
                </div>`;
        $('#order_card_cont').append(newOrderItemCard);
    })
}

// increase / decrease buttons
// increase
$('#order_card_cont').on('click', '.order_item_increase_btn', function () {
    let qtyInput = $(this).closest('.card').find('.order_qty_input');
    let currentVal = parseInt(qtyInput.val()) || 0;
    qtyInput.val(currentVal + 1);
})

//decrease
$('#order_card_cont').on('click', '.order_item_decrease_btn', function () {
    let qtyInput = $(this).closest('.card').find('.order_qty_input');
    let currentVal = parseInt(qtyInput.val()) || 0;
    if (currentVal >= 1) qtyInput.val(currentVal - 1);
})

//reset
$('#order_card_cont').on('click', '.order_item_reset_btn', function () {
    $(this).closest('.card').find('.order_qty_input').val(0);
})

//add to cart
$('#order_card_cont').on('click', '.order_item_add_btn', function () {
    let card = $(this).closest('.card');
    let item_id   = card.find('.id-div').text().trim();
    let item_name = card.find('.item-name').text().trim();
    let qty       = parseInt(card.find('.order_qty_input').val()) || 0;

    if (qty <= 0) return alert('Please enter a quantity');

    let item_price = parseFloat(card.data('price'));
    let sub_total  = item_price * qty;

    let newRow = `<tr>
        <td>${item_id}</td>
        <td>${item_name}</td>
        <td>${item_price}</td>
        <td>${qty}</td>
        <td>${sub_total}</td>
    </tr>`;

    $('#cart_tbody').append(newRow);
    updateGrandTotal();
    card.find('.order_qty_input').val(0);
})
// set customer name
$('#order_customer_tbody').on('click', 'tr',function () {
    let customer_array = getCustomerData();
    let obj = customer_array[$(this).index()];
    $('#order_customer_name_input').val(obj.name);
})

//set received value
$('#received_amount_input').on('input', function () {
    let typed = $(this).val();
    $('#r_amount_field').text(`Received Amount : ${typed}`);
});

//get grand total
const getGrandTotal = () => {
    let total = 0;

    $('#cart_tbody tr').each(function () {
        let subTotal = parseFloat($(this).find('td:last').text()) || 0;
        total += subTotal;
    })

    return total;
}

//update total
const updateGrandTotal = () => {
    let total = getGrandTotal();
    $('#grand_total_field').text(`Grand Total : ${total}`);
}

//

export {loadOrderPage};

