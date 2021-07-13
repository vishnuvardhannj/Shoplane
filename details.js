$(function () {

    $('#shop-name').click(function () {
        location.href = './index.html'
    })

    $('#profile-pic').click(function () {
        location.href = './thankyou.html'
    })

    var urlParams = new URLSearchParams(window.location.search);

    // Cart Value
    if (localStorage.getItem('cartValue') == 'NaN' || localStorage.getItem('cartValue') == null) {
        console.log(localStorage.getItem('cartValue'))
        localStorage.setItem('cartValue', 0);
    } else {
        $('#cart-item-count').text(localStorage.getItem('cartValue'));
    }


    $.get("https://607e95f802a23c0017e8ba2f.mockapi.io/habib-shoplane", function (res) {

        var productDetails = res[urlParams.get('id') - 1];
        productDetailsPage(res[urlParams.get('id') - 1])

        // function
        function productDetailsPage(productData) {
            var detailsContent = $('#details-content');

            // left-section
            var previewCard = $("<div>").addClass("preview-card");
            var previewImage = $("<img>").addClass('preview-image').attr({
                'src': productData.preview
            });
            previewCard.append(previewImage);

            // Right section
            var contentCard = $("<div>").addClass("content-card");

            var productName = $("<h1>").addClass('product-name').text(productData.name);
            contentCard.append(productName);

            var productBrand = $("<h1>").addClass('product-brand').text(productData.brand);
            contentCard.append(productBrand);

            var productPriceWrapper = $("<h3>").addClass('price-prefix').text("Price: Rs ");

            var productPrice = $("<span>").text(productData.price);
            productPriceWrapper.append(productPrice);

            contentCard.append(productPriceWrapper);

            var description = $("<h3>").addClass('description').text("Description");

            var descriptionText = $("<p>").addClass("description-text").text(productData.description);

            description.append(descriptionText);
            contentCard.append(description);

            var productPreview = $("<h3>").addClass('product-preview').text("Product Preview");
            contentCard.append(productPreview);

            var productPhotosWrapper = $("<div>");

            for (var i = 0; i < productData.photos.length; i++) {
                var previewPhoto = $("<img>").addClass('preview-photo').attr('src', productData.photos[i]);
                if (i === 0) {
                    previewPhoto.addClass("active");
                }
                productPhotosWrapper.append(previewPhoto);
            }

            contentCard.append(productPhotosWrapper);

            var addToCartButton = $("<button>").addClass("add-button").text("Add to Cart");

            contentCard.append(addToCartButton);

            detailsContent.append(previewCard);
            detailsContent.append(contentCard);
        }


        // Preview Image Change Onclick
        console.log(productDetails)
        for (var m = 0; m < productDetails.photos.length; m++) {
            $('.preview-photo').click(changePreview)
        }


        function changePreview(e) {
            $('.preview-photo').removeClass('active');
            for (var k = 0; k < productDetails.photos.length; k++) {
                if (e.currentTarget.src == $('.preview-photo')[k].src) {
                    $('.preview-photo').eq(k).addClass('active')
                    $('.preview-image').attr('src', e.currentTarget.src)
                }
            }
        }

        //Add to cart button 
        $('.add-button').click(function () {
            var cartValue = parseInt(localStorage.getItem('cartValue'));
            if (cartValue == 'NaN') {
                cartValue = 1;
            } else {
                cartValue += 1;
            }
            $('#cart-item-count').text(cartValue);
            localStorage.setItem('cartValue', cartValue);

            // listItem
            var productList = JSON.parse(localStorage.getItem('productList'));

            if (productList.length == 0) {
                productDetails.count = 1;
                productList.push(productDetails);
            } else if (productList.length > 0) {
                var isAdded = false;
                var currentCount;
                var currentIndex = -1;
                for (var i = 0; i < productList.length; i++) {

                    if ((productList[i].id === productDetails.id)) {
                        currentCount = productList[i].count;
                        currentIndex = i;
                        console.log(currentCount)
                        isAdded = true;
                    }
                }

                if (isAdded) {
                    productDetails.count = currentCount + 1;
                    productList.splice(currentIndex, 1, productDetails)
                    localStorage.setItem('productList', productDetails)
                } else {
                    productDetails.count = 1;
                    productList.push(productDetails);
                }

            }

            localStorage.setItem('productList', JSON.stringify(productList));




        })





        // ProductList
        if (localStorage.getItem('productList') == 'NaN' || localStorage.getItem('productList') == null || localStorage.getItem('productList') == "") {
            var productList = [];
            localStorage.setItem('productList', JSON.stringify(productList));
        } else {

            $('#cart-item-count').text(localStorage.getItem('cartValue'));
        }

    });


    // Cart on click
    $('.shopping-cart').click(function () {
        location.href = './checkout.html'
    })

});
