
$(document).ready(function(){

	// AGREGAR CLASE ACTIVA AL PRIMER ENLACE ====================
	$('.category_list .category_item[category="all"]').addClass('ct_item-active');

	// FILTRAR PRODUCTOS  ============================================
	$('.category_item').click(function(){
		var categoriaProducto = $(this).attr('category');
		console.log(categoriaProducto);

		// AGREGAR CLASE ACTIVA AL ENLACE SELECCIONADO
		$('.category_item').removeClass('ct_item-active');
		$(this).addClass('ct_item-active');

		// OCULTAR PRODUCTOS =========================
		$('.product-item').css('transform', 'scale(0)');
		function ocultarProducto(){
			$('.product-item').hide();
		} 
		setTimeout(ocultarProducto,400);

		// MOSTRAR PRODUCTOS =========================
		function mostrarProducto(){
			$('.product-item[category="'+categoriaProducto+'"]').show();
			$('.product-item[category="'+categoriaProducto+'"]').css('transform', 'scale(1)');
		} 
		setTimeout(mostrarProducto,400);
	});

	// MOSTRAR TODOS LOS PRODUCTOS =======================
	$('.category_item[category="all"]').click(function(){
		function mostrarTodos(){
			$('.product-item').show();
			$('.product-item').css('transform', 'scale(1)');
		} 
		setTimeout(mostrarTodos,400);
	});

	// ================= MODAL DE PRODUCTO =================
	$('.product-item').click(function(e){
		e.preventDefault();

		// obtener datos del producto
		let imagenProducto = $(this).find('img').attr('src');
		let tituloProducto = $(this).find('a').text();

		// ponerlos en el modal
		$('#modalImage').attr('src', imagenProducto);
		$('#modalTitle').text(tituloProducto);

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

let carrito = [];


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
	let tituloProducto = $(this).find('a').text();
	let imagenProducto = $(this).find('img').attr('src');
	let precioProducto = precios[tituloProducto]; 

	$('#modalTitle').text(tituloProducto);
	$('#modalPrice').text("$" + precioProducto);
	$('#modalImage').attr('src', imagenProducto);


	$('#addToCart').data('producto', {tituloProducto, precioProducto, imagenProducto});

	$('#productModal').fadeIn();
});


$('.close').click(function(){
	$('#productModal').fadeOut();
});


$('#addToCart').click(function(){
	let producto = $(this).data('producto');
	carrito.push(producto);
	renderizarCarrito();
	$('#productModal').fadeOut();
});


$(document).on('click', '.remove-item', function(){
	let indice = $(this).data('index');
	carrito.splice(indice, 1);
	renderizarCarrito();
});


$('#emptyCart').click(function(){
	carrito = [];
	renderizarCarrito();
});


function renderizarCarrito(){
	let listaCarrito = $('#cartItems');
	listaCarrito.empty();
	let total = 0;

	carrito.forEach((item, indice) => {
		total += item.precioProducto;
		listaCarrito.append(`
			<li>
				<img src="${item.imagenProducto}" width="40"> 
				${item.tituloProducto} - $${item.precioProducto} 
				<button class="remove-item" data-index="${indice}">X</button>
			</li>
		`);
	});

	$('#cartTotal').text("Total: $" + total);
}


});




