function montrer (id) {
    toutcacher();
    let element = document.getElementById(id);
    element.removeAttribute("hidden");
}

function tableau(id) {
    toutcacher();
    cacher(id);
    let element = document.getElementById(id+'_form');
    element.removeAttribute("hidden");
    let table = document.getElementById(id+'_table'); 
    table.removeAttribute("hidden");
}

function insert(id) {
    toutcacher();
    cacher(id);
    let element = document.getElementById(id+'_form');
    element.removeAttribute("hidden");
    let table = document.getElementById(id+'_ajout'); 
    table.removeAttribute("hidden");
}

function update(id,identifiant) {
    toutcacher();
    cacher(id);
    let element = document.getElementById(id+'_form');
    element.removeAttribute("hidden");
    let table = document.getElementById(id+'_modification'); 
    table.removeAttribute("hidden");
    manova(identifiant,id+"_modification");
}

function cacher(id) {
    let form = document.getElementById(id+'_ajout');
    let insert = document.getElementById(id+'_modification');
    form.setAttribute("hidden", true);
    insert.setAttribute("hidden", true);
}

function toutcacher() {
    let mother = document.getElementById('formulaire');
    let children = mother.children;
    for (let i = 0; i < children.length; i++) {
        children[i].setAttribute("hidden", true);
    }

}