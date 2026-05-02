import {addToItems,updateItems,deleteItem,getItemDataById,getItemData,getItemDataByIndex} from "../model/ItemModel.js";

// item save
$('#item_save_btn').on('click', function () {
    let item_id = $('#item_id_input').val();
    let item_name = $('#item_name_input').val();
    let item_price = $('#item_price_input').val();
    let item_qty = $('#item_qty_input').val();
    let item_image = $('#item_image_input')[0].files[0];

    let reader = new FileReader();
    reader.readAsDataURL(item_image);

    (item_id == '')? alert('ID Missing') : (item_name == '')? alert('Name Missing') : (item_price == '')? alert('Price Missing') : (item_qty == '')? alert('Quantity Missing') : reader.onload = function () {
        let base64Image = reader.result;
        addToItems(item_id, item_name, item_price, item_qty, base64Image);
        loadItemCards();
        $('#item_reset_btn').trigger('click');
    };
})

const loadItemCards = () => {
    $('#card-cont').empty();

    let item_array = getItemData();

    item_array.map((item,index) => {
        let newCard = `
            <div class="card" style="width: 18rem;" data-id="${item.id}">
                <div id="id-div" class="position-relative left-0 mb-3 mx-auto text-white fw-bold text-center">${item.id}</div>
                <img src="${item.image}" class="card-img-top mt-3" alt="...">
                <div class="card-body text-center">
                    <h3 class="card-title mt-3 mx-auto">${item.name}</h3>
                    <h5 class="card-title mt-3 mx-auto">LKR. ${item.price} /=</h5>
                    <a href="#" class="btn btn-success mt-3 mx-auto rounded-5">${item.qty} In Stock</a>
                </div>
            </div>`;

        $('#card-cont').append(newCard);
    })
}

// item form reset
$('#item_reset_btn').on('click', function () {
    $('#item_id_input').val("");
    $('#item_name_input').val("");
    $('#item_price_input').val("");
    $('#item_qty_input').val("");
    $('#item_image_preview').attr('src', '').addClass('d-none');
})

// load item details
$('#card-cont').on('click','.card',function () {
    let card = getItemDataByIndex($(this).data('id'));

    $('#item_id_input').val(card.id);
    $('#item_name_input').val(card.name);
    $('#item_price_input').val(card.price);
    $('#item_qty_input').val(card.qty);
    $('#item_image_preview').attr('src', card.image).removeClass('d-none');
})

//item update
$('#item_update_btn').on('click', function () {
    let item_id = $('#item_id_input').val();
    let item_name = $('#item_name_input').val();
    let item_price = $('#item_price_input').val();
    let item_qty = $('#item_qty_input').val();
    let item_image = $('#item_image_input')[0].files[0];

    if (item_id == '') return alert('ID Missing');
    if (item_name == '') return alert('Name Missing');
    if (item_price == '') return alert('Price Missing');
    if (item_qty == '') return alert('Quantity Missing');

    if (item_image) {
        // new image selected
        let reader = new FileReader();
        reader.readAsDataURL(item_image);
        reader.onload = function () {
            updateItems(item_id, item_name, item_price, item_qty, reader.result);
        }
    } else {
        // no new image — reuse existing
        let existing = item_db_array.find(item => item.id == item_id);
        if (!existing) return alert('Item Not Found');
        updateItems(item_id, item_name, item_price, item_qty, existing.image);
        loadItemCards();
        $('#item_reset_btn').trigger('click');
    }
})

// item delete
$('#item_delete_btn').on('click', function () {
    let item_id = $('#item_id_input').val();

    if (item_id == '') return alert('ID Missing');
    if (!(getItemDataById(item_id))) return alert('Item Not Found');

    deleteItem(item_id);
    loadItemCards();
    $('#item_reset_btn').trigger('click');
})