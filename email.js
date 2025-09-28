document.querySelectorAll("form")[1].addEventListener("submit", function (e) {

            const formData = {
                name: document.getElementById("name").value,
                email: document.getElementById("email").value,
                contact: document.getElementById("contact").value,
                message: document.getElementById("message").value
            };

            fetch("http://localhost:3000/send-email", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            })
                .then(response => response.text())
                .then(data => {
                    alert(data);
                    document.querySelector("form").reset();
                })
                .catch(error => {
                    alert("Error sending email");
                    console.error("Error:", error);
                });
        });