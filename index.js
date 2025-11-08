const form = document.getElementById("waitlist-form");
const message = document.getElementById("message");
form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const role = document.getElementById("role").value;
    
    const email = document.getElementById("email").value;


    if (!role || !email) {
      alert("Please select a role and enter your email.");
      return;
    }

    try {
      const res = await fetch("https://scahtest1-production.up.railway.app/API/waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ role, email })
      });

      const data = await res.json();
       if (res.ok) {
      message.textContent = " Success! " + data.message;
      message.style.color = "green";
    } else {
      message.textContent =  (data.message || "Something went wrong");
      message.style.color = "red";
    }
    } catch (err) {
      console.error(err);
      alert(" Something went wrong. Try again.");
    }
  });
  