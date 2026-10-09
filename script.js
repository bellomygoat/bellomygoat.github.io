document.getElementById('contactForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevents the browser from crashing into a white screen!

    const form = event.target;
    const button = form.querySelector('.submit-button');

    // 1. Clear all previous validation error messages
    const errorElements = document.querySelectorAll('.error-message');
    errorElements.forEach(el => el.style.display = 'none');

    // 2. Grab field values
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const message = document.getElementById('message').value.trim();

    let isValid = true;

    // Fast validation checks
    if (name === '') {
        document.getElementById('nameError').textContent = 'Name is required';
        document.getElementById('nameError').style.display = 'block';
        isValid = false;
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email === '' || !emailPattern.test(email)) {
        document.getElementById('emailError').textContent = 'Valid email is required';
        document.getElementById('emailError').style.display = 'block';
        isValid = false;
    }
    if (message === '') {
        document.getElementById('messageError').textContent = 'Message is required';
        document.getElementById('messageError').style.display = 'block';
        isValid = false;
    }

    // 3. Send data quietly in the background using AJAX JSON packaging
    if (isValid) {
        button.textContent = "sending..."; // Visual cue for the user
        button.disabled = true;

        // Gather up all input data fields including your secret access_key
        const formData = new FormData(form);
        const object = Object.fromEntries(formData);
        const json = JSON.stringify(object);

        fetch(form.action, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: json
        })
        .then(async (response) => {
            let resultJson = await response.json();
            
            if (response.status === 200) {
                // SUCCESS! No white screens.
                alert('🎉 Message sent successfully! Check your inbox in a few seconds.');
                form.reset(); // Clears out the form text boxes completely
            } else {
                alert('Oops! ' + resultJson.message);
            }
        })
        .catch(error => {
            alert('Oops! There was a network issue connecting to the server.');
            console.error(error);
        })
        .then(() => {
            // Reset button text back to original aesthetic setup
            button.textContent = "send :b";
            button.disabled = false;
        });
    }
});
