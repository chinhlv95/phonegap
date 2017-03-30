// Post detail

$("body").on("click",".post-detail", function(){
	document.getElementById("post-content").innerHTML = '';
    document.getElementById("post-comment").innerHTML = '';
	var id = $(this).attr("id");
	var xhr = new XMLHttpRequest();
    xhr.open("GET", URL+"/wp-admin/admin-ajax.php?action=post_detail&id="+id);
    xhr.onload = function(){
        var post = JSON.parse(xhr.responseText);
        var html = "";
        var comments = "";
        var title = post[0][0];
        var img  = post[0][2];
        var content = post[0][1];
        var num_comment = post[0][3];

            html += "<h2>"+ title +"</h2>";
            html += "<img width='100%' src='" + img + "'>";
            html += "<div>"+content+"</div>";
            html += "<h3>Có <span class='num-comment'>"+num_comment+"</span> bình luận:</h3>";
        for(var count = 0; count < post[1].length; count ++){
            comments += "<div class='ui-block-a'>";
            comments += "<img class='post-img' width='80px' src='" + post[1][count][3] + "'>";
            comments += "<div class='comment-auth'>"
            comments += "<div class='auth-name'>"+ post[1][count][0] +"<span> viết:</span></div>";
            comments += "<div class='comment-time'>lúc "+ post[1][count][2] +"</div>";
            comments += "</div>"
            comments += "<div class='comment-content'>"+ post[1][count][1] +"</div>";
            comments += "</div>";
        }


        document.getElementById("post-content").innerHTML = html;
        document.getElementById("post-comment").innerHTML = comments;

    }
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var comment ="";
            comment +=  "<h3>Bình luận:</h3>";
            comment +=  "<div class='ui-field-contain'>";
            comment +=  "<textarea name='textarea' id='textarea' placeholder='Bình luận...'></textarea>";
            comment +=  "</div>";
            comment +=  "<a href='#post-detail' post-id='"+id+"' class='ui-btn button-comment'>PHẢN HỒI</a>";
            document.getElementById("comment").innerHTML = comment;
        }
    };
    xhr.send();
});

$(document).on("pagebeforehide","#post-detail",function(){ // When entering pagetwo
  document.getElementById("comment").innerHTML = '';
});

// Category detail

$("body").on("click",".cate-list-post", function(){
    document.getElementById("cate-list-post").innerHTML = '';
    var id = $(this).attr("id");
    var xhr = new XMLHttpRequest();
    xhr.open("GET", URL+"/wp-admin/admin-ajax.php?action=cate_detail&id="+id);
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

        document.getElementById("cate-list-post").innerHTML = html;

    }
    xhr.send();
});

// factorize post

$("body").on("click",".factorize", function(){
    var id = 3;
    var xhr = new XMLHttpRequest();
    xhr.open("GET", URL+"/wp-admin/admin-ajax.php?action=cate_detail&id="+id);
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

        document.getElementById("factorize-post").innerHTML = html;

    }
    xhr.send();
});

// Page video

$("body").on("click",".video-detail", function(){
    document.getElementById("page-video-detail").innerHTML = '';
    var id = $(this).attr("id");
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", URL+'/wp-json/wp/v2/pages/'+id, true);
    xmlhttp.onload = function() {
        var html="";
        var page = JSON.parse(xmlhttp.responseText);
        var res = page["content"]["rendered"].split("tntVideoItem");
        var count = res.length;
        var i;
        var regExp = /(https:|http:|):(\/\/www\.|\/\/|)(.*?)\/(embed\/|watch.*?v=|)([a-z_A-Z0-9\-]{11})/;
        var arr = new Array();
        for (i =1; i<count;i++){
            var match = res[i].match(regExp);
            html += '<iframe class="show-video" width="100%" height="300" src="https://www.youtube.com/embed/'+match[5]+'" allowfullscreen></iframe><div class="clear"></div>';
        }
        document.getElementById("page-video-detail").innerHTML = html;
    };
    xmlhttp.send();
});

$("body").on("click",".button-comment", function(){
    var post_id = $(this).attr("post-id");
    var comment_author = localStorage.getItem("login");
    var comment_author_email = localStorage.getItem("email");
    var comment_content = $("#textarea").val();
    var user_id = localStorage.getItem("id");
    var name = localStorage.getItem("name");
    var img = localStorage.getItem("img");
    var xhr = new XMLHttpRequest();
    var currentdate = new Date(); 
    var datetime = currentdate.getFullYear() + "-"
                + (currentdate.getMonth()+1)  + "-" 
                + currentdate.getDate() + " "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();
    comments ='';
    comments += "<div class='ui-block-a'>";
    comments += "<img class='post-img' width='80px' src='" + img + "'>";
    comments += "<div class='comment-auth'>"
    comments += "<div class='auth-name'>"+ name +"<span> viết:</span></div>";
    comments += "<div class='comment-time'>lúc "+ datetime +"</div>";
    comments += "</div>"
    comments += "<div class='comment-content'>"+ comment_content +"</div>";
    comments += "</div>";
    xhr.open("GET", URL+"/wp-admin/admin-ajax.php?action=post_comment&post_id="+post_id+"&comment_author="+comment_author+"&comment_author_email="+comment_author_email+"&comment_content="+comment_content+"&user_id="+user_id);
    var num_comment = $('.num-comment').html();
    num_comment ++;
    xhr.onload = function(){
        $('.num-comment').html(num_comment);
        $("#post-comment").append(comments);
        $("#textarea").val('');
    }
    xhr.send();
});