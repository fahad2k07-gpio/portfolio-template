
async function loadProfile() {
    try {
        const response = await fetch("profile.json");

        if (!response.ok) {
            throw new Error("Could not load profile.json");
        }

        const profile = await response.json();

        document.getElementById("name").textContent = profile.name || "Your Name";
        document.getElementById("tagline").textContent = profile.tagline || "";
        document.getElementById("bio").textContent = profile.bio || "";
        document.getElementById("about-text").textContent = profile.bio || "";

        document.getElementById("footer-name").textContent = profile.name || "Your Name";

        const skillsContainer = document.getElementById("skills-list");
        skillsContainer.replaceChildren();

        (profile.skills || []).forEach(skill => {
            const item = document.createElement("span");
            item.className = "skill";
            item.textContent = skill;
            skillsContainer.appendChild(item);
        });

        const projectsContainer = document.getElementById("projects-list");
        projectsContainer.replaceChildren();

        (profile.projects || []).forEach((project, index) => {
            const card = document.createElement("article");
            card.className = "project-card";

            const number = document.createElement("span");
            number.className = "project-number";
            number.textContent = `PROJECT / 0${index + 1}`;

            const title = document.createElement("h3");
            title.textContent = project.title || "Untitled project";

            const description = document.createElement("p");
            description.textContent = project.desc || "";

            card.append(number, title, description);

            if (project.link) {
                const link = document.createElement("a");
                link.className = "project-link";
                link.href = project.link;
                link.target = "_blank";
                link.rel = "noopener noreferrer";
                link.textContent = "View project ↗";
                card.appendChild(link);
            }

            projectsContainer.appendChild(card);
        });

        const profileLinks = profile.links || {};
        const nav = document.getElementById("links");
        const contact = document.getElementById("contact-links");

        nav.replaceChildren();
        contact.replaceChildren();

        for (const [platform, url] of Object.entries(profileLinks)) {
            if (!url) continue;

            const link = document.createElement("a");
            link.href = url;
            link.target = "_blank";
            link.rel = "noopener noreferrer";
            link.textContent = platform.charAt(0).toUpperCase() + platform.slice(1);

            const contactLink = link.cloneNode(true);
            contact.appendChild(contactLink);
        }

    } catch (error) {
        console.error("Portfolio loading error:", error);
        document.getElementById("bio").textContent =
            "Please check that profile.json is available and correctly formatted.";
    }
}

loadProfile();
