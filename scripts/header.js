let projects = [];

tailwind.config = {
  theme: {
    fontFamily: {
      sans: ["Roboto"]
    },
    extend: {
      colors: {
        primary: "#598392",
        secondary: "#AEC3B0",
        surface1: "#124559",
        surface2: "#EFF6E0",
        surface3: "#01161E"
      }
    }
  }
};

class SpecialHeader extends HTMLElement {
  constructor() {
    super();
    this.items = [
      { name: "Home", id: "" },
      { name: "Projects", id: "#projects-title" },
      { name: "Skills", id: "#skills-title" },
      { name: "Certifications", id: "#certifications" },
      { name: "About", id: "#about-title" }
    ];
  }

  connectedCallback() {
    this.innerHTML = `<ul 
        class="md:flex hidden flex-row space-x-5 md:space-x-[1rem] lg:space-x-[3rem] justify-center md:justify-end w-full text-xl md:text-2xl lg:text-4xl font-bold desktop-list"
      >
      </ul>
     
      
      
      <div class="hamburger-wrapper flex justify-end md:hidden"></div>
      <div class="hidden flex-col w-full  bg-surface3 fixed top-0 left-0 hamburger-modal px-5 py-[2rem] z-50" >
      <div class="w-full flex flex-row justify-end hamburger-close-button-wrapper">
      </div>
      <ul class="flex flex-col md:hidden justify-end mobile-list items-center font-bold text-2xl space-y-5"></ul>
      </div>
      `;

    this.loadDesktopNavbarItems();
    this.loadMobileNavbarItems();

    this.addScrollListeners();
  }

  loadDesktopNavbarItems() {
    let desktopListElement = this.querySelector(".desktop-list");
    for (let item of this.items) {
      const li = document.createElement("li");
      li.className = "hover:text-secondary";
      li.innerHTML = `<a href="#${item.id}">${item.name}</a>`;
      desktopListElement.appendChild(li);
    }
  }

  toggleMobileModal() {
    let modalElement = this.querySelector(".hamburger-modal");
    if (modalElement.classList.contains("hidden")) {
      // Open: show animation
      modalElement.classList.remove("hidden");
      modalElement.classList.add("flex", "show-navbar");
      modalElement.classList.remove("hide-navbar");
    } else {
      // Close: hide animation
      modalElement.classList.remove("show-navbar");
      modalElement.classList.add("hide-navbar");
      setTimeout(() => {
        modalElement.classList.remove("flex", "hide-navbar");
        modalElement.classList.add("hidden");
      }, 300); // Match animation duration
    }
  }

  loadMobileHamburger() {
    // Open button 
    let openButton = document.createElement("button");
    openButton.innerHTML = `<svg class="h-10 w-auto" viewBox="0 0 24 24">
      <path class="fill-surface2" d="M3 8h18a1 1 0 0 0 0-2H3a1 1 0 0 0 0 2m18 8H3a1 1 0 0 0 0 2h18a1 1 0 0 0 0-2m0-5H3a1 1 0 0 0 0 2h18a1 1 0 0 0 0-2"></path>
    </svg>`;
    openButton.onclick = () => this.toggleMobileModal();
    this.querySelector(".hamburger-wrapper").appendChild(openButton);
    let closeButton = document.createElement("button");

    // Close button
    closeButton.innerHTML = `<svg class="h-10 w-auto" viewBox="0 0 24 24">
      <path class="fill-surface2" d="M18.36 19.78L12 13.41l-6.36 6.37l-1.42-1.42L10.59 12L4.22 5.64l1.42-1.42L12 10.59l6.36-6.36l1.41 1.41L13.41 12l6.36 6.36z"></path>
    </svg>`;
    closeButton.onclick = () => this.toggleMobileModal();
    this.querySelector(".hamburger-close-button-wrapper").appendChild(
      closeButton
    );
  }

  loadMobileNavbarItems() {
    this.loadMobileHamburger();
    let mobileListElement = this.querySelector(".mobile-list");
    for (let item of this.items) {
      const li = document.createElement("li");
      li.className = "hover:text-secondary";
      li.innerHTML = `<a href="${item.id}">${item.name}</a>`;
      mobileListElement.appendChild(li);
    }
  }

  addScrollListeners() {
    let headerClasses =
      "fixed z-50 px-5 top-0 lg:px-[8rem] py-[2rem] w-full text-surface2";
    this.id = "nav-bar";
    this.classList.add(...headerClasses.split(" "));
    window.addEventListener("scroll", () => {
      let scrollPosition = window.scrollY;
      if (scrollPosition > 300) {
        this.classList.remove("text-primary");
        this.classList.add("bg-surface3/80", "text-surface2");
      } else {
        this.classList.remove("bg-surface3/80", "text-surface2");
        this.classList.add("text-surface2");
      }
    });
    if (window.scrollY > 100) {
      this.classList.add("bg-surface3/80", "text-surface2");
      this.classList.remove("text-surface2");
    }
  }
}

class SpecialFooter extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
    <div class="flex flex-row space-x-2 items-center mx-auto w-fit">
    <h2 class="text-surface2 text-xl text-center">Made with</h2><svg class="h-10 w-auto" viewBox="0 0 24 24">
	<path class="fill-secondary" d="m12 21.35l-1.45-1.32C5.4 15.36 2 12.27 2 8.5C2 5.41 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.08C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.41 22 8.5c0 3.77-3.4 6.86-8.55 11.53z"></path>
</svg>
    </div>
    `;
    this.className = " bg-surface3 p-[2rem] w-full flex flex-col";
  }
}

class ProjectList extends HTMLElement {
  constructor() {
    super();
    this.projects = [];
    this.className =
      "space-y-3 md:space-y-0 flex flex-col md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-5 mb-[3rem] mt-[3rem] w-full";
    this.id = "projects-list";
  }

  async connectedCallback() {
    const path = this.getAttribute("path");
    await this.fetchProjects(path);
    this.render();
  }

  async fetchProjects(path) {
    try {
      const response = await fetch(path);
      this.projects = await response.json();
      projects = this.projects;
    } catch (error) {
      console.error("Error fetching projects:", error);
      this.projects = [];
      projects = [];
    }
  }

  render() {
    for (let project of this.projects) {
      if (project.hidden) continue;
      this.appendChild(this.renderProject(project));
    }
  }

  renderProject(project) {
    const li = document.createElement("li");
    li.id = project.id;
    li.className =
      "text-surface2 hover:text-primary lg:min-h-[15rem] w-full bg-surface3 rounded-2xl flex flex-col shadow-xl shadow-black/50 p-[1rem] hover:scale-105 transition-all duration-300 project-card";
    li.innerHTML = `
              <div class="flex flex-col">
                <img
                  src="/media/${project.thumbnail}"
                  class="rounded-xl max-h-[15rem] ${project.mobile
                    ? "object-contain"
                    : "object-cover"}"
                  alt="${project.title}"
                />
                <div class="flex flex-row justify-center items-center space-x-2">
                <h2 class="text-2xl text-center lg:text-5xl font-bold my-4" id="projects-list-title">
                  ${project.title} 
                </h2>
                ${project.github
                  ? `<a href="${project.github}" onclick="event.stopPropagation();" class="underline hover:text-secondary" target="_blank">
                  <svg
                    class="h-[3rem] md:h-[3rem] w-fit hover:scale-110 hover:fill-primary fill-surface2 transition-all duration-300"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33s1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2"
                    />
                  </svg>
              </a>`
                  : ""} ${project.demo
      ? `<a href="${project.demo}" class="underline hover:text-secondary">[Demo]</a>`
      : ""}
                </div>
                <h4 class="text-xl font-light text-center text-surface2">
                  ${project.description} 
                </h4>
              </div>`;
    return li;
  }
}

class SkillsList extends HTMLElement {
  constructor() {
    super();
    this.className = "w-full";
  }
  async connectedCallback() {
    const path = this.getAttribute("path");
    await this.fetchCategories(path);
    await this.render();
  }

  async fetchCategories(path) {
    try {
      const response = await fetch(path);
      this.categories = await response.json();
    } catch (error) {
      console.error("Error fetching skills:", error);
      this.categories = [];
    }
  }

  loadCategory(category) {
    let categoryElement = document.createElement("div");
    categoryElement.className = "my-4";
    categoryElement.innerHTML = `<h2 class="text-3xl lg:text-6xl font-bold text-surface3 mb-4">
        ${category.name}
      </h2>
      <ul
        class="grid gap-3 grid-cols-2 md:grid-cols-3 xl:grid-cols-5 md:gap-4 md:space-y-0  skills-list"
      ></ul>`;
    let listElement = categoryElement.querySelector("ul");
    for (let skill of category.skills) {
      listElement.appendChild(this.loadSkill(skill));
    }
    return categoryElement;
  }

  loadSkill(skill) {
    let skillElement = document.createElement("li");
    skillElement.classList =
      "lg:h-[10rem] w-full bg-surface3 rounded-2xl flex flex-col shadow-xl shadow-black/50";
    skillElement.innerHTML = `<div class="flex flex-row justify-between items-center p-[1rem]">
        <div class="flex flex-col">
          <h2
            class="text-sm md:text-xl font-bold text-primary mb-2 w-[75%]"
          >
            ${skill.name}
          </h2>
          <div class="flex flex-row space-x-2 skill-level">

          </div>
        </div>
        <img
          src="/media/${skill.icon}"
          alt="${skill.name}"
          class="object-contain min-h-[2rem] max-w-[2rem] lg:max-w-[4rem] md:max-w-[2rem] lg:h-[8rem] object-center"
        />
      </div>`;

    let skillLevelElement = skillElement.querySelector(".skill-level");
    for (let i = 0; i < 5; i++) {
      skillLevelElement.appendChild(this.loadSkillLevel(i, skill.level));
    }
    return skillElement;
  }

  loadSkillLevel(curerntLevel, maxLevel) {
    let levelElement = document.createElement("div");
    if (curerntLevel < maxLevel) {
      levelElement.className =
        "bg-surface2 h-[0.5rem] w-[0.5rem] md:h-[1rem] md:w-[1rem] -skew-x-12";
    } else {
      levelElement.className =
        "border-surface2 h-[0.5rem] w-[0.5rem] border-2 md:h-[1rem] md:w-[1rem] -skew-x-12";
    }
    return levelElement;
  }

  async render() {
    for (let category of this.categories) {
      this.appendChild(this.loadCategory(category));
    }
  }
}

class ProjectModal extends HTMLElement {
  setTitle() {
    this.contentElement
      .querySelector("#project-github")
      .setAttribute("href", this.project.github);
    this.contentElement.querySelector(
      "#project-modal-title"
    ).innerText = this.project.title;
  }

  setDescription() {
    this.contentElement.querySelector(
      "#project-modal-description"
    ).innerText = this.project.description;
  }

  setImages() {
    let imageWrapper = this.contentElement.querySelector(
      "#project-modal-image-wrapper"
    );
    if (imageWrapper) {
      imageWrapper.innerHTML = "";
    }

    let i = 0;
    if (!this.currentImageIndex) {
      this.currentImageIndex = 0;
    }
    for (let image of this.project.images) {
      imageWrapper.insertAdjacentHTML(
        "beforeend",
        `<img
          id="project-modal-image-${i}"
          src="/media/${image}"
          class="rounded-xl ${this.project.mobile
            ? "md:h-[30rem]  object-contain"
            : "w-full lg:max-h-[30rem]"} ${i === this.currentImageIndex
          ? ""
          : "hidden"}"
          alt="${this.project.title}"
        />`
      );
      i++;
    }
  }

  setSkills() {
    let projectModalSkillsElement = this.contentWrapperElement.querySelector(
      "#project-modal-skills"
    );
    projectModalSkillsElement.innerHTML = "";
    let skillElement;
    for (let skill of this.project.skills) {
      skillElement = document.createElement("div");
      skillElement.className =
        "p-2 md:p-3 flex-row flex space-x-2 bg-primary m-3 rounded-xl items-center";
      skillElement.innerHTML = `
      <h4 class="text-xs md:text-sm text-surface3">${skill.name}</h4><img src="/media/${skill.icon}" class="w-[1rem] h-[1rem] md:w-[2rem] md:h-[2rem]"></img>
      `;
      projectModalSkillsElement.appendChild(skillElement);
    }
  }

  nextImage() {
    if (this.currentImageIndex == this.project.images.length - 1) {
      this.currentImageIndex = 0;
    } else {
      this.currentImageIndex++;
    }
    this.setImages();
  }

  previousImage() {
    if (this.currentImageIndex === 0) {
      this.currentImageIndex = this.project.images.length - 1;
    } else {
      this.currentImageIndex--;
    }
    this.setImages();
  }

  setInfo() {
    this.setTitle();
    this.setDescription();
    this.setImages();
    this.setSkills();
  }

  toggle(id) {
    if (id) {
      this.project = projects.find(p => p.id == id);

      this.setInfo();
    }

    document.querySelector("#nav-bar").classList.toggle("hidden");
    this.classList.toggle("hidden");
    this.classList.toggle("flex");
  }

  constructor() {
    super();
    this.id = "project-modal";
    this.className =
      "fixed top-0 left-0 w-full h-full bg-black bg-opacity-70 hidden z-50 justify-center items-center px-[1rem] md:px-0";

    this.contentElement = document.createElement("div");
    this.contentElement.className =
      "bg-surface3 rounded-xl p-1 md:p-6 lg:w-[80%] mx-auto relative h-fit overflow-y-auto";
    this.appendChild(this.contentElement);

    this.closeButton = document.createElement("button");
    this.closeButton.className =
      "absolute top-2 right-2 text-gray-600 hover:text-gray-800";
    this.closeButton.innerHTML = `<svg class="h-[3rem] w-auto md:h-[5rem] md:w-[5rem]" viewBox="0 0 24 24">
          <path
            fill="none"
            class="stroke-surface2"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="{1.5}"
            d="M6.758 17.243L12.001 12m5.243-5.243L12 12m0 0L6.758 6.757M12.001 12l5.243 5.243"
          ></path>
        </svg>`;
    this.closeButton.onclick = () => this.toggle();
    this.contentElement.appendChild(this.closeButton);

    this.contentWrapperElement = document.createElement("div");
    this.contentWrapperElement.className = "flex flex-col p-[2rem]";
    this.contentWrapperElement.innerHTML = `<div class="flex flex-col mb-[1rem]">
        <div class="flex-row flex space-x-2 items-center">
          <h1
            class="text-4xl font-bold text-surface2"
            id="project-modal-title"
          ></h1>
          <a href="#" id="project-github" onclick="event.stopPropagation();" class="underline hover:text-secondary" target="_blank">
                  <svg
                    class="h-[3rem] md:h-[3rem] w-fit hover:scale-110 hover:fill-primary fill-surface2 transition-all duration-300"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33s1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2"
                    />
                  </svg>
              </a>
        </div>
          <p class="text-surface2 mt-4" id="project-modal-description"></p>
          <ul id="project-modal-skills" class="flex flex-row flex-wrap">
        
          
          
          </ul>
        </div>
        <div class="flex flex-row w-full justify-between media-wrapper items-center">
          <button class="w-fit" id="project-modal-previous-button">
            <svg viewBox="0 0 24 24" class="w-[2rem] h-[2rem] md:h-[5rem] md:w-[5rem]">
              <path
                class="fill-secondary"
                d="M10 22L0 12L10 2l1.775 1.775L3.55 12l8.225 8.225z"
              ></path>
            </svg>
          </button>
          <div class="flex flex-row mx-auto" id="project-modal-image-wrapper"></div>
          <button id="project-modal-next-button" class="w-fit">
            <svg class="md:h-[5rem] md:w-[5rem] w-[2rem] h-[2rem] " viewBox="0 0 24 24">
              <path
                class="fill-secondary"
                d="M8.025 22L6.25 20.225L14.475 12L6.25 3.775L8.025 2l10 10z"
              ></path>
            </svg>
          </button>
        </div>`;

    this.imageWrapper = this.contentWrapperElement.querySelector(
      "#project-modal-image-wrapper"
    );

    this.nextButton = this.contentWrapperElement.querySelector(
      "#project-modal-next-button"
    );
    this.nextButton.onclick = () => this.nextImage();

    this.previousButton = this.contentWrapperElement.querySelector(
      "#project-modal-previous-button"
    );
    this.previousButton.onclick = () => this.previousImage();

    this.contentElement.appendChild(this.contentWrapperElement);

    this.render();
  }

  render() {
    const projectList = document.getElementById("projects-list");
    if (projectList) {
      projectList.addEventListener("click", e => {
        const card = e.target.closest(".project-card");
        if (card) {
          this.toggle(card.id);
        }
      });
    }
  }
}

class CertificationsList extends HTMLElement {
  constructor() {
    super();
    this.id = "certifications-list-wrapper";
    this.className = "flex flex-col w-3/4 mx-auto";
    this.innerHTML = `
        <h1 class="text-2xl lg:text-6xl font-bold text-surface2 mx-auto" id="certifications-title">
          Certifications
        </h1>
        <div class="certifications-list space-y-3 md:space-y-0 flex flex-col md:grid md:grid-cols-2 lg:grid-cols-2 md:gap-5 mb-[3rem] mt-[3rem] w-full">

        </div>
    `;
  }
  async connectedCallback() {
    const path = this.getAttribute("path");
    await this.fetchCertifications(path);
    this.render();
  }

  async fetchCertifications(path) {
    try {
      const response = await fetch(path);
      this.certifications = await response.json();
      let certifications = this.certifications;
    } catch (error) {
      console.error("Error fetching certifications:", error);
      this.certifications = [];
      let certifications = [];
    }
  }
  render() {
    const certificationsListElement = this.querySelector(
      ".certifications-list"
    );
    for (let certification of this.certifications) {
      if (certification.hidden) continue;
      certificationsListElement.appendChild(
        this.loadCertification(certification)
      );
    }
  }

  loadCertification(certification) {
    const li = document.createElement("li");
    li.id = certification.id;
    li.className = "";
    li.innerHTML = `
      <a target="_blank" href="${certification.url}" class="p-[1rem] flex flex-col rounded-xl space-y-2">
        <h1 class="text-surface2 text-center font-bold text-2xl md:text-5xl">${certification.title} (${certification.year})
        </h1>
         <h2 class="text-surface2 text-center font-normal text-xl md:text-2xl">${certification.description}
        </h2>
        
        <img class="object-contain max-h-[20rem]" src="/media/${certification.image}">
        </img>
      </a>
             `;
    return li;
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  customElements.define("special-header", SpecialHeader);
  customElements.define("special-footer", SpecialFooter);
  await customElements.define("projects-list", ProjectList);
  await customElements.define("skills-list", SkillsList);
  customElements.define("project-modal", ProjectModal);
  customElements.define("certifications-list", CertificationsList);
});
