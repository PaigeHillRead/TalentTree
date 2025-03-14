document.addEventListener("DOMContentLoaded", function () {
    let contacts = document.querySelectorAll(".contact:not(.runaway)");
    contacts.forEach(contact => {
        contact.addEventListener("click", function () {
            alert("Contact information coming soon!");
        });
    });

    let hris = document.querySelector(".runaway");
    let isRunning = false;
    let teleportCooldown = false; // Prevents spam teleporting

    hris.addEventListener("click", function () {
        isRunning = true; // Activate teleport mode
    });

    document.addEventListener("mousemove", function (event) {
        if (isRunning && !teleportCooldown) {
            let rect = hris.getBoundingClientRect();
            let distance = Math.hypot(
                event.clientX - (rect.left + rect.width / 2),
                event.clientY - (rect.top + rect.height / 2)
            );

            // If the mouse is within 80px, HRIS teleports away
            if (distance < 80) {
                teleportCooldown = true; // Prevent spam teleporting
                hris.style.opacity = "0"; // Instantly disappear

                setTimeout(() => {
                    let newX = Math.random() * (window.innerWidth - hris.offsetWidth);
                    let newY = Math.random() * (window.innerHeight - hris.offsetHeight);

                    hris.style.position = "absolute";
                    hris.style.left = `${newX}px`;
                    hris.style.top = `${newY}px`;

                    hris.style.opacity = "1"; // Reappear instantly
                    teleportCooldown = false; // Allow teleporting again
                }, 50); // Super fast disappear time (50ms)
            }
        }
    });
});
