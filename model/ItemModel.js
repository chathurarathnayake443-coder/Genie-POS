import {item_db_array} from "../db/db.js";

class Item{
    #id;
    #name;
    #price;
    #qty;
    #image;

    constructor(id, name, price, qty,image) {
        this.#id = id;
        this.#name = name;
        this.#price = price;
        this.#qty = qty;
        this.#image = image;
    }

    get id() {
        return this.#id;
    }
    get name() {
        return this.#name;
    }
    get price() {
        return this.#price;
    }
    get qty() {
        return this.#qty;
    }
    get image() {
        return this.#image;
    }
    set id(id){
        this.#id = id;
    }
    set name(name){
        this.#name = name;
    }
    set price(price){
        this.#price = price;
    }
    set qty(qty){
        this.#qty = qty;
    }
    set image(image){
        this.#image = image;
    }
}

// ================== Item save =======================

const addToItems = (id,name,price,qty,image) => {

    let item = {
        id: id,
        name: name,
        price: price,
        qty: qty,
        image: image,
    }

    item_db_array.push(item);
}
// ================== Item update =======================

const updateItems = (id,name,price,qty,image) => {
    let card = item_db_array.find((item, index) => item.id == id);

    if (card) {
        card.id = id;
        card.name = name;
        card.price = price;
        card.qty = qty;
        card.image = image;
    }
}

// ================== Item delete =======================

const deleteItem = (id) => {
    let index = item_db_array.findIndex(item => item.id == id);
    item_db_array.splice(index, 1);
}

// ================== get Item =======================

const getItemData = () => {
    return item_db_array;
}

// ================== get Item data by Id =======================

const getItemDataById = (id) => {
    return item_db_array.find((item, index) => item.id == id);
}

// ================== get Item data by index =======================

const getItemDataByIndex = (index) => {
    return item_db_array[index];
}

export {addToItems, updateItems, getItemData, getItemDataById,deleteItem, getItemDataByIndex};
