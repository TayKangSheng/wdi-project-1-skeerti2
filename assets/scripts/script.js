$(document).ready(function () {
  console.log('yes, manipulate me now!')
  var randNum
  var time = 50
  var count = 0
  var pupsSaved = 0
  var totalPuppies = 0
  // assign the previous Random number var anything but [0-11]
  var prevRandNum = -1
  var timerIdGameClock
  var timerIdPuppyChange

  // var $startbutton = $('.divCount-StartButton')
  // $startbutton.on('click', startGame)
  
  // for the display of pups caught, timer and restart button
  window.onload = function () {
    setTimeout(startGame, 3000)
  }
  var $pupCount = $('.right-panel-text-pups')
  var $timeCount = $('.right-panel-text-time')
  var $restartButton = $('.buttons-panel-text2')
  $restartButton.on('click', startGame)

  // var $boxClick = $('.box')
  // $boxClick.on('click', pupCountRecord)
  // Sets the interval of the game and calls the updateTime function
  function startGame () {
    time = 50
    pupsSaved = 0
    totalPuppies = 0
    $timeCount.text('TIME: ' + time)
    // remove fox and puppy images on restart
    $('.box.fox').removeClass('fox')
    $('.box.puppy').removeClass('puppy')
    // Also remove event listeners.
    $('.box').off()
    var $audioLoop = $('.song')[0]
    $audioLoop.play()
    $pupCount.text('Pups Caught: ' + pupsSaved)
    // clear timerId's when restart is clicked!
    clearInterval(timerIdGameClock)
    // same for puppy
    clearInterval(timerIdPuppyChange)
    // starts count down of timer every 1.5s
    timerIdGameClock = setInterval(updateTime, 1500)
    // will make puppy appear every 1.5s initially
    timerIdPuppyChange = setInterval(randomize, 1500)
    console.log('Timer has started')
  }

    // this function maintains the time and displays the same
    // Checks for gameOver and clears the timerId's
  function updateTime () {
    $timeCount.text('TIME: ' + time)
        // this will keep reducing the timer time on display
    time -= 1
        // Once the game ends, all timerIds are cleared, and a pop-up for game over appears.
    if (time === 0) {
      clearInterval(timerIdGameClock)
      clearInterval(timerIdPuppyChange)
      $timeCount.text('TIME: ' + time)
      $('#myModal').modal()
      $('.modal-para').text('You caught ' + pupsSaved + ' out of ' + totalPuppies + ' puppies.')
      if (totalPuppies === pupsSaved) {
        alert('Yayyyy! You caught them all! ')
      }
      // this will remove the puppy once game is over!
      $('.box.puppy').removeClass('puppy')
            // this will remove last fox( if appears) once game over
      $('.box.fox').removeClass('fox')
    } else if (time === 40) {
      clearInterval(timerIdPuppyChange)
      timerIdPuppyChange = setInterval(randomize, 1450)
    } else if (time === 35) {
      clearInterval(timerIdPuppyChange)
      timerIdPuppyChange = setInterval(randomize, 1400)
    } else if (time === 30) {
      clearInterval(timerIdPuppyChange)
      timerIdPuppyChange = setInterval(randomize, 1350)
    } else if (time === 25) {
      clearInterval(timerIdPuppyChange)
      timerIdPuppyChange = setInterval(randomize, 1200)
    } else if (time === 20) {
      clearInterval(timerIdPuppyChange)
      timerIdPuppyChange = setInterval(randomize, 1150)
    } else if (time === 15) {
      clearInterval(timerIdPuppyChange)
      timerIdPuppyChange = setInterval(randomize, 1100)
    }
  }
    // this function maintains the pup counts as per the players response to the game.
  function pupCountReduce () {
    pupsSaved -= 1
    console.log('fox caught a puppy you saved')
    $pupCount.text('Pups Caught: ' + pupsSaved)
    console.log(pupsSaved)
    $('.box.fox').removeClass('fox') // This will remove fox once you catch (click) it! - this wont reduce pupSaved twice on double click
    $('.box').off() // remove previously added event handler. Once fox is clicked, re-clicking on same position wont decrement pup-count
  }

  function pupCountRecord () {
  // var $sound = $('#hit')[0]
  // $sound.play()
    console.log('puppy caught!')
    pupsSaved += 1
    $pupCount.text('Pups Caught: ' + pupsSaved)
    console.log(pupsSaved)
    // This will remove puppy once you catch (click) it!
    $('.box.puppy').removeClass('puppy')
    // remove previously added event handler. Once puppy is caught, re-clicking on same position wont increment pup-count
    $('.box').off()
  }
  // this function generates random points for the dog image to move on the div's
  function randomize () {
    count += 1
    console.log('count: ' + count)
    min = 0
    max = 11
    randNum = Math.floor(Math.random() * (max - min + 1)) + min // Generate a random number from 0-11 (equal to grid indexes)
    while (prevRandNum === randNum) {
      randNum = Math.floor(Math.random() * (max - min + 1)) + min
    }
    prevRandNum = randNum
    console.log('My random number:' + randNum)
        // var something = $('.box.puppy') // when this is done, the div element with the paw is returned. grid filled with paws.
    $('.box.puppy').removeClass('puppy') // remove puppy from previous position. if there is no puppy, no action taken.
    $('.box.fox').removeClass('fox')
    $('.box').off() // remove previously added click event handlers- event handler in previous div's position is removed.
    var showFox = false
    if (time < 40) {
      if (foxAppear() === true && count % 2 === 0) {
        showFox = true
      }
    }

    if (showFox === true) {
      $('.box').eq(randNum).addClass('fox')
      var $foxGif = $('.fox')
      $foxGif.on('click', pupCountReduce)
    } else {
      totalPuppies += 1
      $('.box').eq(randNum).addClass('puppy') // create a child element for puppy and display the puppy in respective div
      var $puppyGif = $('.puppy')
      $puppyGif.on('click', pupCountRecord) // registering click event handler in the new position
    }
        // return randNum
  }

  function foxAppear () {
        // min = 0
        // max = 1
        // randNumFox = Math.floor(Math.random() * (max - min + 1)) + min
    randNumFox = Math.random()
        // console.log('foxAppear:' + randNumFox)
    return randNumFox >= 0.5 // return true or false
  }
})
