// Menyesuaikan tampilan input User ID berdasarkan pilihan di dropdown
function toggleInput() {
    const searchType = document.getElementById('searchType').value;
    const userIdInput = document.getElementById('userIdInput');

    if (searchType === 'allUsers') {
        userIdInput.classList.add('hidden');
    } else {
        userIdInput.classList.remove('hidden');
    }
}

// Fungsi untuk fetch data berdasarkan tipe pencarian
function fetchData() {
    const searchType = document.getElementById('searchType').value;
    let apiUrl = '';

    if (searchType === 'allUsers') {
        apiUrl = 'https://jsonplaceholder.typicode.com/users';
    } else {
        const userId = document.getElementById('userId').value;
        if (!userId) {
            alert('Please enter a valid User ID');
            return;
        }

        if (searchType === 'userById') {
            apiUrl = `https://jsonplaceholder.typicode.com/users/${userId}`;
        } else if (searchType === 'userPostsById') {
            apiUrl = `https://jsonplaceholder.typicode.com/users/${userId}/posts`;
        }
    }

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            displayResponse(data);
        })
        .catch(error => {
            document.getElementById('apiResponse').innerHTML = `<p>Error: ${error.message}</p>`;
        });
}

// Fungsi untuk menampilkan data API ke dalam tabel atau list, dengan objek bersarang ditampilkan rapi
function displayResponse(data) {
    let output = '';

    if (Array.isArray(data)) {
        output += '<table>';
        output += `<tr><th>Key</th><th>Value</th></tr>`;
        data.forEach((item, index) => {
            output += `<tr><td>${index + 1}</td><td>${formatNestedObject(item)}</td></tr>`;
        });
        output += '</table>';
    } else {
        output += '<table>';
        output += `<tr><th>Key</th><th>Value</th></tr>`;
        for (let key in data) {
            if (typeof data[key] === 'object') {
                output += `<tr><td>${key}</td><td>${formatNestedObject(data[key])}</td></tr>`;
            } else {
                output += `<tr><td>${key}</td><td>${data[key]}</td></tr>`;
            }
        }
        output += '</table>';
    }

    document.getElementById('apiResponse').innerHTML = output;
}

// Fungsi untuk memformat objek bersarang menjadi lebih rapi
function formatNestedObject(obj) {
    let formattedOutput = '<table>';

    for (let key in obj) {
        if (typeof obj[key] === 'object') {
            formattedOutput += `<tr><td>${key}</td><td>${formatNestedObject(obj[key])}</td></tr>`;
        } else {
            formattedOutput += `<tr><td>${key}</td><td>${obj[key]}</td></tr>`;
        }
    }

    formattedOutput += '</table>';
    return formattedOutput;
}

// Fungsi untuk mengganti mode terang dan gelap
function toggleMode() {
    const body = document.body;
    const toggleButton = document.getElementById('toggleMode');
    
    // Ganti mode
    if (body.classList.contains('light-mode')) {
        body.classList.replace('light-mode', 'dark-mode');
        toggleButton.textContent = 'Switch to Light Mode';
        localStorage.setItem('mode', 'dark-mode');
    } else {
        body.classList.replace('dark-mode', 'light-mode');
        toggleButton.textContent = 'Switch to Dark Mode';
        localStorage.setItem('mode', 'light-mode');
    }
}

// Cek localStorage dan atur mode awal saat halaman dimuat
document.addEventListener('DOMContentLoaded', () => {
    const savedMode = localStorage.getItem('mode') || 'light-mode';
    const body = document.body;
    const toggleButton = document.getElementById('toggleMode');

    // Set mode sesuai dengan yang disimpan
    body.classList.add(savedMode);

    // Ubah teks tombol sesuai mode
    if (savedMode === 'dark-mode') {
        toggleButton.textContent = 'Switch to Light Mode';
    } else {
        toggleButton.textContent = 'Switch to Dark Mode';
    }

    // Tambah event listener untuk tombol toggle
    toggleButton.addEventListener('click', toggleMode);
});
