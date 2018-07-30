<template>
  <div id="app-container">

    <!-- pattern-lab/organisms-header -->
    <header role="banner">
      <div class="sfgov-container--full sfgov-nav-container">
        <div class="sfgov-nav-container__content">
          <div class="sfgov-logo__container">
            <a href="/" class="branding-link">
              <span class="sfgov-logo">
                <span class="sfgov-logo__image">
                  <img :src="require('sfgov-pattern-lab/dist/images/sf-logo.svg')" alt="alt text"/>
                </span>
                <span class="sfgov-logo__text">
                  <span class="sfgov-logo__text--pre-title">CITY &amp; COUNTY OF</span>
                  <span class="sfgov-logo__text--title">San Francisco</span>
                </span>
              </span>
            </a>
          </div>
        </div>
      </div>
    </header>

    <router-view></router-view>
  </div>
</template>

<style>
#app-container {
  height: 100%;
  margin: 0;

  /* allow flexing of divs to fill viewport vertically without overflow */
  display: flex;
  flex-flow: column;
}

header {
  border-bottom: solid lightgray 1px;
}
</style>

<script>
import 'sfgov-pattern-lab/dist/css/components.css'

export default {
  name: 'app'
}
</script>
