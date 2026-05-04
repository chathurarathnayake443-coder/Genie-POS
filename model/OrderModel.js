import { order_db_array } from "../db/db.js";

class Order {
    #order_id;
    #customer_name;
    #grand_total;
    #received;
    #balance;
    #date;
    #timestamp;

    constructor(order_id, customer_name, grand_total, received, balance, date, timestamp) {
        this.#order_id     = order_id;
        this.#customer_name = customer_name;
        this.#grand_total  = grand_total;
        this.#received     = received;
        this.#balance      = balance;
        this.#date         = date;
        this.#timestamp    = timestamp;
    }

    get order_id()      { return this.#order_id; }
    get customer_name() { return this.#customer_name; }
    get grand_total()   { return this.#grand_total; }
    get received()      { return this.#received; }
    get balance()       { return this.#balance; }
    get date()          { return this.#date; }
    get timestamp()     { return this.#timestamp; }

    set order_id(order_id)           { this.#order_id = order_id; }
    set customer_name(customer_name) { this.#customer_name = customer_name; }
    set grand_total(grand_total)     { this.#grand_total = grand_total; }
    set received(received)           { this.#received = received; }
    set balance(balance)             { this.#balance = balance; }
    set date(date)                   { this.#date = date; }
    set timestamp(timestamp)         { this.#timestamp = timestamp; }
}

// ===================== add order =====================

const addOrder = (order_id, customer_name, grand_total, received, balance, date, timestamp) => {
    let order = new Order(order_id, customer_name, grand_total, received, balance, date, timestamp);
    order_db_array.push(order);
}

// ===================== get all orders =====================

const getOrderData = () => {
    return order_db_array;
}

// ===================== get order by ID =====================

const getOrderById = (order_id) => {
    return order_db_array.find(order => order.order_id == order_id);
}

// ===================== check if order ID exists =====================

const orderExists = (order_id) => {
    return order_db_array.some(order => order.order_id == order_id);
}

export { addOrder, getOrderData, getOrderById, orderExists };