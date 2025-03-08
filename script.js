document.addEventListener("DOMContentLoaded", () => {
    const chatWindow = document.getElementById("chat-window");
    const chatInput = document.getElementById("chat-input");
    const sendButton = document.getElementById("send-button");

    // Load messages from local storage
    loadMessages();

    sendButton.addEventListener("click", sendMessage);
    chatInput.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            sendMessage();
        }
    });

    function sendMessage() {
        const message = chatInput.value.trim();
        if (message === "") return;

        addMessageToChat(message);
        saveMessage(message);

        chatInput.value = "";
    }

    function addMessageToChat(message) {
        const messageElement = document.createElement("div");
        messageElement.classList.add("message");

        const messageText = document.createElement("span");
        messageText.textContent = message;

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", () => {
            chatWindow.removeChild(messageElement);
            deleteMessage(message);
        });

        messageElement.appendChild(messageText);
        messageElement.appendChild(deleteButton);
        chatWindow.appendChild(messageElement);

        chatWindow.scrollTop = chatWindow.scrollHeight;
    }

    function saveMessage(message) {
        let messages = JSON.parse(localStorage.getItem("messages")) || [];
        messages.push(message);
        localStorage.setItem("messages", JSON.stringify(messages));
    }

    function loadMessages() {
        let messages = JSON.parse(localStorage.getItem("messages")) || [];
        messages.forEach((message) => {
            addMessageToChat(message);
        });
    }

    function deleteMessage(message) {
        let messages = JSON.parse(localStorage.getItem("messages")) || [];
        messages = messages.filter((msg) => msg !== message);
        localStorage.setItem("messages", JSON.stringify(messages));
    }
});
