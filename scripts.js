/* ==========================================================================
   1. CONTACT FORM HANDLER (QUIET BACKGROUND AJAX SUBMISSION)
   ========================================================================== */
   const contactForm = document.getElementById('contactForm');

   if (contactForm) {
       contactForm.addEventListener('submit', function (event) {
           event.preventDefault(); // Stalls normal browser redirect to prevent white screens!
   
           const form = event.target;
           const button = form.querySelector('.submit-button');
   
           // Clear all previous validation error tracking text layers
           const errorElements = document.querySelectorAll('.error-message');
           errorElements.forEach(function(el) {
               el.style.display = 'none';
           });
   
           // Fetch user string inputs
           const nameValue = document.getElementById('name').value.trim();
           const emailValue = document.getElementById('email').value.trim();
           const messageValue = document.getElementById('message').value.trim();
   
           let isValid = true;
   
           // Basic verification processing logs
           if (nameValue === '') {
               const err = document.getElementById('nameError');
               if (err) { err.textContent = 'Name is required'; err.style.display = 'block'; }
               isValid = false;
           }
           if (emailValue === '') {
               const err = document.getElementById('emailError');
               if (err) { err.textContent = 'Discord handle is required'; err.style.display = 'block'; }
               isValid = false;
           }
           if (messageValue === '') {
               const err = document.getElementById('messageError');
               if (err) { err.textContent = 'Message is required'; err.style.display = 'block'; }
               isValid = false;
           }
   
           // Send data quietly in the background using standard JSON formatting strings
           if (isValid) {
               if (button) {
                   button.textContent = "sending...";
                   button.disabled = true;
               }
   
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
               .then(function(response) {
                   if (response.status === 200) {
                       alert('🎉 Message sent successfully! Check your inbox in a few seconds.');
                       form.reset();
                   } else {
                       alert('Oops! System submission error.');
                   }
               })
               .catch(function(error) {
                   alert('Oops! Network terminal offline.');
                   console.error(error);
               })
               .then(function() {
                   if (button) {
                       button.textContent = "SUBMIT.EXE";
                       button.disabled = false;
                   }
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
           // Fetch custom interface styling choices from fields
           const alias = document.getElementById('user-handle').value.trim();
           const status = document.getElementById('user-status').value.trim();
           const selectedColor = document.getElementById('user-theme').value;
   
           // Guard validation step to block empty creation streams
           if (alias === '' || status === '') {
               alert("ERROR: Please fill out both terminal input tracks before execution.");
               return;
           }
   
           // Dynamically wipe out the canvas environment framework and render custom desktop
           document.getElementById('desktop-environment').innerHTML = `
               <div style="background-color: ${selectedColor}; background-image: radial-gradient(rgba(0,0,0,0.15) 20%, transparent 20%); background-size: 6px 6px; min-height: 100vh; padding: 40px 20px; display: flex; flex-direction: column; align-items: center; gap: 30px; box-sizing: border-box; width: 100%;">
                   
                   <div class="retro-window" style="max-width: 600px; width: 100%; background-color: #c0c0c0; border: 3px outset #ffffff; box-shadow: 4px 4px 0px rgba(0,0,0,0.5); box-sizing: border-box;">
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
   }
      
   /* ==========================================================================
      4. RETRO GREEN TERMINAL TYPEWRITER EFFECT
      ========================================================================== */
   function setupTypewriter(fieldId, textToType) {
       const element = document.getElementById(fieldId);
       if (!element) return;
   
       let index = 0;
       let isDeleting = false;
   
       function typeLoop() {
           let currentText = textToType.substring(0, index);
           element.setAttribute('placeholder', currentText + "_");
   
           if (!isDeleting) {
               index++;
               if (index > textToType.length) {
                   isDeleting = true;
                   setTimeout(typeLoop, 2000);
                   return;
               }
               setTimeout(typeLoop, 150 + Math.random() * 100);
           } else {
               index--;
               if (index < 0) {
                   isDeleting = false;
                   setTimeout(typeLoop, 500);
                   return;
               }
               setTimeout(typeLoop, 50);
           }
       }
       typeLoop();
   }
   
   // Safely boot typewriter routines once the layout finishes parsing
   document.addEventListener('DOMContentLoaded', function() {
       setTimeout(function() {
           setupTypewriter('name', 'PREFERRED_NAME');
           setupTypewriter('email', 'DISCORD_USERNAME');
           setupTypewriter('message', 'SAY_HI...');
       }, 400);
   });
   