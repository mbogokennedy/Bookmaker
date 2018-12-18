var form = document.getElementById('myForm');
form.addEventListener('submit', submit);

function submit(e){
    var nameValue = document.getElementById("siteName").value;
    var urlValue = document.getElementById("siteUrl").value;

    if(!validateForm(nameValue, urlValue)){
        return false;
    }

    var bookmark = {"name": nameValue, "url": urlValue}

    // // local storage test
    // localStorage.setItem('test', 'Hello world');
    // console.log(localStorage.getItem('test'));
    // localStorage.removeItem('test');
    // console.log(localStorage.getItem('test'));
    if(localStorage.getItem("bookmarks") === null){
        var bookmarks = [];
        bookmarks.push(bookmark);
        localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    
    }
    else{
        var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
        bookmarks.push(bookmark);
        localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    }
    document.getElementById('myForm').reset();
    fetchBookmarks();

    e.preventDefault();
}

//fetch bookmarks
function deleteBookmark(url){
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    for(var i = 0; i < bookmarks.length; i++){
        if(bookmarks[i].url == url){
            bookmarks.splice(i, 1);
        }
    }
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));

    fetchBookmarks();
}

function fetchBookmarks(){
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    var bookmarksResults = document.getElementById('bookmarksResults');
    bookmarksResults.innerHTML = '';
    for(var i = 0; i < bookmarks.length; i++){
        var name = bookmarks[i].name;
        var url = bookmarks[i].url;
        bookmarksResults.innerHTML += '<ul class="list-group m-1">'+
                                      '<li class="list-group-item">'+name+
                                      ' <a onclick="deleteBookmark(\''+url+'\')" class="btn btn-md btn-danger float-right m-2" href="#">Delete</a> '+
                                      ' <a class="btn btn-md btn-success float-right m-2" target="_blank" href="'+url+'/">Visit</a> '
                                      '<li>'+
                                      '</ul>'
    }
}

function validateForm(nameValue, urlValue){
    if(!nameValue || !urlValue){
        alert('Please fill in the Required');
        return false;
    }
    var expression = /[-a-zA-Z0-9@:%_\+.~#?$//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?$//=]*)?/gi;
    var regex = new RegExp(expression);
    if(!urlValue.match(regex)){
        alert('Please use a valid URL');
        return false; 
    }

    return true
}
