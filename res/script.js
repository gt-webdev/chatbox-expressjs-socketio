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
