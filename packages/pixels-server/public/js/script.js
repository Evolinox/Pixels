const code = window.location.pathname.split('/').pop();

if (code) {
    console.log("Der Code aus der URL ist:", code);
}