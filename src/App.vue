<template>
  <div class='container'>

    <!-- pattern-lab/organisms-header -->
    <header role="banner">
      <div class="sfgov-container--full sfgov-nav-container">
        <div class="sfgov-nav-container__content">
          <button class="sfgov-menu-btn">Menu</button>
          <div class="sfgov-logo__container">
            <a href="/" class="branding-link">
              <span class="sfgov-logo">
                <span class="sfgov-logo__image">
                  <img :src="require('sfgov-pattern-lab/dist/images/sf-logo.svg')" alt="alt text"/>
                </span>
                <span class="sfgov-logo__text">
                  <span class="sfgov-logo__text--pre-title">CITY &amp; COUNTY OF SAN FRANCISCO</span>
                  <span class="sfgov-logo__text--title">Neighborhood Notifications</span>
                </span>
              </span>
            </a>
          </div>
          <nav role="navigation" class="sfgov-nav sfgov-mobile_nav-container">
            <div class="sfgov-nav-inner">
              <button class="sfgov-nav-close">
                <i class="fa fa-times"></i>
              </button>
              <nav class="sfgov-main-navigation">
                <ul class="menu">
                  <li><router-link to="notifications_signup">Get future notifications</router-link></li>
                  <li><router-link to="about">About Neighborhood Notification</router-link></li>
                  <li><router-link to="privacy">Privacy Policy</router-link></li>
                  <li><router-link to="disclaimer">Disclaimer</router-link></li>
                </ul>
              </nav>
            </div>
          </nav>
        </div>
      </div>
    </header>

    <router-view></router-view>

  </div>
</template>

<script>
import 'sfgov-pattern-lab/dist/uswds/js/uswds.js'

import 'sfgov-pattern-lab/dist/css/components.css'
import './assets/css/sfgov-pattern-lab-overrides.css'

export default {
  name: 'app'
}
</script>

<style>
.container {
  height: 100%;
  margin: 0;

  /* allow flexing of divs to fill viewport vertically without overflow */
  display: flex;
  flex-flow: column;
}

header, .section {
  border-bottom: solid #aeb0b5 1px;
}
header .sfgov-container--full {
  padding: 0 0 0 0 !important;
}
.sfgov-logo__container {
  padding-top: .3em;
}

</style>

<style scoped>
<style>
