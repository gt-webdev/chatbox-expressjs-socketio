function appendMessage(message) {
    // query the message-box from the DOM
    var message_box = document.querySelector('.message-box');

    //create a div to hold the message we're adding
    var new_message = document.createElement('div');
    new_message.classList.add('message-entry');

    //create a new <p> tag to held the text
    var new_paragraph = document.createElement('p');

    //EXTRA: clean-up the message against XSS

    //add the text to the paragraph
    new_paragraph.innerText = message;

    //add the paragraph to the message-entry
    new_message.appendChild(new_paragraph);

    //add the message-entry to the message-box
    if (message_box.children.length === 0) {
        //if there are no children, appendChild
        message_box.appendChild(new_message);
    } else {
        //otherwise, insert this before the first child
        message_box.insertBefore(new_message, message_box.children[0]);
    }
}

// gets a socekt object to work with
var socket = io.connect('http://localhost');
// when the client connects to the server:
socket.on('connect', function() {
    // Registers a callback for chat event
    socket.on('chat', function(data) {

        var message_box = document.querySelector('.message-box');
        message_box.innerHTML = "";
        //append all the messages to the message-box
        for (var i = 0; i < data.length; i++) {
            appendMessage(data[i].data);
        }

        //focus back on the input-box after retrieving messages
        document.querySelector('.input-field >  input[type="text"]').focus();
    });
});

// If the client gets an update event
// it adds the message it gets to the web page.
socket.on('update', function(data) {
    appendMessage(data.data);
})

// if the user selects the send button, an addMessage event is sent to the
// server with the message in a json object
document.querySelector('.input-field >  input[type="button"]').onclick = function(){
    var message = document.querySelector('.input-field >  input[type="text"]').value;
    socket.emit('addMessage', {data: message});
    document.querySelector('.input-field >  input[type="text"]').value = "";
}