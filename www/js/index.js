var URL = "http://52.88.244.236/fitness";

function login()
{
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    if(username == "")
    {
        navigator.notification.alert("Please enter username", null, "Username Missing", "OK");
        return;
    }

    if(password == "")
    {
        navigator.notification.alert("Please enter password", null, "Password Missing", "OK");  
        return;
    }

    var xhr = new XMLHttpRequest();
    xhr.open("POST", URL+"/wp-admin/admin-ajax.php?action=login&username=" + encodeURIComponent(username) + "&password=" + encodeURIComponent(password), false);
    xhr.onreadystatechange = function(){
        var user_array = JSON.parse(xhr.responseText);
        if(user_array[0] == "FALSE")
        {
            navigator.notification.alert("Bạn nhập sai tên tài khoản hoặc mật khẩu.", null, "", " Vui lòng nhập lại.");
        }
        else if(user_array[0] == "User is already Logged In")
        {
            fetch_and_display_recent();
            $.mobile.changePage("#homepage",{ transition: "slideup", changeHash: false });
            localStorage.setItem("id", user_array[1]);
            localStorage.setItem("login", user_array[2]);
            localStorage.setItem("email", user_array[3]);
            localStorage.setItem("name", user_array[4]);
            localStorage.setItem("img", user_array[5]);
        }
        else
        {
            fetch_and_display_recent();
            $.mobile.changePage("#homepage",{ transition: "slideup", changeHash: false });
            localStorage.setItem("id", user_array[1]);
            localStorage.setItem("login", user_array[2]);
            localStorage.setItem("email", user_array[3]);
            localStorage.setItem("name", user_array[4]);
            localStorage.setItem("img", user_array[5]);
        }
    }   
    xhr.send();
}

function fetch_and_display_recent()
{   
    var xhr = new XMLHttpRequest();
    xhr.open("GET", URL+"/wp-admin/admin-ajax.php?action=recent_posts");
    xhr.onload = function(){
        var posts_array = JSON.parse(xhr.responseText);
        var html = "";
        for(var count = 0; count < posts_array.length; count++)
        {
            var id = posts_array[count][0];
            var title = posts_array[count][1];
            var img = posts_array[count][2];
            var date = posts_array[count][3];

            html += "<li>";
            html +=     "<a href='#post-detail' id='"+ id +"' class='post-detail'>";
            html +=         "<img width='100%' src='" + img + "'>";
            html +=         "<h2>"+ title +"</h2>";
            html +=         "<h3 class='date'>"+ date +"</h3>";
            html +=     "</a>";
            html += "</li>"
            ;
        }

        document.getElementById("recent-post").innerHTML = html;
    }
    xhr.send();
}

document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {

        if(localStorage.getItem("login") !== null)
        {
            fetch_and_display_recent();
            $.mobile.changePage("#homepage",{ transition: "slideup", changeHash: true });
        }
        else
        {
            $.mobile.changePage("#pageone",{ transition: "slideup", changeHash: true });
        } 
}

$("#logout").click(function(){
    $.mobile.changePage("#pageone",{ transition: "slideup", changeHash: true });
    localStorage.removeItem("id");
    localStorage.removeItem("login");
    localStorage.removeItem("email");
    localStorage.removeItem("name");
    localStorage.removeItem("img");
});

// Panel

$( document ).on( "pageinit", ".page", function() {
    $( document ).on( "swipeleft swiperight", ".page", function( e ) {
        // We check if there is no open panel on the page because otherwise
        // a swipe to close the left panel would also open the right panel (and v.v.).
        // We do this by checking the data that the framework stores on the page element (panel: open).
        if ( $.mobile.activePage.jqmData( "panel" ) !== "open" ) {
            if ( e.type === "swipeleft"  ) {
                $( "#myPanel" ).panel( "close" );
            } else if ( e.type === "swiperight" ) {
                $( "#myPanel" ).panel( "open" );
            }
        }
        else if ( $.mobile.activePage.jqmData( "panel" ) == "open" ) {
            if ( e.type === "swipeleft"  ) {
                $( "#myPanel" ).panel( "close" );
            }
        }
    });
});

// Popular Post

$( document ).on( "pageinit", "#popularpage", function( event ) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", URL+"/wp-admin/admin-ajax.php?action=popular_posts");
    xhr.onload = function(){
        var posts_array = JSON.parse(xhr.responseText);
        var html = "";
        for(var count = 0; count < posts_array.length; count++)
        {
            var id = posts_array[count][0];
            var title = posts_array[count][1];
            var img = posts_array[count][2];
            var date = posts_array[count][3];

            html += "<li>";
            html +=     "<a href='#post-detail' id='"+ id +"' class='post-detail'>";
            html +=         "<img width='100%' src='" + img + "'>";
            html +=         "<h2>"+ title +"</h2>";
            html +=         "<h3 class='date'>"+ date +"</h3>";
            html +=     "</a>";
            html += "</li>"
            ;
        }

        document.getElementById("popular-post").innerHTML = html;
    }
    xhr.send();
});

// List Category Cate-Food

$( document ).on( "pageinit", "#food", function( event ) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", URL+"/wp-admin/admin-ajax.php?action=list_cate");
    xhr.onload = function(){
        var posts_array = JSON.parse(xhr.responseText);
        var html = "";
        for(var count = 0; count < posts_array.length; count++)
        {
            var id = posts_array[count][0];
            var title = posts_array[count][1];

            html += "<li>";
            html +=     "<a href='#cate-detail' data-icon='forward' id='"+ id +"' class='ui-btn ui-btn-icon-right ui-icon-forward cate-list-post'>";
            html +=         "<h2>"+ title +"</h2>";
            html +=     "</a>";
            html += "</li>"
            ;
        }

        document.getElementById("list-cate").innerHTML = html;
    }
    xhr.send();
});

// List Category Video

$( document ).on( "pageinit", "#video", function( event ) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", URL+"/wp-admin/admin-ajax.php?action=page_video");
    xhr.onload = function(){
        var posts_array = JSON.parse(xhr.responseText);
        var html = "";
        for(var count = 0; count < posts_array.length; count++)
        {
            var id = posts_array[count][0];
            var title = posts_array[count][1];

            html += "<li>";
            html +=     "<a href='#video-detail' data-icon='forward' id='"+ id +"' class='ui-btn ui-btn-icon-right ui-icon-forward video-detail'>";
            html +=         "<h2>"+ title +"</h2>";
            html +=     "</a>";
            html += "</li>"
            ;
        }

        document.getElementById("page-video").innerHTML = html;
    }
    xhr.send();
});

$("#get_page").click(function(){
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", URL+'/wp-json/wp/v2/posts/14', true);
    xmlhttp.onreadystatechange = function() {
        var html="";
        var page = JSON.parse(xmlhttp.responseText);
        var res = page["content"]["rendered"];
        document.getElementById("hihi").innerHTML = res;
    };
    xmlhttp.send();
});
