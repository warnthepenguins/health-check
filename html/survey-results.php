<?php
  echo "
    <section id='hc-results-section' class='hidden gone'>
      <div class='hc-results-wrapper'>
        <div class='card-rise'>
          <div class='hc-results-caption'>Your Score</div>
          <div class='hc-results-score'>?</div>
        </div>

        <!--<div class='card-rise hc-progress-bar'>
          <div class='hc-progress'></div><p>Topic 1</p>
        </div>
        <div class='card-rise hc-progress-bar'>
          <div class='hc-progress'></div><p>Topic 2</p>
        </div>
        <div class='card-rise hc-progress-bar'>
          <div class='hc-progress'></div><p>Topic 3</p>
        </div>
        <div class='card-rise hc-progress-bar'>
          <div class='hc-progress'></div><p>Topic 4</p>
        </div>
        <div class='card-rise hc-progress-bar'>
          <div class='hc-progress'></div><p>Topic 5</p>
        </div>
        <div class='card-rise hc-progress-bar'>
          <div class='hc-progress'></div><p>Topic 6</p>
        </div>-->

        <div class='hc-results-actions-wrapper card-rise gone hidden'>
          <div class='hc-results-header'>
            <h2>Want More Detail?</h2>
            <p>Using your Health Check responses as a guide, Sophity will create and send you a personalized Professional Services Road Map, and contact you for a free 1-hour consultation to discuss your results.</p>
            <p>Introduce yourself below to request your Road Map.</p>
          </div>
          <form class='hc-user-info gone hidden' id='hc-user-info' name='hc-user-info' action='./report/index.php' method='post'>
            <input type='hidden' name='check_submit' value='1' />
            <label for='hc-user-name'>Name</label>
            <input type='text' name='hc-user-name' placeholder='Name' required>
            <label for='hc-user-title'>Job Title</label>
            <input type='text' name='hc-user-title' placeholder='Title' required>
            <label for='hc-user-company'>Company</label>
            <input type='text' name='hc-user-company' placeholder='Company' required>
            <label for='hc-user-phone'>Phone Number</label>
            <input type='text' name='hc-user-phone' placeholder='(123) 555-4567' required>
            <div class='hc-phone-checkbox'>
              <input type='checkbox' class='hc-phone-inner' name='hc-user-contact-preference' value='checked'>
              <label class='hc-phone-inner' for='hc-user-contact-preference'>I prefer email</label>
            </div>
            <input type='submit' class='clickable' value='REQUEST REPORT' id='hc-results-request'>
          </post>

        </div>
      </div>
    </section>
    ";
  ?>
