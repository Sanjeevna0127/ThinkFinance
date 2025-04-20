// Navigation between sections
document.addEventListener('DOMContentLoaded', function() {
    // Section navigation
    const navLinks = document.querySelectorAll('nav a');
    const sections = document.querySelectorAll('section');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all nav links and sections
            navLinks.forEach(navLink => navLink.classList.remove('active'));
            sections.forEach(section => section.classList.remove('active-section'));
            
            // Add active class to clicked nav link
            this.classList.add('active');
            
            // Show corresponding section
            const sectionId = this.id.replace('nav-', '') + '-section';
            document.getElementById(sectionId).classList.add('active-section');
        });
    });
    
    // Initialize charts
    initializeCharts();
    
    // Simulate heatmap data
    simulateHeatmap();
});

function initializeCharts() {
    // Revenue Trend Chart (Line Chart)
    const revenueCtx = document.getElementById('revenue-chart').getContext('2d');
    new Chart(revenueCtx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
            datasets: [{
                label: 'Revenue',
                data: [65000, 59000, 80000, 81000, 56000, 75000, 124000],
                borderColor: '#4361ee',
                backgroundColor: 'rgba(67, 97, 238, 0.1)',
                borderWidth: 4,
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: false
                }
            }
        }
    });
    
    // Expense Breakdown Chart (Doughnut Chart)
    const expenseCtx = document.getElementById('expense-chart').getContext('2d');
    new Chart(expenseCtx, {
        type: 'doughnut',
        data: {
            labels: ['Salaries', 'Marketing', 'Office', 'Software', 'Other'],
            datasets: [{
                data: [35000, 18000, 8000, 12000, 5000],
                backgroundColor: [
                    '#4361ee',
                    '#3f37c9',
                    '#4895ef',
                    '#4cc9f0',
                    '#f72585'
                ],
                borderWidth: 3
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'right'
                }
            }
        }
    });
}

function simulateHeatmap() {
    const heatmap = document.getElementById('anomaly-heatmap');
    heatmap.innerHTML = '';
    
    // Create a grid for the heatmap
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const weeks = 4;
    
    // Create header row
    const headerRow = document.createElement('div');
    headerRow.className = 'heatmap-row heatmap-header';
    
    // Add empty cell for corner
    const cornerCell = document.createElement('div');
    cornerCell.className = 'heatmap-cell';
    headerRow.appendChild(cornerCell);
    
    // Add day headers
    days.forEach(day => {
        const dayCell = document.createElement('div');
        dayCell.className = 'heatmap-cell heatmap-day';
        dayCell.textContent = day;
        headerRow.appendChild(dayCell);
    });
    
    heatmap.appendChild(headerRow);
    
    // Create data rows
    for (let week = 0; week < weeks; week++) {
        const weekRow = document.createElement('div');
        weekRow.className = 'heatmap-row';
        
        // Add week number
        const weekCell = document.createElement('div');
        weekCell.className = 'heatmap-cell heatmap-week';
        weekCell.textContent = `Week ${week + 1}`;
        weekRow.appendChild(weekCell);
        
        // Add data cells
        days.forEach(day => {
            const value = Math.random(); // Random value between 0 and 1
            const cell = document.createElement('div');
            cell.className = 'heatmap-cell';
            cell.style.backgroundColor = `rgba(67, 97, 238, ${value})`;
            cell.title = `Anomaly score: ${value.toFixed(2)}`;
            weekRow.appendChild(cell);
        });
        
        heatmap.appendChild(weekRow);
    }
    
    // Add some CSS for the heatmap
    const style = document.createElement('style');
    style.textContent = `
        .heatmap-row {
            display: flex;
        }
        .heatmap-cell {
            width: 40px;
            height: 40px;
            margin: 2px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 0.8rem;
            border-radius: 4px;
        }
        .heatmap-header .heatmap-cell {
            font-weight: bold;
            background: none;
        }
        .heatmap-day, .heatmap-week {
            background: #f8f9fa;
        }
    `;
    document.head.appendChild(style);
}