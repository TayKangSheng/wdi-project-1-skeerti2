$(document).ready(function () {
  var playGame = new pupTargetGame;
  var $startbutton = $('.divCount-StartButton')
  $startbutton.on('click', pupTargetGame.playGame())
})

var pupTargetGame = {
  randNum,
  timerIdGameClock,
  timerIdPuppyChange,
  time: 50,
  count: 0,
  pupsSaved: 0,
  totalPuppies: 0,
  prevRandNum: -1,
  startGame: function () {
    this.time = 50
    this.pupsSaved = 0
    this.totalPuppies = 0
    $timeCount.text('TIME: ' + time)
    $('.box.fox').removeClass('fox')
    $('.box.puppy').removeClass('puppy')
    $('.box').off()
    var $audioLoop = $('.song')[0]
    $audioLoop.play()
    $pupCount.text('Pups Caught: ' + pupsSaved)
    clearInterval(timerIdGameClock)
    clearInterval(timerIdPuppyChange)
    this.timerIdGameClock = setInterval(this.updateTime.bind(this), 1500)
    this.timerIdPuppyChange = setInterval(this.randomize.bind(this), 1500)
  },
  updateTime: function () {
    $timeCount.text('TIME: ' + time)
    this.time -= 1
    if (this.time === 0) {
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
    } else if (this.time === 40) {
      clearInterval(timerIdPuppyChange)
      timerIdPuppyChange = setInterval(randomize, 1450)
    } else if (this.time === 35) {
      clearInterval(timerIdPuppyChange)
      timerIdPuppyChange = setInterval(randomize, 1400)
    } else if (this.time === 30) {
      clearInterval(timerIdPuppyChange)
      timerIdPuppyChange = setInterval(randomize, 1350)
    } else if (this.time === 25) {
      clearInterval(timerIdPuppyChange)
      timerIdPuppyChange = setInterval(randomize, 1200)
    } else if (this.time === 20) {
      clearInterval(timerIdPuppyChange)
      timerIdPuppyChange = setInterval(randomize, 1150)
    } else if (this.time === 15) {
      clearInterval(timerIdPuppyChange)
      timerIdPuppyChange = setInterval(randomize, 1100)
    }
  }

}
