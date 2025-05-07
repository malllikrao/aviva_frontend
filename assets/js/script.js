const spinner = document.getElementById('loading-spinner');
const successModal = document.getElementById('success-modal');

function showSpinner() {
  spinner.style.display = 'block';
}

function hideSpinner() {
  spinner.style.display = 'none';
}

function showModal() {
  successModal.style.display = 'flex';
}

function closeModal() {
  successModal.style.display = 'none';
}

appointmentForm.addEventListener('submit', function (e) {
  e.preventDefault();

  showSpinner(); // Show spinner on submit

  const formData = {
    name: document.getElementById('full_name').value,
    email: document.getElementById('email').value,
    phone: document.getElementById('phone').value,
    service: document.getElementById('service').value,
    date: document.getElementById('date').value,
    time: document.getElementById('time').value,
    message: document.getElementById('message').value
  };

  fetch('http://127.0.0.1:8000/book/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRFToken': getCookie('csrftoken')
    },
    credentials: 'include',
    body: JSON.stringify(formData)
  })
    .then(response => {
      if (!response.ok) {
        return response.json().then(data => {
          throw new Error(data.error || 'Something went wrong!');
        });
      }
      return response.json();
    })
    .then(data => {
      hideSpinner();     // Hide spinner
      showModal();       // Show success modal
      appointmentForm.reset();
    })
    .catch(error => {
      hideSpinner();
      alert('Failed to send appointment request. Please try again.');
      console.error('Error:', error);
    });
});

