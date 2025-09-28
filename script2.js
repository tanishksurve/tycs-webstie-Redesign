const embedMapLinks = {
    T1: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d241488.11180738496!2d72.56469623281248!3d18.964486200000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7ce3664a78525%3A0x432a3c0c32d32a2e!2sTejyash%20Cyber%20Solutions!5e0!3m2!1sen!2sin!4v1749550030196!5m2!1sen!2sin",
    T2: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d241488.11180738496!2d72.56469623281248!3d18.964486200000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c97e07851f9b%3A0x631ad63e1e15b2d8!2sTejyash%20Cyber%20Solutions%20(Santacruz%20-%20Branch)!5e0!3m2!1sen!2sin!4v1749550226892!5m2!1sen!2sin",
    T3: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d241488.11180738496!2d72.56469623281248!3d18.964486200000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7cfb4f32637cb%3A0xbb3fc470c9d95a98!2sTejyash%20Cyber%20Solutions%20(Ghodapdeo%20-%20Branch)!5e0!3m2!1sen!2sin!4v1749550317520!5m2!1sen!2sin",
    T4: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d241488.11180738496!2d72.56469623281248!3d18.964486200000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c9c2e1c3c9ed%3A0xec85ef38c9f87b6f!2sTejyash%20Cyber%20Solutions%20(Andheri%20-%20Branch)!5e0!3m2!1sen!2sin!4v1749550356329!5m2!1sen!2sin"
};

const shareLinks = {
    T1: "https://g.co/kgs/FMwvYch",
    T2: "https://g.co/kgs/ciP7i1C",
    T3: "https://maps.app.goo.gl/RDWPJNKZz9mf1nEq8",
    T4: "https://g.co/kgs/oDVbQwu"
};

let currentLocation = "T1";

function setMapLocation(locationId) {
    currentLocation = locationId;
    document.getElementById("mapFrame").src = embedMapLinks[locationId];
}

function shareMap() {
    const linkToCopy = shareLinks[currentLocation];

    // Copy the link
    navigator.clipboard.writeText(linkToCopy)
        .then(() => {
            const popup = document.getElementById("copyPopup");
            popup.classList.remove("hidden");
            setTimeout(() => popup.classList.add("hidden"), 2000);
        })
        .catch(err => {
            console.error("Copy failed: ", err);
        });
}

function toggleDropdown() {
    const list = document.getElementById("locationList");
    const icon = document.getElementById("dropdownIcon");
    list.classList.toggle("hidden");
    icon.classList.toggle("rotate-180");
}

function setMapLocation(locationId) {
    const mapFrame = document.getElementById("mapFrame");
    const mapLinks = {
        T1: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d241488.11180738496!2d72.56469623281248!3d18.964486200000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7ce3664a78525%3A0x432a3c0c32d32a2e!2sTejyash%20Cyber%20Solutions!5e0!3m2!1sen!2sin!4v1749550030196!5m2!1sen!2sin",
        T2: "https://www.google.com/maps?q=Tejyash+Cyber+Solutions+Santacruz+Branch&output=embed",
        T3: "https://www.google.com/maps?q=Tejyash+Cyber+Solutions+Ghodapdeo+Branch&output=embed",
        T4: "https://www.google.com/maps?q=Tejyash+Cyber+Solutions+Andheri+Branch&output=embed"
    };
    if (mapLinks[locationId]) {
        mapFrame.src = mapLinks[locationId];
    }
}

function shareMap() {
    const mapUrl = document.getElementById("mapFrame").src;
    navigator.clipboard.writeText(mapUrl).then(() => {
        const popup = document.getElementById("copyPopup");
        popup.classList.remove("hidden");
        setTimeout(() => popup.classList.add("hidden"), 2000);
    });
}