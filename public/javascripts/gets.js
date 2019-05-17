function getCategories(site){
    var URL = "${createLink(controller: 'Client', action: 'showCat', params: ['site': ""])}"+site
    $.ajax({
        url: URL,
        success: function(resp){
            // var cat_head = document.getElementById("category_head");
            console.log(site);
            // cat_head.innerText = resp.name;
            var subcats_element = document.getElementById("subcategories");
            while(subcats_element.firstChild){
                subcats_element.removeChild(subcats_element.firstChild);
            }
            var col_div = document.createElement("div");
            col_div.setAttribute("class", "col-md-2");
            resp.forEach(function(category){
                var button_element = document.createElement("button");
                button_element.innerText = category.name;
                button_element.style = "display: block; width:100%; font-size: 10px";
                console.log(category.id);
                var function_call = "getSubCategories(this, '"+category.id+ "')";
                button_element.setAttribute("onclick", function_call);
                col_div.appendChild(button_element)
            })
            subcats_element.appendChild(col_div)
        }
    })
};
function getSubCategories(element, category_id){

    var URL = "${createLink(controller: 'Client', action: 'showSub', params: ['category_id': ""])}"+category_id;
    $.ajax({
        url: URL,
        success: function(resp){
            if (resp.children_categories.length > 0){
                var current_section = element.parentElement;
                var subcats_element = document.getElementById("subcategories");
                while(subcats_element.lastChild !== current_section){
                    subcats_element.removeChild(subcats_element.lastChild);
                }
                var col_div = document.createElement("div");
                col_div.setAttribute("class", "col-md-2");
                resp.children_categories.forEach(function(category){
                    var button_element = document.createElement("button");
                    button_element.innerText = category.name;
                    button_element.style = "display: block; width:100%; font-size: 10px";
                    console.log(category.id);
                    var function_call = "getSubCategories(this, '"+category.id+ "')";
                    button_element.setAttribute("onclick", function_call);
                    col_div.appendChild(button_element)
                })
                subcats_element.appendChild(col_div)

            }
            else{
                alert("ID Categoria: "+resp.id)

            }
        }
    })

};