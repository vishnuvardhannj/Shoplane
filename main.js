$(function () {
    console.log('Script loaded!!!')


// Slick Carousel

$('.slider-wrapper').slick({
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    dots: true,
    speed: 300,
    autoScroll: true
  });



    // Nav Click
    $('#shop-name').click(function () {
        location.href = './index.html'
    })


    $.get("https://607e95f802a23c0017e8ba2f.mockapi.io/habib-shoplane", function (productList) {
        console.log(productList)

        for (var i = 0; i < productList.length; i++) {
            productCardGenerator(productList[i])

        }
    })


    // cart Item count
    if (localStorage.getItem('cartValue') == 'NaN' || localStorage.getItem('cartValue') == null) {
        console.log(localStorage.getItem('cartValue'))
        localStorage.setItem('cartValue', 0);
    } else {
        $('#cart-item-count').text(localStorage.getItem('cartValue'));
    }


    function productCardGenerator(productItem) {

        var productCardWrapper = $('<div>').addClass('product-card-wrapper');

        var productDetailsLink = $('<a>').addClass('product-details-link').attr(
            'href', './details.html' + "?id=" + productItem.id,
        );

        var productPreview = $('<img>').addClass('product-preview').attr('src', productItem.preview);

        productDetailsLink.append(productPreview);
        var productContent = $('<div>').addClass('product-content');

        var productName = $('<h4>').addClass('product-name').text(productItem.name);

        var productBrand = $('<h5>').addClass('product-brand').text(productItem.brand);

        var productPrice = $('<p>').addClass('product-price').text('Rs '+productItem.price);


        productContent.append(productName, productBrand, productPrice);
        productCardWrapper.append(productDetailsLink, productContent);

        if (productItem.isAccessory == true) {
            console.log("Is accesory")
            $('#accessory-card-wrapper').append(productCardWrapper)
            $('#accessory-section').append($('#accessory-card-wrapper'));

            $('#main-container').append($('#accessory-section'));
        } else if (productItem.isAccessory == false) {
            console.log('isclothing')
            $('#clothing-card-wrapper').append(productCardWrapper);
            $('#clothing-section').append($('#clothing-card-wrapper '))
            $('#main-container').append($('#clothing-section'));
        }

    }



    // Cart on click
    $('.shopping-cart').click(function () {
        location.href = './checkout.html'
    })














});