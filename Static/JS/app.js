function showSignupForm() {
    document.getElementById('signupForm').style.display = 'block';
    document.getElementById('signinForm').style.display = 'none';
}

function showSigninForm() {
    document.getElementById('signupForm').style.display = 'none';
    document.getElementById('signinForm').style.display = 'block';
}

function signup() {
    const userData = {
        username: document.getElementById('signupUsername').value,
        email: document.getElementById('signupEmail').value,
        password: document.getElementById('signupPassword').value
    };

    fetch('/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        if (data.status === "success") {
            showSigninForm(); // Redirect user to login form upon successful signup
        }
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

function signin() {
    const userData = {
        username: document.getElementById('signinUsername').value,
        password: document.getElementById('signinPassword').value
    };

    fetch('/signin', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        if (data.redirect) {
            // Redirect to the provided URL if login was successful and a redirect URL is present
            window.location.href = data.redirect;
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

// function uploadFile() {
//     const formData = new FormData();
//     const fileField = document.querySelector('input[type="file"]');
    
//     formData.append('file', fileField.files[0]);
    
//     fetch('/upload', {
//         method: 'POST',
//         body: formData,
//     })
//     .then(response => response.json())
//     .then(result => {
//         console.log('Success:', result);
//     })
//     .catch(error => {
//         console.error('Error:', error);
//     });
// }
function uploadFile() {
    const formData = new FormData();
    const fileField = document.querySelector('input[type="file"]');
    
    formData.append('file', fileField.files[0]);
    
    fetch('/upload', {
        method: 'POST',
        body: formData,
    })
    .then(response => response.json())
    .then(result => {
        if (result.message) {
            showToast(result.message, '#28a745'); // Green for success messages
        }
        if (result.error) {
            showToast(result.error, '#dc3545'); // Red for error messages
        }
        console.log('Success:', result);
    })
    .catch(error => {
        console.error('Error:', error);
        showToast('An error occurred during the file upload.', '#dc3545'); // Red for catch errors
    });
}
function showToast(message, backgroundColor = '#007bff') { // Default blue background
    const toastId = `toast-${Date.now()}`;
    const toastHtml = `
        <div id="${toastId}" class="toast" role="alert" aria-live="assertive" aria-atomic="true" data-delay="5000" style="min-width: 200px; background-color: ${backgroundColor};">
            <div class="toast-header" style="color: #fff; background-color: ${backgroundColor};">
                <strong class="mr-auto">Notification</strong>
                <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="toast-body" style="color: #fff;">
                ${message}
            </div>
        </div>
    `;

    const toastContainer = document.getElementById('toastContainer');
    toastContainer.insertAdjacentHTML('beforeend', toastHtml);
    const toastElement = new bootstrap.Toast(document.getElementById(toastId)); // Initialize the toast
    toastElement.show(); // Show the toast
}


function logout() {
    fetch('/logout', {
        method: 'GET',
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        // Redirect to login page
        window.location.href = '/'; // Assuming your sign-in page URL is '/'
    })
    .catch(error => {
        console.error('Logout Error:', error);
    });
}


document.addEventListener('DOMContentLoaded', function() {
    // Attach event listeners here
    document.getElementById('logoutButton').addEventListener('click', logout);
    document.getElementById('showSignupForm').addEventListener('click', showSignupForm);
    document.getElementById('showSigninForm').addEventListener('click', showSigninForm);
    fetchFiles(); // Fetch files on page load
});

function fetchFiles() {
    fetch('/list-files', {
        method: 'GET'
    })
    .then(response => response.json())
    .then(data => {
        const fileListElement = document.getElementById('fileList');
        fileListElement.innerHTML = ''; // Clear existing list
        data.files.forEach(file => {
            let fileItem = document.createElement('li');
            fileItem.className = 'list-group-item';
            fileItem.innerHTML = `
                ${file.filename} - ${file.size} bytes
                <button onclick="deleteFile(${file.id})" class="btn btn-danger btn-sm float-right">Delete</button>
                <button onclick="updateFile(${file.id})" class="btn btn-secondary btn-sm float-right mr-2">Update</button>
            `;
            fileListElement.appendChild(fileItem);
        });
    })
    .catch(error => {
        console.error('Error fetching files:', error);
    });
}

function deleteFile(fileId) {
    fetch(`/delete-file/${fileId}`, {
        method: 'POST'
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        fetchFiles(); // Refresh the file list
    })
    .catch(error => {
        console.error('Error deleting file:', error);
    });
}

function updateFile(fileId) {
    // Placeholder for update functionality
    // This might include showing a modal or input to rename the file, etc.
    console.log('Update file:', fileId);
    // After updating, fetch the files again to refresh the list
    fetchFiles();
}
function fetchFiles() {
    fetch('/files', {
        method: 'GET'
    })
    .then(response => response.json())
    .then(files => {
        const fileListElement = document.getElementById('fileList');
        fileListElement.innerHTML = ''; // Clear existing list
        files.forEach(file => {
            let fileItem = document.createElement('li');
            fileItem.className = 'list-group-item d-flex justify-content-between align-items-center';
            fileItem.innerHTML = `
                ${file.filename} 
                <span class="badge badge-primary badge-pill">${(file.filesize / 1024).toFixed(2)} KB</span>
                <button onclick="deleteFile(${file.id})" class="btn btn-danger btn-sm">Delete</button>
            `;
            fileListElement.appendChild(fileItem);
        });
    })
    .catch(error => {
        console.error('Error fetching files:', error);
    });
}

document.addEventListener('DOMContentLoaded', function() {
    fetchFiles(); // Call fetchFiles when the document is loaded
});
function deleteFile(fileId) {
    fetch(`/files/${fileId}`, {
        method: 'DELETE',
    })
    .then(response => response.json())
    .then(result => {
        showToast(result.message, '#dc3545'); // Show notification
        fetchFiles(); // Refresh the list after deletion
    })
    .catch(error => {
        console.error('Error deleting file:', error);
        showToast('Error deleting file.', '#dc3545');
    });
}
