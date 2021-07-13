$(function () {
    $('#shop-name').click(function () {
        location.href = './index.html'
    })

    // Cart Value
    if (localStorage.getItem('cartValue') == 'NaN' || localStorage.getItem('cartValue') == null) {
        console.log(localStorage.getItem('cartValue'))
        localStorage.setItem('cartValue', 0);
    } else {
        $('#cart-item-count').text(localStorage.getItem('cartValue'));
    }



    // ItemList from local storage
    var productList = JSON.parse(localStorage.getItem('productList'))
    console.log(productList)


    var totalAmount = 0;
    if (productList != null && productList != "" && productList != undefined) {
        $('.item-count span').text(productList.length);
        for (var i = 0; i < productList.length; i++) {
            totalAmount += productList[i].count * productList[i].price;
            checoutItemCardGenerator(productList[i])
        }
    }

    // var totalAmountText
    function checoutItemCardGenerator(productItem) {
        var checkoutCardWrapper = $('<div>').addClass('checkout-card-wrapper');

        var checkoutCardImage = $('<img>').addClass('checkout-card-image').attr('src', productItem.preview);

        var checkoutCardContent = $('<div>').addClass('checkout-card-content');

        var checkoutCardHeader = $('<p>').addClass('checkout-card-header').text(productItem.name);

        var checkouItemCount = $('<p>').addClass('checkout-item-count').text('x' + productItem.count);

        var checkoutItemAmount = $('<p>').addClass('checkout-item-amount').text('Amount: Rs ' + (productItem.count * productItem.price));

        checkoutCardContent.append(checkoutCardHeader, checkouItemCount, checkoutItemAmount)
        checkoutCardWrapper.append(checkoutCardImage, checkoutCardContent)

        $('#left-section').append(checkoutCardWrapper);

    }

    // Right Section

    $('#checkout-total-amount span').text(totalAmount)



    // Total amount
    var discountedAmount=localStorage.getItem('discountedAmount');
    console.log(discountedAmount>0,discountedAmount);
    if(discountedAmount>0){
        $('#checkout-total-amount span').text(discountedAmount);
        $('#promo-code-status').css('display', 'block');
    }

    // Promocode apply
    $('#discount-form').submit(function (e) {
        e.preventDefault();
        var promoCodeValue=$('#discount-coupon').val();
        $('#discount-coupon').val("");


        if(!(localStorage.getItem(discountedAmount)>0 || totalAmount>0)){
            alert('You cart is empty! Add item to apply the coupon.')
        }
        else if(promoCodeValue=="VISHNU28"){

            if(localStorage.getItem('promoCode')=='true'){
                alert("Promo code is already applied!!")
            }else{
                localStorage.setItem('promoCode','true');
                localStorage.setItem('discountedAmount',Math.round(totalAmount*0.9));

                $('#promo-code-status').css('display', 'block');

                $('#checkout-total-amount span').text(Math.round(totalAmount*0.9));
            }
            
        }else{
            alert("Invalid promocode")
        }

    })



    $('#place-order-button').click(function () {
        if(localStorage.getItem(discountedAmount)>0 || totalAmount>0){
            productList = JSON.stringify([]);
        localStorage.setItem('cartValue', '0');
        localStorage.setItem('productList', productList);
        localStorage.setItem('promoCode', "false");
        localStorage.setItem('discountedAmount',0);
        location.href = './thankyou.html'
        }else{
            alert('You cart is empty! Add item to place your order.')
        }
    })


})
