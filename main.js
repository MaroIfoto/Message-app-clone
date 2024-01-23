const johnSelectorBtn = document.querySelector('#john-selector')
const janeSelectorBtn = document.querySelector('#jane-selector')
const chatHeader = document.querySelector('.chat-header')
const chatMessages = document.querySelector('.chat-messages')
const chatInputForm = document.querySelector('.chat-input-form')
const chatInput = document.querySelector('.chat-input')
const clearChatBtn = document.querySelector('.clear-chat-button')

// Set id and name attributes for the chatInput element
chatInput.id = 'chatInput';
chatInput.name = 'messageText';  // (to sort out the error):A form field element has neither an id nor a name attribute. This might prevent the browser from correctly autofilling the form. 

// retrieving Stored Messages:
const messages = JSON.parse(localStorage.getItem('messages')) || [] // rendering messages from local storage to the DOM Here, you are retrieving the 'messages' array from local storage. If it exists, it is parsed from a JSON string to a JavaScript array. If it doesn't exist or if there is an issue parsing it, an empty array [] is assigned to messages.


 // message here is an object
const createChatMessageElement = (message) => `  
            <div class="message ${message.sender === 'John' ? 'blue-bg' : 'grey-bg'}">
                <div class="message-sender">${message.sender}</div>
                <div class="message-text">${message.text}</div>
                <div class="message-timestamp">${message.timestamp}</div>
            </div>
            `


// Displaying Existing Messages on Page Load:
window.onload = () =>{
    messages.forEach((message) => {
        chatMessages.innerHTML += createChatMessageElement(message)
    });
}     // This code runs when the window has fully loaded. It retrieves the stored messages from local storage and iterates over each message, appending its HTML representation to the chatMessages container. This ensures that existing messages are displayed 

let messageSender = 'John'

const updateMessageSender = (name) => {
    messageSender = name
    chatHeader.innerText = `${messageSender} chatting...`
    chatInput.placeholder = `Message, ${messageSender}`

    if(name === 'John') {
        johnSelectorBtn.classList.add('active-person')
        janeSelectorBtn.classList.remove('active-person')
    } // this makes the color and shadow effect work on whcihever button you click
    if(name === 'Jane') {
        janeSelectorBtn.classList.add('active-person')
        johnSelectorBtn.classList.remove('active-person')
    }

    chatInput.focus();      // this allows you to start typing immediately you select 
}

johnSelectorBtn.onclick = () => updateMessageSender('John')
janeSelectorBtn.onclick = () => updateMessageSender('Jane')

const sendMessage = (e) => {
     e.preventDefault()    // prevents default reload when you press the send button so browser does not automatically reload

     const timestamp = new Date().toLocaleString('en-US', {hour: 'numeric', minute: 'numeric', hour12: true})
     const message = {
        sender: messageSender,
        text: chatInput.value,
        timestamp,
     }

     //adding a New Message:
    messages.push(message)  // After sending a new message, it's added to the messages array.

    // Updating Local Storage with New Message:
    localStorage.setItem('messages', JSON.stringify(messages))  // The messages array (now including the new message) is stringified and stored back in local storage under the 'messages' key. This ensures that the new message is added to the stored messages
   
   // displaying New Message on the Page:
    chatMessages.innerHTML += createChatMessageElement(message)  //this will take the sender,text, and timestamp and add it to the DOM, 
    
    chatInputForm.reset() 
    chatMessages.scrollTop = chatMessages.scrollHeight
    }

chatInputForm.addEventListener('submit', sendMessage)

clearChatBtn.addEventListener('click', () => {
    localStorage.clear()
    chatMessages.innerHTML = ''
})