document.addEventListener('DOMContentLoaded', function () {

    /* ==========================================================================
       1. CONTACT FORM HANDLER (QUIET BACKGROUND AJAX SUBMISSION)
       ========================================================================== */
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (event) {
            event.preventDefault();

            const form = event.target;
            const button = form.querySelector('.submit-button');

            const errorElements = document.querySelectorAll('.error-message');
            errorElements.forEach(el => el.style.display = 'none');

            const nameValue = document.getElementById('name').value.trim();
            const discordValue = document.getElementById('email').value.trim();
            const messageValue = document.getElementById('message').value.trim();

            let isValid = true;

            if (nameValue === '') {
                const err = document.getElementById('nameError');
                if (err) { err.textContent = 'Name is required'; err.style.display = 'block'; }
                isValid = false;
            }
            if (discordValue === '') {
                const err = document.getElementById('emailError');
                if (err) { err.textContent = 'Discord handle is required'; err.style.display = 'block'; }
                isValid = false;
            }
            if (messageValue === '') {
                const err = document.getElementById('messageError');
                if (err) { err.textContent = 'Message is required'; err.style.display = 'block'; }
                isValid = false;
            }

            if (isValid) {
                if (button) { button.textContent = "sending..."; button.disabled = true; }

                const formData = new FormData(form);
                const object = Object.fromEntries(formData);
                const json = JSON.stringify(object);

                fetch(form.action, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                    body: json
                })
                .then(response => {
                    if (response.status === 200) {
                        alert('🎉 Message sent safely directly to Bello!');
                        form.reset();
                    } else {
                        alert('Oops! Submission pipeline error.');
                    }
                })
                .catch(error => {
                    alert('Oops! Device network error.');
                    console.error(error);
                })
                .then(() => {
                    if (button) { button.textContent = "SUBMIT.EXE"; button.disabled = false; }
                });
            }
        });
    }

    /* ==========================================================================
       2. INTERACTIVE PAGE BUILDER ENGINE ("WHAT ABOUT YOU?")
       ========================================================================== */
    const generateBtn = document.getElementById('generate-page-btn');
    if (generateBtn) {
        generateBtn.addEventListener('click', function () {
            const alias = document.getElementById('user-handle').value.trim();
            const status = document.getElementById('user-status').value.trim();
            const selectedColor = document.getElementById('user-theme').value;
            const selectedWallpaper = document.getElementById('user-wallpaper').value;
            const selectedMusic = document.getElementById('user-music').value;

            if (alias === '' || status === '') {
                alert("ERROR: Please fill out both terminal input tracks before execution.");
                return;
            }

            // Optional hidden audio stream deployment node logic inside user space
            let audioTrackHtml = '';
            if (selectedMusic !== 'none') {
                audioTrackHtml = `<audio src="${selectedMusic}" autoplay loop></audio>`;
            }

            // Overwrite screen deck completely with choices
            document.getElementById('desktop-environment').innerHTML = `
                ${audioTrackHtml}
                <div class="${selectedWallpaper}" style="background-color: ${selectedColor}; min-height: 100vh; padding: 40px 20px; display: flex; flex-direction: column; align-items: center; justify-content: center; box-sizing: border-box; width: 100%;">
                    
                    <div class="retro-window" style="max-width: 600px; width: 100%; background-color: #c0c0c0; border: 3px outset #ffffff; box-shadow: 5px 5px 0px rgba(0,0,0,0.6); box-sizing: border-box;">
                        <div class="window-titlebar" style="background: linear-gradient(90deg, #000080, #1084d0); color: white; padding: 4px 8px; font-family: 'VT323', monospace; font-size: 1.3rem; display: flex; justify-content: space-between; align-items: center;">
                            <span>${alias.toLowerCase()}_workspace.sys</span>
                            <div class="titlebar-buttons"><span onclick="window.location.reload()" style="background-color: #c0c0c0; color: black; border: 2px outset #fff; padding: 0px 4px; font-size: 0.75rem; cursor: pointer; font-family: Arial; font-weight: bold;">[EXIT_SYSTEM]</span></div>
                        </div>
                        <div class="window-content" style="padding: 30px; text-align: center; font-family: 'Courier Prime', monospace;">
                            <h1 style="color: ${selectedColor === '#ff007f' ? '#000080' : '#ff007f'}; font-family: 'VT323', monospace; font-size: 2.8rem; margin: 0 0 15px 0;">˗ˏˋ ꒰ ${alias}'s system ꒱ ˎˊ˗</h1>
                            
                            <div style="border: 3px inset #888888; background-color: #0d1117; width: 100px; height: 100px; margin: 20px auto; display: flex; align-items: center; justify-content: center; font-size: 3rem; color: #00ff00; text-shadow: 0 0 5px #00ff00;">
                                <i class="fas fa-terminal"></i>
                            </div>
                            
                            <h3 style="margin-top: 20px; font-family: 'VT323', monospace; font-size: 1.6rem; color: #000080; letter-spacing: 1px;">CURRENT OPERATION:</h3>
                            <p style="font-weight: bold; font-size: 1.1rem; color: #000; margin: 5px 0 25px 0;">⋆ ${status}</p>
                            
                            <div style="border-top: 2px dashed #888888; padding-top: 20px;">
                                <button onclick="window.location.reload()" class="submit-button" style="background-color: #c0c0c0; color: black; border: 3px outset #ffffff; padding: 8px; font-family: 'VT323', monospace; font-size: 1.5rem; cursor: pointer; width: 100%; max-width: 250px;">LOG_OUT.SH</button>
                            </div>
                        </div>
                    </div>

                    <footer class="retro-footer" style="width: 100%; max-width: 600px; text-align: center; margin-top: 20px; border-top: 2px dashed rgba(0,0,0,0.3); padding-top: 15px;">
                        <div class="footer-text" style="font-family: 'VT323', monospace; font-size: 1.4rem; color: #ffffff; text-shadow: 1px 1px #000;">GENERATED VIA BELLO_CORNER ENGINE</div>
                    </footer>
                </div>
            `;
        });
    }

});

   