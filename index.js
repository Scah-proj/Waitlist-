
const ENV = {
  WAITLIST_API_URL: "https://scah-backend.onrender.com/api/waitlist",
};
const form = document.getElementById("waitlist-form");
const message = document.getElementById("message");
const submitBtn = form.querySelector("button"); 

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const role = document.getElementById("role").value.trim();
  const email = document.getElementById("email").value.trim();

  message.textContent = "";
  message.style.color = "";

  if (!role || !email) {
    message.textContent = "⚠️ Please select a role and enter your email.";
    message.style.color = "red";
    return;
  }

  const validRoles = ["Athlete", "Scout"];
  if (!validRoles.includes(role)) {
    message.textContent = "⚠️ Invalid role selected.";
    message.style.color = "red";
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    message.textContent = "⚠️ Please enter a valid email address.";
    message.style.color = "red";
    return;
  }

  submitBtn.disabled = true;
  submitBtn.textContent = "Submitting...";

  try {
    const res = await fetch(ENV.WAITLIST_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ role, email }),
    });

    const data = await res.json();

    if (res.ok) {
      message.textContent =
        " Success! " + (data.message || "You've joined the waitlist.");
      message.style.color = "green";
      form.reset();
    } else if (data.error && data.error.message.toLowerCase().includes("waitlist")) {
      message.textContent = "⚠️ This email is already on the waitlist.";
      message.style.color = "orange";
    } else {
      message.textContent =
        "❌ Error: " + (data.error?.message || "Something went wrong.");
      message.style.color = "red";
    }
  } catch (err) {
    console.error(err);
    message.textContent = "❌ Network error. Please try again later.";
    message.style.color = "red";
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = "Join Waitlist";
  }
});
