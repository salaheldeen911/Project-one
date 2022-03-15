// Inituialize Thw WOW Effect
new WOW().init();
console.log(new WOW().init());
// When the page is loaded
$(document).ready(() => {
    $("#preloader").css("opacity", 0)

    // Get to the top of the page
    setTimeout(function () {
        $('html, body').animate({ scrollTop: 0 });
    }, 500)

    // h1 effect
    setTimeout(function () {
        addTextByDelay($('.addTextByDelay'));
    }, 20);
});

// ** Functions ** //
function copyTheMail() {
    let email = document.getElementById("email").innerHTML
    navigator.clipboard.writeText(email);
    $('#copyMailMsg').fadeIn(500);
    $('#copyMailMsg').fadeOut(500);
    $("#copyBtn").blur();
}

function goTop() {
    $('html, body').animate({ scrollTop: 0 });
}

let addTextByDelay = (elem) => {

    elem.each(function () {
        let _this = this;
        if ($(_this).data('delay')) {
            setTimeout(function () {
                appendLetters($(_this).data('text'), $(_this))
            }, $(_this).data('delay'));
        } else {
            appendLetters($(_this).data('text'), $(_this))
        }
    });

    function appendLetters(text, elem, delay) {
        if (!delay) {
            delay = 100;
        }

        if (text.length > 0) {
            //append first character 
            elem.append(text[0] == '#' ? '<br>' : text[0]);
            setTimeout(
                function () {
                    //Slice text by 1 character and call function again                
                    appendLetters(text.slice(1), elem);
                }, delay
            );
        }
    }
}

function showHome() {
    $(".logo-dark").removeClass("none");
    $("#nav-container").removeClass("active-section");
    $(".home").removeClass("hide-home");
    $("html, body").css("overflow", "visible");
    $("#closeBtn").addClass("none");
    goTop();
}

function showSections(_this) {
    $("#closeBtn").removeClass("none");
    $(".home").addClass("hide-home");
    $(".logo-dark").addClass("none");
    $("html, body").css("overflow", "hidden");
    $("#nav-container").addClass("active-section");
    goTop();
    let sectionToMoveTo = document.getElementById(_this.hash.slice(1))
    $('.main').animate({ scrollTop: sectionToMoveTo.offsetTop }, 400);
    setTimeout(function(){
        $('.main').animate({ scrollTop: sectionToMoveTo.offsetTop +1 }, 400);
    },10)
}

// ** Events ** //
// Navbar animation
let currentWindowPosition = window.pageYOffset
window.onscroll = function () {
    // navbar
    currentWindowPosition = window.pageYOffset
    if (currentWindowPosition > 30) {
        $("#header").addClass("ty-80");
    } else {
        $("#header").removeClass("ty-80");
    }
    // the button
    if ((window.innerHeight + window.scrollY + 120) >= document.body.offsetHeight) {
        $(".up").addClass("up-active")
    } else if ((window.innerHeight + window.scrollY + 128) < document.body.offsetHeight) {
        $(".up").removeClass("up-active")
    }
};

// Main navbar links  actions
$(".main-links").on("click", function () {
    _that = $(this);
    setTimeout(function () {
        $(".main-links").removeClass("active-nav");
    }, 100)


    if (this.hash == "#home") {
        setTimeout(function () {
            $(".main-links").removeClass("active-nav");
        }, 200)
        showHome()
    } else if (this.hash == "#about") {
        if ($('.main').scrollTop() == 0) {
            setTimeout(function () {
                _that.addClass("active-nav");
            }, 200)
        }
        showSections(this)
    } else {
        showSections(this)
    }

    // Handling the bootstarap navbar button on less than 767px width
    if (window.innerWidth < 767) {
        $("#navBtn").click()
    }
});

// Close button behavior
$("#closeBtn").on("click", function () {
    showHome();
    setTimeout(function () {
        $(".main-links").removeClass("active-nav");
    }, 10)
});

// Toggling map overlay
$(".toggle-map").on('click', function () {
    $(".map-overlay").fadeToggle(200);
    $(".toggle-map").fadeToggle(200);
});

// Filter items on main page
$('.filter-button').on('click', function () {
    var filterValue = $(this).attr('data-filter');
    $gallary.isotope({ filter: filterValue });
});

// Second navbar links filter actions
$(".filter-button").on('click', function () {
    let current = document.querySelector(".active-s-nav").dataset.filter;
    $(this).addClass("active-s-nav");
    $(this).siblings().removeClass("active-s-nav");
    let value = $(this).attr('data-filter');

    if (current == value) {
        return
    }
    setTimeout(function () {
        window.scroll({
            top: currentWindowPosition + .5,
            left: 0,
            behavior: 'smooth'
        });
    }, 400)

});

// Main-links border bottom animation on scroll
$('.main').scroll(function () {
    const sections = document.getElementsByClassName("section")
    for (let section of sections) {
        if ($('.main').scrollTop() <= section.offsetTop + 100 && $('.main').scrollTop() >= section.offsetTop - 100) {
            $(".main-links").removeClass("active-nav");
            $(`a[href=#${section.id}]`).addClass("active-nav");
        }
    }
});

/* activate jquery isotope */
var $gallary = $('#gallary').isotope({
    itemSelector: '.filter',
});
$gallary.isotope({ filter: '*' });
