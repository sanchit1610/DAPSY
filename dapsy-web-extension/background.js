
// BERT Working v1
// function fetchDjangoData(url, sendResponse) {
//   // Fetch data from the given URL
//   fetch(url)
//     .then(response => response.json())
//     .then(data => {
//       sendResponse({ result: data }); // Send the response back to the sender (content or popup script)
//     })
//     .catch(error => {
//       console.error('Error fetching data:', error);
//       sendResponse({ result: 'Error fetching data' });
//     });
//   return true; // Ensure sendResponse is called asynchronously
// }

// chrome.runtime.onMessage.addListener(
//   function (request, sender, sendResponse) {
//     if (request.message === "open_popup") {
//       chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
//         chrome.tabs.sendMessage(tabs[0].id, { "message": "open_popup" });
//       });
//     } else if (request.url) {
//       // Perform the GET request to the Django server
//       fetchDjangoData(request.url, sendResponse);
//     }

//     // Ensure sendResponse is called asynchronously
//     return true;
//   }
// );


// Implementing the popup detect 

// chrome.runtime.onMessage.addListener(
//   function (request, sender, sendResponse) {
//     if (request.message === "open_popup") {
//       chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
//         chrome.tabs.sendMessage(tabs[0].id, { "message": "open_popup" });
//       });
//     } else if (request.url) {
//       // Perform the GET request to the Django server
//       fetchDjangoData(request.url, sendResponse);
//     }

//     // Ensure sendResponse is called asynchronously
//     return true;
//   }
// );

// const API_BASE_URL = 'http://127.0.0.1:8000/api/';

// // Function to fetch data from Django server
// async function fetchDjangoData(url, token) {
//     try {
//         const response = await fetch(`http://127.0.0.1:8000/api/analyze-url/`, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': `Bearer ${token}`
//             },
//             body: JSON.stringify({ url: url })
//         });

//         if (!response.ok) {
//             throw new Error('Server response was not ok');
//         }

//         const data = await response.json();
        
//         if (data.status === 'processing') {
//             return await pollForResults(data.task_id, token);
//         }
        
//         return data.data;
//     } catch (error) {
//         console.error('Error:', error);
//         throw error;
//     }
// }

// // Function to poll for results
// async function pollForResults(taskId, token) {
//     let attempts = 0;
//     const maxAttempts = 10;
    
//     while (attempts < maxAttempts) {
//         try {
//             const response = await fetch(`https://127.0.0.1:8000/api/task-status/${taskId}/`, {
//                 headers: {
//                     'Authorization': `Bearer ${token}`
//                 }
//             });
            
//             const data = await response.json();
            
//             if (data.status === 'completed') {
//                 return data.data;
//             } else if (data.status === 'failed') {
//                 throw new Error('Analysis failed');
//             }
            
//             // Wait for 5 seconds before next attempt
//             await new Promise(resolve => setTimeout(resolve, 5000));
//             attempts++;
//         } catch (error) {
//             throw error;
//         }
//     }
    
//     throw new Error('Analysis timeout');
// }

// // Listen for messages
// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//     console.log("Message received:", request);

//     if (request.message === "analyze_url") {
//         fetchDjangoData(request.url, request.token)
//             .then(data => {
//                 sendResponse({ success: true, data: data });
//             })
//             .catch(error => {
//                 sendResponse({ success: false, error: error.message });
//             });
//         return true; // Will respond asynchronously
//     }

//     if (request.message === "get_tab_url") {
//         chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
//             if (tabs[0]) {
//                 sendResponse({ url: tabs[0].url });
//             } else {
//                 sendResponse({ url: null });
//             }
//         });
//         return true; // Will respond asynchronously
//     }
// });

// // Handle installation
// chrome.runtime.onInstalled.addListener(() => {
//     console.log('Extension installed');
// });

// Define fetchDjangoData function to perform GET request to the Django server
function fetchDjangoData(url, sendResponse) {
  // Perform the fetch request to the Django server
  fetch(url)
    .then(response => response.json())
    .then(data => {
      sendResponse({ result: data }); // Send the data back to the sender
    })
    .catch(error => {
      console.error('Error fetching data:', error);
      sendResponse({ result: 'Error fetching data' });
    });
  return true; // Ensure sendResponse is called asynchronously
}

// Listen for messages from content script or popup
chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
    if (request.message === "open_popup") {
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { "message": "open_popup" });
      });
    } else if (request.url) {
      // Perform the GET request to the Django server with the URL from the message
      console.log("Fetching data from URL:", request.url);
      fetchDjangoData(request.url, sendResponse); // Call the function with the URL from the request
    }

    // Ensure sendResponse is called asynchronously
    return true;
  }
);
