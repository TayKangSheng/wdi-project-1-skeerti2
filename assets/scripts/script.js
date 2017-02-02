$(document).ready(function () {
  console.log('yes, manipulate me now!')

  var time = 10
  var level = 1
  var pupsSaved = 0
  var timerIdGameClock
  var randNum
  var timerIdPuppyChange
  var totalPuppies = 0
  var count = 0
  var prevRandNum = -1

  // var $startbutton = $('.divCount-StartButton')
  // $startbutton.on('click', startGame)
  var $pupCount = $('.right-panel-text-pups')
  var $timeCount = $('.right-panel-text-time')
  var $levelCount = $('.right-panel-text-level')
  var $restartButton = $('.buttons-panel-text2')
  var modalTitle = $('.modal-title')
  var $crossButton = $('.close')
  $restartButton.on('click', startGame)
    // var $boxClick = $('.box')
    // $boxClick.on('click', pupCountRecord)
  // window.onload = function () {
  setTimeout(startGame, 3000)
  // }

    // Sets the interval of the game and calls the updateTime function
  function startGame () {
    console.log('Start Game')
    count = 0
    pupsSaved = 0
    totalPuppies = 0
    $levelCount.text('LEVEL: ' + level)
    $('.box.fox').removeClass('fox')    // remove fox and puppy images on restart
    $('.box.puppy').removeClass('puppy')
    $('.box').off()                     // Also remove event listeners.
    var $audioLoop = $('.song')[0]
    $audioLoop.play()
    $pupCount.text('Pups Caught: ' + pupsSaved)
    clearInterval(timerIdGameClock) // clear timerId's when restart is clicked!
    clearInterval(timerIdPuppyChange) // same for puppy
    if (level === 1) {
      timerIdGameClock = setInterval(updateTimeLevel1, 1500) // starts count down of timer every 1.5s
      timerIdPuppyChange = setInterval(randomizeLevel1, 1500)// will make puppy appear every 1.5s initially
      time = 10
    } else {
      timerIdGameClock = setInterval(updateTimeLevel2, 1500) // starts count down of timer every 1.5s
      timerIdPuppyChange = setInterval(randomizeLevel2, 1500)// will make puppy appear every 1.5s initially
      time = 50
    }
    $timeCount.text('TIME: ' + time)
    console.log('Timer has started')
  }

  function updateTimeLevel1 () {
    $timeCount.text('TIME: ' + time)
      var $closeButton = $('.NextLevelButton')

    time -= 1
    if (time === 0) {
      clearInterval(timerIdGameClock)
      clearInterval(timerIdPuppyChange)
      $timeCount.text('TIME: ' + time)
      $('#myModal').modal()
      if (pupsSaved < 3) {
        modalTitle.text('Oh No!!')
        $('.modal-para').text('You caught ' + pupsSaved + ' out of ' + totalPuppies + ' puppies, you need to catch more than 2. Please Restart')
        $closeButton.text('Press Restart Button')
        $crossButton.on('click', function(){
          level =1  // on clicking cross, the level 2 wont start post clicking restart
        })
      } else {
        modalTitle.text('Level Over!')
        $('.modal-para').text('You caught ' + pupsSaved + ' out of ' + totalPuppies + ' puppies.')
        $closeButton.text('Next Level')
      }
      if (totalPuppies === pupsSaved) {
        $('.modal-para').text('Yayyyy! You caught them all! Now to next level!')
      }
      $('.box.puppy').removeClass('puppy') // this will remove the puppy once game is over!
      level = 2
      // var $closeButton = $('.NextLevelButton')
      console.log($closeButton)
      $closeButton.on('click', function () {
        if (pupsSaved < 3) {
          level = 1
        } else {
          console.log('entered set time out')
          setTimeout(startGame, 3000)
          $closeButton.text('Next Level')
        }
      })
      // $('.box.fox').removeClass('fox')    // this will remove last fox( if appears) once game over
    }
  }

    // this function maintains the time and displays the same
    // Checks for gameOver and clears the timerId's
  function updateTimeLevel2 () {
    // $levelCount.text('LEVEL: ' + level)
    console.log('update time called')
    $timeCount.text('TIME: ' + time)
    time -= 1 // this will keep reducing the timer time on display
        // randomize()
    if (time === 0) {
      modalTitle.text('Game Over')
      clearInterval(timerIdGameClock)
      clearInterval(timerIdPuppyChange)
      $timeCount.text('TIME: ' + time)
      $('#myModal').modal()
      if (pupsSaved < 0) {
        $('.modal-para').text('Sorry! You did not catch any puppies! Better luck next time')
      } else {
        $('.modal-para').text('You caught ' + pupsSaved + ' out of ' + totalPuppies + ' puppies.')
      }
      var $closeButton = $('.NextLevelButton')
      $closeButton.text('Close')
      $closeButton.off()
      $crossButton.on('click', function(){
        level =2  // on clicking cross, the level 2 wont start post clicking restart
      })
      if (totalPuppies === pupsSaved) {
        alert('Yayyyy! You caught them all! ')
      }
      $('.box.puppy').removeClass('puppy') // this will remove the puppy once game is over!
      $('.box.fox').removeClass('fox')    // this will remove last fox( if appears) once game over
    } else if (time === 40) {
      clearInterval(timerIdPuppyChange)
      timerIdPuppyChange = setInterval(randomizeLevel2, 1450)
    } else if (time === 35) {
      clearInterval(timerIdPuppyChange)
      timerIdPuppyChange = setInterval(randomizeLevel2, 1400)
    } else if (time === 30) {
      clearInterval(timerIdPuppyChange)
      timerIdPuppyChange = setInterval(randomizeLevel2, 1350)
    } else if (time === 25) {
      clearInterval(timerIdPuppyChange)
      timerIdPuppyChange = setInterval(randomizeLevel2, 1200)
    } else if (time === 20) {
      clearInterval(timerIdPuppyChange)
      timerIdPuppyChange = setInterval(randomizeLevel2, 1150)
    } else if (time === 15) {
      clearInterval(timerIdPuppyChange)
      timerIdPuppyChange = setInterval(randomizeLevel2, 1100)
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
    console.log('puppy caught!')
    pupsSaved += 1
    $pupCount.text('Pups Caught: ' + pupsSaved)
    console.log(pupsSaved)
    $('.box.puppy').removeClass('puppy') // This will remove puppy once you catch (click) it!
    $('.box').off() // remove previously added event handler. Once puppy is caught, re-clicking on same position wont increment pup-count
  }

    // this function generates random points for the dog image to move on the div's
  function randomizeLevel1 () {
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
    // $('.box.fox').removeClass('fox')
    $('.box').off()
    totalPuppies += 1
    $('.box').eq(randNum).addClass('puppy') // create a child element for puppy and display the puppy in respective div
    var $puppyGif = $('.puppy')
    $puppyGif.on('click', pupCountRecord) // registering click event handler in the new position
  }

  function randomizeLevel2 () {
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
    if (time < 30) {
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
