document.addEventListener("DOMContentLoaded", () => {
    const chatWindow = document.getElementById("chat-window");
    const userInput = document.getElementById("user-input");
    const sendBtn = document.getElementById("send-btn");

    // Function to display messages in the chat window
    function addMessage(sender, text) {
        const messageElem = document.createElement("div");
        messageElem.classList.add("message", sender);
        messageElem.textContent = text;
        chatWindow.appendChild(messageElem);
        chatWindow.scrollTop = chatWindow.scrollHeight;
    }

    // Send user input to LLM backend and display response
    async function sendMessage() {
        const userMessage = userInput.value.trim();
        if (!userMessage) return;

        addMessage("user", userMessage);
        userInput.value = "";

        try {
            const response = await fetch("YOUR_LLM_BACKEND_API_URL", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: userMessage })
            });

            if (response.ok) {
                const data = await response.json();
                addMessage("bot", data.response);
            } else {
                addMessage("bot", "Error: Could not get a response from the server.");
            }
        } catch (error) {
            addMessage("bot", "Error: Unable to connect to the server.");
        }
    }

    // Event listener for send button
    sendBtn.addEventListener("click", sendMessage);

    // Enter key triggers send
    userInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") sendMessage();
    });
});
