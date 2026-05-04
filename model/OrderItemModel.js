import { order_item_db_array } from "../db/db.js";

class OrderItem {
    #order_id;
    #item_id;
    #item_name;
    #unit_price;
    #qty;
    #sub_total;

    constructor(order_id, item_id, item_name, unit_price, qty, sub_total) {
        this.#order_id   = order_id;
        this.#item_id    = item_id;
        this.#item_name  = item_name;
        this.#unit_price = unit_price;
        this.#qty        = qty;
        this.#sub_total  = sub_total;
    }

    get order_id()   { return this.#order_id; }
    get item_id()    { return this.#item_id; }
    get item_name()  { return this.#item_name; }
    get unit_price() { return this.#unit_price; }
    get qty()        { return this.#qty; }
    get sub_total()  { return this.#sub_total; }

    set order_id(order_id)     { this.#order_id = order_id; }
    set item_id(item_id)       { this.#item_id = item_id; }
    set item_name(item_name)   { this.#item_name = item_name; }
    set unit_price(unit_price) { this.#unit_price = unit_price; }
    set qty(qty)               { this.#qty = qty; }
    set sub_total(sub_total)   { this.#sub_total = sub_total; }
}

// ===================== add order items =====================

const addOrderItems = (order_id, items) => {
    items.forEach(item => {
        let orderItem = new OrderItem(
            order_id,
            item.item_id,
            item.item_name,
            item.unit_price,
            item.qty,
            item.sub_total
        );
        order_item_db_array.push(orderItem);
    });
}

// ===================== get all order items =====================

const getOrderItemData = () => {
    return order_item_db_array;
}

// ===================== get items by order ID =====================

const getOrderItemsByOrderId = (order_id) => {
    return order_item_db_array.filter(item => item.order_id == order_id);
}

export { addOrderItems, getOrderItemData, getOrderItemsByOrderId };