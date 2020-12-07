let socket = io.connect('http://localhost:8080',{ 'forceNew': true});

socket.on('messages', function(data){
    console.log(data);
    render(data);
});

function render(data){
    let html = data.map(function(elem, index){
        return(`
        <div>
            <strong>${elem.autor}</strong>:
            <em>${elem.text}</em>
        </div>`);
    }).join(" "); 

document.getElementById('messages').innerHTML = html;
}

function addMessage(event){
    let payload ={
        autor: document.getElementById('username').value,
        text: document.getElementById('texto').value
    };

    socket.emit('new-message', payload);
    return false;

}