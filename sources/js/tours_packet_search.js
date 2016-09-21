'use strict';

(function($) {
  $(window).on('load', function() {
    if (!Modernizr.cssscrollbar) {
      $('.m-custom-scrollbar').mCustomScrollbar();
    }
  });
})(jQuery);


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
    var boundedSelects = document.querySelectorAll('.bounded-selects');

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

    var onFirstBoundedSelectChange = function() {
      var firstSelectValue = this.value;
      var boundButton = this.nextElementSibling;
      var boundButtonState = boundButton.getAttribute('data-switch');
      var secondSelect = boundButton.nextElementSibling;

      if (boundButtonState === 'on') {
        secondSelect.value = firstSelectValue;
      }
    };

    for (var i = 0; i < boundedSelects.length; i++) {
      var boundSelectsButton = boundedSelects[i].querySelector('.bounded-selects__bound');
      var firstBoundedSelect = boundedSelects[i].querySelectorAll('select')[0];

      boundSelectsButton.addEventListener('click', onBoundSelectsButtonClick);
      firstBoundedSelect.addEventListener('change', onFirstBoundedSelectChange);
    }
  };


  initWrappedInputs();
  initFilterButton();
  initFilterCounter();
  initBoundSelectsButton();

})();
