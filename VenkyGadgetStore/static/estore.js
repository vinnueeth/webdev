webitems =
    [
        {
            "id": "1",
            "name": "Macbook Air",
            "category": "Laptop",
            "featuredimage": "../static/macair.jpeg",
            "price": "€ 1000"
        },

        {
            "id": "2",
            "name": "Macbook Pro",
            "category": "Laptop",
            "featuredimage": "../static/macbook.jpg",
            "price": "€ 1500"
        },

        {
            "id": "3",
            "name": "Mi Smart TV",
            "category": "Smart Television",
            "featuredimage": "../static/mitv.jpg",
            "price": "€ 700"
        },

        {
            "id": "4",
            "name": "Samsung Smart TV",
            "category": "Smart Television",
            "featuredimage": "../static/samsung.jpg",
            "price": "€ 1100"
        },

        {
            "id": "5",
            "name": "Panasonic",
            "category": "Smart Television",
            "featuredimage": "../static/panasonic.jpg",
            "price": "€ 1500"
        },

        {
            "id": "6",
            "name": "Nikon DSLR",
            "category": "DSLR",
            "featuredimage": "../static/nikon.jpg",
            "price": "€ 600"
        },

        {
            "id": "7",
            "name": "Cannon DSLR",
            "category": "DSLR",
            "featuredimage": "../static/cannon.jpg",
            "price": "€ 700"
        },

        {
            "id": "8",
            "name": "Apple ipad",
            "category": "Tablet",
            "featuredimage": "../static/ipad.jpg",
            "price": "€ 900"
        },

        {
            "id": "9",
            "name": "Samsung Tab",
            "category": "Tablet",
            "featuredimage": "../static/samsung_tab.jpg",
            "price": "€ 800"
        }

    ];



$("#productsearch").keyup(function (event) {
    if ($("#productsearch").val().trim() == "") {
        $(".navLinks>li>a:contains('Home')").parent().click();
        dynamichtml = "";
        webitems = [];
        webitems = JSON.parse(localStorage.getItem("json"));
        GetProductHtml(webitems);
    }

    else {
        webitems = [];
        $.each(JSON.parse(localStorage.getItem("json")), function (i, v) {
            if (v.name.toLowerCase().indexOf($("#productsearch").val().toLowerCase()) != -1 || v.category.toLowerCase().indexOf($("#productsearch").val().toLowerCase()) != -1) {
                webitems.push(v);
            }
        });
        GetProductHtml(webitems);
    }
    if($(".cards_item").length==1)
    {
        $('.cards_item').css("width","65%");
    }
});


menu_linkshtml = "";
menu_links = [];
navlink = "";

$.each(webitems, function (index, value) {
    if ($.inArray(value.category, menu_links) === -1) {
        menu_links.push(value.category);
    }
});

menu_links.splice(0, 0, "Home");

for (var i = 0; i < menu_links.length; i++) {
    if (i == 0) {
        menu_linkshtml = "<li class='active' style='cursor:pointer'> <a href='/'>" + menu_links[i] + "</a></li>";
    }
    else {
        navlink = "?cat=" + menu_links[i].trim();
        menu_linkshtml += "<li style='cursor:pointer'> <a href=" + navlink + ">" + menu_links[i] + "</a></li>";
    }
}

$(".navLinks").append(menu_linkshtml);



localStorage.setItem("json", JSON.stringify(webitems));
dynamichtml = "";
webitems = [];
webitems = JSON.parse(localStorage.getItem("json"));
GetProductHtml(webitems);

category = "";
category = getUrlParameter("cat");
if (category != "") {
    $(".navLinks>li>a:contains('" + category + "')").parent().click();
}

if($('.navLinks>li').hasClass('active'))
{
    if ($('.navLinks>li.active')[0].textContent.trim() != "Home") {
        webitems = [];
        webitems = JSON.parse(localStorage.getItem("json"));
    
        webitems = webitems.filter(function (i) {
            return i.category == $('.navLinks>li.active')[0].textContent.trim();
        });
        GetProductHtml(webitems);
    }
}



else {
    webitems = [];
    webitems = JSON.parse(localStorage.getItem("json"));
    GetProductHtml(webitems);
}



$(document).ready(function () {

    $('.navLinks>li').on('click', function () {
        $('li').removeClass('active');
        $(this).toggleClass('active');
    });

    category = "";
    category = getUrlParameter("cat");

    if (category != "") {
        $(".navLinks>li>a:contains('" + category + "')").parent().click();
    }

    if($('.navLinks>li').hasClass('active'))
    {
        if ($('.navLinks>li.active')[0].textContent.trim() != "Home") {
            webitems = [];
            webitems = JSON.parse(localStorage.getItem("json"));
    
            webitems = webitems.filter(function (i) {
                return i.category == $('.navLinks>li.active')[0].textContent.trim();
            });
            GetProductHtml(webitems);
        }
    }

    else {
        webitems = [];
        webitems = JSON.parse(localStorage.getItem("json"));
        GetProductHtml(webitems);
    }


    $(".cartmsg").hide();

    cartvalue=[];
    cartval=[];
    $("#cart").hide();
    $(".modal").hide();
    webitems = JSON.parse(localStorage.getItem("json"));
    cartitemshtml = "";
    final_rating = 0;
    actual_rating = 0;
    cartitemexists=false;

    if(localStorage.getItem("cartitems")) {
      product_name = "";
      product_price = "";
      totalprice = 0; 

      for(var i = 0; i < cartval.length; i++){
        product_name = webitems.filter(function (data) {
          return data.id == String(cartval[i].split("-")[0]);
        })[0].name;

        product_price = webitems.filter(function (data) {
          return data.id == String(cartval[i].split("-")[0]);
        })[0].price;

        cartitemshtml += "<br/><div><span><img style='height:15px;width:15px' src='./Media/bin.png'></img></span><a id='productlink' href='#'>" + product_name + " (" + cartval[i].split("-")[1] + ")</a> <span class='price'> € " + parseInt(cartval[i].split("-")[1]) * parseInt(product_price.split('€')[1].trim()) + "</span></div><br/>";
        totalprice += parseInt(cartval[i].split("-")[1]) * parseInt(product_price.split('€')[1].trim());
      }

      $("#cartitems").append(cartitemshtml);
      $('.totalprice').html("<b>Total: € "+totalprice+"</b>");

    }

    else {
      $(".row").hide();
      $(".cartmsg").show();
    }

    if(getUrlParameter("checkout") == "true") {
      $("#cart").show();
      $("#productdetail").hide();
      $('li').removeClass('active');
      $("#modal h2").text("Checkout")
      $(".copy span").text("Items reserved successfully");
    }

    else {
      GetProductDetailHtml();        
    }

});



$(window).on("load", function () {
    SetProductDetailCSS();
    $('li').removeClass('active');
  });


  function AddtoCart() {
    if(localStorage.getItem("cartitems")) {
      cartvalue = localStorage.getItem("cartitems");
      cartvalue.push(product_data[0].id + ":" + parseInt($("#productqty :selected").text())); 
        
    }

    else {
      cartvalue=[];
      cartvalue[0]=product_data[0].id + "-" + parseInt($("#productqty :selected").text());
     
    }
    localStorage.setItem("cartitems", JSON.stringify(cartvalue));
    document.location.href = "./product.html?checkout=true";
  }



function SetProductDetailCSS() {
    $(".product-colors span").click(function () {
        $(".product-colors span").removeClass("active");
        $(this).addClass("active");
        $("body").css("background", $(this).attr("data-color"));
        $(".product-price").css("color", $(this).attr("data-color"));
        $(".product-button").css("color", $(this).attr("data-color"));
        $(".product-pic").css("background-image", $(this).attr("data-pic"));
    });
}



function GetProductDetailHtml(jsonarray) {
    $("#cart").hide();
    $("#productdetail").show();
    medialist = "";
    featurelist = "";
    productimg = "";
    categorylinkhtml = "";
    final_rating = 0;
    actual_rating = 0;
    UserRating="";
    userRatingHtml="";

    product_data = webitems.filter(function (i) {
        return i.id == String(getUrlParameter('id'));
    });

    /*
    for (var i = 0; i < product_data[0].reviews.length; i++) {
        final_rating += product_data[0].reviews[i].rating
    }

    actual_rating = Math.round(final_rating / product_data[0].reviews.length * 10) / 10;
    final_rating = Math.round(final_rating / product_data[0].reviews.length);

    if (final_rating == 5) {
        ratinghtml = "<a style='text-decoration:none' href='#modal'> <div id='product_rating'  class='rating5star'> <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span> <span style='color:black'>&nbsp;|&nbsp;" + product_data[0].reviews.length + " Reviews <span></div> </a>";
    }

    if (final_rating == 4) {
        ratinghtml = "<a style='text-decoration:none' href='#modal'><div id='product_rating'  class='rating4star'> <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span> <span style='color:black'>&nbsp;|&nbsp;" + product_data[0].reviews.length + " Reviews <span></div></a>";
    }

    if (final_rating == 3) {
        ratinghtml = "<a style='text-decoration:none' href='#modal'><div id='product_rating' onclick='ShowRatings()' class='rating3star'> <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span><span style='color:black'>&nbsp;|&nbsp;" + product_data[0].reviews.length + " Reviews <span></div></a>";
    }

    if (final_rating == 2) {
        ratinghtml = "<a style='text-decoration:none' href='#modal'><div id='product_rating' onclick='ShowRatings()' class='rating2star'> <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span><span style='color:black'>&nbsp;|&nbsp;" + product_data[0].reviews.length + " Reviews <span></div></a>";
    }

    if (final_rating == 1) {
        ratinghtml = "<a style='text-decoration:none' href='#modal'><div id='product_rating' onclick='ShowRatings()' class='rating1star'> <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span><span style='color:black'>&nbsp;|&nbsp;" + product_data[0].reviews.length + " Reviews <span></div></a>";
    }

    */


    categorylinkhtml = "<a style='color:#02AAB0;text-decoration: none;font-weight:500' href='?cat=" + product_data[0].category.trim() + "'>" + product_data[0].category + "</a>";
    $("#categorylink").append(categorylinkhtml);

    medialist = "<span data-pic='url(" + product_data[0].featuredimage + ")' class='active'> <img src='" + product_data[0].featuredimage + "'></img> </span>";

    for (var i = 0; i < product_data[0].additionalimages.length; i++) {
        medialist += "<span data-pic='url(" + product_data[0].additionalimages[i].image + ")'> <img src='" + product_data[0].additionalimages[i].image + "'></img> </span>";
    }

    productimg = "<li class='product_card_images'> <div style='display:flex;flex-direction:column;'> <div class='product-pic'></div>  <div class='product-colors'>" + medialist + "</div></div></li>";


    if (product_data[0].features.length == 1) {
        productimg += "<li class='product_card_desc'> <div style='display:flex;flex-direction:column;'><b><span>" + product_data[0].description + "</span></b><br/>" + ratinghtml + " </span> <br/> <b><span style='color:brown'>" + product_data[0].price + "<div style='float:left'> <div style='align-items:center'> <label id='lblqty'>Quantity</label> <select id='productqty'></select> </div> <button id='product_add_to_cart' onclick='AddtoCart()' class='btn card_btn btn-grad'>Add to Cart</button> </div> </span></b></div></li> ";
    }

    else {

        for (var i = 0; i < product_data[0].features.length; i++) {
            if (i == 0) {
                productimg += "<li class='product_card_desc'> <div style='display:flex;flex-direction:column;'><b><span>" + product_data[0].description + "</span></b><br/>" + ratinghtml + " </span> <br/> <b><span style='color:brown'>" + product_data[0].price + " <br/> <div style='align-items:center'><label id='lblqty'>Quantity &nbsp;</label> <select id='productqty'> </select> </div> <button id='product_add_to_cart' onclick='AddtoCart()' class='btn card_btn btn-grad'>Add to Cart</button> </span></b> <ul style='padding-left:15px'><br/>";
            }

            if (i != 0 && i == product_data[0].features.length - 1) {
                productimg += "<li><span>" + product_data[0].features[i].feature + "</span></li></ul></div></li>";
            }

            if (i != 0 && i != product_data[0].features.length - 1) {
                productimg += "<li><span>" + product_data[0].features[i].feature + "</span></li>";
            }
        }
    }
    $("#product-card").append(productimg);
    $("#product_name").text(product_data[0].name);
    $(".product-pic").css("background-image", "url('" + product_data[0].featuredimage + "')");
    $(".product-pic").css("background-repeat", "no-repeat");
    $(".product-pic").css("background-position", "left center");

    for (var i = 0; i < product_data[0].stockcount; i++) {
        $('#productqty').append('<option value="">' + (i + 1) + '</option>');
    }

/*

    $("#modal h2").html("Reviews & Ratings for "+product_data[0].name + "<a id='Modalclosebtn' href='#'>X</a>");

    for (var i = 0; i < product_data[0].reviews.length; i++) {
    if(product_data[0].reviews[i].rating==5)
    {
        UserRating="★★★★★";
    }

    if(product_data[0].reviews[i].rating==4)
    {
        UserRating="★★★★";
    }

    if(product_data[0].reviews[i].rating==3)
    {
        UserRating="★★★";
    }

    if(product_data[0].reviews[i].rating==2)
    {
        UserRating="★★";
    }

    if(product_data[0].reviews[i].rating==1)
    {
        UserRating="★";
    }
    

    userRatingHtml +="<br/> <span style='color:orange'>"+UserRating+"</span> by "+product_data[0].reviews[i].person+" : "+product_data[0].reviews[i].comment+"<br/>";
    
    }

*/


    $(".copy span").append(userRatingHtml);
}


function GetProductHtml(jsonarray) {
    $("#productcatalog").html("");
    dynamichtml = "";
    $.each(jsonarray, function () {
        ratinghtml = "";
        final_rating = 0;
        actual_rating = 0;

     /*   for (var i = 0; i < this.reviews.length; i++) {
            final_rating += this.reviews[i].rating
        }

        actual_rating = Math.round(final_rating / this.reviews.length * 10) / 10;
        final_rating = Math.round(final_rating / this.reviews.length); 

        console.log(final_rating);

        if (final_rating == 5) {
            ratinghtml = "<div id='rating' class='rating5star'><span class='tooltiptext'>" + actual_rating + " out of 5</span><span>★</span><span>★</span><span>★</span><span>★</span><span>★</span></div>";
        }

        if (final_rating == 4) {
            ratinghtml = "<div id='rating' class='rating4star'><span class='tooltiptext'>" + actual_rating + " out of 5</span><span>★</span><span>★</span><span>★</span><span>★</span><span>★</span></div>";
        }

        if (final_rating == 3) {
            ratinghtml = "<div id='rating' class='rating3star'><span class='tooltiptext'>" + actual_rating + " out of 5</span><span>★</span><span>★</span><span>★</span><span>★</span><span>★</span></div>";
        }

        if (final_rating == 2) {
            ratinghtml = "<div id='rating' class='rating2star'><span class='tooltiptext'>" + actual_rating + " out of 5</span><span>★</span><span>★</span><span>★</span><span>★</span><span>★</span></div>";
        }

        if (final_rating == 1) {
            ratinghtml = "<div id='rating' class='rating1star'><span class='tooltiptext'>" + actual_rating + " out of 5</span><span>★</span><span>★</span><span>★</span><span>★</span><span>★</span></div>";
        }
*/


        dynamichtml += "<li class='cards_item'><div class='card'><a href='/product?id=" + this.id + "'><div class='card_image'><img src='" + this.featuredimage + "'></div></a><div class='card_content'><h1 class='card_title'>" + this.name + "</h1> <div class='card_price'> <span> Price: " + this.price + "</span></div><br/> <button onclick='AddtoCart()' id='view_product_detail' class='btn card_btn btn-grad'>Add to Cart</button> </div></div></li>";

    });
    $("#productcatalog").append(dynamichtml);
}



function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
    return false;
};


function ToggleMenu() {
    $(".navLinks")[0].classList.toggle("responsive");
}


function GoHome() {
    window.location.href = "/";
}

function Navigateproductdetails(itemid) {
    window.location.href = "/product?id=" + itemid;
}

