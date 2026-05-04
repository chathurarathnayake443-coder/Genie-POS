import {getCustomerData} from "../model/CustomerModel.js";
import {getItemData} from "../model/ItemModel.js";
import {loadItemCards as loadItemPageCards} from "./ItemController.js";

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

// balance field

$('#received_amount_input').on('input', function () {
    let received = parseFloat($(this).val()) || 0;
    let grand_total = getGrandTotal();
    let balance = received - grand_total;

    $('#r_amount_field').text(`Received Amount : ${received}`);

    if (balance < 0) {
        $('#balance_field').removeClass('text-success').addClass('text-danger');
        $('#balance_field').text(`Balance : ${balance} (Insufficient!)`);
    } else {
        $('#balance_field').removeClass('text-danger').addClass('text-success');
        $('#balance_field').text(`Balance : ${balance}`);
    }
})

// reset button in order cart

$('#order_reset_btn').on('click', function () {
    // clear inputs
    $('#order_id_input').val('');
    $('#order_customer_name_input').val('');
    $('#received_amount_input').val('');

    // clear cart table
    $('#cart_tbody').empty();

    // reset amount fields
    $('#grand_total_field').text('Grand Total : ');
    $('#r_amount_field').text('Received Amount : ');
    $('#balance_field').removeClass('text-success text-danger').text('Balance : ');
})

// place order
// step 1 — validate and show confirmation modal
$('#order_place_btn').on('click', function () {
    let order_id      = $('#order_id_input').val();
    let customer_name = $('#order_customer_name_input').val();
    let grand_total   = getGrandTotal();
    let received      = parseFloat($('#received_amount_input').val()) || 0;

    if (order_id == '')      return alert('Order ID Missing');
    if (order_db_array.find(order => order.order_id == order_id)) return alert('Order ID already exists!');
    if (customer_name == '') return alert('Customer Name Missing');
    if ($('#cart_tbody tr').length == 0) return alert('Cart is Empty');
    if (received < grand_total) return alert('Insufficient Amount');

    let now     = new Date();
    let date    = now.toLocaleDateString();
    let balance = received - grand_total;

    // populate modal with order details
    $('#confirm_order_id').text(order_id);
    $('#confirm_customer_name').text(customer_name);
    $('#confirm_date').text(date);
    $('#confirm_grand_total').text(grand_total);
    $('#confirm_received').text(received);
    $('#confirm_balance').text(balance);

    // populate items table in modal
    $('#confirm_items_tbody').empty();
    $('#cart_tbody tr').each(function () {
        $('#confirm_items_tbody').append($(this).clone());
    });

    // show modal
    new bootstrap.Modal($('#order_confirm_modal')[0]).show();
})

// step 2 — confirmed, now actually save
$('#confirm_place_btn').on('click', function () {
    let order_id      = $('#confirm_order_id').text();
    let customer_name = $('#confirm_customer_name').text();
    let grand_total   = parseFloat($('#confirm_grand_total').text());
    let received      = parseFloat($('#confirm_received').text());
    let balance       = parseFloat($('#confirm_balance').text());
    let now           = new Date();
    let date          = now.toLocaleDateString();
    let timestamp     = now.toLocaleString();

    // build order items from cart
    let order_items = [];
    $('#cart_tbody tr').each(function () {
        let cols = $(this).find('td');
        order_items.push({
            item_id   : $(cols[0]).text(),
            item_name : $(cols[1]).text(),
            unit_price: parseFloat($(cols[2]).text()),
            qty       : parseInt($(cols[3]).text()),
            sub_total : parseFloat($(cols[4]).text()),
        });
    });

    let order = {
        order_id, customer_name, grand_total, received, balance, date, timestamp
    };

    let order_items_record = { order_id, items: order_items };

    order_db_array.push(order);
    order_item_db_array.push(order_items_record);

    reduceItemStock(order_items);
    loadItemPageCards();
    loadItemCards();

    addToOrderHistory(order, order_items);

    // close modal
    bootstrap.Modal.getInstance($('#order_confirm_modal')[0]).hide();

    // reset form
    $('#order_reset_btn').trigger('click');

    alert(`Order #${order_id} placed successfully!`);
})

// add to order history div
const addToOrderHistory = (order, items) => {
    let itemRows = items.map(i =>
        `<tr>
            <td>${i.item_id}</td>
            <td>${i.item_name}</td>
            <td>${i.unit_price}</td>
            <td>${i.qty}</td>
            <td>${i.sub_total}</td>
        </tr>`
    ).join('');

    let historyCard = `
    <div class="card w-100 mb-4 shadow-sm">
        <div class="card-header d-flex justify-content-between align-items-center">
            <span class="fw-bold">Order #${order.order_id}</span>
            <span class="text-muted" style="font-size:13px;">${order.timestamp}</span>
        </div>
        <div class="card-body">
            <p class="mb-1"><strong>Customer:</strong> ${order.customer_name}</p>
            <table class="table table-sm mt-2">
                <thead>
                    <tr>
                        <th>Item ID</th>
                        <th>Name</th>
                        <th>Unit Price</th>
                        <th>Qty</th>
                        <th>Sub Total</th>
                    </tr>
                </thead>
                <tbody>${itemRows}</tbody>
            </table>
            <div class="d-flex justify-content-end gap-4 mt-2">
                <span class="text-success fw-bold">Grand Total: ${order.grand_total}</span>
                <span class="text-warning fw-bold">Received: ${order.received}</span>
                <span class="text-danger fw-bold">Balance: ${order.balance}</span>
            </div>
        </div>
    </div>`;

    $('.order_history-div').prepend(historyCard);
}

//reduce item counts
const reduceItemStock = (order_items) => {
    order_items.forEach(order_item => {
        let item = getItemData().find(i => i.id == order_item.item_id);
        if (item) {
            item.qty = parseInt(item.qty) - order_item.qty;
        }
    });
}

export {loadOrderPage};

