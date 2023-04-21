var passProtect = {
        id: $("#password_input"),
        key: "takealook",
        errorMessage: "Sorry, please try again",
        errorState: function () {
            passProtect.id.css("border", "1px solid rgb(255,0,0)");
            $(".password-container .label").html(passProtect.errorMessage);
        },
        successMessage: "Success!",
        successState: function () {
            passProtect.id.css("border", "1px solid rgb(0,200,100)");
            $(".password-container.label").html(passProtect.successMessage);
        },
        prompt: "Please enter password "
    };

    function openUp() {
        $("#password-modal").fadeOut(250);
    }

    function checkPassword() {
        var passVal = passProtect.id.val();
        console.log(passVal, passProtect.key)
        if (passVal === passProtect.key) {
            console.log(passProtect.id.val());
            setCookie("password", passProtect.id.val(), 1);
            passProtect.successState(openUp());
        } else {
            passProtect.errorState();
        }
    }

    function bindEvents() {
        passProtect.id.on("keyup", function (e) {
            if (e.keyCode === 13) {
                checkPassword();
            }
        });
    }

    function setCookie(cname, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        var expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }

    function getCookie(cname) {
        var name = cname + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }
    $(document).ready(function () {
        if(getCookie('password')) openUp();
        bindEvents();
    });