/* Owen & Lott: main.js
   The page works without JavaScript. This file only upgrades the forms so they
   send in the background and show a status message instead of leaving the page. */
(function () {
  "use strict";

  var forms = document.querySelectorAll("form[data-enhance]");

  Array.prototype.forEach.call(forms, function (form) {
    var status = form.querySelector("[data-status]");
    var button = form.querySelector('button[type="submit"]');

    function show(message) {
      if (status) {
        status.textContent = message;
      }
    }

    form.addEventListener("submit", function (event) {
      // The endpoint is still the placeholder from the template.
      if (form.action.indexOf("YOUR_FORM_ID") !== -1) {
        event.preventDefault();
        show("Error: this form is not connected yet. See README.md, section Contact form.");
        return;
      }

      if (!window.fetch || !window.FormData) {
        return; // Let the browser submit the form normally.
      }

      event.preventDefault();
      button.disabled = true;
      show("Sending...");

      fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" }
      })
        .then(function (response) {
          if (!response.ok) {
            throw new Error("HTTP " + response.status);
          }
          form.reset();
          show("Thank you. Your message has been sent.");
        })
        .catch(function () {
          show("Error: the message could not be sent. Please email us instead.");
        })
        .then(function () {
          button.disabled = false;
        });
    });
  });
})();
