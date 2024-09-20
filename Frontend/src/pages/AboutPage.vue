<template>
  <div class="about-page">
    <div class="container">
      <h1>About Us </h1>

      <!-- Development Team Section -->
      <section class="team-section">
        <h2>Development Team</h2>

        <!-- Netta's Information -->
        <div class="team-member">
          <h3>Netta Meiri</h3>
          <p class="member-description">
            Third-year student in Software and Information Systems Engineering at Ben-Gurion University (BGU).
            Full-stack development expert with skills in Node.js, Express, and MySQL. Can debug code in her sleep and
            probably dreams in JavaScript. Passionate about building scalable and data-driven applications—and drinking
            an alarming amount of coffee.
          </p>
        </div>

        <!-- Noa's Information -->
        <div class="team-member">
          <h3>Noa Stern</h3>
          <p class="member-description">
            Third-year student in Software and Information Systems Engineering at Ben-Gurion University (BGU).
            Experienced in full-stack development with a focus on React, Node.js, and MySQL. Once turned a bug into a
            feature just by looking at it. Passionate about developing user-friendly and high-performance web
            applications and finding the perfect GIF for every occasion.
          </p>
        </div>

        <!-- Gil's Information -->
        <div class="team-member">
          <h3>Gil Agmon</h3>
          <p class="member-description">
            Third-year student in Software and Information Systems Engineering at Ben-Gurion University (BGU).
            Specializes in frontend development with Vue.js, Bootstrap-Vue, and SCSS. When not obsessing over pixel-perfect designs, Gil can be found wondering why Internet Explorer still exists. Interested in UI/UX design and creating responsive web applications that make people say, "Wow, that’s slick!"
          </p>
        </div>
      </section>

      <!-- Project Overview Section -->
      <section class="project-section">
        <h2>Project Overview (A.K.A. What We Did When We Should’ve Been Studying)</h2>

        <p class="section-description">
          <strong>Project Name:</strong> Recipe Management System
          <br />
          <strong>Description:</strong> Our project aims to provide a platform for users to manage and share recipes.
          It includes features such as recipe creation, search functionality, and user authentication. In other words,
          it's a virtual cookbook, but cooler.
          <br />
          <strong>Challenges:</strong> Integrating frontend and backend components seamlessly. Ensuring data security
          and optimizing performance for a smooth user experience—because no one wants to wait 10 seconds for their
          grandma’s secret cookie recipe to load.
        </p>
      </section>

      <!-- Mission Section -->
      <section class="mission-section">
        <h2>Our Mission (Cue the Dramatic Music)</h2>

        <p class="section-description">
          Our mission is to simplify recipe management for users by providing an intuitive and efficient platform.
          We aim to foster a community where users can discover new recipes, save their favorites, and connect with others
          who share their culinary interests. Basically, we want to make sure no one ever says, "I don’t know what to cook
          tonight" again.
        </p>
      </section>

      <!-- Technologies Used Section -->
      <section class="technologies-section">
        <h2>Technologies Used (Nerd Alert!)</h2>

        <ul class="tech-list">
          <li>Frontend: Vue.js, Bootstrap-Vue, SCSS (because plain CSS is so 2010)</li>
          <li>Backend: Node.js, Express, MySQL (handling your data like it’s a newborn baby)</li>
          <li>Other: Axios for API calls, Bootstrap for responsive design, Git for version control (and for arguing about commit messages)</li>
        </ul>
      </section>

      <!-- Previous Projects Section -->
      <section class="previous-projects-section">
        <h2>Previous Projects (Proof We Actually Do Stuff)</h2>
        <ul class="tech-list">
          <li>Netta: <a href="https://wed-2023.github.io/318305570/" target="_blank">Check out Netta's magic</a></li>
          <li>Gil: <a href="https://github.com/WED-2023/207234428.git" target="_blank">Behold Gil's brilliance</a></li>
          <li>Noa: <a href="https://wed-2023.github.io/208574475/" target="_blank">Noa's genius at work</a></li>
        </ul>
      </section>

      <!-- Contact Us Section -->
      <section class="contact-section">
        <h2>Contact Us (We Promise Not to Ghost You)</h2>

        <ul class="contact-list">
          <li>
            <b-icon icon="envelope" scale="1.2"></b-icon> <a href="mailto:nettamei@post.bgu.ac.il">nettamei@post.bgu.ac.il</a>
            <br>
            <b-icon icon="envelope" scale="1.2"></b-icon> <a href="mailto:gilagm@post.bgu.ac.il">gilagm@post.bgu.ac.il</a>
            <br>
            <b-icon icon="envelope" scale="1.2"></b-icon> <a href="mailto:noaster@post.bgu.ac.il">noaster@post.bgu.ac.il</a>
          </li>
        </ul>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AboutPage'
};
</script>

<style scoped>
.container {
  max-width: 700px;
  margin: 20px auto;
  padding: 2rem;
  background-color: rgba(44, 44, 46, 0.8); /* Transparent background */
  color: #fff;
  border-radius: 12px; /* Rounded corners */
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}

.about-page {
  padding-top: 3px; 
  padding-bottom: 3px;
  min-height: calc(100vh - 80px); 
}

.team-section,
.project-section,
.mission-section,
.technologies-section,
.contact-section {
  margin-bottom: 40px;
}

.team-member h3 {
  font-size: 1.5em;
  color: #fff;
  margin-bottom: 10px;
}

.member-description {
  color: #fff;
  line-height: 1.6;
}

.section-description {
  color: #fff;
  line-height: 1.6;
}

.tech-list {
  list-style-type: disc;
  margin-left: 20px;
  color: #fff;
}

.tech-list li::before {
  content: "💻 ";
}

.contact-list {
  list-style-type: none;
  padding-left: 0;
  color: #007bff;
}

.contact-list a {
  color: #007bff;
  text-decoration: none;
}

.contact-list a:hover {
  text-decoration: underline;
}

.contact-section h2::after {
  content: " (But Seriously, We Love Hearing From You)";
  font-size: 0.8em;
  color: #888;
}
</style>