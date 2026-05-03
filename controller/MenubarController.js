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

const showSection = (sectionId) => {
    $('#dashboard_content, #customer_content, #item_content, #order_content').addClass('d-none');
    $(sectionId).removeClass('d-none');
}

$('#dashboard_tab').on('click', () => showSection('#dashboard_content'));
$('#customer_tab').on('click', () => showSection('#customer_content'));
$('#item_tab').on('click',     () => showSection('#item_content'));
$('#order_tab').on('click',    () => showSection('#order_content'));