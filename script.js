// DOM Elements
const sidebar = document.getElementById('sidebar');
const mainContent = document.querySelector('.main-content');
const menuToggle = document.getElementById('menuToggle');
const closeMenu = document.getElementById('closeMenu');
const cards = document.querySelectorAll('[data-aos]');

// Initialize AOS (Animate on Scroll) simulation
document.addEventListener('DOMContentLoaded', () => {
    // Initialize animations
    setTimeout(() => {
        initAnimations();
    }, 100);

    // Initialize charts
    initCharts();
});

// Toggle sidebar on menu click (for desktop)
menuToggle.addEventListener('click', () => {
    sidebar.classList.toggle('collapsed');
    sidebar.classList.toggle('mobile-active');
    mainContent.classList.toggle('expanded');
});

// Close menu on mobile
closeMenu.addEventListener('click', () => {
    sidebar.classList.remove('mobile-active');
});

// Handle window resize
window.addEventListener('resize', () => {
    if (window.innerWidth < 991) {
        sidebar.classList.remove('collapsed');
        mainContent.classList.remove('expanded');
    }
});

// Animation function
function initAnimations() {
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.classList.add('aos-animate');
        }, 100 * index);
    });
}

// Initialize Charts
function initCharts() {
    // Revenue Chart
    const revenueChartEl = document.getElementById('revenueChart');
    const revenueChart = new Chart(revenueChartEl, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [
                {
                    label: 'Revenue',
                    data: [5000, 7500, 8000, 7800, 9500, 12000, 11000, 13000, 14500, 15800, 17000, 19000],
                    backgroundColor: 'rgba(94, 114, 228, 0.1)',
                    borderColor: '#5e72e4',
                    borderWidth: 3,
                    pointBackgroundColor: '#5e72e4',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2,
                    pointRadius: 4,
                    tension: 0.4,
                    fill: true
                },
                {
                    label: 'Expenses',
                    data: [3000, 4000, 4500, 4800, 5200, 6000, 6300, 6800, 7200, 7500, 8000, 8500],
                    borderColor: '#2dce89',
                    borderWidth: 3,
                    pointBackgroundColor: '#2dce89',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2,
                    pointRadius: 4,
                    tension: 0.4,
                    fill: false
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                    align: 'end',
                    labels: {
                        boxWidth: 10,
                        usePointStyle: true,
                        pointStyle: 'circle'
                    }
                },
                tooltip: {
                    backgroundColor: '#fff',
                    titleColor: '#32325d',
                    bodyColor: '#525f7f',
                    borderColor: '#e9ecef',
                    borderWidth: 1,
                    padding: 12,
                    displayColors: false,
                    callbacks: {
                        label: function(context) {
                            return `${context.dataset.label}: $${context.parsed.y}`;
                        }
                    }
                }
            },
            scales: {
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        color: '#8898aa'
                    }
                },
                y: {
                    grid: {
                        borderDash: [2],
                        color: '#e9ecef'
                    },
                    ticks: {
                        color: '#8898aa',
                        callback: function(value) {
                            return '$' + value;
                        }
                    }
                }
            }
        }
    });

    // User Demographics Chart
    const userChartEl = document.getElementById('userChart');
    const userChart = new Chart(userChartEl, {
        type: 'doughnut',
        data: {
            labels: ['Desktop', 'Mobile', 'Tablet'],
            datasets: [{
                data: [55, 35, 10],
                backgroundColor: ['#5e72e4', '#2dce89', '#11cdef'],
                borderWidth: 0,
                hoverOffset: 5
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '70%',
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        boxWidth: 10,
                        usePointStyle: true,
                        pointStyle: 'circle',
                        padding: 20
                    }
                },
                tooltip: {
                    backgroundColor: '#fff',
                    titleColor: '#32325d',
                    bodyColor: '#525f7f',
                    borderColor: '#e9ecef',
                    borderWidth: 1,
                    padding: 12,
                    displayColors: false,
                    callbacks: {
                        label: function(context) {
                            return `${context.label}: ${context.parsed}%`;
                        }
                    }
                }
            }
        }
    });

    // Add event listeners for chart filter buttons
    const timeFilterButtons = document.querySelectorAll('.time-filter button');
    timeFilterButtons.forEach(button => {
        button.addEventListener('click', () => {
            timeFilterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Update chart data based on selected filter
            // This is a simulation - in a real app you would fetch new data
            const label = button.textContent.trim();
            if (label === 'Daily') {
                updateRevenueChart(revenueChart, 
                    [5000, 7500, 8000, 7800, 9500, 12000, 11000, 13000, 14500, 15800, 17000, 19000],
                    [3000, 4000, 4500, 4800, 5200, 6000, 6300, 6800, 7200, 7500, 8000, 8500]);
            } else if (label === 'Weekly') {
                updateRevenueChart(revenueChart,
                    [6500, 8200, 8500, 9000, 10500, 13500, 12800, 14200, 15600, 17000, 18500, 21000],
                    [4000, 4800, 5100, 5500, 6000, 6800, 7100, 7600, 8000, 8300, 8800, 9500]);
            } else if (label === 'Monthly') {
                updateRevenueChart(revenueChart,
                    [8000, 9500, 10000, 11200, 12500, 15000, 14000, 16500, 18000, 19500, 21000, 24000],
                    [5000, 5800, 6200, 6500, 7000, 7800, 8100, 8600, 9200, 9800, 10500, 11200]);
            }
        });
    });

    // Add transitions to chart data updates
    function updateRevenueChart(chart, revenueData, expensesData) {
        // Apply smooth transition animation
        chart.data.datasets[0].data = revenueData;
        chart.data.datasets[1].data = expensesData;
        chart.update('easeInOutQuad');
    }
}

// Handle table row hover effects
const tableRows = document.querySelectorAll('tbody tr');
tableRows.forEach(row => {
    row.addEventListener('mouseover', () => {
        row.style.backgroundColor = '#f8f9fe';
        row.style.transition = 'background-color 0.3s ease';
    });
    
    row.addEventListener('mouseout', () => {
        row.style.backgroundColor = '';
    });
});

// Add dropdown functionality
const dropdownButtons = document.querySelectorAll('.dropdown button');
dropdownButtons.forEach(button => {
    button.addEventListener('click', function() {
        // In a real application, this would toggle a dropdown menu
        // Here we'll just toggle a class for styling
        this.classList.toggle('active');
    });
});

// Create interactive card effects
const allCards = document.querySelectorAll('.card, .chart-card, .table-card');
allCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-5px)';
        card.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
        card.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
        card.style.boxShadow = '';
    });
});

// Simulate data loading - In a real application, this would be API calls
function simulateDataLoading() {
    // For demonstration, we'll just add a small loading indicator
    const loadingOverlay = document.createElement('div');
    loadingOverlay.className = 'loading-overlay';
    loadingOverlay.innerHTML = `
        <div class="spinner"></div>
    `;
    document.body.appendChild(loadingOverlay);
    
    // Remove after simulation
    setTimeout(() => {
        loadingOverlay.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(loadingOverlay);
        }, 300);
    }, 800);
}

// Call simulate loading when time filters are changed
document.querySelectorAll('.time-filter button').forEach(button => {
    button.addEventListener('click', simulateDataLoading);
});

// Add additional styling for loading overlay
const style = document.createElement('style');
style.textContent = `
    .loading-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(255, 255, 255, 0.7);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
        transition: opacity 0.3s ease;
    }
    
    .spinner {
        width: 40px;
        height: 40px;
        border: 4px solid rgba(94, 114, 228, 0.2);
        border-radius: 50%;
        border-top-color: #5e72e4;
        animation: spin 1s ease-in-out infinite;
    }
    
    @keyframes spin {
        to { transform: rotate(360deg); }
    }
`;
document.head.appendChild(style);

// Notification system
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
        notification.style.opacity = '1';
    }, 10);
    
    // Remove after delay
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        notification.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Add notification styling
const notificationStyle = document.createElement('style');
notificationStyle.textContent = `
    .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        display: flex;
        align-items: center;
        gap: 10px;
        transform: translateX(100%);
        opacity: 0;
        transition: transform 0.3s ease, opacity 0.3s ease;
        z-index: 9999;
    }
    
    .notification.success i {
        color: var(--success-color);
    }
    
    .notification.error i {
        color: var(--danger-color);
    }
`;
document.head.appendChild(notificationStyle);

// Demo notification on page load
setTimeout(() => {
    showNotification('Welcome to your Analytics Dashboard');
}, 1000);

// Add click events to sidebar navigation
document.querySelectorAll('.nav ul li a').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Remove active class from all links
        document.querySelectorAll('.nav ul li').forEach(item => {
            item.classList.remove('active');
        });
        
        // Add active class to parent li
        this.parentElement.classList.add('active');
        
        // Show notification when clicking on menu items
        showNotification(`Navigating to ${this.querySelector('span').textContent}`);
        
        // On mobile, close the sidebar
        if (window.innerWidth < 991) {
            sidebar.classList.remove('mobile-active');
        }
    });
});