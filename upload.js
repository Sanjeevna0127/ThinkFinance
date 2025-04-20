document.addEventListener('DOMContentLoaded', function() {
    const dropZone = document.getElementById('drop-zone');
    const fileInput = document.getElementById('file-input');
    const uploadProgress = document.querySelector('.upload-progress');
    const progressBar = document.getElementById('upload-progress');
    const progressText = document.getElementById('progress-text');
    const parseOptions = document.querySelector('.parse-options');
    
    // Drag and drop functionality
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropZone.addEventListener(eventName, preventDefaults, false);
    });
    
    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }
    
    ['dragenter', 'dragover'].forEach(eventName => {
        dropZone.addEventListener(eventName, highlight, false);
    });
    
    ['dragleave', 'drop'].forEach(eventName => {
        dropZone.addEventListener(eventName, unhighlight, false);
    });
    
    function highlight() {
        dropZone.classList.add('highlight');
    }
    
    function unhighlight() {
        dropZone.classList.remove('highlight');
    }
    
    dropZone.addEventListener('drop', handleDrop, false);
    
    function handleDrop(e) {
        const dt = e.dataTransfer;
        const files = dt.files;
        handleFiles(files);
    }
    
    fileInput.addEventListener('change', function() {
        handleFiles(this.files);
    });
    
    function handleFiles(files) {
        if (files.length) {
            const file = files[0];
            if (isValidFileType(file)) {
                simulateUpload(file);
            } else {
                alert('Please upload a valid CSV, Excel, or JSON file.');
            }
        }
    }
    
    function isValidFileType(file) {
        const validTypes = ['text/csv', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/json'];
        return validTypes.includes(file.type) || 
               file.name.endsWith('.csv') || 
               file.name.endsWith('.xlsx') || 
               file.name.endsWith('.json');
    }
    
    function simulateUpload(file) {
        uploadProgress.classList.remove('hidden');
        
        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.random() * 10;
            if (progress >= 100) {
                progress = 100;
                clearInterval(interval);
                uploadComplete(file);
            }
            
            progressBar.style.width = `${progress}%`;
            progressText.textContent = `${Math.round(progress)}%`;
        }, 200);
    }
    
    function uploadComplete(file) {
        setTimeout(() => {
            parseOptions.classList.remove('hidden');
            // Here you would typically parse the file and show appropriate options
            // For demo, we're just showing the parse options section
        }, 500);
    }
    
    // Parse button click
    document.getElementById('parse-button').addEventListener('click', function() {
        alert('Data parsing would happen here in a real application. For this demo, you can navigate to the Dashboard to see sample insights.');
    });
});