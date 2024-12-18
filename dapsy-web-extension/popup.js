// // // Description: This file contains the JavaScript code for the popup window of the Chrome extension. 

// console.log("CogniGuard Popup working!");

// // api endpoint
// // const apiUrl = "https://cogniguard.onionreads.com/api/";
// const apiUrl = "http://127.0.0.1:8000/api/";


// // Function to fetch transparency score
// const fetchTransparencyScore = () => {
//   // Fetching transparency score from api
//   fetch(apiUrl + "tp-score/")
//     .then(response => {
//       if (!response.ok) {
//         throw new Error("Response was not ok!");
//       }
//       return response.json();
//     })
//     .then(userData => {
//       // Process the retrieved data
//       const transparencyScore = userData.transparency_score;
//       const transparencyScoreElement = document.getElementById("transparencyScore");
//       transparencyScoreElement.textContent = `${transparencyScore}`;
//       updateTransparencyMeter(transparencyScore);
//     })
//     .catch(error => {
//       console.log("Error", error);
//     });
// };

// // // Sending the url to the api
// let progressArea = document.getElementById("progress-area");
// let statusMessage = document.getElementById("status-message");
// let progressBar = document.getElementById("progress-bar");



// document.addEventListener('DOMContentLoaded', function() {
//   const tokenInput = document.getElementById('token-input');
//   const analyzeBtn = document.getElementById('analyze-btn');
//   const resultDiv = document.getElementById('result');

//   analyzeBtn.addEventListener('click', function() {
//       chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
//           const url = tabs[0].url;
//           const token = tokenInput.value;

//           if (!token) {
//               resultDiv.innerHTML = `<p>Please enter your API token.<p> <br> <a href="https://cogniguard.onionreads.com/" target="_blank"><strong>Get your API token </strong></a>`;
//               return;
//           }

//             // Show progress area and reset progress
//           progressArea.style.display = 'block';
//           updateProgress("Sending URL for analysis...", 10);

//           fetch('http://127.0.0.1:8000/api/analyze-url/', {
//               method: 'POST',
//               headers: {
//                   'Content-Type': 'application/json',
//                   'Authorization': `Bearer ${token}`
//               },
//               body: JSON.stringify({ url: url })
//           })
//           .then(response => {
//               if (!response.ok) {
//                   throw new Error('Network response was not ok');
//               }
//               return response.json();
//           })
//           .then(data => {
//               if (data.status === 'processing') {
//                 updateProgress("Analysis started. Waiting for results...", 20);
//                 pollForResults(data.task_id, token);
//               } else {
//                   displayResults(data.data);
//               }
//           })
//           .catch(error => {
//               console.error('Error:', error);
//               resultDiv.textContent = 'Error analyzing URL. Please try again.';
//           });
          
// //     
//       });
//   });

//   function pollForResults(taskId, token) {
//       resultDiv.textContent = 'Processing...';
//       const pollInterval = setInterval(() => {
//           fetch(`https://127.0.0.1:8000/api/task-status/${taskId}/`, {
//               method: 'GET',
//               headers: {
//                   'Authorization': `Bearer ${token}`
//               }
//           })
//           .then(response => response.json())
//           .then(data => {
//               if (data.status === 'completed') {
//                   clearInterval(pollInterval);
//                   displayResults(data.data);
//               } else if (data.status === 'failed') {
//                   clearInterval(pollInterval);
//                   resultDiv.textContent = 'Analysis failed. Please try again.';
//               }
//           })
//           .catch(error => {
//               clearInterval(pollInterval);
//               console.error('Error polling for results:', error);
//               resultDiv.textContent = 'Error checking results. Please try again.';
//           });
//       }, 5000);
//   }

//   function updateProgress(message, percentage) {
//           statusMessage.textContent = message;
//           progressBar.value = percentage;
//         }


//   function displayResults(results) { 
//         const scanResultBox = resultDiv;
//           if (!scanResultBox) {
//               console.error('scanResultBox not found');
//               return;
//           }
        
//           // Clear previous results
//           scanResultBox.innerHTML = '';
        
//           let head = document.createElement('h2');
//           head.innerText = "Analysis Results:";
//           scanResultBox.appendChild(head);
        
//           let scanList = document.createElement("ul");
//           scanList.classList.add("scan-list");
//           scanResultBox.appendChild(scanList);
          
//           const response = results;
//           if (response && response.length > 0) {
//               response.forEach(item => {
//                   let scanItem = document.createElement("li");
//                   scanItem.classList.add("scan-item");
//                   scanItem.innerHTML = `
//                       <strong>${item.dark_pattern_label}</strong>
//                       <p>${item.dark_text}</p>
//                       <small>URL: ${item.website_url}</small>
//                   `;
//                   scanList.appendChild(scanItem);
//               });
//           } else {
//               let noResultItem = document.createElement("li");
//               noResultItem.classList.add("scan-item");
//               noResultItem.innerText = "No dark patterns found.";
//               scanList.appendChild(noResultItem);
//           }
        
//           // Hide progress area after displaying results
//           if (progressArea) {
//               progressArea.style.display = 'none';
//           }
//   }
// });

// // function sendUrlToAPI(url) {
// //   fetch('http://127.0.0.1:8000/api/analyze-url', {
// //     method: 'POST', // Assuming you're sending a POST request
// //     headers: {
// //       'Content-Type': 'application/json'
// //     },
// //     body: JSON.stringify({ url: url })
// //   })
// //   .then(response => response.json())
// //   .then(data => {
// //     console.log('Success:', data);
// //     // Handle the data returned by the API
// //   })
// //   .catch(error => {
// //     console.error('Error:', error);
// //   });
// // }


// document.addEventListener('DOMContentLoaded', function () {
//   // Add event listener to the "Analyze" button

//   document.getElementById('analyze-btn').addEventListener('click', function () {
//     // Get the current tab's URL using the Chrome Extension API
//     chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
//       let currentUrl = tabs[0].url;
//       // Send the URL to the API
//       sendUrlToAPI(currentUrl);
//     });
//   });

//   // opening new tabs on clicking the buttons on the web extension


//   // Base url
//   let baseUrl = "https://cogniguard.onionreads.com/";
//   let reportBtn = document.getElementById("report-btn");

//   reportBtn.addEventListener("click", function () {
//     let newTabUrl = baseUrl + "report-dp/";
//     // Use chrome.tabs.create to open a new tab
//     console.log("i am opening report page");
//     chrome.tabs.create({ url: newTabUrl });


//   })

//   let helpBtn = document.getElementById("help-btn");
//   helpBtn.addEventListener("click", function () {
//     let newTabUrl = baseUrl + "faqs/";

//     chrome.tabs.create({ url: newTabUrl });

//   })

//   let tandcBtn = document.getElementById("tandc-btn");
//   tandcBtn.addEventListener("click", function () {
//     let newTabUrl = baseUrl + "terms-of-use/";

//     chrome.tabs.create({ url: newTabUrl });

//   })

//   let knowDp = document.getElementById("know-dp");
//   knowDp.addEventListener("click", () => {
//     let newTabUrl = baseUrl + "know-about-dp/";

//     chrome.tabs.create({ url: newTabUrl });
//   })

// });

// function updatePopupContent(dpData) {
//   // Add logic to update the popup content with the dark pattern data
//   let scanResultBox = document.querySelector('.scan-result-box');
//   scanResultBox.innerHTML = '';

//   let head = document.createElement('h2');
//   head.innerText = "What we have found so far:";
//   scanResultBox.appendChild(head);

//   let scanList = document.createElement("ul");
//   scanList.classList.add("scan-list");
//   scanResultBox.appendChild(scanList);

//   for (let i = 0; i < dpData.length; i++) {
//     let scanItems = document.createElement("li");
//     scanItems.classList.add("scan-items");
//     scanItems.innerText = dpData[i];
//     scanList.appendChild(scanItems);
//   }
// }

// opening new tabs on clicking the buttons on the web extension


// claude one
// Description: JavaScript for CogniGuard Chrome Extension Popup (Local Environment)

const apiBaseUrl = "http://127.0.0.1:8000/api/";

document.addEventListener('DOMContentLoaded', function() {
    const tokenInput = document.getElementById('token-input');
    const analyzeBtn = document.getElementById('analyze-btn');
    const resultDiv = document.getElementById('result');
    const progressArea = document.getElementById("progress-area");
    const statusMessage = document.getElementById("status-message");
    const progressBar = document.getElementById("progress-bar");

    // Validate token
    function isValidToken(token) {
        return token && token.trim().length > 10; 
    }

    // Update progress
    function updateProgress(message, percentage) {
        statusMessage.textContent = message;
        progressBar.value = percentage;
    }

    // Poll for task results
    function pollForResults(taskId, token) {
        return new Promise((resolve, reject) => {
            const pollInterval = setInterval(() => {
                fetch(`https://127.0.0.1:8000/api/task-status/${taskId}/`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                .then(response => response.json())
                .then(data => {
                    if (data.status === 'completed') {
                        clearInterval(pollInterval);
                        resolve(data.data);
                    } else if (data.status === 'failed') {
                        clearInterval(pollInterval);
                        reject(new Error('Analysis failed'));
                    }
                })
                .catch(error => {
                    clearInterval(pollInterval);
                    reject(error);
                });
            }, 5000);
        });
    }

    // Display analysis results
    function displayResults(results) {
        resultDiv.innerHTML = '';
        
        let head = document.createElement('h2');
        head.innerText = "Analysis Results:";
        resultDiv.appendChild(head);
        
        let scanList = document.createElement("ul");
        scanList.classList.add("scan-list");
        resultDiv.appendChild(scanList);
        
        if (results && results.length > 0) {
            results.forEach(item => {
                let scanItem = document.createElement("li");
                scanItem.classList.add("scan-item");
                scanItem.innerHTML = `
                    <strong>${item.dark_pattern_label}</strong>
                    <p>${item.dark_text}</p>
                    <small>URL: ${item.website_url}</small>
                `;
                scanList.appendChild(scanItem);
            });
        } else {
            let noResultItem = document.createElement("li");
            noResultItem.classList.add("scan-item");
            noResultItem.innerText = "No dark patterns found.";
            scanList.appendChild(noResultItem);
        }
        
        progressArea.style.display = 'none';
    }

    // Analyze URL
    analyzeBtn.addEventListener('click', function() {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            const url = tabs[0].url;
            const token = tokenInput.value;

            if (!isValidToken(token)) {
                resultDiv.innerHTML = `
                    <p>Please enter a valid API token.</p> 
                    <br> 
                    <a href="http://127.0.0.1:8000" target="_blank">
                        <strong>Get your API token</strong>
                    </a>
                `;
                return;
            }

            progressArea.style.display = 'block';
            updateProgress("Sending URL for analysis...", 10);

            fetch(`${apiBaseUrl}analyze-url/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ url: url })
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                if (data.status === 'processing') {
                    updateProgress("Analysis started. Waiting for results...", 20);
                    return pollForResults(data.task_id, token);
                }
                return data.data;
            })
            .then(displayResults)
            .catch(error => {
                console.error('Error:', error);
                resultDiv.textContent = 'Error analyzing URL. Please try again.';
                progressArea.style.display = 'none';
            });
        });
    });

    // Button event listeners for opening new tabs
    const baseUrl = "http://127.0.0.1:8000/";
    const buttons = [
        { id: "report-btn", path: "report-dp/" },
        { id: "help-btn", path: "faqs/" },
        { id: "tandc-btn", path: "terms-of-use/" },
        { id: "know-dp", path: "know-about-dp/" }
    ];

    buttons.forEach(button => {
        document.getElementById(button.id).addEventListener("click", () => {
            chrome.tabs.create({ url: baseUrl + button.path });
        });
    });
});



//re again
// console.log("CogniGuard Popup working!");

// // api endpoint
// const apiUrl = "http://127.0.0.1:8000/api/";

// // Function to fetch transparency score
// const fetchTransparencyScore = () => {
//   // Fetching transparency score from api
//   fetch(apiUrl + "tp-score/")
//     .then(response => {
//       if (!response.ok) {
//         throw new Error("Response was not ok!");
//       }
//       return response.json();
//     })
//     .then(userData => {
//       // Process the retrieved data
//       const transparencyScore = userData.transparency_score;
//       const transparencyScoreElement = document.getElementById("transparencyScore");
//       transparencyScoreElement.textContent = `${transparencyScore}`;
//       updateTransparencyMeter(transparencyScore);
//     })
//     .catch(error => {
//       console.log("Error", error);
//     });
// };

// // // Sending the url to the api
// let progressArea = document.getElementById("progress-area");
// let statusMessage = document.getElementById("status-message");
// let progressBar = document.getElementById("progress-bar");



// document.addEventListener('DOMContentLoaded', function() {
//   const tokenInput = document.getElementById('token-input');
//   const analyzeBtn = document.getElementById('analyze-btn');
//   const resultDiv = document.getElementById('result');

//   analyzeBtn.addEventListener('click', function() {
//       chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
//           const url = tabs[0].url;
//           const token = tokenInput.value;

//           if (!token) {
//               resultDiv.innerHTML = `<p>Please enter your API token.<p> <br> <a href="https://cogniguard.onionreads.com/" target="_blank"><strong>Get your API token </strong></a>`;
//               return;
//           }

//             // Show progress area and reset progress
//           progressArea.style.display = 'block';
//           updateProgress("Sending URL for analysis...", 10);

//           fetch('http://127.0.0.1:8000/api/analyze-url/', {
//               method: 'POST',
//               headers: {
//                   'Content-Type': 'application/json',
//                   'Authorization': `Bearer ${token}`
//               },
//               body: JSON.stringify({ url: url })
//           })
//           .then(response => {
//               if (!response.ok) {
//                   throw new Error('Network response was not ok');
//               }
//               return response.json();
//           })
//           .then(data => {
//               if (data.status === 'processing') {
//                 updateProgress("Analysis started. Waiting for results...", 20);
//                 pollForResults(data.task_id, token);
//               } else {
//                   displayResults(data.data);
//               }
//           })
//           .catch(error => {
//               console.error('Error:', error);
//               resultDiv.textContent = 'Error analyzing URL. Please try again.';
//           });
          
// //     
//       });
//   });

//   function pollForResults(taskId, token) {
//       resultDiv.textContent = 'Processing...';
//       const pollInterval = setInterval(() => {
//           fetch(`https://cogniguard.onionreads.com/api/task-status/${taskId}/`, {
//               method: 'GET',
//               headers: {
//                   'Authorization': `Bearer ${token}`
//               }
//           })
//           .then(response => response.json())
//           .then(data => {
//               if (data.status === 'completed') {
//                   clearInterval(pollInterval);
//                   displayResults(data.data);
//               } else if (data.status === 'failed') {
//                   clearInterval(pollInterval);
//                   resultDiv.textContent = 'Analysis failed. Please try again.';
//               }
//           })
//           .catch(error => {
//               clearInterval(pollInterval);
//               console.error('Error polling for results:', error);
//               resultDiv.textContent = 'Error checking results. Please try again.';
//           });
//       }, 5000);
//   }

//   function updateProgress(message, percentage) {
//           statusMessage.textContent = message;
//           progressBar.value = percentage;
//         }


//   function displayResults(results) {
      
        
//         const scanResultBox = resultDiv;
//           if (!scanResultBox) {
//               console.error('scanResultBox not found');
//               return;
//           }
        
//           // Clear previous results
//           scanResultBox.innerHTML = '';
        
//           let head = document.createElement('h2');
//           head.innerText = "Analysis Results:";
//           scanResultBox.appendChild(head);
        
//           let scanList = document.createElement("ul");
//           scanList.classList.add("scan-list");
//           scanResultBox.appendChild(scanList);
          
//           const response = results;
//           if (response && response.length > 0) {
//               response.forEach(item => {
//                   let scanItem = document.createElement("li");
//                   scanItem.classList.add("scan-item");
//                   scanItem.innerHTML = `
//                       <strong>${item.dark_pattern_label}</strong>
//                       <p>${item.dark_text}</p>
//                       <small>URL: ${item.website_url}</small>
//                   `;
//                   scanList.appendChild(scanItem);
//               });
//           } else {
//               let noResultItem = document.createElement("li");
//               noResultItem.classList.add("scan-item");
//               noResultItem.innerText = "No dark patterns found.";
//               scanList.appendChild(noResultItem);
//           }
        
//           // Hide progress area after displaying results
//           if (progressArea) {
//               progressArea.style.display = 'none';
//           }
//   }
// });



// document.addEventListener('DOMContentLoaded', function () {
//   // Add event listener to the "Analyze" button

//   document.getElementById('analyze-btn').addEventListener('click', function () {
//     // Get the current tab's URL using the Chrome Extension API
//     chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
//       let currentUrl = tabs[0].url;
//       // Send the URL to the API
//       sendUrlToAPI(currentUrl);
//     });
//   });

//   // opening new tabs on clicking the buttons on the web extension


//   // Base url
//   let baseUrl = "https://cogniguard.onionreads.com/";
//   let reportBtn = document.getElementById("report-btn");

//   reportBtn.addEventListener("click", function () {
//     let newTabUrl = baseUrl + "report-dp/";
//     // Use chrome.tabs.create to open a new tab
//     console.log("i am opening report page");
//     chrome.tabs.create({ url: newTabUrl });


//   })

//   let helpBtn = document.getElementById("help-btn");
//   helpBtn.addEventListener("click", function () {
//     let newTabUrl = baseUrl + "faqs/";

//     chrome.tabs.create({ url: newTabUrl });

//   })

//   let tandcBtn = document.getElementById("tandc-btn");
//   tandcBtn.addEventListener("click", function () {
//     let newTabUrl = baseUrl + "terms-of-use/";

//     chrome.tabs.create({ url: newTabUrl });

//   })

//   let knowDp = document.getElementById("know-dp");
//   knowDp.addEventListener("click", () => {
//     let newTabUrl = baseUrl + "know-about-dp/";

//     chrome.tabs.create({ url: newTabUrl });
//   })

// });

// function updatePopupContent(dpData) {
//   // Add logic to update the popup content with the dark pattern data
//   let scanResultBox = document.querySelector('.scan-result-box');
//   scanResultBox.innerHTML = '';

//   let head = document.createElement('h2');
//   head.innerText = "What we have found so far:";
//   scanResultBox.appendChild(head);

//   let scanList = document.createElement("ul");
//   scanList.classList.add("scan-list");
//   scanResultBox.appendChild(scanList);

//   for (let i = 0; i < dpData.length; i++) {
//     let scanItems = document.createElement("li");
//     scanItems.classList.add("scan-items");
//     scanItems.innerText = dpData[i];
//     scanList.appendChild(scanItems);
//   }
// }

// // opening new tabs on clicking the buttons on the web extension