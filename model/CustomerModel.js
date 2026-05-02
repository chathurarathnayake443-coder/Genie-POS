import {customer_db_array} from "../db/db.js";

class Customer{
    #id;
    #name;
    #phone;
    #address;

    constructor(id, name, phone, address) {
        this.#id = id;
        this.#name = name;
        this.#phone = phone;
        this.#address = address;
    }

    get id(){
        return this.#id;
    }
    get name() {
        return this.#name;
    }
    get phone() {
        return this.#phone;
    }
    get address() {
        return this.#address;
    }
    set id(id) {
        this.#id = id;
    }
    set name(name) {
        this.#name = name;
    }
    set phone(phone) {
        this.#phone = phone;
    }
    set address(address) {
        this.#address = address;
    }
}

// ================== customer save =======================

const addToCustomers = (id,name,phone,address) => {
    let customer = new Customer(id, name, phone, address);

    customer_db_array.push(customer);
}

// ======================= customer update =======================

const updateCustomers = (customer_id,customer_name,customer_phone,customer_address) => {
    let obj = customer_db_array.find((item, index) => item.id == customer_id);

    if (obj) {
        obj.id = customer_id;
        obj.name = customer_name;
        obj.phone = customer_phone;
        obj.address = customer_address;
    }
}

// ======================= customer delete =======================

const deleteCustomer = (customer_id) => {
    let index = customer_db_array.findIndex((item, index) => item.id == customer_id);
    customer_db_array.splice(index, 1);
}

// ======================= get Customer =======================

const getCustomerData = () => {
    return customer_db_array;
}

// ====================== get customer by index ====================

const getCustomerDataByIndex = (index)=> {
    return customer_db_array[index];
}

// ======================= get Customer By ID ======================

const getCustomerDataById = (customer_id) => {
    return customer_db_array.find((item, index) => item.id == customer_id);
}

export {addToCustomers, updateCustomers, deleteCustomer, getCustomerData, getCustomerDataByIndex, getCustomerDataById};