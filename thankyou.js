$(function(){
    
    $('#shop-name').click(function(){
        location.href='./index.html'
    })


    var cartValue = JSON.parse(localStorage.getItem('cartValue'))

    
console.log(cartValue != null && cartValue!="" && cartValue !=undefined)
    if ( cartValue != null && cartValue!="" && cartValue !=undefined){
        
        $('#cart-item-count').text(cartValue)
    } else {
        $('#cart-item-count').text('0')
        
    }


    // Cart on click
    $('.shopping-cart').click(function () {
        location.href = './checkout.html'
    })
})