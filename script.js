/* ==========================================================================
   1. CONTACT FORM HANDLER (QUIET BACKGROUND AJAX SUBMISSION TO WEB3FORMS)
   ========================================================================== */
   document.getElementById('contactForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevents the browser from crashing into a white screen!

    const form = event.target;
    const button = form.querySelector('.submit-button');

    // Clear all previous validation error messages
    const errorElements = document.querySelectorAll('.error-message');
    errorElements.forEach(el => el.style.display = 'none');

    // Grab field values
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const message = document.getElementById('message').value.trim();

    let isValid = true;

    // Fast validation checks
    if (name === '') {
        const err = document.getElementById('nameError');
        if(err) { err.textContent = 'Name is required'; err.style.display = 'block'; }
        isValid = false;
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+\$/;
    if (email === '' || !emailPattern.test(email)) {
        const err = document.getElementById('emailError');
        if(err) { err.textContent = 'Valid email is required'; err.style.display = 'block'; }
        isValid = false;
    }
    if (message === '') {
        const err = document.getElementById('messageError');
        if(err) { err.textContent = 'Message is required'; err.style.display = 'block'; }
        isValid = false;
    }

    // Send data quietly in the background using AJAX JSON packaging
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
            button.textContent = "SUBMIT.EXE";
            button.disabled = false;
        });
    }
});


/* ==========================================================================
   2. INTERACTIVE PAGE BUILDER ENGINE ("WHAT ABOUT YOU?")
   ========================================================================== */
document.getElementById('generate-page-btn').addEventListener('click', function() {
    // Gather up user values from the fields
    const alias = document.getElementById('user-handle').value.trim();
    const status = document.getElementById('user-status').value.trim();
    const selectedColor = document.getElementById('user-theme').value;

    // Fast fallback confirmation step check
    if (alias === '' || status === '') {
        alert("ERROR: Please fill out both terminal input tracks before execution.");
        return;
    }

    // Dynamically overwrite document body layout with a personalized desktop terminal!
    document.getElementById('desktop-environment').innerHTML = `
        <div style="background-color: ${selectedColor}; background-image: radial-gradient(rgba(0,0,0,0.15) 20%, transparent 20%); background-size: 6px 6px; min-height: 100vh; padding: 40px 20px; display: flex; flex-direction: column; align-items: center; gap: 30px; box-sizing: border-box; width: 100%;">
            
            <div class="retro-window" style="max-width: 600px; width: 100%; background-color: #c0c0c0; border: 3px outset #ffffff; box-shadow: 4px 4px 0px rgba(0,0,0,0.5);">
                <div class="window-titlebar" style="background: linear-gradient(90deg, #000080, #1084d0); color: white; padding: 4px 8px; font-family: 'VT323', monospace; font-size: 1.3rem; display: flex; justify-content: space-between; align-items: center;">
                    <span>${alias.toLowerCase()}_workspace.sys</span>
                    <div class="titlebar-buttons"><span onclick="window.location.reload()" style="background-color: #c0c0c0; color: black; border: 2px outset #fff; padding: 0px 4px; font-size: 0.75rem; cursor: pointer; font-family: Arial; font-weight: bold;">[EXIT_SYSTEM]</span></div>
                </div>
                <div class="window-content" style="padding: 20px; text-align: center;">
                    <h1 style="color: ${selectedColor === '#ff007f' ? '#000080' : '#ff007f'}; font-family: 'VT323', monospace; font-size: 2.5rem; margin: 0 0 15px 0;">˗ˏˋ ꒰ ${alias}'s system ꒱ ˎˊ˗</h1>
                    <div style="border: 3px inset #888888; background-color: #fff; width: 100px; height: 100px; margin: 20px auto; display: flex; align-items: center; justify-content: center; font-size: 3rem; color: ${selectedColor};">
                        <i class="fas fa-terminal"></i>
                    </div>
                    <h3 style="margin-top: 15px; font-family: 'VT323', monospace; font-size: 1.4rem; color: #000080;">CURRENT OPERATION:</h3>
                    <p style="font-family: 'Courier Prime', monospace; font-weight: bold; font-size: 1.1rem; color: #000;">⋆ ${status}</p>
                    
                    <div style="margin-top: 30px; border-top: 2px dashed #888888; padding-top: 15px;">
                        <button onclick="window.location.reload()" class="submit-button" style="background-color: #c0c0c0; color: black; border: 3px outset #ffffff; padding: 6px; font-family: 'VT323', monospace; font-size: 1.5rem; cursor: pointer; width: 100%; max-width: 200px;">LOG_OUT.SH</button>
                    </div>
                </div>
            </div>

            <footer class="retro-footer" style="width: 100%; max-width: 600px; text-align: center; margin-top: 10px;">
                <div class="footer-text" style="font-family: 'VT323', monospace; font-size: 1.4rem; color: #ffffff; text-shadow: 1px 1px #000;">GENERATED VIA BELLO_CORNER ENGINE</div>
            </footer>
        </div>
    `;
});
