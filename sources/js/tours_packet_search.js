'use strict';


$(document).ready(function () {
  if (!bowser.webkit && !bowser.blink) {
    $('.scroll-pane').jScrollPane();
  }
});


(function() {

  var initWrappedInputs = function() {
    var wrappedInputs = document.querySelectorAll('.wrapped-input--light');
    var wrappedInnerInputs = [];
    for (var i = 0; i < wrappedInputs.length; i++) {
      if (wrappedInputs[i].querySelector('input')) {
        wrappedInnerInputs.push(wrappedInputs[i].querySelector('input'));
      }
    }

    var onWrappedInnerInputKeyup = function() {
      if (this.value) {
        this.setAttribute('data-input', true);
      } else {
        this.setAttribute('data-input', false);
      }
    };

    wrappedInnerInputs.forEach(function(item) {
      item.addEventListener('keyup', onWrappedInnerInputKeyup);
    });
  };


  var initFilterButton = function() {
    var filterButton = document.querySelector('.filters-results__show-selected');

    var onFilterButtonClick = function(evt) {
      evt.preventDefault();

      var filterButtonState = this.getAttribute('data-switch');
      if (filterButtonState === 'on') {
        this.setAttribute('data-switch', 'off');
      } else {
        this.setAttribute('data-switch', 'on');
      }


    };

    filterButton.addEventListener('click', onFilterButtonClick);
  };


  var initFilterCounter = function() {
    var filteringContainer = document.querySelector('.filters__results');
    var filterCounter = filteringContainer.querySelector('.filters-results__selected-count');

    var changeCounter = function() {
      var filteredDataElements = filteringContainer.querySelectorAll('.filters-results__inner-content > li');
      filterCounter.textContent = filteredDataElements.length;
    };

    var onLoadChangeCounter = function() {
      changeCounter();
    };

    var onFilterDataChangeCounter = function() {

      changeCounter();
    };

    document.addEventListener('DOMContentLoaded', onLoadChangeCounter);
    filteringContainer.addEventListener('filterData', onFilterDataChangeCounter);
  };


  var initBoundSelectsButton = function() {
    var boundSelectsButton = document.querySelector('.bounded-selects__bound');

    var onBoundSelectsButtonClick = function(evt) {
      evt.preventDefault();

      var boundSelectsButtonState = this.getAttribute('data-switch');
      var firstSelect = this.previousElementSibling;
      var firstSelectValue = firstSelect.value;
      var secondSelect = this.nextElementSibling;
      if (boundSelectsButtonState === 'on') {
        this.setAttribute('data-switch', 'off');
        secondSelect.removeAttribute('disabled');
      } else {
        this.setAttribute('data-switch', 'on');
        secondSelect.value = firstSelectValue;
        secondSelect.setAttribute('disabled', 'true');
      }


    };

    boundSelectsButton.addEventListener('click', onBoundSelectsButtonClick);
  };


  initWrappedInputs();
  initFilterButton();
  initFilterCounter();
  initBoundSelectsButton();

})();