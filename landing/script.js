(function () {
  "use strict";

  var form = document.getElementById("contact-form");
  if (!form) {
    return;
  }

  var success = document.getElementById("form-success");
  var nameInput = document.getElementById("name");
  var contactInput = document.getElementById("contact");
  var taskInput = document.getElementById("task");
  var nameError = document.getElementById("name-error");
  var contactError = document.getElementById("contact-error");

  function showError(input, errorEl, message) {
    errorEl.textContent = message;
    errorEl.hidden = false;
    input.setAttribute("aria-invalid", "true");
  }

  function clearError(input, errorEl) {
    errorEl.textContent = "";
    errorEl.hidden = true;
    input.removeAttribute("aria-invalid");
  }

  nameInput.addEventListener("input", function () {
    clearError(nameInput, nameError);
  });

  contactInput.addEventListener("input", function () {
    clearError(contactInput, contactError);
  });

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    var name = nameInput.value.trim();
    var contact = contactInput.value.trim();
    var isValid = true;

    clearError(nameInput, nameError);
    clearError(contactInput, contactError);

    if (!name) {
      showError(nameInput, nameError, "Укажи имя.");
      isValid = false;
    }

    if (!contact) {
      showError(contactInput, contactError, "Оставь email или @telegram.");
      isValid = false;
    }

    if (!isValid) {
      var firstInvalid = form.querySelector('[aria-invalid="true"]');
      if (firstInvalid) {
        firstInvalid.focus();
      }
      return;
    }

    var selected = form.querySelector('input[name="category"]:checked');

    var payload = {
      category: selected ? selected.value : null,
      name: name,
      contact: contact,
      task: taskInput.value.trim()
    };

    // TODO: send `payload` to the backend here, for example:
    // fetch("/api/contact", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(payload)
    // });

    form.hidden = true;
    success.hidden = false;
    success.focus();
  });
})();
