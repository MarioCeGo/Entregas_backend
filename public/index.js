const socket = io();

const formProducts = document.getElementById("form-product");
const formChat = document.getElementById("form-chat");
const containerProducts = document.getElementById("table-products");
const containerChat = document.getElementById("chat");

const sendProduct = (prod) => {
    socket.emit("new product", prod);
}
const sendMessage = (msg) => {
    socket.emit("new message", msg);
}

const renderProducts = async (data) => {
    const templateProducts = await fetch('/views/productos_tabla.handlebars');
    const template = await templateProducts.text();
    const templateCompiled = Handlebars.compile(template);
    const html = templateCompiled({ data });
    containerProducts.innerHTML = html;
}
const renderMessages = async (data) => {
    const templateChat = await fetch('/views/chat.handlebars');
    const template = await templateChat.text();
    const templateCompiled = Handlebars.compile(template);
    const html = templateCompiled({ data });
    containerChat.innerHTML = html;
}

formProducts.onsubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(formProducts);
    const formValue = Object.fromEntries(formData);
    sendProduct(formValue);
    formProducts.reset();
}
formChat.onsubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(formChat);
    const formValue = Object.fromEntries(formData);
    const date = new Date();
    formValue.date = date.toLocaleString();
    // console.log(formValue)
    sendMessage(formValue);
    formChat.reset();
}

socket.on("products", data => {
    renderProducts(data);
})
socket.on("messages", data => {
    renderMessages(data);
})
