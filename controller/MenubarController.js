// // dashboard tab click
//
// $('#dashboard_tab').on('click', function () {
//     $('#dashboard_content').css('display', 'block');
//     $('#customer_content').css('display', 'none');
//     $('#item_content').css('display', 'none');
//     $('#order_content').css('display', 'none');
// })
//
// // customer tab click
//
// $('#customer_tab').on('click', function () {
//     $('#dashboard_content').css('display', 'none');
//     $('#customer_content').css('display', 'block');
//     $('#item_content').css('display', 'none');
//     $('#order_content').css('display', 'none');
// })
//
// // dashboard tab click
//
// $('#item_tab').on('click', function () {
//     $('#dashboard_content').css('display', 'none');
//     $('#customer_content').css('display', 'none');
//     $('#item_content').css('display', 'block');
//     $('#order_content').css('display', 'none');
// })
//
// // dashboard tab click
//
// $('#order_tab').on('click', function () {
//     $('#dashboard_content').css('display', 'none');
//     $('#customer_content').css('display', 'none');
//     $('#item_content').css('display', 'none');
//     $('#order_content').css('display', 'block');
// })

import {loadOrderPage} from "./PlaceOrderController.js";
import { getCustomerData } from "../model/CustomerModel.js";
import { getItemData } from "../model/ItemModel.js";
import { getOrderData } from "./PlaceOrderController.js";

const showSection = (sectionId) => {
    $('#dashboard_content, #customer_content, #item_content, #order_content').addClass('d-none');
    $(sectionId).removeClass('d-none');
}

$('#dashboard_tab').on('click', () => {
    showSection('#dashboard_content');

    $('#total_customers').text(getCustomerData().length);
    $('#total_items').text(getItemData().length);

    let orders = getOrderData();
    $('#total_sales').text(orders.length);

    // total sales amount
    let totalAmount = orders.reduce((sum, order) => sum + order.grand_total, 0);
    $('#total_sales_amount_field').text(`LKR. ${totalAmount.toFixed(2)}`);

    // latest 3 orders
    $('#latest_orders_tbody').empty();
    if (orders.length == 0) {
        $('#latest_orders_tbody').append(`<tr><td colspan="4" class="text-muted text-center">No orders yet</td></tr>`);
    } else {
        let latest = orders.slice(-3).reverse();  // last 3, newest first
        latest.forEach(order => {
            $('#latest_orders_tbody').append(`
                <tr>
                    <td>${order.order_id}</td>
                    <td>${order.customer_name}</td>
                    <td>LKR. ${order.grand_total}</td>
                    <td>${order.date}</td>
                </tr>
            `);
        });
    }
});
$('#customer_tab').on('click', () => showSection('#customer_content'));
$('#item_tab').on('click',     () => showSection('#item_content'));
$('#order_tab').on('click', () => {
    showSection('#order_content');
    loadOrderPage();
});