$(document).ready(function(){

	// AGREGANDO CLASE ACTIVE AL PRIMER ENLACE ====================
	$('.category_list .category_item[category="all"]').addClass('ct_item-active');

	// FILTRANDO PRODUCTOS  ============================================
	$('.category_item').click(function(){
		var catProduct = $(this).attr('category');
		console.log(catProduct);

		// AGREGANDO CLASE ACTIVE AL ENLACE SELECCIONADO
		$('.category_item').removeClass('ct_item-active');
		$(this).addClass('ct_item-active');

		// OCULTANDO PRODUCTOS =========================
		$('.product-item').css('transform', 'scale(0)');
		function hideProduct(){
			$('.product-item').hide();
		} 
		setTimeout(hideProduct,400);

		// MOSTRANDO PRODUCTOS =========================
		function showProduct(){
			$('.product-item[category="'+catProduct+'"]').show();
			$('.product-item[category="'+catProduct+'"]').css('transform', 'scale(1)');
		} 
		setTimeout(showProduct,400);
	});

	// MOSTRANDO TODOS LOS PRODUCTOS =======================
	$('.category_item[category="all"]').click(function(){
		function showAll(){
			$('.product-item').show();
			$('.product-item').css('transform', 'scale(1)');
		} 
		setTimeout(showAll,400);
	});

	// ================= MODAL DE PRODUCTO =================
	$('.product-item').click(function(e){
		e.preventDefault();

		// obtener datos del producto
		let imgSrc = $(this).find('img').attr('src');
		let title = $(this).find('a').text();

		// ponerlos en el modal
		$('#modalImage').attr('src', imgSrc);
		$('#modalTitle').text(title);

		// mostrar modal
		$('#productModal').fadeIn();
	});

	// cerrar modal con la X
	$('.close').click(function(){
		$('#productModal').fadeOut();
	});

	// cerrar modal haciendo clic fuera del contenido
	$(window).click(function(e){
		if($(e.target).is('#productModal')){
			$('#productModal').fadeOut();
		}
	});

// ================= CARRITO DE COMPRAS =================

let cart = [];


const precios = {
    "Cuchillo Kukri | Endurecido": 12000,
    "Cuchillo Kukri | Forest DDPAT": 13000,
    "USP-S": 25000,
    "Five-SeveN": 27000,
    "MP7 | Solo sonríe": 18000,
    "AK-47 | Herencia": 32000,
    "AWP | Asiimov": 50000,
    "Recortado | Entrada analógica": 20000,
    "Néguev | Deslumbrar": 40000
};


$('.product-item').click(function(){
    let title = $(this).find('a').text();
    let img = $(this).find('img').attr('src');
    let price = precios[title]; 

    $('#modalTitle').text(title);
    $('#modalPrice').text("$" + price);
    $('#modalImage').attr('src', img);


    $('#addToCart').data('product', {title, price, img});

    $('#productModal').fadeIn();
});


$('.close').click(function(){
    $('#productModal').fadeOut();
});


$('#addToCart').click(function(){
    let product = $(this).data('product');
    cart.push(product);
    renderCart();
    $('#productModal').fadeOut();
});


$(document).on('click', '.remove-item', function(){
    let index = $(this).data('index');
    cart.splice(index, 1);
    renderCart();
});


$('#emptyCart').click(function(){
    cart = [];
    renderCart();
});


function renderCart(){
    let cartList = $('#cartItems');
    cartList.empty();
    let total = 0;

    cart.forEach((item, index) => {
        total += item.price;
        cartList.append(`
            <li>
                <img src="${item.img}" width="40"> 
                ${item.title} - $${item.price} 
                <button class="remove-item" data-index="${index}">X</button>
            </li>
        `);
    });

    $('#cartTotal').text("Total: $" + total);
}


});




