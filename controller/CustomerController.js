import {addToCustomers,updateCustomers,deleteCustomer,getCustomerDataById,getCustomerData,getCustomerDataByIndex} from "../model/CustomerModel.js";
import {check_phone} from "../utils/regex-utils.js";

// save customer
$('#customer_save_btn').on('click', function(){
    let customer_id = $('#customer_id_input').val();
    let customer_name = $('#customer_name_input').val();
    let customer_phone = $('#customer_phone_input').val();
    let customer_address = $('#customer_address_input').val();

    (customer_id == "")? alert('ID Missing') : (customer_name == "")? alert('Name Missing') : !check_phone(customer_phone)? alert('Invalid Phone Number') : (customer_address == "") ? alert('Address Missing') : (addToCustomers(customer_id,customer_name,customer_phone,customer_address),loadCustomerTable(),$('#customer_reset_btn').trigger('click'));
})

const loadCustomerTable = () => {
    let customer_array = getCustomerData();
    $('#customer_tbody').empty();

    customer_array.map((item,index) => {
        let data = `${item.id},${item.name},${item.phone},${item.address}`;
        let newRow = `<tr data-index="${data}"><td>${item.id}</td><td>${item.name}</td><td>${item.phone}</td><td>${item.address}</td></tr>`;
        $('#customer_tbody').append(newRow);
    })

}

//customer update
$('#customer_update_btn').on('click', function(){
    let customer_id = $('#customer_id_input').val();
    let customer_name = $('#customer_name_input').val();
    let customer_phone = $('#customer_phone_input').val();
    let customer_address = $('#customer_address_input').val();

    (customer_id == "")? alert('ID Missing') : (customer_name == "")? alert('Name Missing') : !check_phone(customer_phone)? alert('Invalid Phone Number') : (customer_address == "") ? alert('Address Missing') : (updateCustomers(customer_id,customer_name,customer_phone,customer_address),loadCustomerTable(),$('#customer_reset_btn').trigger('click'));
})

//customer delete
$('#customer_delete_btn').on('click', function(){
    let customer_id = $('#customer_id_input').val();

    (customer_id == "")? alert('ID Missing') : (!getCustomerDataById(customer_id)) ? alert('Customer Not Found') : (deleteCustomer(customer_id),loadCustomerTable(),$('#customer_reset_btn').trigger('click'));
})

// load customer data
$('#customer_tbody').on('click', 'tr', function () {
    let obj = getCustomerDataByIndex($(this).index())

    $('#customer_id_input').val(obj.id);
    $('#customer_name_input').val(obj.name);
    $('#customer_phone_input').val(obj.phone);
    $('#customer_address_input').val(obj.address);
})

// customer reset
$('#customer_reset_btn').on('click', function(){
    $('#customer_id_input').val("");
    $('#customer_name_input').val("");
    $('#customer_phone_input').val("");
    $('#customer_address_input').val("");
})