// Listen for the iframe to fully load
document.getElementById('chatling-chat-iframe').onload = function() {
    // Send a message to the iframe
    const iframe = document.getElementById('chatling-chat-iframe');
    const message = {
      type: 'changeStyle',
      css: 'body { background-color: lightblue; }' // Example of CSS to change
    };
  
    // Use postMessage to send the message to the iframe
    iframe.contentWindow.postMessage(message, '*');
  };
  
  // Optionally listen for responses (if supported)
  window.addEventListener('message', (event) => {
    if (event.origin !== 'https://embed.chatling.ai') {
      return; // Ignore messages from unknown sources
    }
    console.log('Received message from iframe:', event.data);
  });
  