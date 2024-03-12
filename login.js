document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');
  const errorContainer = document.getElementById('errorContainer');

  loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    // Basic input validation
    if (!email || !password) {
      showError('Please enter both email and password.');
      return;
    }

    try {
      const response = await fetch('http://localhost:8081/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to login');
      }

      // Extract the JWT token from the response
      const { token } = await response.json();

      // Store the token in localStorage
      localStorage.setItem('token', token);

      // Redirect to the bookmarks page upon successful login
      window.location.href = 'bookmarks.html';
    } catch (error) {
      console.error('Error during login:', error);
      showError(error.message || 'Failed to login. Please try again.');
    }
  });

  // Function to display error message
  function showError(message) {
    errorContainer.textContent = message;
    errorContainer.style.display = 'block';
  }
});
