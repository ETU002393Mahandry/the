function verifierUser () {
    if (localStorage.getItem('iduser') === null || localStorage.getItem('iduser') === '') {
        window.location.href = 'login.html';
    }
}

function verifierAdmin () {
    if (localStorage.getItem('iduser') != 1) {
        window.location.href = 'login.html';
    }
}