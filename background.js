// Listen for messages from the popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.type === 'startProctoring') {
      // TODO: Start proctoring
    } else if (request.type === 'stopProctoring') {
      // TODO: Stop proctoring
    }
  });
  