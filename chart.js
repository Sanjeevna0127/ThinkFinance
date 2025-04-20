// Financial Coach Chat Functionality
document.addEventListener('DOMContentLoaded'), function() {
    const chatMessages = document.getElementById('chat-messages');
    const userInput = document.getElementById('user-input');
    const sendButton = document.getElementById('send-button');
    const quickQuestions = document.querySelectorAll('.quick-question');
    
    // Send message when button is clicked
    sendButton.addEventListener('click', sendMessage);
    
    // Send message when Enter is pressed
    userInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
    
    // Quick question buttons
    quickQuestions.forEach(button => {
        button.addEventListener('click', function() {
            userInput.value = this.textContent;
            sendMessage();
        });
    });
    
    function sendMessage() {
        const message = userInput.value.trim();
        if (message) {
            // Add user message to chat
            addMessage('user', message);
            userInput.value = '';
            
            // Simulate coach response after a delay
            setTimeout(() => {
                const response = generateCoachResponse(message);
                addMessage('coach', response);
                
                // Scroll to bottom of chat
                chatMessages.scrollTop = chatMessages.scrollHeight;
            }, 1000);
        }
    }
    
    function addMessage(sender, text) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}`;
        
        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';
        contentDiv.innerHTML = `<p>${text}</p>`;
        
        messageDiv.appendChild(contentDiv);
        chatMessages.appendChild(messageDiv);
        
        // Scroll to bottom of chat
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    function generateCoachResponse(userMessage) {
        const responses = {
            'Show me spending anomalies': 'I\'ve detected 3 significant spending anomalies in your data. The most notable is a 78% increase in marketing expenses last month compared to the 6-month average. Would you like me to provide detailed analysis?',
            'Suggest cost-saving ideas': 'Based on your spending patterns, I recommend: 1) Renegotiating vendor contracts (potential 15% savings), 2) Consolidating software subscriptions (could save $2,400/year), 3) Implementing energy-saving measures in office spaces.',
            'Analyze investment returns': 'Your portfolio has returned 8.2% annually over the past 3 years. The tech sector has outperformed (14.5% return), while energy investments have underperformed (3.1% return). Would you like a detailed breakdown?'
        };
        
        // Check if the message matches a quick question
        for (const [question, response] of Object.entries(responses)) {
            if (userMessage.includes(question) || question.includes(userMessage)) {
                return response;
            }
        }
        
        // Default responses for other messages
        const defaultResponses = 
            ("Interesting point. Let me analyze your financial data") }}