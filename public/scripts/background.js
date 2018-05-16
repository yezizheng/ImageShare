var counter = 0;
function changeBG(){
    var imgs = [
        "url(https://images.unsplash.com/photo-1452993912631-49cff82efb5e?dpr=2&fit=crop&fm=jpg&h=825&ixlib=rb-0.3.5&q=50&w=1450)",
        "url(https://images.unsplash.com/photo-1505252912265-4e83cec30e2d?dpr=2&fit=crop&fm=jpg&h=825&ixlib=rb-0.3.5&q=50&w=1450)",
        "url(https://images.unsplash.com/photo-1496692052106-d37cb66ab80c?dpr=2&fit=crop&fm=jpg&h=825&ixlib=rb-0.3.5&q=50&w=1450)",
        "url(https://images.unsplash.com/photo-1445888761652-fc13cbb0d819?dpr=2&fit=crop&fm=jpg&h=825&ixlib=rb-0.3.5&q=50&w=1450)",
        "url(https://images.unsplash.com/photo-1516251193007-45ef944ab0c6?dpr=2&fit=crop&fm=jpg&h=825&ixlib=rb-0.3.5&q=50&w=1450)",
        "url(https://images.unsplash.com/photo-1444228250525-3d441b642d12?dpr=2&fit=crop&fm=jpg&h=825&ixlib=rb-0.3.5&q=50&w=1450)",
        "url(https://images.unsplash.com/photo-1495726754707-8b1873e5b02e?dpr=2&fit=crop&fm=jpg&h=825&ixlib=rb-0.3.5&q=50&w=1450)",
        "url(https://images.unsplash.com/photo-1509395595438-0a9e68bffa4a?dpr=2&fit=crop&fm=jpg&h=825&ixlib=rb-0.3.5&q=50&w=1450)"
      ]
    
    if(counter === imgs.length) counter = 0;
    $("body").css("background-image", imgs[counter]);

    counter++;
}
  
  setInterval(changeBG, 2000);


