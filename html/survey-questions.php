<?php
  echo "
    <section id='hc-question-section'>
      <div class='hc-topic-header'>
        <h2>...</h2>
        <div class='hc-progress-bar card-fixed hidden gone'>
          <div class='hc-progress'></div>
          <p>1 of 45 completed (3%)</p>
        </div>
      </div>

      <div class='hc-question-group card' id='hc-question-1'>
        <div class='hc-question-link'><a name='hc-question-link-1'></a></div>
        <div class='hc-question-wrapper'>
          <div class='hc-question-number card-fixed'>01</div>
          <div class='hc-question-text'>
            ...
          </div>
        </div>
        <div class='hc-answer-wrapper'>
          <div class='hc-answer-prompt'>
          </div>
          <div class='hc-answer-key clickable'>
            <input type='radio' name='hc-answers-1' id='hc-answers-1-1' value=0>
            <label class = '' for='hc-answers-1-1'><p>STRONGLY DISAGREE</p></label>
            <input type='radio' name='hc-answers-1' id='hc-answers-1-2' value=1>
            <label class = '' for='hc-answers-1-2'><p>DISAGREE</p></label>
            <input type='radio' name='hc-answers-1' id='hc-answers-1-3' value=2>
            <label class = '' for='hc-answers-1-3'><p>NEUTRAL</p></label>
            <input type='radio' name='hc-answers-1' id='hc-answers-1-4' value=3>
            <label class = '' for='hc-answers-1-4'><p>AGREE</p></label>
            <input type='radio' name='hc-answers-1' id='hc-answers-1-5' value=4>
            <label class = '' for='hc-answers-1-5'><p>STRONGLY AGREE</p></label>
          </div>
        </div>
      </div>

      <div class='hc-button-wrapper'>
        <input type='button' class='clickable' value='Continue' id='hc-button-next'>
      </div>
    </section>
    ";
  ?>
