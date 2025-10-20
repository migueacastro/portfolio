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

class ContactButton extends HTMLElement {
  constructor() {
    super();
    this.className =
      "transition-all duration-200 w-fit z-20 hover:scale-110 hover:bg-secondary contact-button p-[1rem] flex flex-col justify-center bg-gradient-to-r from-primary to-secondary font-bold text-nowrap text-md md:text-xl text-surface3 hover:text-surface3 rounded-2xl";
    this.innerHTML = "Contact Me";
  }
}

class SpecialHeader extends HTMLElement {
  constructor() {
    super();
    this.items = [
      { name: "Home", id: "" },
      { name: "Projects", id: "#projects-title" },
      { name: "Skills", id: "#skills-title" },
      { name: "Certifications", id: "#certifications-title" },
      { name: "About", id: "#about-title" }
    ];
  }

  connectedCallback() {
    this.innerHTML = `<div class="flex flex-row justify-between items-center"><div class="contact-button-wrapper hidden lg:mx-5"><contact-button></contact-button></div> <ul 
        class="md:flex hidden flex-row space-x-5 md:space-x-[1rem] lg:space-x-[3rem] justify-center md:justify-end w-full text-xl md:text-2xl lg:text-2xl xl:text-4xl font-bold desktop-list"
      >
      </ul>
      <div class="w-full hamburger-wrapper flex justify-end md:hidden"></div>
      </div>
      
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
      li.className =
        "hover:text-secondary transition-all duration-200 w-fit hover:scale-105";
      li.innerHTML = `<a href="${item.id}">${item.name}</a>`;
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
      li.className =
        "hover:text-secondary transition-all duration-200 w-fit hover:scale-105";
      li.innerHTML = `<a href="${item.id}">${item.name}</a>`;
      mobileListElement.appendChild(li);
    }
  }

  addScrollListeners() {
    let headerClasses =
      "fixed z-50 px-5 top-0 lg:px-[8rem] py-[2rem] w-full text-surface2";
    this.id = "nav-bar";
    this.classList.add(...headerClasses.split(" "));
    let contactButtonWrapper = this.querySelector(".contact-button-wrapper");
    window.addEventListener("scroll", () => {
      let scrollPosition = window.scrollY;
      if (scrollPosition > 300) {
        this.classList.remove("text-primary");
        this.classList.add("bg-surface3/80", "text-surface2");
        contactButtonWrapper.classList.remove("hidden");
        contactButtonWrapper.classList.add("flex");
      } else {
        this.classList.remove("bg-surface3/80", "text-surface2");
        this.classList.add("text-surface2");
        contactButtonWrapper.classList.add("hidden");
        contactButtonWrapper.classList.remove("flex");
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
      "space-y-6 md:space-y-3 md:space-y-0 flex flex-col md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-5 mb-[3rem] mt-[3rem] w-full";
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
                  src="./media/${project.thumbnail}"
                  class="rounded-xl max-h-[15rem] ${project.mobile
                    ? "object-contain"
                    : "object-cover"}"
                  alt="${project.title}"
                />
                <div class="flex flex-row justify-center items-center space-x-2">
                <h2 class="text-2xl text-center lg:text-3xl font-bold my-4" id="projects-list-title">
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
          src="./media/${skill.icon}"
          alt="${skill.name}"
          class="object-contain min-h-[2rem] max-w-[2rem] lg:max-w-[4rem] md:max-w-[2rem] lg:h-[8rem] object-center"
        />
      </div>`;

    let skillLevelElement = skillElement.querySelector(".skill-level");
    if (isNaN(skill.level)) {
      skillLevelElement.innerHTML = `<div class="font-bold text-3xl text-surface2"> ${skill.level}</div>`;
    } else {
      for (let i = 0; i < 5; i++) {
        skillLevelElement.appendChild(this.loadSkillLevel(i, skill.level));
      }
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
      const img = document.createElement("img");
      img.id = `project-modal-image-${i}`;
      img.src = `./media/${image}`;
      img.className = `rounded-xl cursor-pointer ${this.project.mobile
        ? "md:h-[30rem] object-contain"
        : "w-full lg:max-h-[30rem]"} ${i === this.currentImageIndex
        ? ""
        : "hidden"}`;
      img.alt = this.project.title;

      // Add click event listener for fullscreen
      img.addEventListener("click", () => this.toggleFullScreen(image));

      imageWrapper.appendChild(img);
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
        "p-2 md:p-3 flex-row flex space-x-2 bg-primary m-1 md:m-3 rounded-xl items-center";
      skillElement.innerHTML = `
      <h4 class="text-xs md:text-sm text-surface3">${skill.name}</h4><img src="./media/${skill.icon}" class="w-[1rem] h-[1rem] md:w-[2rem] md:h-[2rem]"></img>
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
    this.toggleBodyScroll();
  }

  toggleBodyScroll() {
    const body = document.body;
    if (this.classList.contains("hidden")) {
      // Modal is closing - enable scroll
      body.classList.remove("overflow-y-hidden");
    } else {
      // Modal is opening - disable scroll
      body.classList.add("overflow-y-hidden");
    }
  }

  toggleFullScreen(imageSrc) {
    const fullscreenElement = this.querySelector(
      "#project-modal-image-fullscreen"
    );
    const parent = fullscreenElement.parentElement.parentElement;
    if (!fullscreenElement) {
      console.error("Fullscreen element not found");
      return;
    }

    // Set the image source
    fullscreenElement.src = `./media/${imageSrc}`;

    if (parent.classList.contains("hidden")) {
      // Show fullscreen
      parent.classList.remove("hidden");
      parent.classList.add("flex");

      // Add click to exit fullscreen
      fullscreenElement.addEventListener("click", () => this.exitFullScreen());
    } else {
      this.exitFullScreen();
    }
  }

  exitFullScreen() {
    const fullscreenElement = this.querySelector(
      "#project-modal-image-fullscreen"
    );
    const parent = fullscreenElement.parentElement.parentElement;
    if (!parent.classList.contains("hidden")) {
      parent.classList.add("hidden");
      parent.classList.remove("flex");

      // Exit browser fullscreen if active
      if (document.fullscreenElement) {
        document.exitFullscreen();
      }
    }
  }
  nextFullscreenImage() {
    if (this.currentImageIndex === undefined) return;

    if (this.currentImageIndex === this.project.images.length - 1) {
      this.currentImageIndex = 0;
    } else {
      this.currentImageIndex++;
    }

    const nextImage = this.project.images[this.currentImageIndex];
    const fullscreenElement = this.querySelector(
      "#project-modal-image-fullscreen"
    );
    fullscreenElement.src = `./media/${nextImage}`;
  }

  previousFullscreenImage() {
    if (this.currentImageIndex === undefined) return;

    if (this.currentImageIndex === 0) {
      this.currentImageIndex = this.project.images.length - 1;
    } else {
      this.currentImageIndex--;
    }

    const prevImage = this.project.images[this.currentImageIndex];
    const fullscreenElement = this.querySelector(
      "#project-modal-image-fullscreen"
    );
    fullscreenElement.src = `./media/${prevImage}`;
  }

  constructor() {
    super();
    this.id = "project-modal";
    this.className =
      "py-[3rem] md:px-[1.5rem] md:py-[4rem] lg:py-[1rem] xl:py-[8rem] xl:px-0 fixed overflow-y-scroll fixed top-0 left-0 w-full h-full bg-black bg-opacity-70 hidden z-50 justify-center items-center px-[1rem] md:px-0";

    this.contentElement = document.createElement("div");
    this.contentElement.className =
      "md:mt-[20rem] xl:mt-0 top-[5rem] bg-surface3 rounded-xl p-1 md:p-6 lg:w-[80%] mx-auto relative h-fit overflow-y-auto";
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
            <svg class="w-8 h-8 md:w-12 md:h-12" viewBox="0 0 24 24">
              <path class="stroke-surface2" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m14 7l-5 5m0 0l5 5"></path>
            </svg>
          </button>
          <div class="flex flex-row mx-auto" id="project-modal-image-wrapper"></div>
          <button id="project-modal-next-button" class="w-fit">
             <svg class="w-8 h-8 md:w-12 md:h-12" viewBox="0 0 24 24">
              <path class="stroke-surface2" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m10 17l5-5m0 0l-5-5"></path>
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

    this.fullScreenElement = document.createElement("div");
    this.fullScreenElement.className =
      "fullscreen-image fixed top-0 left-0 w-full h-full bg-black bg-opacity-90 hidden z-[60] justify-center items-center";
    this.fullScreenElement.innerHTML = `
      <button class="absolute flex flex-row justify-center items-center left-4 z-10 p-2 bg-surface3/50 rounded-full hover:bg-surface3 transition-all duration-200" id="fullscreen-prev-button">
      <svg class="w-8 h-8 md:w-12 md:h-12" viewBox="0 0 24 24">
        <path class="stroke-surface2" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m14 7l-5 5m0 0l5 5"></path>
      </svg>
      </button>
      
      <div class="relative max-w-full max-h-full flex justify-center items-center">
        <img
          id="project-modal-image-fullscreen"
          class="max-w-full max-h-full object-contain cursor-pointer"
          alt="Fullscreen view"
        />
      </div>
      
      <button class="flex flex-row justify-center items-center absolute right-4 z-10 p-2 bg-surface3/50 rounded-full hover:bg-surface3 transition-all duration-200" id="fullscreen-next-button">
        <svg class="w-8 h-8 md:w-12 md:h-12" viewBox="0 0 24 24">
        <path class="stroke-surface2" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m10 17l5-5m0 0l-5-5"></path>
      </svg>
      </button>
      
      <button class="flex flex-row justify-center items-center absolute top-4 right-4 z-10 p-2 bg-surface3/50 rounded-full hover:bg-surface3 transition-all duration-200" id="fullscreen-close-button">
        <svg class="w-8 h-8 md:w-12 md:h-12" viewBox="0 0 24 24">
          <path class="fill-surface2" d="M18.36 19.78L12 13.41l-6.36 6.37l-1.42-1.42L10.59 12L4.22 5.64l1.42-1.42L12 10.59l6.36-6.36l1.41 1.41L13.41 12l6.36 6.36z"></path>
        </svg>
      </button>
    `;

    this.contentElement.appendChild(this.contentWrapperElement);
    this.fullScreenElement.addEventListener("click", e => {
      if (e.target === this.fullScreenElement) {
        this.exitFullScreen();
      }
    });

    // Fullscreen navigation buttons
    const fullscreenPrevButton = this.fullScreenElement.querySelector(
      "#fullscreen-prev-button"
    );
    const fullscreenNextButton = this.fullScreenElement.querySelector(
      "#fullscreen-next-button"
    );
    const fullscreenCloseButton = this.fullScreenElement.querySelector(
      "#fullscreen-close-button"
    );

    fullscreenPrevButton.addEventListener("click", e => {
      e.stopPropagation();
      this.previousFullscreenImage();
    });

    fullscreenNextButton.addEventListener("click", e => {
      e.stopPropagation();
      this.nextFullscreenImage();
    });

    fullscreenCloseButton.addEventListener("click", e => {
      e.stopPropagation();
      this.exitFullScreen();
    });

    // Add keyboard navigation
    document.addEventListener("keydown", e => {
      if (!this.fullScreenElement.classList.contains("hidden")) {
        if (e.key === "ArrowLeft") {
          this.previousFullscreenImage();
        } else if (e.key === "ArrowRight") {
          this.nextFullscreenImage();
        } else if (e.key === "Escape") {
          this.exitFullScreen();
        }
      }
    });

    this.appendChild(this.fullScreenElement);
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
      <a target="_blank" href="${certification.url}" class="p-[1rem] flex flex-col rounded-xl transition-all duration-200 w-fit hover:scale-105 space-y-2">
        <h1 class="text-surface2 text-center font-bold text-2xl md:text-5xl">${certification.title} (${certification.year})
        </h1>
         <h2 class="text-surface2 text-center font-normal text-xl md:text-2xl">${certification.description}
        </h2>
        
        <img class="object-contain max-h-[20rem]" src="./media/${certification.image}">
        </img>
      </a>
             `;
    return li;
  }
}

class ContactModal extends HTMLElement {
  constructor() {
    super();
    this.id = "contact-modal";
    this.className =
      "py-[3rem] md:px-[1.5rem] md:py-[4rem] lg:py-[1rem] xl:py-[8rem] xl:px-0 fixed overflow-y-scroll top-0 left-0 w-full h-full bg-black bg-opacity-70 hidden z-50 justify-center items-center px-[1rem] md:px-[2rem]";

    this.contentElement = document.createElement("div");
    this.contentElement.className =
      "md:mt-[20rem] xl:mt-0 top-[5rem] bg-surface3 min-h-[30rem] rounded-xl p-5 md:p-[3rem] lg:w-[80%] mx-auto relative h-fit overflow-y-auto mb-[3rem]";
    this.contentElement.innerHTML = `
      <h1 class="text-4xl mb-6 lg:text-6xl font-bold text-surface2 text-center">
          Contact Me
        </h1>
      <div class="contact-form-wrapper">
      <contact-form/>
      </div>
      <div class="social-links">
      <h2 class="my-4 mt-8 text-surface2 mx-auto w-fit text-3xl font-bold">Or see</h2>
      <div class="flex flex-row justify-center">
      <a href="https://github.com/migueacastro" target="_blank">
        <svg
          class="h-[3rem] md:h-[5rem] w-fit hover:scale-110 hover:fill-primary fill-secondary"
          viewBox="0 0 24 24"
        >
          <path
            d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33s1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2"
          />
        </svg>
      </a>
      <a
        href="https://www.linkedin.com/in/miguel-castro-a13259282/"
        target="_blank"
      >
        <svg
          class="h-[3rem] md:h-[5rem] w-fit hover:scale-110 hover:fill-primary fill-secondary"
          viewBox="0 0 24 24"
        >
          <path
            d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93zM6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37z"
          />
        </svg>
      </a>
      </div>
      </div>
    `;
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
  }

  connectedCallback() {
    document.body.addEventListener("click", e => {
      if (e.target.classList.contains("contact-button")) {
        this.toggle();
      }
    });
  }

  toggle() {
    document.querySelector("#nav-bar").classList.toggle("hidden");
    this.classList.toggle("hidden");
    this.classList.toggle("flex");
    this.toggleBodyScroll();
  }
  toggleBodyScroll() {
    const body = document.body;
    if (this.classList.contains("hidden")) {
      body.classList.remove("overflow-y-hidden");
    } else {
      body.classList.add("overflow-y-hidden");
    }
  }
}

class ContactForm extends HTMLElement {
  constructor() {
    super();
    this.classList.add(
      "flex",
      "flex-row",
      "lg:w-3/4",
      "mx-auto",
      "flex-wrap",
      "transition-all",
      "duration-200"
    );

    const fields = [
      { label: "Name", name: "name", type: "text", width: "w-full md:w-1/2" },
      {
        label: "Email",
        name: "email",
        type: "email",
        width: "w-full md:w-1/2"
      },
      { label: "Subject", name: "subject", type: "text", width: "w-full" },
      { label: "Message", name: "message", type: "textarea", width: "w-full" }
    ];

    // Create form container
    this.form = document.createElement("form");
    this.form.className =
      "w-full flex flex-row flex-wrap transition-all duration-500";
    this.form.method = "POST";

    this.appendChild(this.form);

    this.loadingElement = document.createElement("div");
    this.loadingElement.className =
      "relative -top-[25rem] -mb-[25rem] w-full flex flex-row justify-center hidden";
    this.loadingElement.innerHTML = `<div role="status">
    <svg aria-hidden="true" class="h-[10rem] w-auto text-gray-200 animate-spin dark:text-secondary fill-primary" viewBox="0 0 100 101" fill="none"">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
    </svg>
    <span class="sr-only">Loading...</span>
    </div>`;

    this.formSuccessElement = document.createElement("div");
    this.formSuccessElement.className =
      "flex flex-col w-full space-y-5 justify-center items-center hidden";
    this.formSuccessElement.innerHTML = `
      <div>
       <svg class="h-[10rem] w-auto" viewBox="0 0 16 16">
	<path class="fill-secondary" d="M11.4 6.85a.5.5 0 0 0-.707-.707l-3.65 3.65l-1.65-1.65a.5.5 0 0 0-.707.707l2 2a.5.5 0 0 0 .707 0l4-4z"></path>
	<path class="fill-secondary" fillRule="evenodd" d="M8 0C3.58 0 0 3.58 0 8s3.58 8 8 8s8-3.58 8-8s-3.58-8-8-8M1 8c0-3.87 3.13-7 7-7s7 3.13 7 7s-3.13 7-7 7s-7-3.13-7-7" clipRule="evenodd"></path>
</svg>
      </div>
        <h1 class="text-3xl text-secondary font-bold">Form submitted successfully!</h1>
      <h2 class="text-xl text-center text-surface2 font-light">Thank you! The form has been submitted successfully. I will reply to you soon!</h2>
      <button type="button" class="contact-button reset-form text-primary text-2xl">
      Go back</button>
    `;

    this.appendChild(this.formSuccessElement);
    this.addFieldElements(fields);
    this.addSubmitButton();
    this.appendChild(this.loadingElement);
    this.disableSubmitButton();
    // this.form.turnstileValid = true; to skip turnstile for testing
  }

  addFieldElements(list) {
    for (let field of list) {
      let element = document.createElement("div");
      element.className = `flex flex-col space-y-2 my-2 px-2 ${field.width}`;
      element.innerHTML = `<label class="text-md lg:text-2xl text-surface2 for="${field.name}">${field.label}</label>`;

      if (field.type === "textarea") {
        element.innerHTML += `<textarea name="${field.name}" class="field bg-surface1 focus:ring ring-surface2 rounded-md text-surface2 text-md lg:text-2xl p-1 lg:p-2"></textarea>`;
      } else {
        element.innerHTML += `<input type="${field.type}" name="${field.name}" class="field bg-surface1 focus:ring ring-surface2 rounded-md text-surface2 text-md lg:text-2xl  p-1 lg:p-2"></input>`;
      }
      element.innerHTML += `<div
        class="empty-feedback text-red-400 text-sm mt-1 hidden"
      >
        Please provide your ${field.name}.
      </div>
      <div
        class="invalid-feedback text-red-400 text-sm mt-1 hidden"
      >
        Invalid ${field.name}.
      </div>`;

      element.querySelector(".field").addEventListener("input", event => {
        event.target.classList.add("touched");
        this.validateFields();
      });

      this.form.appendChild(element);
    }

    this.formErrorElement = document.createElement("div");
    this.formErrorElement.className =
      "server-error text-red-400 text-sm mt-1 w-full hidden";
    this.formErrorElement.innerHTML = "Something went wrong.";

    this.form.appendChild(this.formErrorElement);
  }

  addSubmitButton() {
    let cloudfareTurnstile = document.createElement("div");
    cloudfareTurnstile.className = "cf-turnstile w-full mx-2";
    cloudfareTurnstile.dataset.sitekey = "0x4AAAAAAB7tkIyxN0F4lFz2";
    cloudfareTurnstile.setAttribute("data-callback", "onSuccess");
    cloudfareTurnstile.setAttribute("data-error-callback", "onError");
    this.form.appendChild(cloudfareTurnstile);

    window.onSuccess = () => {
      this.form.turnstileValid = true;
      this.validateFields();
      console.log("Turnstile completed");
    };

    window.onError = () => {
      this.form.turnstileValid = false;
      this.validateFields();
      console.log("Turnstile error");
    };

    let button = document.createElement("button");
    button.innerHTML = "Submit";
    button.className =
      "mt-4 mx-auto transition-all duration-200 w-fit hover:scale-110 hover:bg-secondary p-[1rem] px-[4rem] flex flex-col justify-center bg-gradient-to-r from-primary to-secondary font-bold text-nowrap text-md md:text-2xl text-surface3 hover:text-surface3 rounded-2xl";
    button.addEventListener("click", e => {
      e.preventDefault();
      this.querySelectorAll(".field").forEach(f => f.classList.add("touched"));
      this.validateFields();

      if (button.disabled) return;

      this.submitForm();
    });

    button.type = "button";
    this.form.appendChild(button);
    this.validateFields();
  }

  emptyFields() {
    this.querySelectorAll("input, textarea").forEach(element => {
      element.value = "";
      element.classList.remove("touched");
    });
    this.validateFields();
  }

  enableSubmitButton() {
    let button = this.querySelector("button");
    if (!button) return;

    button.disabled = false;
    button.classList.remove(
      "ring-gradient-to-r",
      "from-primary",
      "to-secondary",
      "text-surface2",
      "bg-transparent",
      "ring-secondary",
      "ring"
    );
    button.classList.add(
      "bg-gradient-to-r",
      "from-primary",
      "to-secondary",
      "text-surface3",
      "hover:text-surface3",
      "hover:scale-110",
      "hover:bg-secondary"
    );
  }

  disableSubmitButton() {
    let button = this.querySelector("button");
    if (!button) return;

    button.disabled = true;
    button.classList.remove(
      "bg-gradient-to-r",
      "from-primary",
      "to-secondary",
      "text-surface3",
      "hover:scale-110",
      "hover:bg-secondary",
      "hover:text-surface3"
    );
    button.classList.add(
      "ring-gradient-to-r",
      "from-primary",
      "to-secondary",
      "text-surface2",
      "bg-transparent",
      "ring-secondary",
      "ring"
    );
  }

  validateFields() {
    let valid = true;
    this.querySelectorAll(".field").forEach(element => {
      let parent = element.parentElement;
      let invalidFeedback = parent.querySelector(".invalid-feedback");
      let emptyFeedback = parent.querySelector(".empty-feedback");

      invalidFeedback.classList.add("hidden");
      emptyFeedback.classList.add("hidden");

      if (element.value.trim() === "") {
        if (element.classList.contains("touched"))
          emptyFeedback.classList.remove("hidden");
        valid = false;
      } else if (element.type == "email" && !this.isValidEmail(element.value)) {
        valid = false;
        if (element.classList.contains("touched"))
          invalidFeedback.classList.remove("hidden");
      }
    });
    if (!this.form.turnstileValid) {
      valid = false;
    }
    this.form.valid = valid;
    if (valid) {
      this.enableSubmitButton();
    } else {
      this.disableSubmitButton();
    }
  }
  isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  submitForm() {
    const formData = new FormData(this.form);
    this.form.classList.add("opacity-0");
    this.loadingElement.classList.remove("hidden");

    fetch("https://formspree.io/f/myznaebr", {
      method: "POST",
      body: formData
    })
      .then(async response => {
        let json = await response.json();
        if (response.status == 200) {
          this.loadingElement.classList.add("hidden");
          this.formSuccessElement.classList.remove("hidden");
          this.form.classList.add("hidden");
          this.emptyFields();
        } else {
          console.log(response);
          this.formErrorElement.classList.remove("hidden");
          this.form.classList.remove("opacity-0");
          this.loadingElement.classList.add("hidden");
        }
      })
      .catch(error => {
        console.log(error);
        this.formErrorElement.classList.remove("hidden");
        this.form.classList.remove("opacity-0");
        this.loadingElement.classList.add("hidden");
      });
  }
}

class LoadingScreen extends HTMLElement {
  constructor() {
    super();
    this.id = "loading-screen";
    this.classList =
      "absolute w-full h-full top-0 left-0 flex flex-col justify-center items-center bg-surface3 z-50";
    this.innerHTML = `<div role="status">
    <svg aria-hidden="true" class="h-[10rem] w-auto text-gray-200 animate-spin dark:text-secondary fill-primary" viewBox="0 0 100 101" fill="none"">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
    </svg>
    <span class="sr-only">Loading...</span>`;
  }
  toggle() {
    this.classList.toggle("hidden");
  }
}

const customElementsList = [
  ["special-header", SpecialHeader],
  ["special-footer", SpecialFooter],
  ["projects-list", ProjectList],
  ["skills-list", SkillsList],
  ["project-modal", ProjectModal],
  ["certifications-list", CertificationsList],
  ["contact-button", ContactButton],
  ["contact-modal", ContactModal],
  ["contact-form", ContactForm],
  ["loading-screen", LoadingScreen]
];

function addCustomElements(list) {
  for (let element of list) {
    customElements.define(...element);
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  addCustomElements(customElementsList);
  document.querySelector("#loading-screen").toggle();
});
