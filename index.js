document.getElementById("waitlist-form").addEventListener("submit", async function(e) {
    e.preventDefault();

    const role = document.getElementById("role").value;
    const email = document.getElementById("email").value;

    if (!role || !email) {
      alert("Please select a role and enter your email.");
      return;
    }

    try {
      const res = await fetch("", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ role, email })
      });

      const data = await res.json();
      alert("Success! " + data.message);
    } catch (err) {
      console.error(err);
      alert(" Something went wrong. Try again.");
    }
  });